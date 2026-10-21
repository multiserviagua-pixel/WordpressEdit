// Análisis de HTML ligero, sin dependencias. Suficiente para comprobaciones
// SEO on-page; no pretende ser un parser HTML completo.

const RE_ATRIBUTO = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

export function decodificar(texto = '') {
  return texto
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");
}

function atributos(cadena) {
  const attrs = {};
  for (const m of cadena.matchAll(RE_ATRIBUTO)) {
    const nombre = m[1].toLowerCase();
    attrs[nombre] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return attrs;
}

/** Quita comentarios, scripts y estilos para no contar etiquetas que no se ven. */
export function limpiar(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '');
}

/** Devuelve los atributos de cada etiqueta de apertura <nombre ...>. */
export function etiquetas(html, nombre) {
  const re = new RegExp(`<${nombre}(?=[\\s/>])([^>]*)>`, 'gi');
  return [...html.matchAll(re)].map((m) => atributos(m[1]));
}

export function textoDe(html, nombre) {
  const re = new RegExp(`<${nombre}\\b[^>]*>([\\s\\S]*?)</${nombre}>`, 'i');
  const m = html.match(re);
  if (!m) return null;
  return decodificar(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

export function contar(html, nombre) {
  return etiquetas(html, nombre).length;
}

export function meta(html, clave, valor) {
  const encontrada = etiquetas(html, 'meta').find((a) => (a[clave] || '').toLowerCase() === valor);
  return encontrada ? decodificar(encontrada.content ?? '').trim() : null;
}

export function analizarPagina(htmlOriginal) {
  const jsonLd = (htmlOriginal.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>/gi) || []).length;
  const html = limpiar(htmlOriginal);
  const imagenes = etiquetas(html, 'img');
  const canonical = etiquetas(html, 'link').find((a) => (a.rel || '').toLowerCase().split(/\s+/).includes('canonical'));
  const htmlTag = etiquetas(html, 'html')[0] || {};
  return {
    titulo: textoDe(html, 'title'),
    descripcion: meta(html, 'name', 'description'),
    h1: contar(html, 'h1'),
    imagenes: imagenes.length,
    imagenes_sin_alt: imagenes.filter((a) => !('alt' in a)).length,
    imagenes_alt_vacio: imagenes.filter((a) => 'alt' in a && a.alt.trim() === '').length,
    canonical: canonical ? canonical.href : null,
    og_image: meta(html, 'property', 'og:image'),
    idioma: htmlTag.lang || null,
    json_ld: jsonLd,
    enlaces: etiquetas(html, 'a').map((a) => a.href).filter(Boolean),
  };
}
