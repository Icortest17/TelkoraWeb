const { renderPage, escapeHtml, SITE_URL } = require('./layout');

const ORG = { '@type': 'Organization', '@id': 'https://telkora.com/#organization', name: 'Telkora' };
const AREA = [
  { '@type': 'City', name: 'Zaragoza' },
  { '@type': 'City', name: 'Cariñena' },
  { '@type': 'City', name: 'Yecla' },
  { '@type': 'Country', name: 'España' },
];

// Método de presupuesto: se repite en las páginas de servicio y tiene página propia.
const BUDGET_STEPS = [
  ['Diagnóstico gratuito de 30 minutos', 'Por videollamada. Entendemos el proceso, las herramientas que usas y el volumen de trabajo. Si la automatización no compensa, te lo decimos.'],
  ['Alcance por escrito', 'Qué se automatiza, qué queda fuera, qué herramientas se conectan, quién revisa qué y en qué plazo (Starter: 7-10 días hábiles; Growth: 2-4 semanas).'],
  ['Presupuesto cerrado', 'La implementación tiene un importe cerrado para ese alcance, no una tarifa por horas. La propuesta indica su plazo de validez.'],
  ['Pago en dos tramos', 'Lo habitual es un 50 % al inicio y un 50 % a la entrega. También se puede pagar el 100 % al inicio.'],
  ['Costes de terceros, a uso real', 'Modelos de IA, WhatsApp (Meta) y servidores se cobran según el consumo real y sin margen de Telkora.'],
  ['Mantenimiento opcional', 'Cuota mensual si quieres que lo vigilemos y lo ajustemos, con el servidor incluido. Sin permanencia y con 30 días de preaviso.'],
  ['Ampliaciones aparte', 'Si durante el proyecto aparece algo nuevo, se presupuesta antes de hacerlo. No hay sorpresas en la factura.'],
];
const BUDGET_FACTORS = [
  'Cuántos procesos o canales se automatizan (por ejemplo, WhatsApp y email a la vez).',
  'Cuántas herramientas hay que conectar y si tienen una integración estándar o hay que construirla.',
  'Qué volumen de mensajes, contactos o datos se maneja.',
  'Cuántas reglas y excepciones tiene el proceso, y cuándo debe intervenir una persona.',
  'El plazo que necesitas.',
];

const budgetBlock = () => `
    <h2>Cómo presupuestamos</h2>
    <p>Cada proyecto es a medida, así que no publicamos precios sueltos: sería engañoso. Publicamos el método, para que sepas qué esperar antes de hablar con nosotros.</p>
    <ol>${BUDGET_STEPS.map(([t, d]) => `<li><strong>${t}.</strong> ${d}</li>`).join('')}</ol>
    <p><a href="/presupuesto-automatizacion-ia">Ver el método de presupuesto completo</a>.</p>`;

