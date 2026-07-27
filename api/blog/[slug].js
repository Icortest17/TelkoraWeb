const { marked } = require('marked');
const { getSupabase } = require('../../lib/supabaseClient');
const { renderPage, escapeHtml } = require('../../lib/layout');

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function notFoundPage(slug) {
  return renderPage({
    title: 'Artículo no encontrado | Telkora',
    description: 'El artículo que buscas no existe o ya no está disponible.',
    canonicalPath: `/blog/${slug}`,
    activePath: 'blog',
    bodyHtml: `<div class="blog-wrap">
      <a class="blog-back" href="/blog">← Volver al blog</a>
      <div class="blog-empty">Este artículo no existe o no está publicado todavía.</div>
    </div>`,
  });
}

module.exports = async (req, res) => {
  const { slug } = req.query;
  const supabase = getSupabase();

  const { data: post, error } = await supabase
    .from('posts')
    .select('slug, title, excerpt, content_md, cover_image_url, seo_title, seo_description, published_at, updated_at, reading_minutes, categories(slug, name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .maybeSingle();

  if (error || !post) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(notFoundPage(slug));
    return;
  }

  const contentHtml = marked.parse(post.content_md || '');

  const body = `
<div class="blog-wrap">
  <a class="blog-back" href="/blog">← Volver al blog</a>
  ${post.cover_image_url ? `<img class="blog-cover" src="${escapeHtml(post.cover_image_url)}" alt="${escapeHtml(post.title)}">` : ''}
  ${post.categories?.name ? `<p class="blog-eyebrow">${escapeHtml(post.categories.name)}</p>` : ''}
  <h1 class="blog-h1">${escapeHtml(post.title)}</h1>
  <div class="blog-meta">
    <span>${formatDate(post.published_at)}</span>
    ${post.reading_minutes ? `<span>${post.reading_minutes} min de lectura</span>` : ''}
  </div>
  <div class="blog-content">${contentHtml}</div>
</div>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo_description || post.excerpt,
    image: post.cover_image_url || 'https://telkora.com/logo.png',
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: { '@type': 'Organization', name: 'Telkora' },
    publisher: {
      '@type': 'Organization',
      name: 'Telkora',
      logo: { '@type': 'ImageObject', url: 'https://telkora.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://telkora.com/blog/${post.slug}` },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.end(renderPage({
    title: `${post.seo_title || post.title} | Telkora`,
    description: post.seo_description || post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    ogImage: post.cover_image_url,
    activePath: 'blog',
    bodyHtml: body,
    jsonLd,
  }));
};
