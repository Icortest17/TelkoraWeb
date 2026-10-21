const { renderPage, escapeHtml, SITE_URL } = require('./layout');

// Landing de captación: Cheque TIC 2026 (Región de Murcia).
// Datos verificados el 2026-10-21 (BORM nº 243 del 21-10-2026, extracto de la
// Resolución de 8-10-2026, y notas de prensa regionales). Lo que NO está
// confirmado en las bases (porcentaje, tramos exactos, requisitos de proveedor)
// no se afirma aquí. Revisar al publicarse el texto íntegro de las bases.

const PATH = '/subvencion-ia-murcia';
const WHATSAPP_NUMBER = '34614206021';
const WHATSAPP_TEXT = encodeURIComponent('Hola, quiero saber si mi empresa puede pedir el Cheque TIC para implantar IA');

// Los 45 municipios de la Región de Murcia
const MUNICIPIOS = [
  'Abanilla', 'Abarán', 'Águilas', 'Albudeite', 'Alcantarilla', 'Aledo', 'Alguazas', 'Alhama de Murcia',
  'Archena', 'Beniel', 'Blanca', 'Bullas', 'Calasparra', 'Campos del Río', 'Caravaca de la Cruz',
  'Cartagena', 'Cehegín', 'Ceutí', 'Cieza', 'Fortuna', 'Fuente Álamo de Murcia', 'Jumilla', 'Librilla',
  'Lorca', 'Lorquí', 'Los Alcázares', 'Mazarrón', 'Molina de Segura', 'Moratalla', 'Mula', 'Murcia',
  'Ojós', 'Pliego', 'Puerto Lumbreras', 'Ricote', 'San Javier', 'San Pedro del Pinatar', 'Santomera',
  'Torre-Pacheco', 'Las Torres de Cotillas', 'Totana', 'Ulea', 'La Unión', 'Villanueva del Río Segura', 'Yecla',
];

const FAQ = [
  {
    q: '¿Tiene coste revisar si mi empresa puede pedir la ayuda?',
    a: 'No. La primera llamada y la revisión de si encajas no tienen coste ni compromiso.',
  },
  {
    q: '¿Cuánto da el Cheque TIC 2026?',
    a: 'Según la convocatoria, cada beneficiario puede recibir entre 2.000 y 20.000 euros, según el tipo de servicio y el tamaño de su plantilla. La dotación total es de 900.000 euros, cofinanciados con fondos FEDER. El importe final depende de tu proyecto y de la resolución del Instituto de Fomento.',
  },
  {
    q: '¿Qué porcentaje del proyecto cubre?',
    a: 'En la edición anterior la ayuda cubrió hasta el 70 % del coste del proyecto, con más porcentaje en sectores estratégicos. El porcentaje exacto de esta convocatoria lo confirmamos contigo con las bases oficiales; no damos una cifra que no esté publicada.',
  },
  {
    q: '¿Hasta cuándo se puede solicitar?',
    a: 'Del 22 de octubre al 30 de diciembre de 2026, a través de la sede electrónica del Instituto de Fomento. En la edición anterior se agotó el presupuesto (221 solicitudes para 96 empresas beneficiarias), así que conviene no dejarlo para el último día.',
  },
  {
    q: '¿Quién puede pedirla?',
    a: 'Pymes, autónomos y comunidades de bienes de cualquier sector, salvo producción primaria agrícola, pesquera o acuícola, con un centro de trabajo abierto en la Región de Murcia.',
  },
  {
    q: '¿Quién gestiona la ayuda y qué hace Telkora?',
    a: 'La convoca y la resuelve el Instituto de Fomento de la Región de Murcia (INFO). Telkora no es un organismo público: somos el proveedor que diseña e implanta la solución de IA y automatización. Antes de empezar te confirmamos qué parte del proyecto encaja en la convocatoria.',
  },
  {
    q: '¿Y si no me la conceden?',
    a: 'Lo hablamos antes de empezar. Tú decides si seguir adelante con el proyecto con o sin ayuda; no hacemos nada sin que lo sepas.',
  },
];