const PAGES = {
  'chatbots-whatsapp-ia': {
    path: '/chatbots-whatsapp-ia',
    title: 'Chatbots y WhatsApp con IA para empresas | Telkora',
    description: 'Asistentes con IA que atienden WhatsApp, web y email, reservan, cualifican contactos y avisan a una persona cuando hace falta. Diagnóstico gratuito.',
    breadcrumb: 'Chatbots y WhatsApp con IA',
    eyebrow: 'Servicio',
    h1: 'Chatbots y automatización de WhatsApp con IA',
    serviceType: 'Chatbots y automatización de WhatsApp con IA',
    answer: 'Un chatbot con IA para WhatsApp responde a tus clientes en el momento, con la información de tu negocio, y pasa la conversación a una persona cuando el caso lo requiere. Telkora lo diseña, lo conecta con tus herramientas y lo deja funcionando.',
    faq: [
      ['¿Qué hace un chatbot de WhatsApp con IA?', 'Atiende consultas frecuentes, recoge los datos de quien escribe, reserva citas o clases, cualifica contactos y guarda cada conversación importante donde tu equipo la vea. Cuando no sabe algo o el cliente lo pide, avisa a una persona.'],
      ['¿El cliente sabe que habla con una IA?', 'Sí. Los asistentes se identifican como IA en el primer mensaje, como exige el Reglamento de IA, y siempre existe la opción de hablar con una persona.'],
      ['¿Puedo seguir contestando yo a mano?', 'Sí. Se puede diseñar para que el asistente se pause cuando una persona del equipo responde a esa conversación.'],
      ['¿Qué canal de WhatsApp se usa?', 'La API oficial de WhatsApp Business, a través de un proveedor. Los costes de Meta y del proveedor se trasladan según el uso real, sin margen de Telkora.'],
      ['¿Cuánto cuesta?', 'Depende del alcance. Está explicado en el método de presupuesto de abajo: diagnóstico gratuito, alcance por escrito y presupuesto cerrado.'],
    ],
    sections: () => `
    <h2>Qué incluye</h2>
    <ul>
      <li>Asistente en WhatsApp, y si lo necesitas en la web y el email, con el tono de tu marca.</li>
      <li>Respuestas basadas en la información real de tu negocio: horarios, servicios, condiciones, catálogo.</li>
      <li>Reservas, citas o recogida de datos de contacto.</li>
      <li>Aviso a una persona del equipo cuando el caso lo requiere.</li>
      <li>Registro de las conversaciones y de los contactos en la herramienta que ya usas.</li>
      <li>Aviso de IA y documentación de datos conforme al RGPD.</li>
    </ul>

    <h2>Cómo lo hacemos</h2>
    <ol>
      <li><strong>Diagnóstico:</strong> qué te preguntan más, qué se te escapa y qué debe resolver siempre una persona.</li>
      <li><strong>Diseño:</strong> escribimos contigo el tono, las respuestas y las reglas de escalado.</li>
      <li><strong>Construcción y pruebas:</strong> lo conectamos a tus herramientas y lo probamos con conversaciones reales.</li>
      <li><strong>Puesta en marcha y ajuste:</strong> revisamos contigo cómo responde y lo mejoramos.</li>
    </ol>

    <h2>Proyectos reales</h2>
    <ul>
      <li><a href="/blog/caso-de-exito-indesport-ia-zaragoza">Indesport Fighting Club (Zaragoza)</a>: asistente que atiende WhatsApp, email y formulario web y reserva clases de prueba. Es un proyecto propio de Telkora.</li>
      <li>El asistente de WhatsApp de la propia Telkora: explica los servicios, hace una pequeña consultoría previa y escala a una persona.</li>
    </ul>`,
    related: [
      { href: '/automatizacion-crm-ia', label: 'CRM automatizado' },
      { href: '/integraciones-n8n', label: 'Integraciones con n8n' },
      { href: '/automatizacion-ia-zaragoza', label: 'IA en Zaragoza' },
      { href: '/automatizacion-ia-yecla', label: 'IA en Yecla' },
    ],
  },

  'automatizacion-crm-ia': {
    path: '/automatizacion-crm-ia',
    title: 'CRM automatizado con IA y seguimiento de leads | Telkora',
    description: 'Que cada contacto llegue a tu CRM, con su estado y su siguiente paso, sin copiar datos a mano. Captura, seguimiento y avisos automáticos con IA.',
    breadcrumb: 'CRM automatizado con IA',
    eyebrow: 'Servicio',
    h1: 'CRM automatizado y seguimiento de leads con IA',
    serviceType: 'Automatización de CRM y seguimiento de leads con IA',
    answer: 'Un CRM automatizado recoge cada contacto, venga de WhatsApp, de un formulario o de un email, lo registra con sus datos y su estado, y activa el siguiente paso: un aviso, un seguimiento o una tarea. Telkora lo conecta con el CRM que ya usas o te ayuda a montar uno.',
    faq: [
      ['¿Tengo que cambiar de CRM?', 'No. Conectamos el que ya usas (por ejemplo HubSpot o una hoja de cálculo) o, si no tienes ninguno, te proponemos una opción sencilla.'],
      ['¿Qué se automatiza exactamente?', 'La entrada de contactos, el registro de sus datos, el cambio de estado, los recordatorios de seguimiento y los avisos al equipo. Las decisiones comerciales las sigue tomando tu equipo.'],
      ['¿La IA envía mensajes a mis contactos por su cuenta?', 'Solo si lo acordamos en el alcance. Para el correo comercial recomendamos que una persona apruebe los textos y que el envío tenga ritmo y topes razonables.'],
      ['¿Y la protección de datos?', 'Documentamos qué datos se guardan, dónde y con qué proveedores, y cumplimos el RGPD.'],
      ['¿Cuánto cuesta?', 'Depende del alcance. Está explicado en el método de presupuesto de abajo.'],
    ],
    sections: () => `
    <h2>Qué incluye</h2>
    <ul>
      <li>Captura automática de contactos desde formularios, WhatsApp y email.</li>
      <li>Ficha de cada contacto con sus datos y el resumen de la conversación.</li>
      <li>Estados del embudo que se actualizan solos según lo que ocurre.</li>
      <li>Recordatorios y avisos al equipo cuando un contacto necesita atención.</li>
      <li>Seguimientos por email preparados con IA y aprobados por una persona.</li>
      <li>Un panel sencillo para ver cuántos contactos entran y en qué punto están.</li>
    </ul>

    <h2>Cómo lo hacemos</h2>
    <ol>
      <li><strong>Mapa del proceso comercial:</strong> de dónde llegan los contactos y qué pasa con cada uno hoy.</li>
      <li><strong>Diseño del embudo:</strong> estados, reglas y quién avisa a quién.</li>
      <li><strong>Conexión de herramientas:</strong> formularios, mensajería, correo y CRM.</li>
      <li><strong>Pruebas y ajuste:</strong> con contactos reales antes de dejarlo en marcha.</li>
    </ol>

    <h2>Proyecto real</h2>
    <p>El asistente de WhatsApp de la propia Telkora guarda cada contacto cualificado en el CRM interno de la agencia, para que llegue a la llamada con el contexto ya recogido.</p>`,
    related: [
      { href: '/chatbots-whatsapp-ia', label: 'Chatbots y WhatsApp con IA' },
      { href: '/integraciones-n8n', label: 'Integraciones con n8n' },
      { href: '/automatizacion-ia-zaragoza', label: 'IA en Zaragoza' },
      { href: '/automatizacion-ia-yecla', label: 'IA en Yecla' },
    ],
  },

  'integraciones-n8n': {
    path: '/integraciones-n8n',
    title: 'Integraciones y automatización con n8n | Telkora',
    description: 'Conectamos tus herramientas y automatizamos informes, avisos y tareas repetitivas con n8n e IA. Un proyecto real con una agencia de Yecla.',
    breadcrumb: 'Integraciones con n8n',
    eyebrow: 'Servicio',
    h1: 'Integraciones y automatización de procesos con n8n',
    serviceType: 'Integraciones y automatización de procesos con n8n e IA',
    answer: 'n8n es una herramienta para conectar aplicaciones y automatizar tareas sin copiar datos a mano. Telkora construye flujos a medida con n8n e IA: informes automáticos, avisos, traspaso de datos entre programas y procesos que hoy haces a mano.',
    faq: [
      ['¿Qué es n8n?', 'Es una plataforma de automatización que conecta aplicaciones entre sí (correo, hojas de cálculo, CRM, mensajería, tienda online) y ejecuta flujos cuando ocurre algo o a una hora fija.'],
      ['¿En qué se diferencia de Zapier o Make?', 'Hace un trabajo parecido. n8n permite alojarlo en un servidor propio y construir lógica más compleja, y Telkora lo usa como base de sus proyectos. Si ya tienes Make o Zapier, también podemos trabajar con ellos.'],
      ['¿Qué tareas se pueden automatizar?', 'Informes periódicos, avisos, actualización de hojas de cálculo y CRM, procesamiento de formularios, clasificación de correos y cualquier paso repetitivo entre dos herramientas. En el diagnóstico vemos cuáles compensan.'],
      ['¿Dónde se guardan mis datos?', 'Depende del diseño. Documentamos qué datos pasan por cada herramienta y con qué proveedores, y cumplimos el RGPD.'],
      ['¿Cuánto cuesta?', 'Depende del alcance. Está explicado en el método de presupuesto de abajo.'],
    ],
    sections: () => `
    <h2>Qué incluye</h2>
    <ul>
      <li>Flujos de n8n a medida, con control de errores y avisos si algo falla.</li>
      <li>Conexión de las herramientas que ya usas (Google Workspace, HubSpot, WhatsApp Business, Stripe, Shopify, WooCommerce y más).</li>
      <li>Pasos con IA cuando aportan algo: resumir, clasificar, redactar o analizar.</li>
      <li>Documentación del flujo para que no dependa de una sola persona.</li>
      <li>Mantenimiento opcional para vigilarlo y ajustarlo.</li>
    </ul>

    <h2>Cómo lo hacemos</h2>
    <ol>
      <li><strong>Mapa del proceso:</strong> qué haces hoy, con qué herramientas y cuánto tiempo te lleva.</li>
      <li><strong>Diseño del flujo:</strong> qué se automatiza y dónde sigue interviniendo una persona.</li>
      <li><strong>Construcción y pruebas</strong> con datos reales.</li>
      <li><strong>Puesta en marcha</strong> y seguimiento de las primeras ejecuciones.</li>
    </ol>

    <h2>Proyecto real</h2>
    <p><a href="/blog/caso-de-exito-goala-informes-ads-ia">Goala, agencia de marketing de Yecla</a>: informes mensuales de Google Ads por cliente, con análisis redactado por IA y PDF automático. El equipo de Goala los revisa antes de enviarlos. En la primera ejecución real se generaron 51 informes sin errores.</p>`,
    related: [
      { href: '/chatbots-whatsapp-ia', label: 'Chatbots y WhatsApp con IA' },
      { href: '/automatizacion-crm-ia', label: 'CRM automatizado' },
      { href: '/automatizacion-ia-yecla', label: 'IA en Yecla' },
      { href: '/automatizacion-ia-zaragoza', label: 'IA en Zaragoza' },
    ],
  },
};

