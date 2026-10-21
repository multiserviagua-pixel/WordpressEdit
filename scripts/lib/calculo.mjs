// Funciones puras de puntuación. Todas devuelven notas de 0 a 100.

export const redondear = (n, d = 1) => (n === null || n === undefined ? null : Math.round(n * 10 ** d) / 10 ** d);

export function mediana(valores) {
  const v = [...valores].sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

const media = (valores) => {
  const v = valores.filter((x) => typeof x === 'number' && Number.isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

/** Más es mejor: 100 cuando se alcanza el objetivo. */
export const haciaObjetivo = (valor, objetivo) => Math.max(0, Math.min(100, (100 * valor) / objetivo));

/** Menos es mejor (LCP, CLS, TBT): 100 cuando se está en el objetivo o por debajo. */
export const bajoObjetivo = (valor, objetivo) => (valor <= objetivo ? 100 : Math.max(0, (100 * objetivo) / valor));

/** Checklist SEO on-page de una página: 100 puntos repartidos. */
export function puntuarSEO(p, reglas) {
  if (p.error || p.estado >= 400 || p.estado === 0) return { nota: 0, fallos: ['La página no responde'] };
  const fallos = [];
  let nota = 0;
  const sumar = (ok, puntos, fallo) => { if (ok) nota += puntos; else fallos.push(fallo); };

  const lt = (p.titulo || '').length;
  sumar(lt >= reglas.titulo_min && lt <= reglas.titulo_max, 15, `Título de ${lt} caracteres (ideal ${reglas.titulo_min}–${reglas.titulo_max})`);
  const ld = (p.descripcion || '').length;
  sumar(ld >= reglas.descripcion_min && ld <= reglas.descripcion_max, 15, ld ? `Meta descripción de ${ld} caracteres (ideal ${reglas.descripcion_min}–${reglas.descripcion_max})` : 'Sin meta descripción');
  sumar(p.h1 === 1, 15, `${p.h1} encabezados H1 (debe haber 1)`);
  const conAlt = p.imagenes ? (p.imagenes - p.imagenes_sin_alt - p.imagenes_alt_vacio) / p.imagenes : 1;
  nota += 15 * conAlt;
  if (conAlt < 1) fallos.push(`${p.imagenes_sin_alt + p.imagenes_alt_vacio} de ${p.imagenes} imágenes sin texto alternativo`);
  sumar(Boolean(p.canonical), 10, 'Sin URL canónica');
  sumar(Boolean(p.og_image), 10, 'Sin imagen para redes (og:image)');
  sumar(p.json_ld > 0, 10, 'Sin datos estructurados (JSON-LD)');
  sumar(Boolean(p.idioma), 5, 'Sin atributo de idioma');
  sumar(!p.enlaces_rotos?.length, 5, `${p.enlaces_rotos?.length} enlaces internos rotos`);
  return { nota: redondear(nota), fallos };
}

/** Bloques técnicos de una página a partir de su informe de Lighthouse. */
export function notasLighthouse(informe, obj) {
  const cat = (c) => (informe.categories?.[c]?.score ?? null);
  const audit = (a) => informe.audits?.[a]?.numericValue ?? null;
  const lcp = audit('largest-contentful-paint');
  const cls = audit('cumulative-layout-shift');
  const tbt = audit('total-blocking-time');
  const rendimientoLH = cat('performance') === null ? null : cat('performance') * 100;
  const vitales = media([
    lcp === null ? null : bajoObjetivo(lcp, obj.lcp_ms),
    cls === null ? null : bajoObjetivo(cls, obj.cls),
    tbt === null ? null : bajoObjetivo(tbt, obj.tbt_ms),
  ]);
  return {
    rendimiento: media([rendimientoLH === null ? null : haciaObjetivo(rendimientoLH, obj.lighthouse_rendimiento), vitales]),
    accesibilidad: cat('accessibility') === null ? null : haciaObjetivo(cat('accessibility') * 100, obj.lighthouse_accesibilidad),
    seo_lighthouse: cat('seo') === null ? null : haciaObjetivo(cat('seo') * 100, obj.lighthouse_seo),
    bruto: {
      rendimiento: rendimientoLH,
      accesibilidad: cat('accessibility') === null ? null : cat('accessibility') * 100,
      seo: cat('seo') === null ? null : cat('seo') * 100,
      buenas_practicas: cat('best-practices') === null ? null : cat('best-practices') * 100,
      lcp_ms: lcp, cls, tbt_ms: tbt,
    },
  };
}

/** Une Lighthouse, SEO propio y notas manuales en los seis bloques del índice. */
export function bloques({ lighthouse = [], seo = null, manual = {} }) {
  const seoPropio = seo ? media(seo.paginas.map((p) => p.puntuacion?.nota)) : null;
  const seoLH = media(lighthouse.map((l) => l.seo_lighthouse));
  const nota = (b) => (typeof manual?.[b]?.nota === 'number' ? Math.max(0, Math.min(100, manual[b].nota)) : null);
  return {
    rendimiento: media(lighthouse.map((l) => l.rendimiento)),
    accesibilidad: media(lighthouse.map((l) => l.accesibilidad)),
    seo: media([seoLH, seoPropio]),
    contenido: nota('contenido'),
    comprension: nota('comprension'),
    conversion: nota('conversion'),
  };
}

/**
 * Índice ponderado. Los bloques sin medir se excluyen y los pesos se reparten
 * entre los medidos; `cobertura` dice qué parte del peso total se midió.
 */
export function indice(notas, pesos) {
  let suma = 0, pesoMedido = 0, pesoTotal = 0;
  for (const [bloque, peso] of Object.entries(pesos)) {
    pesoTotal += peso;
    if (typeof notas[bloque] === 'number') { suma += notas[bloque] * peso; pesoMedido += peso; }
  }
  return {
    indice: pesoMedido ? redondear(suma / pesoMedido) : null,
    cobertura: redondear((100 * pesoMedido) / pesoTotal, 0),
  };
}

export const variacion = (actual, base) =>
  (typeof actual === 'number' && typeof base === 'number' && base !== 0 ? redondear((100 * (actual - base)) / base) : null);

export const avance = (actual, base, meta) =>
  (typeof actual === 'number' && typeof base === 'number' && meta !== base ? redondear((100 * (actual - base)) / (meta - base)) : null);

/**
 * Índices de dos mediciones calculados solo con los bloques que ambas midieron,
 * para que añadir una nota nueva (p. ej. contenido) no falsee la evolución.
 */
export function indicesComparables(a, b, pesos) {
  const comunes = Object.fromEntries(Object.entries(pesos)
    .filter(([k]) => typeof a?.bloques?.[k] === 'number' && typeof b?.bloques?.[k] === 'number'));
  if (!Object.keys(comunes).length) return { a: null, b: null, bloques: [] };
  return { a: indice(a.bloques, comunes).indice, b: indice(b.bloques, comunes).indice, bloques: Object.keys(comunes) };
}

/** Compara la medición actual con la base (primera) y con la anterior del historial. */
export function evolucion(historial, actual, meta, pesos) {
  const previas = historial.filter((h) => h.fecha !== actual.fecha);
  const base = previas[0] || actual;
  const anterior = previas.at(-1) || null;
  const frenteBase = indicesComparables(actual, base, pesos);
  const frenteAnterior = anterior ? indicesComparables(actual, anterior, pesos) : null;
  const porBloque = {};
  for (const b of Object.keys(actual.bloques)) {
    porBloque[b] = {
      base: base.bloques?.[b] ?? null,
      anterior: anterior?.bloques?.[b] ?? null,
      actual: actual.bloques[b],
      vs_base: variacion(actual.bloques[b], base.bloques?.[b]),
      vs_anterior: anterior ? variacion(actual.bloques[b], anterior.bloques?.[b]) : null,
    };
  }
  return {
    fecha_base: base.fecha,
    fecha_anterior: anterior?.fecha ?? null,
    indice_base: base.indice,
    evolucion_vs_base: variacion(frenteBase.a, frenteBase.b),
    evolucion_vs_anterior: frenteAnterior ? variacion(frenteAnterior.a, frenteAnterior.b) : null,
    // El avance hacia la meta usa el índice completo: es el que debe llegar a la meta.
    avance_hacia_meta: avance(actual.indice, base.indice, meta),
    // Si cambió qué bloques se miden, la evolución usa solo los comunes.
    comparable: base.cobertura === actual.cobertura,
    bloques_comparados: frenteBase.bloques,
    por_bloque: porBloque,
  };
}
