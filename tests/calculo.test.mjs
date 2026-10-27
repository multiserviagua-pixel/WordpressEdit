import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { analizarPagina } from '../scripts/lib/html.mjs';
import {
  puntuarSEO, notasLighthouse, bloques, indice, evolucion, variacion, avance, bajoObjetivo, haciaObjetivo, mediana,
} from '../scripts/lib/calculo.mjs';

const objetivos = { lighthouse_rendimiento: 90, lighthouse_accesibilidad: 95, lighthouse_seo: 95, lcp_ms: 2500, cls: 0.1, tbt_ms: 200 };
const reglas = { titulo_min: 30, titulo_max: 65, descripcion_min: 70, descripcion_max: 160 };
const pesos = { rendimiento: 20, accesibilidad: 15, seo: 15, contenido: 20, comprension: 15, conversion: 15 };

test('el análisis HTML ignora comentarios, scripts y estilos', async () => {
  const html = await readFile(new URL('./fixtures/pagina.html', import.meta.url), 'utf8');
  const p = analizarPagina(html);
  assert.equal(p.titulo, 'HUMANNAIA - IA inteligencia Artificial');
  assert.equal(p.descripcion, null);
  assert.equal(p.h1, 0);
  assert.equal(p.imagenes, 3);
  assert.equal(p.imagenes_sin_alt, 1);
  assert.equal(p.imagenes_alt_vacio, 1);
  assert.equal(p.canonical, '/');
  assert.equal(p.og_image, '/img/portada.jpg');
  assert.equal(p.json_ld, 1);
  assert.equal(p.idioma, 'es-ES');
  assert.deepEqual(p.enlaces, ['/servicios-humanaia/', '/about', 'mailto:info@humannaia.com', 'https://otra-web.example/']);
});

test('la checklist SEO puntúa y explica cada fallo', async () => {
  const html = await readFile(new URL('./fixtures/pagina.html', import.meta.url), 'utf8');
  const p = { ...analizarPagina(html), estado: 200, enlaces_rotos: ['https://humannaia.com/about'] };
  const { nota, fallos } = puntuarSEO(p, reglas);
  // título 38 car. (15) + 1/3 imágenes con alt (5) + canonical (10) + og (10) + json-ld (10) + idioma (5)
  assert.equal(nota, 55);
  assert.ok(fallos.includes('Sin meta descripción'));
  assert.ok(fallos.includes('0 encabezados H1 (debe haber 1)'));
  assert.ok(fallos.some((x) => x.includes('2 de 3 imágenes')));
  assert.ok(fallos.includes('1 enlaces internos rotos'));
});

test('una página caída puntúa 0', () => {
  assert.equal(puntuarSEO({ estado: 500 }, reglas).nota, 0);
});

test('normalización frente a objetivos', () => {
  assert.equal(haciaObjetivo(45, 90), 50);
  assert.equal(haciaObjetivo(99, 90), 100);
  assert.equal(bajoObjetivo(2000, 2500), 100);
  assert.equal(bajoObjetivo(5000, 2500), 50);
  assert.equal(mediana([0.4, 0.9, 0.5]), 0.5);
});

test('notas de Lighthouse por bloque', () => {
  const informe = {
    categories: { performance: { score: 0.45 }, accessibility: { score: 0.76 }, seo: { score: 0.95 }, 'best-practices': { score: 0.8 } },
    audits: {
      'largest-contentful-paint': { numericValue: 5000 },
      'cumulative-layout-shift': { numericValue: 0.05 },
      'total-blocking-time': { numericValue: 400 },
    },
  };
  const n = notasLighthouse(informe, objetivos);
  // rendimiento = media(45/90 → 50, media(50, 100, 50) → 66,67) = 58,33
  assert.ok(Math.abs(n.rendimiento - 58.333) < 0.01);
  assert.equal(n.accesibilidad, 80);
  assert.equal(n.seo_lighthouse, 100);
  assert.equal(n.bruto.lcp_ms, 5000);
});