// Página propia con el método de presupuesto (sin importes).
const BUDGET_PAGE = {
  path: '/presupuesto-automatizacion-ia',
  title: 'Cómo presupuestamos la automatización con IA | Telkora',
  description: 'Método de presupuesto de Telkora: diagnóstico gratuito, alcance por escrito, importe cerrado y costes de terceros sin margen. Sin tarifas genéricas.',
  breadcrumb: 'Cómo presupuestamos',
  eyebrow: 'Presupuesto',
  h1: 'Cuánto cuesta automatizar con IA: cómo presupuestamos',
  answer: 'El coste de automatizar con IA depende del alcance de cada proyecto, por eso Telkora no publica una tarifa única. Tras un diagnóstico gratuito de 30 minutos recibes un presupuesto cerrado y por escrito con lo que incluye, el plazo y la forma de pago.',
  faq: [
    ['¿Por qué no publicáis precios?', 'Porque cada proyecto es a medida y el mismo servicio puede ser muy distinto según canales, herramientas y volumen. Una cifra suelta podría confundirte. Preferimos explicarte el método y darte un importe cerrado para tu caso.'],
    ['¿Es gratis el diagnóstico?', 'Sí. Son 30 minutos por videollamada, sin compromiso. Si la automatización no compensa, te lo decimos.'],
    ['¿Pagaré más de lo presupuestado?', 'El importe de la implementación es cerrado para el alcance acordado. Lo que varía es el consumo de terceros (IA, WhatsApp, servidor), que se cobra a uso real y sin margen de Telkora, y las ampliaciones, que se presupuestan antes de hacerlas.'],
    ['¿Hay permanencia?', 'No. El mantenimiento mensual es opcional, sin permanencia y con 30 días de preaviso.'],
    ['¿Cuánto tarda un proyecto?', 'Orientativamente, 7-10 días hábiles en el plan Starter y 2-4 semanas en el plan Growth.'],
  ],
  sections: () => `
    <h2>El método, paso a paso</h2>
    <ol>${BUDGET_STEPS.map(([t, d]) => `<li><strong>${t}.</strong> ${d}</li>`).join('')}</ol>

    <h2>Qué hace que un proyecto cueste más o menos</h2>
    <ul>${BUDGET_FACTORS.map((f) => `<li>${f}</li>`).join('')}</ul>

    <h2>Qué recibes con el presupuesto</h2>
    <ul>
      <li>El alcance escrito: qué se automatiza y qué no.</li>
      <li>El plazo de entrega y el plan (Starter o Growth).</li>
      <li>El importe de la implementación y el calendario de pagos.</li>
      <li>Una estimación de los costes de terceros según tu volumen.</li>
      <li>La cuota del mantenimiento, si lo quieres.</li>
    </ul>`,
  related: [
    { href: '/chatbots-whatsapp-ia', label: 'Chatbots y WhatsApp con IA' },
    { href: '/automatizacion-crm-ia', label: 'CRM automatizado' },
    { href: '/integraciones-n8n', label: 'Integraciones con n8n' },
  ],
  noBudgetBlock: true,
};

