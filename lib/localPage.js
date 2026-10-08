const { renderPage, escapeHtml, SITE_URL } = require('./layout');

// Plantilla de página local (ciudad). Cada ciudad aporta su contenido en `cfg`.
function renderLocal(cfg) {
  const url = `${SITE_URL}${cfg.path}`;
  const faqHtml = cfg.faq.map((f) => `
    <h3>${escapeHtml(f.q)}</h3>
    <p>${f.a}</p>`).join('');
  const projectHtml = cfg.projects.map((p) => `
    <h3>${p.title}</h3>
    ${p.paragraphs.map((t) => `<p>${t}</p>`).join('')}
    <p><a href="${p.href}">${p.cta}</a>.</p>`).join('');

  const body = `
<div class="section-wrap">
  <p class="section-eyebrow">${escapeHtml(cfg.eyebrow)}</p>
  <h1 class="section-title">${escapeHtml(cfg.h1)}</h1>
  <div class="blog-content">
    <p><strong>${cfg.answer}</strong></p>
    <p>${cfg.intro}</p>

    <h2>Qué automatizamos</h2>
    <ul>
      ${cfg.services.map((s) => `<li>${s}</li>`).join('\n      ')}
    </ul>

    <h2>${cfg.projectsHeading}</h2>
    ${projectHtml}

    <h2>Cómo trabajamos</h2>
    <ul>
      <li><strong>Diagnóstico gratuito de 30 minutos</strong> por videollamada, para ver qué merece la pena automatizar y qué no.</li>
      <li><strong>Plan Starter:</strong> implementación en 7-10 días hábiles.</li>
      <li><strong>Plan Growth:</strong> implementación en 2-4 semanas.</li>
      <li>Mantenimiento mensual opcional, sin permanencia y con 30 días de preaviso.</li>
      <li>Cumplimiento del RGPD y aviso de IA incluidos en cada asistente.</li>
    </ul>

    <h2>Preguntas frecuentes</h2>${faqHtml}

    <h2>¿Hablamos?</h2>
    <p>${cfg.closing} <a href="/#agenda">Reserva un diagnóstico gratuito</a> o escríbenos a <a href="mailto:contacto@telkora.com">contacto@telkora.com</a>.</p>

    <h2>Más información</h2>
    <p>${cfg.related.map((r) => `<a href="${r.href}">${r.label}</a>`).join(' · ')}</p>
  </div>
</div>`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: cfg.h1,
      serviceType: 'Automatización de procesos con inteligencia artificial',
      provider: { '@type': 'Organization', '@id': 'https://telkora.com/#organization', name: 'Telkora' },
      areaServed: cfg.areaServed,
      url,
      description: cfg.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: cfg.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://telkora.com/' },
        { '@type': 'ListItem', position: 2, name: cfg.breadcrumb, item: url },
      ],
    },
  ];

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

function handler(cfg) {
  return (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.end(renderLocal(cfg));
  };
}

module.exports = { renderLocal, handler };