const CARDS = [
  ['WhatsApp con IA', 'Un asistente que responde catálogo, envíos y dudas frecuentes y pasa a una persona los casos delicados.', '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5Z"/>'],
  ['Informes automáticos', 'Datos de campañas o ventas, análisis redactado con IA y PDF listo para revisar. Sin copiar y pegar.', '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ['Asistentes de recomendación', 'Un cuestionario guiado que recomienda el producto adecuado de tu catálogo a cada cliente.', '<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>'],
  ['Seguimiento de pedidos', 'Tus clientes consultan el estado de su pedido sin llamarte ni escribirte.', '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>'],
  ['Procesos internos', 'Facturas, documentos, agenda y CRM conectados entre sí para que nadie repita tareas.', '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="3"/>'],
  ['Datos y control', 'Cuadros de mando con tus cifras reales (inteligencia de negocio) para decidir con datos.', '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 14l3-3 3 2 4-5"/>'],
];

const STEPS = [
  ['Nos dejas tus datos', 'Un minuto. Sin compromiso.'],
  ['Te llamamos', 'Vemos qué proceso de tu empresa se puede automatizar y si encajas.'],
  ['Preparamos el proyecto', 'Definimos alcance y presupuesto para la solicitud.'],
  ['Implantamos', 'Cuando la ayuda esté resuelta, construimos y ponemos en marcha la solución.'],
];

const STYLE = `
.sv-hero { position: relative; padding: 150px 5vw 90px; overflow: hidden; }
.sv-hero::before {
  content: ''; position: absolute; inset: -20% -10% auto -10%; height: 120%; z-index: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 55% at 50% 30%, rgba(112,182,44,0.20), transparent 70%),
              radial-gradient(ellipse 40% 40% at 85% 10%, rgba(132,195,190,0.12), transparent 70%);
  animation: svGlow 9s ease-in-out infinite alternate;
}
@keyframes svGlow { from { opacity: 0.7; transform: scale(1); } to { opacity: 1; transform: scale(1.06); } }
.sv-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }
.sv-badge { display: inline-flex; align-items: center; gap: 10px; padding: 7px 16px; border-radius: 100px; font-size: 0.78rem; font-weight: 600; color: var(--teal); border: 1px solid rgba(132,195,190,0.3); background: rgba(132,195,190,0.07); margin-bottom: 1.5rem; }
.sv-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--vivid-green); box-shadow: 0 0 0 0 var(--green-glow-strong); animation: svPulse 2s infinite; }
@keyframes svPulse { 0% { box-shadow: 0 0 0 0 rgba(112,182,44,0.6); } 70% { box-shadow: 0 0 0 10px rgba(112,182,44,0); } 100% { box-shadow: 0 0 0 0 rgba(112,182,44,0); } }
.sv-h1 { font-size: clamp(2.1rem, 5.6vw, 4rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1.25rem; max-width: 900px; }
.sv-amount { display: inline-block; color: var(--vivid-green); text-shadow: 0 0 40px rgba(112,182,44,0.55); font-variant-numeric: tabular-nums; }
.sv-lead { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--white-dim); max-width: 640px; line-height: 1.7; margin-bottom: 2rem; }
.sv-cta-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
.sv-btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 26px; border-radius: 10px; font-family: inherit; font-size: 0.95rem; font-weight: 700; text-decoration: none; border: none; cursor: pointer; background: var(--vivid-green); color: #000; box-shadow: 0 0 28px var(--green-glow); transition: transform 0.25s, box-shadow 0.25s, background 0.25s; }
.sv-btn::after { content: ''; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.45), transparent); transform: skewX(-20deg); animation: svShine 4.5s ease-in-out infinite; }
@keyframes svShine { 0%, 60% { left: -80%; } 100% { left: 140%; } }
.sv-btn:hover { transform: translateY(-2px); box-shadow: 0 0 42px var(--green-glow-strong); background: #84c3be; }
.sv-btn[disabled] { opacity: 0.6; cursor: wait; transform: none; }
.sv-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.18); box-shadow: none; }
.sv-btn-ghost::after { display: none; }
.sv-btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: var(--teal); color: var(--teal); box-shadow: none; }
.sv-deadline { margin-top: 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.78rem; color: var(--white-dim); }
.sv-deadline strong { color: var(--vivid-green); }

.sv-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; max-width: 1100px; margin: -30px auto 0; padding: 0 5vw; position: relative; z-index: 2; }
.sv-fact { padding: 1.4rem 1.5rem; border-radius: 14px; border: 1px solid rgba(112,182,44,0.2); background: rgba(10,18,10,0.85); backdrop-filter: blur(12px); transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, box-shadow 0.3s; }
.sv-fact:hover { transform: translateY(-4px); border-color: rgba(112,182,44,0.5); box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 24px var(--green-glow); }
.sv-fact b { display: block; font-size: 1.7rem; letter-spacing: -0.02em; color: var(--vivid-green); font-variant-numeric: tabular-nums; }
.sv-fact > span { font-size: 0.82rem; color: var(--white-dim); line-height: 1.5; }

.sv-section { max-width: 1100px; margin: 0 auto; padding: 90px 5vw 0; position: relative; z-index: 1; }
.sv-section h2 { font-size: clamp(1.6rem, 3.6vw, 2.5rem); letter-spacing: -0.025em; line-height: 1.12; margin-bottom: 1rem; }
.sv-section > p.sv-sub { color: var(--white-dim); max-width: 640px; margin-bottom: 2rem; line-height: 1.7; }
.sv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.25rem; }
.sv-card { position: relative; padding: 1.6rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, box-shadow 0.3s, background 0.3s; }
.sv-card:hover { transform: translateY(-6px); border-color: rgba(112,182,44,0.45); background: rgba(112,182,44,0.05); box-shadow: 0 14px 40px rgba(0,0,0,0.35), 0 0 26px var(--green-glow); }
.sv-card svg { width: 30px; height: 30px; fill: none; stroke: var(--vivid-green); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; margin-bottom: 1rem; transition: transform 0.4s; }
.sv-card:hover svg { transform: scale(1.12) rotate(-4deg); }
.sv-card h3 { font-size: 1.08rem; margin-bottom: 0.5rem; }
.sv-card p { font-size: 0.9rem; color: var(--white-dim); line-height: 1.65; }

.sv-check { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: start; }
.sv-q { padding: 1.1rem 1.25rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); margin-bottom: 0.85rem; }
.sv-q p { font-size: 0.95rem; margin-bottom: 0.7rem; }
.sv-q small { display: block; color: rgba(255,255,255,0.6); font-size: 0.78rem; margin-top: 0.5rem; }
.sv-yn { display: flex; gap: 0.5rem; }
.sv-yn button { flex: 1; padding: 9px 12px; border-radius: 8px; font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: var(--white-dim); background: transparent; border: 1px solid rgba(255,255,255,0.14); transition: all 0.2s; }
.sv-yn button:hover { border-color: var(--teal); color: var(--teal); }
.sv-yn button[aria-pressed="true"].yes { background: var(--vivid-green); color: #000; border-color: var(--vivid-green); }
.sv-yn button[aria-pressed="true"].no { background: rgba(255,120,120,0.15); color: #ff9b9b; border-color: rgba(255,120,120,0.5); }
.sv-result { position: sticky; top: 100px; padding: 1.75rem; border-radius: 16px; border: 1px solid rgba(112,182,44,0.25); background: linear-gradient(160deg, rgba(30,54,36,0.7), rgba(10,18,10,0.9)); min-height: 220px; transition: border-color 0.4s, box-shadow 0.4s; }
.sv-result.ok { border-color: rgba(112,182,44,0.7); box-shadow: 0 0 40px var(--green-glow); }
.sv-result.ko { border-color: rgba(255,160,100,0.5); }
.sv-result h3 { font-size: 1.25rem; margin-bottom: 0.6rem; }
.sv-result p { color: var(--white-dim); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.1rem; }
.sv-result .sv-btn { font-size: 0.88rem; padding: 12px 20px; }

.sv-steps { counter-reset: s; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
.sv-step { position: relative; padding: 1.6rem 1.4rem 1.4rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.025); counter-increment: s; }
.sv-step::before { content: counter(s, decimal-leading-zero); font-family: 'Space Mono', monospace; font-size: 0.8rem; color: var(--vivid-green); display: block; margin-bottom: 0.8rem; }
.sv-step h3 { font-size: 1.05rem; margin-bottom: 0.4rem; }
.sv-step p { font-size: 0.88rem; color: var(--white-dim); line-height: 1.6; }

.sv-req { list-style: none; margin: 0 0 1.25rem; padding: 0; max-width: 720px; }
.sv-req li { position: relative; padding: 0.7rem 0 0.7rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.06); color: var(--white-dim); line-height: 1.6; }
.sv-req li::before { content: '✓'; position: absolute; left: 0; top: 0.7rem; width: 20px; height: 20px; border-radius: 50%; background: rgba(112,182,44,0.18); color: var(--vivid-green); font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }

.sv-case { padding: 1.6rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.025); }
.sv-case h3 { font-size: 1.02rem; margin-bottom: 0.5rem; color: var(--teal); }
.sv-case p { font-size: 0.9rem; color: var(--white-dim); line-height: 1.65; }
.sv-case a { color: var(--vivid-green); }

.sv-form-wrap { max-width: 760px; margin: 0 auto; padding: 2rem; border-radius: 18px; border: 1px solid rgba(112,182,44,0.3); background: linear-gradient(160deg, rgba(30,54,36,0.55), rgba(8,14,8,0.92)); box-shadow: 0 0 60px rgba(112,182,44,0.10); }
.sv-form-wrap h2 { margin-bottom: 0.4rem; }
.sv-form-wrap > p { color: var(--white-dim); margin-bottom: 1.5rem; }
.sv-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.sv-field { display: flex; flex-direction: column; gap: 6px; }
.sv-field.full { grid-column: 1 / -1; }
.sv-field label { font-size: 0.78rem; font-weight: 600; color: var(--white-dim); letter-spacing: 0.02em; }
.sv-field input, .sv-field select, .sv-field textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 9px; padding: 12px 14px; color: #fff; font-family: inherit; font-size: 0.95rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; width: 100%; }
.sv-field select option { background: #0b140b; color: #fff; }
.sv-field input:focus, .sv-field select:focus, .sv-field textarea:focus { border-color: var(--vivid-green); box-shadow: 0 0 0 3px rgba(112,182,44,0.35); background: rgba(255,255,255,0.07); }
.sv-field.err input, .sv-field.err select { border-color: rgba(255,90,90,0.8); box-shadow: 0 0 0 3px rgba(255,60,60,0.15); }
.sv-field .sv-msg { font-size: 0.74rem; color: #ff8c8c; min-height: 0; }
.sv-hp { position: absolute !important; left: -9999px !important; width: 1px; height: 1px; overflow: hidden; }
.sv-consent { display: flex; gap: 10px; align-items: flex-start; font-size: 0.82rem; color: var(--white-dim); line-height: 1.55; }
.sv-consent input { width: 18px; height: 18px; margin-top: 2px; accent-color: var(--vivid-green); flex-shrink: 0; }
.sv-consent a { color: var(--vivid-green); }
.sv-note { grid-column: 1 / -1; padding: 12px 14px; border-radius: 9px; background: rgba(132,195,190,0.08); border: 1px solid rgba(132,195,190,0.3); color: var(--teal); font-size: 0.84rem; display: none; }
.sv-feedback { display: none; margin-top: 1rem; padding: 12px 14px; border-radius: 9px; font-size: 0.88rem; background: rgba(255,60,60,0.08); border: 1px solid rgba(255,60,60,0.25); color: #ff8c8c; }
.sv-success { display: none; text-align: center; padding: 1.5rem 0.5rem; }
.sv-success .sv-tick { width: 64px; height: 64px; margin: 0 auto 1rem; border-radius: 50%; border: 2px solid var(--vivid-green); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px var(--green-glow-strong); animation: svPop 0.6s cubic-bezier(0.2,1.4,0.4,1) both; }
.sv-success .sv-tick svg { width: 30px; height: 30px; stroke: var(--vivid-green); fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 30; stroke-dashoffset: 30; animation: svDraw 0.5s 0.35s ease forwards; }
@keyframes svPop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes svDraw { to { stroke-dashoffset: 0; } }
.sv-success h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.sv-success p { color: var(--white-dim); margin-bottom: 1.25rem; }

.sv-faq { max-width: 800px; }
.sv-faq details { border-bottom: 1px solid rgba(255,255,255,0.08); }
.sv-faq summary { cursor: pointer; list-style: none; padding: 1.1rem 2rem 1.1rem 0; font-weight: 600; position: relative; transition: color 0.2s; }
.sv-faq summary::-webkit-details-marker { display: none; }
.sv-faq summary::after { content: '+'; position: absolute; right: 4px; top: 50%; transform: translateY(-50%); font-size: 1.4rem; color: var(--vivid-green); transition: transform 0.3s; }
.sv-faq details[open] summary::after { transform: translateY(-50%) rotate(45deg); }
.sv-faq summary:hover { color: var(--teal); }
.sv-faq details p { padding: 0 0 1.2rem; color: var(--white-dim); line-height: 1.7; animation: svFade 0.35s ease; }
@keyframes svFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

.sv-legal { max-width: 1100px; margin: 70px auto 0; padding: 0 5vw 90px; font-size: 0.78rem; color: rgba(255,255,255,0.6); line-height: 1.7; position: relative; z-index: 1; }
.sv-legal a { color: var(--teal); }

#sv-sticky { display: none; position: fixed; left: 12px; right: 12px; bottom: 82px; z-index: 240; padding: 14px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 0.92rem; color: #000; text-decoration: none; background: var(--vivid-green); box-shadow: 0 8px 30px rgba(112,182,44,0.5); transform: translateY(150%); transition: transform 0.35s cubic-bezier(0.23,1,0.32,1); }
#sv-sticky.show { transform: translateY(0); }
@media (max-width: 768px) {
  .sv-hero { padding: 112px 5vw 70px; }
  .sv-check { grid-template-columns: 1fr; }
  .sv-result { position: static; }
  .sv-fields { grid-template-columns: 1fr; }
  .sv-form-wrap { padding: 1.4rem; }
  .sv-section { padding-top: 64px; }
  #sv-sticky { display: block; }
  .sv-btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .sv-hero::before, .sv-dot, .sv-btn::after { animation: none !important; }
  #sv-sticky { transition: none; }
}
`;

const SCRIPT = `
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  // Contador de la cifra principal
  var amt = $('#sv-amount');
  if (amt) {
    var target = 20000;
    var fmt = function (n) { return String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.'); };
    if (reduce) { amt.textContent = fmt(target); }
    else {
      var t0 = null;
      var step = function (t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / 1600, 1);
        var e = 1 - Math.pow(1 - p, 4);
        amt.textContent = fmt(Math.round(target * e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }

  // Cifras de la franja (cuentan al entrar en pantalla)
  var nums = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '', t0 = null;
        var tick = function (t) {
          if (t0 === null) t0 = t;
          var p = Math.min((t - t0) / 1300, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(to * e)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.') + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  // Cuenta atrás real del plazo (Europe/Madrid: abre 22-10 a las 00:00 CEST, cierra 30-12 a las 23:59 CET)
  var dl = $('#sv-deadline');
  if (dl) {
    var open = new Date('2026-10-22T00:00:00+02:00').getTime();
    var close = new Date('2026-12-30T23:59:59+01:00').getTime();
    var now = Date.now(), day = 86400000;
    if (now < open) dl.innerHTML = 'Se abre el <strong>22 de octubre</strong> y cierra el 30 de diciembre de 2026';
    else if (now <= close) {
      var left = Math.ceil((close - now) / day);
      dl.innerHTML = 'Plazo abierto hasta el 30 de diciembre de 2026 · quedan <strong>' + left + (left === 1 ? ' día' : ' días') + '</strong>';
    } else dl.innerHTML = 'El plazo de esta convocatoria ya ha terminado. Escríbenos y te avisamos de la siguiente.';
  }

  // Comprobador de encaje
  var answers = {};
  var result = $('#sv-result');
  function renderResult() {
    var keys = ['ubicacion', 'tipo', 'inicio'];
    var done = keys.every(function (k) { return k in answers; });
    var anyNo = keys.some(function (k) { return answers[k] === 'no'; });
    result.classList.remove('ok', 'ko');
    if (!done && !anyNo) {
      result.innerHTML = '<h3>Responde tres preguntas</h3><p>Te decimos si, a primera vista, tu empresa puede encajar. Es orientativo: la confirmación la hacemos con las bases oficiales.</p>';
      return;
    }
    if (anyNo) {
      result.classList.add('ko');
      result.innerHTML = '<h3>Puede que no encajes tal cual</h3><p>Alguno de los requisitos no se cumple a primera vista, pero a veces hay matices (por ejemplo, la sede de la actividad). Cuéntanos tu caso y lo revisamos contigo.</p><a class="sv-btn" href="#formulario" data-prefill="revisar">Revisar mi caso</a>';
      return;
    }
    result.classList.add('ok');
    result.innerHTML = '<h3>Por lo que cuentas, puedes encajar</h3><p>Falta revisar los detalles con las bases oficiales y definir el proyecto. Lo hacemos juntos en una llamada, sin compromiso.</p><a class="sv-btn" href="#formulario" data-prefill="encaja">Comprobarlo con Telkora</a>';
  }
  document.querySelectorAll('.sv-yn button').forEach(function (b) {
    b.addEventListener('click', function () {
      var grp = b.parentNode, key = grp.getAttribute('data-key');
      grp.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      answers[key] = b.getAttribute('data-v');
      renderResult();
    });
  });
  var elig = $('#f-elig');
  if (result) result.addEventListener('click', function (ev) {
    var a = ev.target.closest('[data-prefill]');
    if (a && elig) elig.value = a.getAttribute('data-prefill') === 'encaja' ? 'Autocomprobación: encaja a primera vista' : 'Autocomprobación: dudas de encaje';
  });

  // Barra fija en móvil: se oculta cuando el formulario está a la vista
  var sticky = $('#sv-sticky'), formWrap = $('#formulario');
  if (sticky && formWrap && 'IntersectionObserver' in window) {
    var hero = $('.sv-hero'), heroGone = false, formSeen = false;
    var upd = function () { sticky.classList.toggle('show', heroGone && !formSeen); };
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; upd(); }).observe(hero);
    new IntersectionObserver(function (es) { formSeen = es[0].isIntersecting; upd(); }, { threshold: 0.15 }).observe(formWrap);
  }

  // Formulario
  var form = $('#sv-form');
  if (!form) return;
  var muni = $('#f-muni'), note = $('#sv-note-out');
  muni.addEventListener('change', function () { note.style.display = muni.value === 'Otro (fuera de Murcia)' ? 'block' : 'none'; });

  var qs = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { var el = $('#f-' + k); if (el && qs.get(k)) el.value = qs.get(k).slice(0, 100); });
  $('#f-origen').value = location.href.split('#')[0].slice(0, 300);

  function setErr(field, msg) {
    var wrap = field.closest('.sv-field'); if (!wrap) return;
    wrap.classList.toggle('err', !!msg);
    var m = wrap.querySelector('.sv-msg'); if (m) m.textContent = msg || '';
  }
  function validate() {
    var ok = true, first = null;
    function bad(el, msg) { setErr(el, msg); ok = false; if (!first) first = el; }
    ['nombre', 'empresa', 'municipio', 'empleados'].forEach(function (n) {
      var el = form.elements[n]; setErr(el, '');
      if (!el.value.trim()) bad(el, 'Campo obligatorio');
    });
    var tel = form.elements.telefono; setErr(tel, '');
    if (!/^(?:\\+34|0034)?[6-9]\\d{8}$/.test(tel.value.replace(/[\\s.-]/g, ''))) bad(tel, 'Introduce un teléfono español de 9 dígitos');
    var em = form.elements.email; setErr(em, '');
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(em.value.trim())) bad(em, 'Introduce un email válido');
    var cons = form.elements.consentimiento; var cm = $('#sv-consent-msg'); cm.textContent = '';
    if (!cons.checked) { cm.textContent = 'Necesitamos tu consentimiento para contactarte'; ok = false; if (!first) first = cons; }
    if (first) first.focus();
    return ok;
  }

  var feedback = $('#sv-feedback'), btn = $('#sv-submit'), btnTxt = $('#sv-btn-txt');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    feedback.style.display = 'none';
    if (!validate()) return;
    btn.disabled = true; btnTxt.textContent = 'Enviando…';
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = k === 'consentimiento' ? true : String(v); });
    data.enviado = new Date().toISOString();
    fetch('/api/lead-subvencion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function () {
        form.style.display = 'none';
        $('#sv-intro-form').style.display = 'none';
        $('#sv-success').style.display = 'block';
        $('#sv-success').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      })
      .catch(function () {
        feedback.textContent = 'No hemos podido enviar tus datos. Inténtalo de nuevo o escríbenos a contacto@telkora.com.';
        feedback.style.display = 'block';
        btn.disabled = false; btnTxt.textContent = 'Comprobar si puedo pedirla';
      });
  });
})();
`;

function renderSubvencion() {
  const url = `${SITE_URL}${PATH}`;
  const title = 'Cheque TIC 2026 Murcia: ayuda de hasta 20.000 € para IA | Telkora';
  const description = 'El Cheque TIC 2026 del INFO ofrece entre 2.000 y 20.000 € a pymes y autónomos de la Región de Murcia para implantar IA y automatización. Plazo: 22 oct – 30 dic. Te ayudamos.';

  const faqHtml = FAQ.map((f) => `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join('');
  const cardsHtml = CARDS.map(([t, d, icon], i) => `
      <div class="sv-card reveal" style="transition-delay:${i * 70}ms"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg><h3>${escapeHtml(t)}</h3><p>${escapeHtml(d)}</p></div>`).join('');
  const stepsHtml = STEPS.map(([t, d], i) => `
      <div class="sv-step reveal" style="transition-delay:${i * 90}ms"><h3>${escapeHtml(t)}</h3><p>${escapeHtml(d)}</p></div>`).join('');
  const muniOptions = MUNICIPIOS.map((m) => `<option>${escapeHtml(m)}</option>`).join('');

  const body = `
<style>${STYLE}</style>
<section class="sv-hero">
  <div class="sv-inner">
    <span class="sv-badge reveal"><span class="sv-dot"></span>Región de Murcia · Cheque TIC 2026</span>
    <h1 class="sv-h1 reveal">Tu empresa puede recibir hasta <span class="sv-amount"><span id="sv-amount">20.000</span> €</span> para implantar IA y automatización</h1>
    <p class="sv-lead reveal">El Instituto de Fomento de la Región de Murcia (INFO) ha abierto una nueva convocatoria del Cheque TIC. Te decimos si tu empresa encaja y, si quieres, nos encargamos de la implantación.</p>
    <div class="sv-cta-row reveal">
      <a class="sv-btn" href="#formulario">Comprobar si mi empresa puede pedirla →</a>
      <a class="sv-btn sv-btn-ghost" href="#que-cubre">Ver qué se puede automatizar</a>
    </div>
    <p class="sv-deadline reveal" id="sv-deadline">Del 22 de octubre al 30 de diciembre de 2026</p>
  </div>
</section>

<div class="sv-facts">
  <div class="sv-fact reveal"><b><span data-count="900000" data-suffix=" €">900.000 €</span></b><span>Dotación de la convocatoria, cofinanciada con fondos FEDER</span></div>
  <div class="sv-fact reveal" style="transition-delay:80ms"><b><span data-count="2000" data-suffix=" €">2.000 €</span> – <span data-count="20000" data-suffix=" €">20.000 €</span></b><span>Por beneficiario, según el servicio y el tamaño de la plantilla</span></div>
  <div class="sv-fact reveal" style="transition-delay:160ms"><b>22 oct → 30 dic</b><span>Plazo de solicitud de 2026, por la sede electrónica del INFO</span></div>
  <div class="sv-fact reveal" style="transition-delay:240ms"><b><span data-count="221">221</span> → <span data-count="96">96</span></b><span>Solicitudes y empresas beneficiarias en la edición anterior: el presupuesto se agotó</span></div>
</div>

<div class="sv-section" id="que-cubre">
  <h2 class="reveal">Qué se puede subvencionar</h2>
  <p class="sv-sub reveal">El Cheque TIC financia servicios tecnológicos contratados a proveedores externos: automatización e inteligencia artificial para optimizar procesos de gestión, inteligencia de negocio, ciberseguridad, sistemas MES y gemelos digitales. Esto es lo que hacemos nosotros:</p>
  <div class="sv-grid">${cardsHtml}
  </div>
</div>

<div class="sv-section" id="encaje">
  <h2 class="reveal">¿Puede pedirla tu empresa?</h2>
  <p class="sv-sub reveal">Tres preguntas rápidas. Es una orientación, no una resolución.</p>
  <div class="sv-check">
    <div>
      <div class="sv-q reveal"><p>¿Tu empresa tiene un centro de trabajo abierto en la Región de Murcia?</p>
        <div class="sv-yn" data-key="ubicacion"><button type="button" class="yes" data-v="si" aria-pressed="false">Sí</button><button type="button" class="no" data-v="no" aria-pressed="false">No</button></div></div>
      <div class="sv-q reveal"><p>¿Eres pyme, autónomo o comunidad de bienes, y no te dedicas a la producción primaria agrícola, pesquera o acuícola?</p>
        <div class="sv-yn" data-key="tipo"><button type="button" class="yes" data-v="si" aria-pressed="false">Sí</button><button type="button" class="no" data-v="no" aria-pressed="false">No</button></div></div>
      <div class="sv-q reveal"><p>¿Aún no has contratado ni empezado el proyecto?</p>
        <div class="sv-yn" data-key="inicio"><button type="button" class="yes" data-v="si" aria-pressed="false">Sí</button><button type="button" class="no" data-v="no" aria-pressed="false">No</button></div>
        <small>En estas ayudas suele exigirse no haber empezado antes de solicitar. Lo confirmamos con las bases.</small></div>
    </div>
    <div class="sv-result reveal" id="sv-result" aria-live="polite"><h3>Responde tres preguntas</h3><p>Te decimos si, a primera vista, tu empresa puede encajar. Es orientativo: la confirmación la hacemos con las bases oficiales.</p></div>
  </div>
</div>

<div class="sv-section" id="como">
  <h2 class="reveal">Cómo trabajamos</h2>
  <p class="sv-sub reveal">Sin humo y con proceso real. Tú decides en cada paso.</p>
  <div class="sv-steps">${stepsHtml}
  </div>
</div>

<div class="sv-section">
  <h2 class="reveal">Requisitos de la convocatoria</h2>
  <ul class="sv-req reveal">
    <li>Pyme, autónomo (persona física o jurídica) o comunidad de bienes, de cualquier sector salvo producción primaria agrícola, pesquera o acuícola.</li>
    <li>Centro de trabajo operativo en la Región de Murcia.</li>
    <li>El servicio lo presta un proveedor externo, no la propia empresa.</li>
    <li>Solicitud dentro del plazo y por la sede electrónica del INFO.</li>
  </ul>
  <p class="sv-sub reveal">¿No sabes si cumples? Déjanos tus datos y lo revisamos contigo. Fuente: extracto de la convocatoria publicado en el BORM nº 243, de 21 de octubre de 2026.</p>
</div>

<div class="sv-section">
  <h2 class="reveal">Proyectos reales de Telkora</h2>
  <p class="sv-sub reveal">Lo que hemos hecho y en lo que estamos trabajando. Sin cifras inventadas.</p>
  <div class="sv-grid">
    <div class="sv-case reveal"><h3>Agencia de marketing de Yecla</h3><p>Informes mensuales de Google Ads generados con IA: el sistema extrae las métricas, redacta el análisis y genera el PDF. En la primera ejecución real se generaron 51 informes sin errores. <a href="/blog/caso-de-exito-goala-informes-ads-ia">Leer el caso completo</a>.</p></div>
    <div class="sv-case reveal" style="transition-delay:80ms"><h3>Tiendas de hogar</h3><p>Asistentes de WhatsApp con IA, ya en fase de pruebas, que responden dudas de catálogo, envíos y devoluciones con el contenido real de cada tienda y pasan a una persona lo delicado.</p></div>
    <div class="sv-case reveal" style="transition-delay:160ms"><h3>Fabricante de colchones</h3><p>En desarrollo: seguimiento de pedidos para el cliente y recomendador de producto sobre el catálogo de la tienda online.</p></div>
  </div>
</div>

<div class="sv-section" id="formulario-top">
  <div class="sv-form-wrap reveal" id="formulario">
    <h2>Comprueba si tu empresa puede pedir la ayuda</h2>
    <p id="sv-intro-form">Te llamamos en menos de 24 h laborables. Sin compromiso.</p>
    <form id="sv-form" novalidate>
      <div class="sv-fields">
        <div class="sv-field"><label for="f-nombre">Nombre y apellidos *</label><input id="f-nombre" name="nombre" type="text" autocomplete="name" maxlength="120" required><span class="sv-msg"></span></div>
        <div class="sv-field"><label for="f-empresa">Empresa *</label><input id="f-empresa" name="empresa" type="text" autocomplete="organization" maxlength="120" required><span class="sv-msg"></span></div>
        <div class="sv-field"><label for="f-tel">Teléfono *</label><input id="f-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" required><span class="sv-msg"></span></div>
        <div class="sv-field"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" autocomplete="email" maxlength="160" required><span class="sv-msg"></span></div>
        <div class="sv-field"><label for="f-muni">Municipio *</label><select id="f-muni" name="municipio" required><option value="">Elige tu municipio</option>${muniOptions}<option>Otro (fuera de Murcia)</option></select><span class="sv-msg"></span></div>
        <div class="sv-field"><label for="f-emp">Nº de empleados *</label><select id="f-emp" name="empleados" required><option value="">Elige un tramo</option><option>Hasta 3</option><option>De 4 a 9</option><option>De 10 a 49</option><option>50 o más</option></select><span class="sv-msg"></span></div>
        <div class="sv-note" id="sv-note-out">Esta ayuda es para empresas de la Región de Murcia, pero podemos ver otras opciones contigo. Puedes enviarlo igualmente.</div>
        <div class="sv-field"><label for="f-sector">Sector</label><input id="f-sector" name="sector" type="text" maxlength="100"></div>
        <div class="sv-field"><label for="f-hora">Mejor hora para llamarte</label><select id="f-hora" name="hora"><option value="">Me da igual</option><option>Mañana</option><option>Mediodía</option><option>Tarde</option></select></div>
        <div class="sv-field full"><label for="f-auto">¿Qué te gustaría automatizar?</label><textarea id="f-auto" name="automatizar" rows="3" maxlength="800" placeholder="Ej.: responder WhatsApp, informes, pedidos…"></textarea></div>
        <div class="sv-field full"><label class="sv-consent"><input type="checkbox" name="consentimiento" required><span>He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener">política de privacidad</a> y que Telkora me contacte para informarme sobre la subvención.</span></label><span class="sv-msg" id="sv-consent-msg"></span></div>
        <div class="sv-hp" aria-hidden="true"><label>No rellenar<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <input type="hidden" name="source" value="landing-subvencion-ia-murcia">
        <input type="hidden" name="encaje" id="f-elig" value="">
        <input type="hidden" name="utm_source" id="f-utm_source"><input type="hidden" name="utm_medium" id="f-utm_medium"><input type="hidden" name="utm_campaign" id="f-utm_campaign">
        <input type="hidden" name="origen" id="f-origen">
      </div>
      <div class="sv-feedback" id="sv-feedback" role="alert"></div>
      <div style="margin-top:1.4rem"><button class="sv-btn" id="sv-submit" type="submit"><span id="sv-btn-txt">Comprobar si puedo pedirla</span></button></div>
    </form>
    <div class="sv-success" id="sv-success" role="status">
      <div class="sv-tick"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
      <h3>¡Recibido!</h3>
      <p>Te llamamos en menos de 24 h laborables.</p>
      <a class="sv-btn" href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}" target="_blank" rel="noopener">Escribirnos por WhatsApp</a>
    </div>
  </div>
</div>

<div class="sv-section">
  <h2 class="reveal">Preguntas frecuentes</h2>
  <div class="sv-faq reveal">${faqHtml}</div>
</div>

<div class="sv-legal">
  <p>Telkora no es un organismo público ni gestiona la concesión de las ayudas. La concesión depende del Instituto de Fomento de la Región de Murcia según las bases de la convocatoria vigente. Las cuantías indicadas son máximas y el importe final depende del proyecto y de la resolución. Información de la convocatoria: <a href="https://www.institutofomentomurcia.es" target="_blank" rel="noopener">web del INFO</a> y <a href="https://sede.institutofomentomurcia.es" target="_blank" rel="noopener">sede electrónica</a>.</p>
</div>
<a id="sv-sticky" href="#formulario">Comprobar si puedo pedirla →</a>
<script>${SCRIPT}</script>`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: title,
      url,
      description,
      inLanguage: 'es-ES',
      dateModified: '2026-10-21',
      about: 'Cheque TIC 2026 del Instituto de Fomento de la Región de Murcia',
      publisher: { '@type': 'Organization', '@id': 'https://telkora.com/#organization', name: 'Telkora' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Implantación de IA y automatización para pymes de la Región de Murcia',
      serviceType: 'Automatización de procesos con inteligencia artificial',
      provider: { '@type': 'Organization', '@id': 'https://telkora.com/#organization', name: 'Telkora' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Región de Murcia' },
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://telkora.com/' },
        { '@type': 'ListItem', position: 2, name: 'Subvención IA en Murcia', item: url },
      ],
    },
  ];

  return renderPage({
    title,
    description,
    canonicalPath: PATH,
    ogType: 'website',
    ogImage: `${SITE_URL}/og-subvencion.png`,
    activePath: '',
    bodyHtml: body,
    jsonLd,
    showParticles: true,
  });
}

module.exports = { renderSubvencion };
