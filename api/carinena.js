const { handler } = require('../lib/localPage');

module.exports = handler({
  path: '/automatizacion-ia-carinena',
  title: 'Automatización con IA en Cariñena | Telkora',
  description: 'Chatbots, WhatsApp, informes e integraciones con IA para empresas de Cariñena y el Campo de Cariñena. Domicilio fiscal en Cariñena. Diagnóstico gratuito.',
  breadcrumb: 'Automatización con IA en Cariñena',
  eyebrow: 'Cariñena y Campo de Cariñena',
  h1: 'Automatización con IA para empresas en Cariñena',
  answer: 'Telkora es una agencia de automatización con IA con domicilio fiscal en Cariñena y base de trabajo en Zaragoza. Ayudamos a pymes y autónomos de Cariñena y del Campo de Cariñena a atender clientes, gestionar reservas y quitarse tareas repetitivas con WhatsApp, informes e integraciones a medida.',
  intro: 'Nuestro domicilio fiscal está en Cariñena, aunque trabajamos desde Zaragoza y no recibimos clientes en una oficina: el diagnóstico y el seguimiento son por videollamada y los sistemas funcionan en la nube, así que da igual dónde esté tu negocio.',
  services: [
    'Asistentes de WhatsApp con IA para responder consultas, reservas y pedidos a cualquier hora, y avisar a una persona cuando hace falta.',
    'Gestión de reservas y citas: visitas, catas, alojamientos, clases o servicios, sin atender el teléfono a todas horas.',
    'Informes automáticos con IA a partir de tus datos de ventas, publicidad u operaciones.',
    'Seguimiento de contactos y CRM automatizado.',
    'Integraciones entre las herramientas que ya usas (hojas de cálculo, WhatsApp Business, tienda online, calendario).',
  ],
  projectsHeading: 'Qué podría automatizar un negocio de la zona',
  projects: [
    {
      title: 'Ejemplos de uso (no son clientes)',
      paragraphs: [
        'El Campo de Cariñena es una comarca vinícola con bodegas, enotecas, alojamientos rurales, comercios y empresas agrícolas. Son ejemplos de lo que se suele poder automatizar en este tipo de negocios; no son proyectos que hayamos hecho allí.',
        'Una bodega o un alojamiento puede responder por WhatsApp a las mismas preguntas (horarios, precios, disponibilidad de visitas y catas) y recoger la reserva. Un comercio puede recibir los pedidos y las consultas ordenadas en una hoja o un CRM. Una pyme con varios clientes puede recibir sus informes mensuales sin prepararlos a mano.',
      ],
      href: '/chatbots-whatsapp-ia',
      cta: 'Ver cómo funcionan los asistentes de WhatsApp con IA',
    },
    {
      title: 'Proyectos reales de Telkora',
      paragraphs: [
        'No tenemos todavía un cliente en Cariñena. Sí tenemos proyectos reales cerca: el asistente con IA de Indesport, un club de Zaragoza y proyecto propio de Telkora que atiende WhatsApp, email y web, y los informes automáticos de Google Ads de Goala, una agencia de Yecla.',
      ],
      href: '/blog/caso-de-exito-indesport-ia-zaragoza',
      cta: 'Leer el proyecto Indesport',
    },
  ],
  faq: [
    {
      q: '¿Trabajáis con empresas de Cariñena?',
      a: 'Sí. Nuestro domicilio fiscal está en Cariñena y atendemos negocios del Campo de Cariñena. Todo el proceso se hace por videollamada y los sistemas funcionan en la nube.',
    },
    {
      q: '¿Tenéis oficina en Cariñena?',
      a: 'No. El domicilio fiscal está en Cariñena y nuestra base de trabajo, en Zaragoza, donde no recibimos clientes. El diagnóstico y el seguimiento son siempre por videollamada.',
    },
    {
      q: '¿Qué puede automatizar con IA una bodega, un alojamiento o un comercio?',
      a: 'Lo que se repite a diario: responder las mismas preguntas por WhatsApp, recoger reservas y pedidos, hacer seguimiento de contactos o generar informes. En el diagnóstico gratuito identificamos qué compensa automatizar y qué no.',
    },
    {
      q: '¿Cuánto cuesta automatizar con IA en Cariñena?',
      a: 'Depende del alcance; los proyectos más pequeños parten de 1.500 € + IVA. Tras el diagnóstico gratuito te damos un presupuesto cerrado con lo que incluye (<a href="/presupuesto-automatizacion-ia">así presupuestamos</a>).',
    },
    {
      q: '¿Cumple el RGPD y el aviso de IA?',
      a: 'Sí. Los asistentes se identifican como IA en el primer mensaje, documentamos qué datos se tratan y con qué proveedores, y mantenemos la política de privacidad al día.',
    },
  ],
  closing: 'Si tu negocio en Cariñena o en el Campo de Cariñena dedica horas a responder lo mismo o a pasar datos a mano, cuéntanoslo.',
  related: [
    { href: '/automatizacion-ia-zaragoza', label: 'Automatización con IA en Zaragoza' },
    { href: '/automatizacion-ia-yecla', label: 'Automatización con IA en Yecla' },
    { href: '/chatbots-whatsapp-ia', label: 'Chatbots y WhatsApp con IA' },
    { href: '/informes-automaticos-ia', label: 'Informes automáticos con IA' },
    { href: '/sobre-telkora', label: 'Sobre Telkora' },
  ],
  areaServed: [
    { '@type': 'City', name: 'Cariñena' },
    { '@type': 'AdministrativeArea', name: 'Campo de Cariñena' },
    { '@type': 'AdministrativeArea', name: 'Aragón' },
    { '@type': 'Country', name: 'España' },
  ],
});
