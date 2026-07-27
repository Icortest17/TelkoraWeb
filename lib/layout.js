// Shell HTML compartido para las páginas del blog (SSR).
// Replica fielmente el nav, footer, cookie banner, WhatsApp float, barra mobile
// y sistema de diseño de index.html — el blog es "una sección más" de la landing,
// no una página aparte. No se toca index.html: todo vive aquí, duplicado a propósito
// (mismo patrón que privacidad.html/aviso-legal.html ya usan en este proyecto).

const SITE_URL = 'https://telkora.com';
const WHATSAPP_NUMBER = '34614206021';
const WHATSAPP_TEXT = encodeURIComponent('Hola, me gustaría hablar con un agente de Telkora para obtener más información sobre vuestros servicios de automatización con IA.');
const CALENDLY_URL = 'https://calendly.com/isaac-cortes-telkora/consultoria-gratuita';

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
  --green-glow-strong: rgba(112,182,44,0.5);
  --teal-glow: rgba(132,195,190,0.2);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Space Grotesk', sans-serif; background: #000; color: #fff; overflow-x: hidden; line-height: 1.6; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: var(--vivid-green); border-radius: 2px; }

/* NAV — idéntico a index.html */
nav#main-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5vw; height: 68px;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(112,182,44,0.15);
  transition: background 0.3s;
}
.nav-logo { display: flex; align-items: center; text-decoration: none; }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { color: var(--white-dim); font-size: 0.875rem; font-weight: 500; text-decoration: none; letter-spacing: 0.02em; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.active { color: var(--teal); }
.nav-cta {
  padding: 9px 22px; border-radius: 6px; background: var(--vivid-green); color: #000;
  font-size: 0.85rem; font-weight: 700; text-decoration: none; letter-spacing: 0.02em;
  transition: all 0.2s; box-shadow: 0 0 20px var(--green-glow); white-space: nowrap;
}
.nav-cta:hover { background: #84c3be; color: #000; box-shadow: 0 0 30px var(--teal-glow); transform: translateY(-1px); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 8px; margin: -8px; }
.hamburger span { display: block; width: 24px; height: 2px; background: #fff; transition: 0.3s; }
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .nav-links.open { display: flex; flex-direction: column; position: fixed; top: 68px; left: 0; right: 0; background: rgba(0,0,0,0.98); padding: 2rem 5vw; border-bottom: 1px solid rgba(112,182,44,0.15); z-index: 99; gap: 1.5rem; }
  .nav-links.open a { font-size: 1rem; }
  .nav-cta { display: none; }
}

/* SECTION SYSTEM — idéntico a index.html */
section { position: relative; z-index: 1; }
.section-wrap { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 140px 5vw 100px; }
.section-wrap.no-top-pad { padding-top: 100px; }
.section-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vivid-green); margin-bottom: 1rem; }
.section-eyebrow::before { content: '//'; font-family: 'Space Mono', monospace; opacity: 0.5; }
.section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 1.5rem; }
.section-sub { font-size: 1.05rem; color: var(--white-dim); max-width: 580px; line-height: 1.7; }
.divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(112,182,44,0.3), transparent); }
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* BÚSQUEDA Y FILTROS */
.blog-toolbar { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; margin: 2rem 0 2.5rem; }
.blog-search-form { display: flex; gap: 0.5rem; flex: 1; min-width: 240px; max-width: 420px; }
.blog-search-form input {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 10px 14px; color: #fff; font-family: inherit; font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s; outline: none; width: 100%;
}
.blog-search-form input:focus { border-color: var(--vivid-green); box-shadow: 0 0 0 3px rgba(112,182,44,0.4); }
.blog-search-form button {
  padding: 10px 18px; border-radius: 8px; background: var(--vivid-green); color: #000;
  font-size: 0.85rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.blog-search-form button:hover { transform: translateY(-1px); box-shadow: 0 0 20px var(--green-glow); }
.blog-pills { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.blog-pill {
  padding: 7px 14px; border-radius: 100px; font-size: 0.78rem; font-weight: 600;
  color: var(--white-dim); text-decoration: none; border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03); transition: all 0.2s; white-space: nowrap;
}
.blog-pill:hover { border-color: var(--teal); color: var(--teal); }
.blog-pill.active { background: var(--vivid-green); color: #000; border-color: var(--vivid-green); }
.blog-clear { font-size: 0.8rem; color: var(--white-dim); text-decoration: underline; }

/* DESTACADO */
.blog-featured {
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 2.5rem; align-items: center;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(112,182,44,0.2);
  border-radius: 16px; padding: 2rem; margin-bottom: 3rem; text-decoration: none; color: #fff;
  transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
}
.blog-featured:hover { border-color: rgba(112,182,44,0.4); box-shadow: 0 12px 40px rgba(0,0,0,0.35); transform: translateY(-3px); }
.blog-featured img { width: 100%; border-radius: 12px; display: block; aspect-ratio: 16/9; object-fit: cover; }
.blog-featured-label { display: inline-flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--vivid-green); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
.blog-featured-label::before { content: '★'; }
.blog-featured-category { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--teal); text-transform: uppercase; letter-spacing: 0.05em; }
.blog-featured h2 { font-size: 1.6rem; font-weight: 700; margin: 0.5rem 0 0.75rem; letter-spacing: -0.01em; }
.blog-featured p { color: var(--white-dim); font-size: 0.95rem; line-height: 1.6; }
.blog-featured-meta { font-size: 0.78rem; color: var(--white-dim); margin-top: 1rem; }
@media (max-width: 768px) { .blog-featured { grid-template-columns: 1fr; } }

/* GRID DE POSTS — mismo lenguaje visual que .integration-card */
.blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.blog-card {
  border-radius: 14px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.025);
  padding: 1.5rem; text-decoration: none; color: #fff; display: flex; flex-direction: column; gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
}
.blog-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.05); border-color: rgba(112,182,44,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
.blog-card img { width: 100%; border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; margin-bottom: 0.25rem; }
.blog-card-category { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--vivid-green); text-transform: uppercase; letter-spacing: 0.05em; }
.blog-card-title { font-size: 1.1rem; font-weight: 700; margin: 0; letter-spacing: -0.01em; }
.blog-card-excerpt { color: var(--white-dim); font-size: 0.88rem; margin: 0; line-height: 1.6; }
.blog-card-meta { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-top: auto; }
.blog-empty { text-align: center; padding: 4rem 1rem; color: var(--white-dim); border: 1px dashed rgba(255,255,255,0.1); border-radius: 14px; }

