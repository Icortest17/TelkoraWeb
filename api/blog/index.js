const { getSupabase } = require('../../lib/supabaseClient');
const { renderPage, escapeHtml } = require('../../lib/layout');

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Evita romper la sintaxis de filtros de PostgREST (%, coma, paréntesis) y limita longitud.
function sanitizeSearchTerm(raw) {
  return String(raw || '').replace(/[%,()]/g, '').trim().slice(0, 80);
}

function postCardHtml(p, escapeHtml, formatDate) {
  return `
    <a class="blog-card reveal" href="/blog/${encodeURIComponent(p.slug)}">
      ${p.cover_image_url ? `<img src="${escapeHtml(p.cover_image_url)}" alt="${escapeHtml(p.title)}" loading="lazy">` : ''}
      ${p.categories?.name ? `<span class="blog-card-category">${escapeHtml(p.categories.name)}</span>` : ''}
      <h2 class="blog-card-title">${escapeHtml(p.title)}</h2>
      <p class="blog-card-excerpt">${escapeHtml(p.excerpt)}</p>
      <span class="blog-card-meta">${formatDate(p.published_at)}${p.reading_minutes ? ` · ${p.reading_minutes} min de lectura` : ''}</span>
    </a>`;
}

module.exports = async (req, res) => {
  const supabase = getSupabase();
  const q = sanitizeSearchTerm(req.query.q);
  const categoriaSlug = String(req.query.categoria || '').trim().slice(0, 60);
  const isFiltered = Boolean(q || categoriaSlug);

  const POST_FIELDS = 'slug, title, excerpt, cover_image_url, published_at, reading_minutes, featured, categories(slug, name)';

  const { data: categories } = await supabase
    .from('categories')
    .select('slug, name')
    .order('name', { ascending: true });

  let featured = null;
  if (!isFiltered) {
    const { data: featuredRows } = await supabase
      .from('posts')
      .select(POST_FIELDS)
      .eq('status', 'published')
      .eq('featured', true)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(1);
    featured = featuredRows?.[0] || null;
  }

  let query = supabase
    .from('posts')
    .select(categoriaSlug ? 'slug, title, excerpt, cover_image_url, published_at, reading_minutes, featured, categories!inner(slug, name)' : POST_FIELDS)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });
  if (categoriaSlug) query = query.eq('categories.slug', categoriaSlug);
  if (q) query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  if (featured) query = query.neq('slug', featured.slug);

  const { data: posts, error } = await query;

  if (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(renderPage({
      title: 'Blog | Telkora',
      description: 'Blog de automatización con IA de Telkora.',
      canonicalPath: '/blog',
      activePath: 'blog',
      showParticles: true,
      bodyHtml: `<div class="section-wrap"><div class="blog-empty">No se ha podido cargar el blog ahora mismo. Vuelve a intentarlo en unos minutos.</div></div>`,
    }));
    return;
  }

  const pills = (categories || []).map((c) => {
    const active = c.slug === categoriaSlug;
    return `<a class="blog-pill${active ? ' active' : ''}" href="/blog?categoria=${encodeURIComponent(c.slug)}">${escapeHtml(c.name)}</a>`;
  }).join('');

  const toolbar = `
    <div class="blog-toolbar">
      <form class="blog-search-form" action="/blog" method="get">
        ${categoriaSlug ? `<input type="hidden" name="categoria" value="${escapeHtml(categoriaSlug)}">` : ''}
        <input type="text" name="q" placeholder="Buscar en el blog…" value="${escapeHtml(q)}" aria-label="Buscar en el blog">
        <button type="submit">Buscar</button>
      </form>
      <div class="blog-pills">
        <a class="blog-pill${!categoriaSlug ? ' active' : ''}" href="/blog${q ? `?q=${encodeURIComponent(q)}` : ''}">Todas</a>
        ${pills}
      </div>
    </div>
    ${isFiltered ? `<a class="blog-clear" href="/blog">← Ver todo el blog</a>` : ''}`;

  const featuredHtml = featured ? `
    <a class="blog-featured reveal" href="/blog/${encodeURIComponent(featured.slug)}">
      ${featured.cover_image_url ? `<img src="${escapeHtml(featured.cover_image_url)}" alt="${escapeHtml(featured.title)}">` : ''}
      <div>
        <span class="blog-featured-label">Destacado</span>
        ${featured.categories?.name ? `<div class="blog-featured-category">${escapeHtml(featured.categories.name)}</div>` : ''}
        <h2>${escapeHtml(featured.title)}</h2>
        <p>${escapeHtml(featured.excerpt)}</p>
        <div class="blog-featured-meta">${formatDate(featured.published_at)}${featured.reading_minutes ? ` · ${featured.reading_minutes} min de lectura` : ''}</div>
      </div>
    </a>` : '';

  const cards = (posts || []).map((p) => postCardHtml(p, escapeHtml, formatDate)).join('');

  let emptyState = '';
  if (!featured && !(posts || []).length) {
    emptyState = isFiltered
      ? `<div class="blog-empty">No hay artículos que coincidan con tu búsqueda.</div>`
      : `<div class="blog-empty">Muy pronto publicaremos aquí. Vuelve pronto.</div>`;
  }

  const body = `
<div class="section-wrap">
  <p class="section-eyebrow">Blog</p>
  <h1 class="section-title">Automatización con IA para empresas</h1>
  <p class="section-sub">Ideas, casos prácticos y guías sobre automatización, chatbots e IA aplicada a negocio.</p>
  ${toolbar}
  ${featuredHtml}
  ${(posts || []).length ? `<div class="blog-grid">${cards}</div>` : emptyState}
</div>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Telkora',
    url: 'https://telkora.com/blog',
    publisher: { '@type': 'Organization', name: 'Telkora', logo: 'https://telkora.com/logo.png' },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', isFiltered ? 'no-store' : 's-maxage=300, stale-while-revalidate=600');
  res.end(renderPage({
    title: isFiltered ? `Búsqueda | Blog | Telkora` : 'Blog | Telkora — Automatización con IA para empresas',
    description: 'Ideas, casos prácticos y guías sobre automatización, chatbots e IA aplicada a negocio, escritas por el equipo de Telkora.',
    canonicalPath: '/blog',
    activePath: 'blog',
    showParticles: true,
    bodyHtml: body,
    jsonLd: isFiltered ? undefined : jsonLd,
    robots: isFiltered ? 'noindex, follow' : 'index, follow',
  }));
};
