const { handler } = require('../lib/localPage');

module.exports = handler({
  path: '/automatizacion-ia-zaragoza',
  title: 'Automatización con IA en Zaragoza | Telkora',
  description: 'Chatbots, WhatsApp, CRM e integraciones con IA para empresas de Zaragoza y Aragón. Diagnóstico gratuito de 30 minutos y un proyecto real en Zaragoza.',
  breadcrumb: 'Automatización con IA en Zaragoza',
  eyebrow: 'Zaragoza y Aragón',
  h1: 'Automatización con IA para empresas en Zaragoza',
  answer: 'Telkora es una agencia de automatización con IA con base en Aragón que ayuda a empresas de Zaragoza a atender clientes, captar contactos y quitarse tareas repetitivas con chatbots, WhatsApp, CRM e integraciones a medida.',
  intro: 'Trabajamos con pymes y autónomos de Zaragoza, Cariñena y el resto de Aragón, y con empresas de toda España. Primero entendemos tu caso; después diseñamos el sistema y lo dejamos funcionando.',
  services: [
    'Chatbots y asistentes con IA para atender consultas en la web, WhatsApp y email.',
    'Automatización de WhatsApp: respuestas, reservas y aviso a una persona cuando el caso lo requiere.',
    'CRM automatizado y seguimiento de leads.',
    'Correo comercial y seguimientos con IA.',
    'Integraciones entre las herramientas que ya usas (n8n, Make, HubSpot, WhatsApp Business, Stripe y más).',
  ],
  projectsHeading: 'Un proyecto en Zaragoza',
  projects: [{
    title: 'Indesport Fighting Club',
    paragraphs: [
      'Indesport es un club de boxeo y artes marciales de Zaragoza y un proyecto propio de Telkora, no un cliente externo. Es donde probamos estas automatizaciones en real.',
      'Construimos la web, pensada para aparecer en búsquedas locales, y un asistente con IA que atiende WhatsApp, email y el formulario web, reserva clases de prueba y avisa a una persona cuando el caso lo requiere. El asistente se identifica como IA en el primer mensaje.',
    ],
    href: '/blog/caso-de-exito-indesport-ia-zaragoza',
    cta: 'Leer el proyecto Indesport completo',
  }],
  faq: [
    {
      q: '¿Qué puede automatizar una empresa de Zaragoza con IA?',
      a: 'Lo que se repite a diario: responder las mismas preguntas por WhatsApp o email, pasar datos de un programa a otro, hacer seguimiento de contactos o generar informes. En el diagnóstico gratuito identificamos qué tareas compensa automatizar y cuáles no.',
    },
    {
      q: '¿Cuánto cuesta automatizar con IA en Zaragoza?',
      a: 'Depende del alcance, por eso no publicamos una tarifa única. Tras el diagnóstico gratuito te damos un presupuesto cerrado con lo que incluye (<a href="/presupuesto-automatizacion-ia">así presupuestamos</a>). Los plazos orientativos son de 7-10 días hábiles en el plan Starter y de 2-4 semanas en el plan Growth.',
    },
    {
      q: '¿Trabajáis con empresas de Zaragoza si no estamos en la misma ciudad?',
      a: 'Sí. El diagnóstico y el seguimiento son por videollamada, y los sistemas funcionan en la nube, así que no hace falta que coincidamos en el mismo sitio.',
    },
    {
      q: '¿Cumple el RGPD y el aviso de IA?',
      a: 'Sí. Los asistentes se identifican como IA en el primer mensaje, documentamos qué datos se tratan y con qué proveedores, y mantenemos la política de privacidad al día.',
    },
  ],
  closing: 'Si tu equipo en Zaragoza repite tareas a mano (responder lo mismo, pasar datos de un sitio a otro, hacer informes), cuéntanoslo.',
  related: [
    { href: '/automatizacion-ia-yecla', label: 'Automatización con IA en Yecla' },
    { href: '/blog/caso-de-exito-indesport-ia-zaragoza', label: 'Proyecto Indesport (Zaragoza)' },
    { href: '/chatbots-whatsapp-ia', label: 'Chatbots y WhatsApp con IA' },
    { href: '/sobre-telkora', label: 'Sobre Telkora' },
    { href: '/blog', label: 'Blog de Telkora' },
  ],
  areaServed: [
    { '@type': 'City', name: 'Zaragoza' },
    { '@type': 'City', name: 'Cariñena' },
    { '@type': 'AdministrativeArea', name: 'Aragón' },
    { '@type': 'Country', name: 'España' },
  ],
});