/* ARTÍCULO */
.blog-back { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 2rem; color: var(--white-dim); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
.blog-back:hover { color: var(--teal); }
.blog-cover { width: 100%; border-radius: 14px; margin-bottom: 2rem; display: block; aspect-ratio: 16/9; object-fit: cover; }
.blog-meta-row { color: var(--white-dim); font-size: 0.85rem; margin-bottom: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap; }
.blog-content { font-size: 1.05rem; max-width: 720px; }
.blog-content p { margin-bottom: 1.25rem; }
.blog-content h2 { color: var(--teal); font-size: 1.5rem; margin: 2.5rem 0 1rem; letter-spacing: -0.01em; }
.blog-content h3 { font-size: 1.2rem; margin: 2rem 0 1rem; }
.blog-content a { color: var(--vivid-green); text-decoration: underline; }
.blog-content ul, .blog-content ol { margin: 0 0 1.25rem 1.25rem; }
.blog-content li { margin-bottom: 0.5rem; color: var(--white-dim); }
.blog-content pre { background: var(--white-faint); padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.25rem; }
.blog-content img { max-width: 100%; border-radius: 8px; }
.blog-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
.blog-content strong { color: #fff; }

/* FOOTER — idéntico a index.html */
footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 60px 5vw 30px; position: relative; z-index: 1; }
.footer-top { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 3rem; margin-bottom: 3rem; }
.footer-brand-desc { font-size: 0.85rem; color: var(--white-dim); line-height: 1.7; margin-bottom: 1rem; }
.footer-col-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); margin-bottom: 1rem; }
.footer-links { display: flex; flex-direction: column; gap: 0.6rem; }
.footer-links a { font-size: 0.85rem; color: var(--white-dim); text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: #fff; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; gap: 1rem; }
.footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.6); }
.footer-social { display: flex; gap: 1rem; }
.footer-social a { width: 36px; height: 36px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--white-dim); text-decoration: none; transition: 0.2s; }
.footer-social a:hover { border-color: var(--vivid-green); }
.footer-social a:hover img { filter: opacity(1); }
@media (max-width: 768px) { .footer-top { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }

/* COOKIE BANNER — idéntico a index.html */
#cookie-banner {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 10000;
  background: rgba(10,10,10,0.97); border-top: 1px solid rgba(112,182,44,0.2);
  padding: 1.25rem 5vw; display: flex; align-items: center; justify-content: space-between;
  gap: 1.5rem; flex-wrap: wrap; backdrop-filter: blur(12px);
  transform: translateY(100%); transition: transform 0.35s ease;
}
#cookie-banner.show { transform: translateY(0); }
#cookie-banner p { font-size: 0.82rem; color: rgba(255,255,255,0.6); margin: 0; max-width: 680px; line-height: 1.5; }
#cookie-banner p a { color: var(--vivid-green); text-decoration: none; }
#cookie-banner p a:hover { text-decoration: underline; }
.cookie-actions { display: flex; gap: 0.75rem; flex-shrink: 0; }
.cookie-btn-accept { background: var(--vivid-green); color: #000; border: none; border-radius: 8px; padding: 0.55rem 1.25rem; font-family: inherit; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.cookie-btn-accept:hover { opacity: 0.85; }
.cookie-btn-reject { background: transparent; color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 0.55rem 1.25rem; font-family: inherit; font-size: 0.82rem; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
.cookie-btn-reject:hover { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.7); }
@media (max-width: 600px) { #cookie-banner { padding-bottom: 5.5rem; } .cookie-actions { width: 100%; } .cookie-btn-accept, .cookie-btn-reject { flex: 1; text-align: center; } }

/* SCROLL PROGRESS + MOBILE BAR + WHATSAPP — idéntico a index.html */
#scroll-progress { position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(90deg, var(--vivid-green), var(--teal)); z-index: 200; transition: width 0.1s linear; box-shadow: 0 0 8px rgba(112,182,44,0.6); }
#mobile-bottom-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 250; background: rgba(5,10,5,0.97); border-top: 1px solid rgba(112,182,44,0.2); backdrop-filter: blur(16px); padding: 10px 16px 12px; gap: 10px; flex-direction: row; align-items: center; }
#mobile-bottom-bar a { flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 12px 10px; border-radius: 10px; font-size: 0.82rem; font-weight: 700; text-decoration: none; letter-spacing: 0.01em; transition: all 0.2s; }
#mobile-bottom-bar .mob-calendly { background: var(--vivid-green); color: #000; box-shadow: 0 0 20px rgba(112,182,44,0.4); }
#mobile-bottom-bar .mob-wa { background: rgba(37,211,102,0.12); border: 1px solid rgba(37,211,102,0.35); color: #25d366; }
#mobile-bottom-bar svg { flex-shrink: 0; }
.whatsapp-float { position: fixed; bottom: 24px; right: 24px; z-index: 90; width: 58px; height: 58px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 30px rgba(37,211,102,0.5); transition: all 0.25s; }
.whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 36px rgba(37,211,102,0.65); }
.whatsapp-float svg { width: 28px; height: 28px; fill: #fff; flex-shrink: 0; }
@media (max-width: 768px) {
  #mobile-bottom-bar { display: flex; }
  .whatsapp-float { display: none !important; }
  body { padding-bottom: 72px; }
}

/* CANVAS DE PARTÍCULAS — solo en el listado del blog, idéntico a index.html */
#network-canvas {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0; opacity: 0.35;
}
@media (prefers-reduced-motion: reduce) {
  #network-canvas { display: none; }
}

/* SKIP LINK */
.skip-link {
  position: absolute; top: -60px; left: 1rem; z-index: 1000;
  background: var(--vivid-green); color: #000; font-weight: 700;
  padding: 10px 18px; border-radius: 8px; text-decoration: none;
  transition: top 0.2s;
}
.skip-link:focus { top: 1rem; }

/* REDUCED MOTION */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1 !important; transform: none !important; }
}
`;

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function nav(activePath) {
  return `