test('el índice reparte el peso entre los bloques medidos', () => {
  const notas = bloques({
    lighthouse: [{ rendimiento: 60, accesibilidad: 80, seo_lighthouse: 100 }],
    seo: { paginas: [{ puntuacion: { nota: 50 } }] },
    manual: { contenido: { nota: 40 }, comprension: { nota: null } },
  });
  assert.equal(notas.seo, 75);
  assert.equal(notas.comprension, null);
  const r = indice(notas, pesos);
  // (60·20 + 80·15 + 75·15 + 40·20) / 70 = 61,79
  assert.equal(r.indice, 61.8);
  assert.equal(r.cobertura, 70);
});

test('evolución frente a la base, la anterior y la meta', () => {
  const historial = [
    { fecha: '2026-10-21', indice: 40, cobertura: 50, bloques: { seo: 30 } },
    { fecha: '2026-11-04', indice: 50, cobertura: 50, bloques: { seo: 45 } },
    { fecha: '2026-11-18', indice: 60, cobertura: 50, bloques: { seo: 60 } },
  ];
  const e = evolucion(historial, historial[2], 85, pesos);
  assert.equal(e.evolucion_vs_base, 100);
  assert.equal(e.evolucion_vs_anterior, 33.3);
  assert.equal(e.avance_hacia_meta, 44.4);
  assert.equal(e.por_bloque.seo.vs_base, 100);
  assert.equal(e.comparable, true);
  assert.equal(variacion(10, null), null);
  assert.equal(avance(85, 40, 85), 100);
});

test('la primera medición es su propia base', () => {
  const unica = { fecha: '2026-10-21', indice: 40, cobertura: 50, bloques: { seo: 30 } };
  const e = evolucion([unica], unica, 85, pesos);
  assert.equal(e.evolucion_vs_base, 0);
  assert.equal(e.evolucion_vs_anterior, null);
});

test('añadir una nota nueva no falsea la evolución', () => {
  const base = { fecha: '2026-10-21', indice: 50, cobertura: 50, bloques: { rendimiento: 40, accesibilidad: 60, seo: 50, contenido: null } };
  const actual = { fecha: '2026-11-04', indice: 55, cobertura: 70, bloques: { rendimiento: 80, accesibilidad: 60, seo: 50, contenido: 30 } };
  const e = evolucion([base, actual], actual, 85, pesos);
  assert.deepEqual(e.bloques_comparados, ['rendimiento', 'accesibilidad', 'seo']);
  // común: base (40·20+60·15+50·15)/50 = 49; actual (80·20+60·15+50·15)/50 = 65 → +32,7 %
  assert.equal(e.evolucion_vs_base, 32.7);
  assert.equal(e.comparable, false);
});

test('una base de otra web queda como referencia y no se compara', () => {
  const pesosT = { rendimiento: 20, accesibilidad: 15, seo: 15, contenido: 20, comprension: 15, conversion: 15 };
  const vieja = { fecha: '2026-10-21', indice: 71.5, cobertura: 50, sitio: 'https://humannaia.com', bloques: { rendimiento: 54.1, accesibilidad: 95.1, seo: 71 } };
  const nueva1 = { fecha: '2026-10-27', indice: 95.8, cobertura: 50, sitio: 'https://nueva.humannaia.com', objeto: 'n | / | is-crawlable', bloques: { rendimiento: 98.6, accesibilidad: 100, seo: 87.7 } };
  const e1 = evolucion([vieja, nueva1], nueva1, 85, pesosT);
  assert.equal(e1.base_comparable, false);
  assert.equal(e1.evolucion_vs_base, null);
  assert.equal(e1.avance_hacia_meta, null);
  assert.equal(e1.fecha_anterior, null);
  assert.equal(e1.por_bloque.rendimiento.vs_base, null);
  const nueva2 = { ...nueva1, fecha: '2026-10-28', indice: 90, bloques: { rendimiento: 90, accesibilidad: 100, seo: 87.7 } };
  const e2 = evolucion([vieja, nueva1, nueva2], nueva2, 85, pesosT);
  assert.equal(e2.fecha_anterior, '2026-10-27');
  assert.notEqual(e2.evolucion_vs_anterior, null);
  assert.equal(e2.evolucion_vs_base, null);
});
