const { handler } = require('../lib/localPage');

module.exports = handler({
  path: '/automatizacion-ia-yecla',
  title: 'Automatización con IA en Yecla (Murcia) | Telkora',
  description: 'Chatbots, WhatsApp, informes e integraciones con IA para empresas de Yecla y la Región de Murcia. Diagnóstico gratuito de 30 minutos y un cliente real en Yecla.',
  breadcrumb: 'Automatización con IA en Yecla',
  eyebrow: 'Yecla y Región de Murcia',
  h1: 'Automatización con IA para empresas en Yecla',
  answer: 'Telkora es una agencia de automatización con IA que trabaja con empresas de Yecla y de la Región de Murcia en remoto: automatizamos informes, atención al cliente por WhatsApp, seguimiento de contactos e integraciones entre herramientas.',
  intro: 'Tenemos un cliente en Yecla, la agencia de marketing Goala, y atendemos a negocios de Yecla, el Altiplano murciano y el resto de la Región de Murcia. El trabajo es por videollamada y los sistemas funcionan en la nube.',
  services: [
    'Informes automáticos con IA a partir de tus datos (publicidad, ventas, operaciones).',
    'Chatbots y asistentes con IA para atender consultas en la web, WhatsApp y email.',
    'Automatización de WhatsApp: respuestas, reservas y aviso a una persona cuando el caso lo requiere.',
    'CRM automatizado y seguimiento de leads.',
    'Integraciones entre las herramientas que ya usas (n8n, Make, Google Sheets, HubSpot, WhatsApp Business y más).',
  ],
  projectsHeading: 'Un cliente en Yecla',
  projects: [{
    title: 'Goala, agencia de marketing de Yecla',
    paragraphs: [
      'Goala gestiona campañas de Google Ads para decenas de clientes finales desde una sola cuenta de administrador. Cada mes preparar un informe por cliente era trabajo manual y repetitivo.',
      'Automatizamos el proceso: el sistema extrae las métricas de cada cuenta, las compara con el mes anterior y con los objetivos de ese cliente, redacta el análisis con IA y genera el PDF. El equipo de Goala revisa los informes antes de enviarlos. En la primera ejecución real se generaron 51 informes sin errores.',
    ],
    href: '/blog/caso-de-exito-goala-informes-ads-ia',
    cta: 'Leer el caso de Goala completo',
  }],
  faq: [
    {
      q: '¿Trabajáis con empresas de Yecla?',
      a: 'Sí. Ya tenemos un cliente en Yecla, Goala, y trabajamos con empresas de toda la Región de Murcia. Todo el proceso se hace por videollamada y los sistemas funcionan en la nube.',
    },
    {
      q: '¿Qué puede automatizar con IA una pyme de Yecla o de la Región de Murcia?',
      a: 'Las tareas que se repiten: informes mensuales, respuestas a las mismas consultas por WhatsApp o email, seguimiento de presupuestos y contactos, o traspaso de datos entre programas. En el diagnóstico gratuito vemos cuáles compensa automatizar.',
    },
    {
      q: '¿Cuánto cuesta automatizar con IA en Yecla?',
      a: 'Depende del alcance, por eso no publicamos una tarifa única. Tras el diagnóstico gratuito te damos un presupuesto cerrado con lo que incluye. Los plazos orientativos son de 7-10 días hábiles en el plan Starter y de 2-4 semanas en el plan Growth.',
    },
    {
      q: '¿Qué pasa con los datos de mi empresa?',
      a: 'Documentamos qué datos trata cada sistema y con qué proveedores, cumplimos el RGPD y los asistentes conversacionales se identifican como IA desde el primer mensaje.',
    },
  ],
  closing: 'Si tu empresa en Yecla o en la Región de Murcia dedica horas a tareas repetitivas, cuéntanoslo.',
  related: [
    { href: '/automatizacion-ia-zaragoza', label: 'Automatización con IA en Zaragoza' },
    { href: '/blog/caso-de-exito-goala-informes-ads-ia', label: 'Caso Goala (Yecla)' },
    { href: '/blog', label: 'Blog de Telkora' },
  ],
  areaServed: [
    { '@type': 'City', name: 'Yecla' },
    { '@type': 'AdministrativeArea', name: 'Región de Murcia' },
    { '@type': 'Country', name: 'España' },
  ],
});