<nav id="main-nav">
  <a href="/" class="nav-logo"><img src="/logo.png" alt="Telkora" style="height:42px;display:block;"></a>
  <ul class="nav-links" id="nav-links">
    <li><a href="/#soluciones">Soluciones</a></li>
    <li><a href="/#como">Proceso</a></li>
    <li><a href="/#integraciones">Integraciones</a></li>
    <li><a href="/#beneficios">Resultados</a></li>
    <li><a href="/#agenda">Agenda</a></li>
    <li><a href="/#contacto">Contacto</a></li>
    <li><a href="/blog"${activePath === 'blog' ? ' class="active"' : ''}>Blog</a></li>
  </ul>
  <a href="/#agenda" class="nav-cta">Reservar llamada →</a>
  <button class="hamburger" id="hamburger" aria-label="Menú" aria-expanded="false" aria-controls="nav-links" type="button"><span></span><span></span><span></span></button>
</nav>`;
}

const FOOTER = `
<footer>
  <div class="footer-top">
    <div>
      <div style="margin-bottom:0.75rem;"><img src="/logo.png" alt="Telkora" style="height:46px;"></div>
      <div class="footer-brand-desc">Automatización con IA para empresas que quieren crecer más rápido. Sistemas inteligentes a medida.</div>
      <div style="font-family:'Space Mono',monospace;font-size:0.72rem;color:var(--vivid-green);">// Siempre activo. Siempre optimizando.</div>
    </div>
    <div>
      <div class="footer-col-title">Servicios</div>
      <div class="footer-links">
        <a href="/#soluciones">Chatbots IA</a>
        <a href="/#soluciones">Automatización WhatsApp</a>
        <a href="/#soluciones">CRM automatizado</a>
        <a href="/#soluciones">Email marketing IA</a>
        <a href="/#soluciones">Integraciones</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Empresa</div>
      <div class="footer-links">
        <a href="/#casos">Casos de uso</a>
        <a href="/#integraciones">Integraciones</a>
        <a href="/#diferencial">Sobre Telkora</a>
        <a href="/#testimonios">Testimonios</a>
        <a href="/blog">Blog</a>
        <a href="/#agenda">Agenda</a>
        <a href="/#faq">FAQ</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Contacto</div>
      <div class="footer-links">
        <a href="mailto:contacto@telkora.com">contacto@telkora.com</a>
        <a href="/#contacto">Solicitar diagnóstico</a>
        <a href="https://www.instagram.com/telkora.ai/" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.tiktok.com/@telkora0" target="_blank" rel="noopener">TikTok</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">© ${new Date().getUTCFullYear()} Telkora. Todos los derechos reservados. · <a href="/privacidad.html" style="color:inherit;text-decoration:none;">Política de privacidad</a> · <a href="/aviso-legal.html" style="color:inherit;text-decoration:none;">Aviso legal</a></div>
    <div class="footer-social">
      <a href="https://www.instagram.com/telkora.ai/" title="Instagram" target="_blank" rel="noopener"><img src="https://cdn.simpleicons.org/instagram/ffffff" alt="Instagram" width="16" height="16" style="display:block;filter:opacity(0.7);"></a>
      <a href="https://www.tiktok.com/@telkora0" title="TikTok" target="_blank" rel="noopener"><img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="TikTok" width="16" height="16" style="display:block;filter:opacity(0.7);"></a>
    </div>
  </div>