const ABOUT_PAGE = {
  path: '/sobre-telkora',
  title: 'Sobre Telkora: quién está detrás | Telkora',
  description: 'Telkora es una agencia de automatización con IA fundada por Isaac Cortes Tello, con base en Cariñena (Zaragoza) y clientes en Aragón, Murcia y toda España.',
  breadcrumb: 'Sobre Telkora',
  eyebrow: 'Sobre Telkora',
  h1: 'Sobre Telkora',
  answer: 'Telkora es una agencia de automatización con IA fundada por Isaac Cortes Tello, con base en Cariñena (Zaragoza). Construimos sistemas a medida para pymes: chatbots, WhatsApp, CRM e integraciones, y los dejamos funcionando.',
  faq: [
    ['¿Quién está detrás de Telkora?', 'Isaac Cortes Tello, fundador, que trabaja como empresario individual (autónomo) bajo el nombre comercial Telkora. Es quien diseña y construye los proyectos.'],
    ['¿Dónde está Telkora?', 'La base está en Cariñena (Zaragoza). Trabajamos con empresas de Zaragoza y Aragón, de Yecla y la Región de Murcia y de toda España, por videollamada.'],
    ['¿Con quién habéis trabajado?', 'Con Goala, una agencia de marketing de Yecla, en sus informes de Google Ads. También construimos y operamos proyectos propios, como el asistente de Indesport Fighting Club en Zaragoza, y una demostración con AureviaAI.'],
    ['¿Usáis IA para escribir el contenido de la web?', 'En parte. El blog lleva un aviso visible cuando un texto se ha redactado con ayuda de IA, y los datos de las noticias se contrastan con su fuente antes de publicarse.'],
  ],
  sections: () => `
    <h2>Quién está detrás</h2>
    <p><strong>Isaac Cortes Tello</strong> es el fundador de Telkora. Diseña y construye los sistemas con n8n, modelos de IA y las herramientas que cada negocio ya usa, y es el interlocutor de cada proyecto. Trabaja como empresario individual (autónomo) bajo el nombre comercial Telkora; sus datos completos figuran en el <a href="/aviso-legal">aviso legal</a>.</p>

    <h2>Qué hacemos</h2>
    <p>Ayudamos a pymes a quitarse tareas repetitivas y a no perder contactos por tardar en responder. Los servicios principales son <a href="/chatbots-whatsapp-ia">chatbots y WhatsApp con IA</a>, <a href="/automatizacion-crm-ia">CRM automatizado</a> e <a href="/integraciones-n8n">integraciones con n8n</a>.</p>

    <h2>Proyectos</h2>
    <ul>
      <li><a href="/blog/caso-de-exito-goala-informes-ads-ia">Goala (Yecla)</a>: informes de Google Ads con IA. Cliente.</li>
      <li><a href="/blog/caso-de-exito-indesport-ia-zaragoza">Indesport Fighting Club (Zaragoza)</a>: web y asistente con IA. Proyecto propio.</li>
      <li><a href="/blog/caso-de-exito-aureviaai-reformas-ia">AureviaAI</a>: asistente de reformas. Demostración.</li>
    </ul>

    <h2>Cómo trabajamos</h2>
    <ul>
      <li><strong>Transparencia:</strong> sin letra pequeña. Decimos qué incluye cada proyecto y qué no, y publicamos el <a href="/presupuesto-automatizacion-ia">método de presupuesto</a>.</li>
      <li><strong>Soluciones a medida:</strong> no vendemos software genérico; cada sistema se diseña para ese negocio.</li>
      <li><strong>Trato cercano:</strong> hablas siempre con la persona que construye tu sistema.</li>
      <li><strong>Que funcione:</strong> no se trata de instalar herramientas, sino de que se usen. Revisamos y ajustamos después de la puesta en marcha.</li>
      <li><strong>IA con transparencia:</strong> los asistentes se identifican como IA y cumplimos el RGPD.</li>
    </ul>

    <h2>Dónde trabajamos</h2>
    <p>Base en Cariñena (Zaragoza). Atendemos empresas de <a href="/automatizacion-ia-zaragoza">Zaragoza y Aragón</a>, de <a href="/automatizacion-ia-yecla">Yecla y la Región de Murcia</a> y de toda España.</p>`,
  related: [
    { href: '/presupuesto-automatizacion-ia', label: 'Cómo presupuestamos' },
    { href: '/blog', label: 'Blog de Telkora' },
  ],
  noBudgetBlock: true,
  isAbout: true,
};

