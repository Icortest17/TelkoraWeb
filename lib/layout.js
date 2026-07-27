// Shell HTML compartido para las páginas del blog (SSR).
// Reutiliza los tokens de diseño de index.html (colores, tipografía, nav, footer)
// sin tocar el archivo estático original.

const SITE_URL = 'https://telkora.com';

const STYLE = `
:root {
  --black: #000000;
  --dark-green: #1e3624;
  --vivid-green: #70b62c;
  --teal: #84c3be;
  --white: #ffffff;
  --white-dim: rgba(255,255,255,0.6);
  --white-faint: rgba(255,255,255,0.08);
  --green-glow: rgba(112,182,44,0.25);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--black);
  color: var(--white);
  font-family: 'Space Grotesk', sans-serif;
  line-height: 1.6;
}
a { color: var(--vivid-green); }
nav#main-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 5vw; background: rgba(0,0,0,0.92); backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--white-faint);
}
nav#main-nav .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; }
nav#main-nav .nav-links a { color: var(--white-dim); text-decoration: none; font-size: 0.9rem; transition: color .2s; }
nav#main-nav .nav-links a:hover, nav#main-nav .nav-links a.active { color: var(--teal); }
nav#main-nav .nav-cta {
  background: var(--vivid-green); color: var(--black); font-weight: 600;
  padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-size: 0.85rem;
}
@media (max-width: 768px) { nav#main-nav .nav-links { display: none; } }

.blog-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 5vw 6rem; }
.blog-eyebrow { font-family: 'Space Mono', monospace; color: var(--vivid-green); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; }
.blog-h1 { font-size: 2.2rem; margin: 0.5rem 0 1rem; }
.blog-meta { color: var(--white-dim); font-size: 0.85rem; margin-bottom: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; }
.blog-cover { width: 100%; border-radius: 12px; margin-bottom: 2rem; display: block; }
.blog-content { font-size: 1.05rem; }
.blog-content h2 { color: var(--teal); margin-top: 2.5rem; }
.blog-content h3 { margin-top: 2rem; }
.blog-content a { text-decoration: underline; }
.blog-content pre { background: var(--white-faint); padding: 1rem; border-radius: 8px; overflow-x: auto; }
.blog-content img { max-width: 100%; border-radius: 8px; }
.blog-back { display: inline-block; margin-bottom: 2rem; color: var(--white-dim); text-decoration: none; font-size: 0.9rem; }
.blog-back:hover { color: var(--teal); }

.blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.blog-card { background: var(--white-faint); border-radius: 12px; padding: 1.5rem; text-decoration: none; color: var(--white); display: flex; flex-direction: column; gap: 0.75rem; transition: background .2s; }
.blog-card:hover { background: rgba(112,182,44,0.12); }
.blog-card-category { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--vivid-green); text-transform: uppercase; }
.blog-card-title { font-size: 1.15rem; font-weight: 600; margin: 0; }
.blog-card-excerpt { color: var(--white-dim); font-size: 0.9rem; margin: 0; }
.blog-card-meta { font-size: 0.75rem; color: var(--white-dim); margin-top: auto; }

.blog-empty { text-align: center; padding: 4rem 1rem; color: var(--white-dim); }

footer { padding: 3rem 5vw 2rem; border-top: 1px solid var(--white-faint); }
footer .footer-copy { color: var(--white-dim); font-size: 0.8rem; }
footer a { color: var(--white-dim); text-decoration: none; margin-right: 1rem; }
footer a:hover { color: var(--teal); }
`;

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function nav(activePath) {
  const link = (href, label, path) =>
    `<li><a href="${href}"${activePath === path ? ' class="active"' : ''}>${label}</a></li>`;
  return `
<nav id="main-nav">
  <a href="/" class="nav-logo"><img src="/logo.png" alt="Telkora" style="height:36px;display:block;"></a>
  <ul class="nav-links">
    ${link('/#soluciones', 'Soluciones', '')}
    ${link('/blog', 'Blog', 'blog')}
    ${link('/#agenda', 'Agenda', '')}
    ${link('/#contacto', 'Contacto', '')}
  </ul>
  <a href="/#agenda" class="nav-cta">Reservar llamada →</a>
</nav>`;
}

const FOOTER = `
<footer>
  <div class="footer-copy">
    © ${new Date().getUTCFullYear()} Telkora. Todos los derechos reservados.
    <a href="/">Inicio</a>
    <a href="/blog">Blog</a>
    <a href="/privacidad.html">Privacidad</a>
    <a href="/aviso-legal.html">Aviso legal</a>
  </div>
</footer>`;

function renderPage({ title, description, canonicalPath, ogImage, activePath, bodyHtml, jsonLd }) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || `${SITE_URL}/logo.png`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.png" type="image/png">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Telkora">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(image)}">
<link rel="canonical" href="${canonical}">
<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">
<meta name="robots" content="index, follow">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>${STYLE}</style>
</head>
<body>
${nav(activePath)}
${bodyHtml}
${FOOTER}
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>`;
}

module.exports = { renderPage, escapeHtml, SITE_URL };