</footer>`;

const MOBILE_BOTTOM_BAR = `
<div id="mobile-bottom-bar">
  <a href="${CALENDLY_URL}" target="_blank" rel="noopener" class="mob-calendly">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    Reservar diagnóstico
  </a>
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}" target="_blank" rel="noopener" class="mob-wa">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    WhatsApp
  </a>
</div>`;

const WHATSAPP_FLOAT = `
<a href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>`;

const COOKIE_BANNER = `
<div id="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
  <p>Usamos cookies técnicas necesarias para el funcionamiento del sitio. No usamos cookies de rastreo ni publicidad sin tu consentimiento. Consulta nuestra <a href="/privacidad.html">Política de privacidad</a>.</p>
  <div class="cookie-actions">
    <button class="cookie-btn-reject" id="cookie-reject">Solo esenciales</button>
    <button class="cookie-btn-accept" id="cookie-accept">Aceptar</button>
  </div>
</div>`;

const SCRIPTS = `
<script>
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!REDUCED_MOTION) (function() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], mouse = { x: 0, y: 0 };
  const N_NODES = 55, MAX_DIST = 160;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  for (let i = 0; i < N_NODES; i++) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(112,182,44,' + ((1 - d / MAX_DIST) * 0.35) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      const mdx = mouse.x - nodes[i].x, mdy = mouse.y - nodes[i].y;
      const md = Math.sqrt(mdx*mdx + mdy*mdy);
      if (md < 200) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(132,195,190,' + ((1 - md / 200) * 0.4) + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    for (let n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(112,182,44,0.7)';
      ctx.fill();
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    rafId = requestAnimationFrame(draw);
  }
  let rafId = requestAnimationFrame(draw);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); } else { rafId = requestAnimationFrame(draw); }
  });
})();
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  function setOpen(open) {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  }
  hamburger.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
})();
(function() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
(function() {
  if (localStorage.getItem('cookieConsent')) return;
  const banner = document.getElementById('cookie-banner');
  setTimeout(() => banner.classList.add('show'), 800);
  document.getElementById('cookie-accept').addEventListener('click', () => { localStorage.setItem('cookieConsent', 'accepted'); banner.classList.remove('show'); });
  document.getElementById('cookie-reject').addEventListener('click', () => { localStorage.setItem('cookieConsent', 'rejected'); banner.classList.remove('show'); });
})();
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').style.background = window.scrollY > 60 ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.7)';
});
(function() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();
</script>`;

function renderPage({ title, description, canonicalPath, ogImage, activePath, bodyHtml, jsonLd, robots, showParticles }) {
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
<meta name="robots" content="${robots || 'index, follow'}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>${STYLE}</style>
</head>
<body>
<a href="#main-content" class="skip-link">Saltar al contenido</a>
${showParticles ? '<canvas id="network-canvas" aria-hidden="true"></canvas>' : ''}
<div id="scroll-progress"></div>
${MOBILE_BOTTOM_BAR}
${nav(activePath)}
<span id="main-content"></span>
${bodyHtml}
${FOOTER}
${WHATSAPP_FLOAT}
${COOKIE_BANNER}
${SCRIPTS}
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>`;
}

module.exports = { renderPage, escapeHtml, SITE_URL };
