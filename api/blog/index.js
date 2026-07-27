const { getSupabase } = require('../../lib/supabaseClient');
const { renderPage, escapeHtml } = require('../../lib/layout');

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

module.exports = async (req, res) => {
  const supabase = getSupabase();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, title, excerpt, cover_image_url, published_at, reading_minutes, categories(slug, name)')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(renderPage({
      title: 'Blog | Telkora',
      description: 'Blog de automatización con IA de Telkora.',
      canonicalPath: '/blog',
      activePath: 'blog',
      bodyHtml: `<div class="blog-wrap"><div class="blog-empty">No se ha podido cargar el blog ahora mismo. Vuelve a intentarlo en unos minutos.</div></div>`,
    }));
    return;
  }

  const cards = (posts || []).map((p) => `
    <a class="blog-card" href="/blog/${encodeURIComponent(p.slug)}">
      ${p.categories?.name ? `<span class="blog-card-category">${escapeHtml(p.categories.name)}</span>` : ''}
      <h2 class="blog-card-title">${escapeHtml(p.title)}</h2>
      <p class="blog-card-excerpt">${escapeHtml(p.excerpt)}</p>
      <span class="blog-card-meta">${formatDate(p.published_at)}${p.reading_minutes ? ` · ${p.reading_minutes} min de lectura` : ''}</span>
    </a>`).join('');

  const body = `
<div class="blog-wrap">
  <p class="blog-eyebrow">Blog</p>
  <h1 class="blog-h1">Automatización con IA para empresas</h1>
  <p class="blog-meta">Ideas, casos prácticos y guías sobre automatización, chatbots e IA aplicada a negocio.</p>
  ${posts && posts.length
    ? `<div class="blog-grid">${cards}</div>`
    : `<div class="blog-empty">Muy pronto publicaremos aquí. Vuelve pronto.</div>`}
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
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.end(renderPage({
    title: 'Blog | Telkora — Automatización con IA para empresas',
    description: 'Ideas, casos prácticos y guías sobre automatización, chatbots e IA aplicada a negocio, escritas por el equipo de Telkora.',
    canonicalPath: '/blog',
    activePath: 'blog',
    bodyHtml: body,
    jsonLd,
  }));
};
