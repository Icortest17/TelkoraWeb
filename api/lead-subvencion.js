// Recibe los leads de /subvencion-ia-murcia y los entrega a Isaac por correo.
// Orden de entrega (la primera variable configurada gana):
//   1) N8N_LEAD_WEBHOOK_URL (+ N8N_LEAD_WEBHOOK_SECRET) → flujo de n8n que envía el correo
//   2) RESEND_API_KEY (+ LEAD_FROM_EMAIL) → correo directo con Resend
//   3) Formspree (mismo formulario que usa la home) → correo a la cuenta de Formspree
// Nunca se escriben datos personales en los logs.

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'isaac.cortes@telkora.com';
const FORMSPREE_URL = 'https://formspree.io/f/xeevbraw';
const WA_NUMBER = '34614206021';

const MUNICIPIO_MAX = 60;
const hits = new Map(); // ip -> timestamps (limitador por instancia: freno básico, no infalible)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) { hits.set(ip, list); return true; }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

const EMPLEADOS_MAX = {
  'Hasta 3': 'Hasta 3 empleados',
  'De 4 a 9': 'De 4 a 9 empleados',
  'De 10 a 49': 'De 10 a 49 empleados',
  '50 o más': '50 o más empleados',
};

function originAllowed(req) {
  const o = req.headers.origin;
  if (!o) return true;
  try {
    const h = new URL(o).hostname;
    return h === 'telkora.com' || h === 'www.telkora.com' || h === 'localhost' || h === '127.0.0.1' || h.endsWith('.vercel.app');
  } catch { return false; }
}

function validate(b) {
  const lead = {
    nombre: clean(b.nombre, 120),
    empresa: clean(b.empresa, 120),
    telefono: clean(b.telefono, 20),
    email: clean(b.email, 160).toLowerCase(),
    municipio: clean(b.municipio, MUNICIPIO_MAX),
    empleados: clean(b.empleados, 30),
    sector: clean(b.sector, 100),
    automatizar: clean(b.automatizar, 800),
    hora: clean(b.hora, 20),
    encaje: clean(b.encaje, 80),
    utm_source: clean(b.utm_source, 100),
    utm_medium: clean(b.utm_medium, 100),
    utm_campaign: clean(b.utm_campaign, 100),
    origen: clean(b.origen, 300),
    source: 'landing-subvencion-ia-murcia',
    recibido: new Date().toISOString(),
  };
  const errors = [];
  if (!lead.nombre) errors.push('nombre');
  if (!lead.empresa) errors.push('empresa');
  if (!/^(?:\+34|0034)?[6-9]\d{8}$/.test(lead.telefono.replace(/[\s.-]/g, ''))) errors.push('telefono');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.push('email');
  if (!lead.municipio) errors.push('municipio');
  if (!EMPLEADOS_MAX[lead.empleados]) errors.push('empleados');
  if (b.consentimiento !== true) errors.push('consentimiento');
  return { lead, errors };
}

function buildEmail(l) {
  const digits = l.telefono.replace(/[^\d]/g, '').replace(/^0034/, '').replace(/^34(?=\d{9}$)/, '');
  const wa = `https://wa.me/34${digits}`;
  const subject = `🟢 Nuevo lead subvención IA — ${l.empresa} (${l.municipio}, ${l.empleados})`;
  const rows = [
    ['Nombre', l.nombre], ['Empresa', l.empresa], ['Email', l.email], ['Teléfono', l.telefono],
    ['Municipio', l.municipio], ['Empleados', l.empleados], ['Sector', l.sector || '—'],
    ['Quiere automatizar', l.automatizar || '—'], ['Mejor hora', l.hora || 'Indiferente'],
    ['Autocomprobación', l.encaje || '—'], ['Fecha/hora (ISO)', l.recibido],
    ['UTM', [l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(' / ') || '—'],
    ['URL de origen', l.origen || '—'],
  ];
  const text = `Nuevo lead de la landing de subvención IA (Cheque TIC 2026)\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nAbrir WhatsApp: ${wa}\nLlamar: tel:${l.telefono}\n`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="color:#1e3624;margin:0 0 12px">Nuevo lead · Subvención IA (Cheque TIC 2026)</h2>
<table style="border-collapse:collapse;width:100%;font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #e3e8e3;color:#555;width:160px">${esc(k)}</td><td style="padding:6px 10px;border-bottom:1px solid #e3e8e3"><strong>${esc(v)}</strong></td></tr>`).join('')}</table>
<p style="margin:18px 0"><a href="tel:${esc(l.telefono)}" style="background:#1e3624;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;margin-right:8px">Llamar</a><a href="${esc(wa)}" style="background:#25d366;color:#000;padding:10px 16px;border-radius:6px;text-decoration:none">Abrir WhatsApp</a></p></div>`;
  return { subject, text, html };
}

async function deliver(lead) {
  const mail = buildEmail(lead);

  if (process.env.N8N_LEAD_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.N8N_LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': process.env.N8N_LEAD_WEBHOOK_SECRET || '' },
        body: JSON.stringify({ to: TO_EMAIL, replyTo: lead.email, ...mail, lead }),
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) throw new Error(`n8n ${r.status}`);
      return 'n8n';
    } catch (e) {
      // Si n8n falla, el lead no se pierde: sigue por Resend/Formspree
      console.error(`lead-subvencion n8n fallo: ${e.message}`);
    }
  }

  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || 'Telkora Web <web@telkora.com>',
        to: [TO_EMAIL],
        reply_to: lead.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      }),
    });
    if (!r.ok) throw new Error(`resend ${r.status}`);
    return 'resend';
  }

  const r = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: 'https://telkora.com', Referer: 'https://telkora.com/subvencion-ia-murcia' },
    body: JSON.stringify({
      _subject: mail.subject,
      _replyto: lead.email,
      name: lead.nombre,
      email: lead.email,
      message: mail.text,
      telefono: lead.telefono,
      empresa: lead.empresa,
      municipio: lead.municipio,
      empleados: lead.empleados,
    }),
  });
  if (!r.ok) throw new Error(`formspree ${r.status}`);
  return 'formspree';
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const send = (code, obj) => { res.statusCode = code; res.end(JSON.stringify(obj)); };

  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(405, { ok: false }); }
  if (!originAllowed(req)) return send(403, { ok: false });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return send(400, { ok: false, error: 'invalid' });

  // Honeypot: si viene relleno, descartamos en silencio y respondemos como si fuera bien
  if (body.website) return send(200, { ok: true });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return send(429, { ok: false, error: 'rate' });

  const { lead, errors } = validate(body);
  if (errors.length) return send(400, { ok: false, error: 'validation', fields: errors });

  try {
    const via = await deliver(lead);
    console.log(`lead-subvencion entregado via=${via}`);
    return send(200, { ok: true });
  } catch (e) {
    console.error(`lead-subvencion fallo entrega: ${e.message}`);
    return send(502, { ok: false, error: 'delivery' });
  }
};