function render(cfg) {
  const url = `${SITE_URL}${cfg.path}`;
  const faqHtml = cfg.faq.map(([q, a]) => `
    <h3>${escapeHtml(q)}</h3>
    <p>${a}</p>`).join('');

  const body = `
<div class="section-wrap">
  <p class="section-eyebrow">${escapeHtml(cfg.eyebrow)}</p>
  <h1 class="section-title">${escapeHtml(cfg.h1)}</h1>
  <div class="blog-content">
    <p><strong>${cfg.answer}</strong></p>
    ${cfg.sections()}
    ${cfg.noBudgetBlock ? '' : budgetBlock()}

    <h2>Preguntas frecuentes</h2>${faqHtml}

    <h2>¿Hablamos?</h2>
    <p><a href="/#agenda">Reserva un diagnóstico gratuito</a> de 30 minutos o escríbenos a <a href="mailto:contacto@telkora.com">contacto@telkora.com</a>.</p>

    <h2>Más información</h2>
    <p>${cfg.related.map((r) => `<a href="${r.href}">${r.label}</a>`).join(' · ')}</p>
  </div>
</div>`;

  const jsonLd = [];
  if (cfg.isAbout) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${url}#page`,
      url,
      name: cfg.h1,
      about: { '@id': 'https://telkora.com/#organization' },
    });
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://telkora.com/#isaac',
      name: 'Isaac Cortes Tello',
      jobTitle: 'Fundador',
      worksFor: { '@id': 'https://telkora.com/#organization' },
      url,
    });
  } else if (cfg.serviceType) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: cfg.h1,
      serviceType: cfg.serviceType,
      provider: ORG,
      areaServed: AREA,
      url,
      description: cfg.description,
    });
  }
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
    })),
  });
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://telkora.com/' },
      { '@type': 'ListItem', position: 2, name: cfg.breadcrumb, item: url },
    ],
  });

  return renderPage({
    title: cfg.title,
    description: cfg.description,
    canonicalPath: cfg.path,
    ogType: 'website',
    activePath: '',
    bodyHtml: body,
    jsonLd,
  });
}

const ALL = { ...PAGES, 'presupuesto-automatizacion-ia': BUDGET_PAGE, 'sobre-telkora': ABOUT_PAGE };

module.exports = { render, ALL };
