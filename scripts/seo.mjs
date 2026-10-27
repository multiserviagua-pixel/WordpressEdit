// Comprobaciones SEO on-page y enlaces rotos de cada URL de config.json.
// Mide la web real y, si está en config.web_nueva, también la nueva web.
// Uso: node scripts/seo.mjs   (SITIO=https://... mide solo esa web)
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { perfiles, urlCompleta, slug, asegurarCarpeta } from './lib/config.mjs';
import { analizarPagina } from './lib/html.mjs';
import { puntuarSEO } from './lib/calculo.mjs';

const AGENTE = 'HumanaIA-Medicion/1.0 (+https://humannaia.com)';

async function descargar(url) {
  const r = await fetch(url, { headers: { 'user-agent': AGENTE }, redirect: 'follow' });
  return { estado: r.status, html: await r.text(), final: r.url };
}

async function estadoEnlace(url) {
  try {
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow', headers: { 'user-agent': AGENTE } });
    // Algunos servidores no aceptan HEAD: se repite con GET.
    if (r.status === 405 || r.status === 403 || r.status === 501) {
      r = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': AGENTE } });
    }
    return r.status;
  } catch {
    return 0;
  }
}

function enlacesInternos(enlaces, base, origen) {
  const unicos = new Set();
  for (const href of enlaces) {
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) continue;
    let u;
    try { u = new URL(href, base); } catch { continue; }
    if (u.origin !== origen) continue;
    u.hash = '';
    unicos.add(u.href);
  }
  return [...unicos];
}

async function main() {
  for (const config of await perfiles()) await medir(config);
}

async function medir(config) {
  const origen = new URL(config.sitio).origin;
  const paginas = [];
  const todosLosEnlaces = new Set();

  for (const ruta of config.urls) {
    const url = urlCompleta(config, ruta);
    try {
      const { estado, html, final } = await descargar(url);
      const datos = analizarPagina(html);
      const internos = enlacesInternos(datos.enlaces, final, origen);
      internos.forEach((e) => todosLosEnlaces.add(e));
      delete datos.enlaces;
      paginas.push({ ruta, url, estado, ...datos, enlaces_internos: internos });
    } catch (error) {
      paginas.push({ ruta, url, estado: 0, error: String(error.message || error) });
    }
  }

  const lista = [...todosLosEnlaces].slice(0, config.seo.max_enlaces_a_comprobar);
  const estados = {};
  for (const enlace of lista) estados[enlace] = await estadoEnlace(enlace);
  const rotos = Object.entries(estados).filter(([, s]) => s === 0 || s >= 400).map(([url, estado]) => ({ url, estado }));

  for (const p of paginas) {
    p.enlaces_rotos = (p.enlaces_internos || []).filter((e) => rotos.some((r) => r.url === e));
    p.puntuacion = puntuarSEO(p, config.seo);
    delete p.enlaces_internos;
  }

  const salida = { sitio: config.sitio, paginas, enlaces_comprobados: lista.length, enlaces_rotos: rotos };
  await asegurarCarpeta(config.tmp);
  await writeFile(path.join(config.tmp, 'seo.json'), JSON.stringify(salida, null, 2));
  for (const p of paginas) {
    console.log(`[${config.id}] SEO ${slug(p.ruta).padEnd(22)} ${p.puntuacion?.nota ?? 'error'}`);
  }
  console.log(`[${config.id}] Enlaces comprobados: ${lista.length}, rotos: ${rotos.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
