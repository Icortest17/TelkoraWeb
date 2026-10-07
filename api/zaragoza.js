const { renderPage } = require('../lib/layout');

const body = `
<div class="section-wrap">
  <p class="section-eyebrow">Zaragoza</p>
  <h1 class="section-title">Automatización con IA para empresas en Zaragoza</h1>
  <div class="blog-content">
    <p>Telkora automatiza procesos, atención al cliente y captación con IA para empresas de Zaragoza, Cariñena y el resto de España. Primero entendemos tu caso; después diseñamos el sistema.</p>

    <h2>Qué automatizamos</h2>
    <ul>
      <li>Chatbots y asistentes con IA para atender consultas.</li>
      <li>Automatización de WhatsApp: respuestas, reservas y avisos a una persona cuando el caso lo requiere.</li>
      <li>CRM automatizado y seguimiento de leads.</li>
      <li>Email y correo comercial con IA.</li>
      <li>Integraciones entre las herramientas que ya usas (n8n, Make, HubSpot, WhatsApp Business, Stripe y más).</li>
    </ul>

    <h2>Un proyecto en Zaragoza: Indesport Fighting Club</h2>
    <p>Indesport es un club de boxeo y artes marciales de Zaragoza y un proyecto propio de Telkora, no un cliente externo. Es donde probamos estas automatizaciones en real.</p>
    <p>Construimos la web, pensada para aparecer en búsquedas locales, y un asistente con IA que atiende WhatsApp, email y el formulario web, reserva clases de prueba y avisa a una persona cuando el caso lo requiere. El asistente se identifica como IA en el primer mensaje.</p>
    <p><a href="/blog/caso-de-exito-indesport-ia-zaragoza">Leer el proyecto Indesport completo</a>.</p>

    <h2>Cómo trabajamos</h2>
    <ul>
      <li><strong>Diagnóstico gratuito de 30 minutos</strong> por videollamada, para ver qué merece la pena automatizar.</li>
      <li><strong>Plan Starter:</strong> implementación en 7-10 días hábiles.</li>
      <li><strong>Plan Growth:</strong> implementación en 2-4 semanas.</li>
      <li>Mantenimiento mensual sin permanencia, con 30 días de preaviso.</li>
      <li>Cumplimiento del RGPD y aviso de IA incluidos.</li>
    </ul>

    <h2>Otros proyectos</h2>
    <ul>
      <li><a href="/blog/caso-de-exito-goala-informes-ads-ia">Goala (Yecla, Murcia): informes de Google Ads con IA</a></li>
      <li><a href="/blog/caso-de-exito-aureviaai-reformas-ia">AureviaAI: asistente de reformas por Telegram (demostración)</a></li>
    </ul>

    <h2>¿Hablamos?</h2>
    <p>Si tu equipo repite tareas a mano (responder lo mismo, pasar datos de un sitio a otro, hacer informes), cuéntanoslo. <a href="/#agenda">Reserva un diagnóstico gratuito</a> y lo revisamos juntos.</p>
  </div>
</div>`;

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automatización con IA para empresas en Zaragoza',
    serviceType: 'Automatización de procesos con inteligencia artificial',
    provider: { '@type': 'Organization', '@id': 'https://telkora.com/#organization', name: 'Telkora' },
    areaServed: [
      { '@type': 'City', name: 'Zaragoza' },
      { '@type': 'City', name: 'Cariñena' },
      { '@type': 'Country', name: 'España' },
    ],
    url: 'https://telkora.com/automatizacion-ia-zaragoza',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://telkora.com/' },
      { '@type': 'ListItem', position: 2, name: 'Automatización con IA en Zaragoza', item: 'https://telkora.com/automatizacion-ia-zaragoza' },
    ],
  },
];

module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.end(renderPage({
    title: 'Automatización con IA en Zaragoza | Telkora',
    description: 'Chatbots, WhatsApp, CRM e integraciones con IA para empresas de Zaragoza y España. Diagnóstico gratuito de 30 minutos y un proyecto real en Zaragoza.',
    canonicalPath: '/automatizacion-ia-zaragoza',
    ogType: 'website',
    activePath: '',
    bodyHtml: body,
    jsonLd,
  }));
};
