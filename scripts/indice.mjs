// Calcula el Índice HumanaIA, lo añade al historial y escribe el informe.
// Calcula un índice por web: la real (informe.md, resultados/) y la nueva si está en config.web_nueva
// (resultados/nueva/informe.md, resultados/nueva/). Uso: node scripts/indice.mjs   (ETIQUETA="Cierre Sprint 0")
import { readdir, writeFile, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { perfiles, leerJSON, slug, fechaHoy, asegurarCarpeta } from './lib/config.mjs';
import { notasLighthouse, bloques, indice, evolucion, redondear } from './lib/calculo.mjs';

const NOMBRES = {
  rendimiento: 'Rendimiento', accesibilidad: 'Accesibilidad', seo: 'SEO técnico',
  contenido: 'Contenido', comprension: 'Comprensión', conversion: 'Conversión',
};
const f = (n, sufijo = '') => (n === null || n === undefined ? '—' : `${n}${sufijo}`);
const signo = (n) => (n === null || n === undefined ? '—' : `${n > 0 ? '+' : ''}${n} %`);

async function leerLighthouse(config) {
  const carpeta = path.join(config.tmp, 'lighthouse');
  const porRuta = {};
  if (!existsSync(carpeta)) return porRuta;
  const archivos = new Set(await readdir(carpeta));
  for (const ruta of config.urls) {
    const archivo = `${slug(ruta)}.json`;
    if (archivos.has(archivo)) porRuta[ruta] = notasLighthouse(await leerJSON(path.join(carpeta, archivo)), config.objetivos);
  }
  return porRuta;
}

function informe({ config, actual, evo, historial, lighthouse, seo, manual }) {
  const l = [];
  l.push(`# Índice HumanaIA · ${actual.fecha}`, '');
  l.push(`Web medida: ${config.sitio}`, '');
  if (config.nota) l.push(`> ${config.nota}`, '');
  if (actual.etiqueta) l.push(`**${actual.etiqueta}**`, '');
  l.push(`**Índice: ${f(actual.indice)} / 100** · meta ${config.objetivos.indice_meta} · medido el ${actual.cobertura} % del peso total`, '');
  if (historial.length > 1) {
    l.push(`- Evolución desde la base (${evo.fecha_base}): **${signo(evo.evolucion_vs_base)}**`);
    l.push(`- Evolución desde la medición anterior (${f(evo.fecha_anterior)}): **${signo(evo.evolucion_vs_anterior)}**`);
    l.push(`- Avance hacia la meta: **${f(evo.avance_hacia_meta, ' %')}**`);
    if (!evo.comparable) l.push(`- La evolución se calcula solo con los bloques medidos en ambas fechas (${evo.bloques_comparados.map((b) => NOMBRES[b]).join(', ')}), porque desde la base se han añadido notas nuevas.`);
  } else {
    l.push('Primera medición: queda guardada como **línea base**.');
  }
  l.push('', '## Bloques', '', '| Bloque | Peso | Base | Anterior | Actual | vs base | vs anterior |', '| --- | --- | --- | --- | --- | --- | --- |');
  for (const [b, peso] of Object.entries(config.pesos)) {
    const e = evo.por_bloque[b];
    l.push(`| ${NOMBRES[b]} | ${peso} % | ${f(e.base)} | ${f(e.anterior)} | ${f(e.actual)} | ${signo(e.vs_base)} | ${signo(e.vs_anterior)} |`);
  }
  const pendientes = ['contenido', 'comprension', 'conversion'].filter((b) => actual.bloques[b] === null);
  if (pendientes.length) {
    l.push('', `Sin nota manual todavía: ${pendientes.map((b) => NOMBRES[b]).join(', ')}. Se rellenan en \`datos/manual.json\`.`);
  } else {
    l.push('', `Notas manuales: ${['contenido', 'comprension', 'conversion'].map((b) => `${NOMBRES[b]} por ${manual[b].autor || '?'} (${manual[b].fecha || 'sin fecha'})`).join(' · ')}.`);
  }

  l.push('', '## Detalle técnico por página (Lighthouse móvil)', '', '| Página | Rendimiento | Accesibilidad | SEO | Buenas prácticas | LCP | CLS | TBT | Checklist SEO |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const ruta of config.urls) {
    const r = lighthouse[ruta]?.bruto;
    const s = seo?.paginas.find((p) => p.ruta === ruta);
    l.push(`| ${ruta} | ${f(redondear(r?.rendimiento, 0))} | ${f(redondear(r?.accesibilidad, 0))} | ${f(redondear(r?.seo, 0))} | ${f(redondear(r?.buenas_practicas, 0))} | ${r?.lcp_ms ? `${redondear(r.lcp_ms / 1000, 2)} s` : '—'} | ${f(redondear(r?.cls, 3))} | ${r?.tbt_ms != null ? `${Math.round(r.tbt_ms)} ms` : '—'} | ${f(s?.puntuacion?.nota)} |`);
  }

  if (seo) {
    l.push('', '## Qué corregir (checklist SEO)', '');
    for (const p of seo.paginas) {
      const fallos = p.puntuacion?.fallos || [];
      l.push(fallos.length ? `**${p.ruta}**` : `**${p.ruta}** — sin fallos`);
      fallos.forEach((x) => l.push(`- ${x}`));
      l.push('');
    }
    l.push(`Enlaces internos comprobados: ${seo.enlaces_comprobados} · rotos: ${seo.enlaces_rotos.length}`);
    seo.enlaces_rotos.slice(0, 20).forEach((r) => l.push(`- ${r.url} (${r.estado || 'sin respuesta'})`));
  }

  l.push('', '## Historial', '', '| Fecha | Índice | Cobertura | Etiqueta |', '| --- | --- | --- | --- |');
  [...historial].reverse().slice(0, 30).forEach((h) => l.push(`| ${h.fecha} | ${f(h.indice)} | ${h.cobertura} % | ${h.etiqueta || ''} |`));
  l.push('', '_Generado automáticamente. INP no se puede medir en laboratorio: se usa TBT como aproximación hasta tener datos reales de usuarios._');
  return l.join('\n') + '\n';
}

async function main() {
  const lista = await perfiles();
  for (const config of lista) {
    try {
      await calcular(config);
    } catch (e) {
      // La web real decide el resultado; un fallo de la nueva web se informa sin parar la medición.
      if (config.id === 'real') throw e;
      console.error(`[${config.id}] ${e.message || e}`);
    }
  }
}

async function calcular(config) {
  const RESULTADOS = config.resultados;
  const lighthouse = await leerLighthouse(config);
  const seo = await leerJSON(path.join(config.tmp, 'seo.json'), null);
  const manual = await leerJSON(config.manual, {});

  const crudos = bloques({ lighthouse: Object.values(lighthouse), seo, manual });
  const notas = Object.fromEntries(Object.entries(crudos).map(([k, v]) => [k, redondear(v)]));
  const { indice: valor, cobertura } = indice(notas, config.pesos);
  if (valor === null) throw new Error('No hay ningún bloque medido: revisa Lighthouse y el chequeo SEO.');

  const actual = { fecha: fechaHoy(), etiqueta: process.env.ETIQUETA || null, indice: valor, cobertura, bloques: notas, sitio: config.sitio };
  await asegurarCarpeta(RESULTADOS);
  const rutaHistorial = path.join(RESULTADOS, 'historial.json');
  // Una sola medición por día: si se repite, se sustituye.
  const historial = (await leerJSON(rutaHistorial, [])).filter((h) => h.fecha !== actual.fecha);
  historial.push(actual);
  historial.sort((a, b) => a.fecha.localeCompare(b.fecha));
  const evo = evolucion(historial, actual, config.objetivos.indice_meta, config.pesos);

  await writeFile(rutaHistorial, JSON.stringify(historial, null, 2) + '\n');
  await writeFile(path.join(RESULTADOS, `${actual.fecha}.json`), JSON.stringify({ ...actual, evolucion: evo, lighthouse, seo, manual }, null, 2) + '\n');
  const csv = ['fecha,indice,cobertura,' + Object.keys(config.pesos).join(',') + ',etiqueta']
    .concat(historial.map((h) => [h.fecha, h.indice, h.cobertura, ...Object.keys(config.pesos).map((b) => h.bloques[b] ?? ''), `"${(h.etiqueta || '').replace(/"/g, "'")}"`].join(',')));
  await writeFile(path.join(RESULTADOS, 'historial.csv'), csv.join('\n') + '\n');
  const texto = informe({ config, actual, evo, historial, lighthouse, seo, manual });
  await writeFile(config.informe, texto);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, texto);

  console.log(`[${config.id}] Índice ${valor} (cobertura ${cobertura} %) · vs base ${signo(evo.evolucion_vs_base)} · vs anterior ${signo(evo.evolucion_vs_anterior)}`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
