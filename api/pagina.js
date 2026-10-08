const { render, ALL } = require('../lib/contentPages');

// Páginas de servicio, presupuesto y "Sobre Telkora". Los rewrites de vercel.json
// pasan el nombre de la página en ?page=
module.exports = (req, res) => {
  const slug = (req.query && req.query.page) || '';
  const cfg = Object.prototype.hasOwnProperty.call(ALL, slug) ? ALL[slug] : null;
  if (!cfg) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('No encontrada');
    return;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.end(render(cfg));
};
