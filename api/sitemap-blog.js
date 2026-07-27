const { getSupabase } = require('../lib/supabaseClient');

module.exports = async (req, res) => {
  const supabase = getSupabase();
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  const urls = (posts || []).map((p) => `
  <url>
    <loc>https://telkora.com/blog/${p.slug}</loc>
    <lastmod>${(p.updated_at || p.published_at).slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://telkora.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>${urls}
</urlset>`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.end(xml);
};
