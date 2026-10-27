import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const TMP = path.join(RAIZ, 'tmp');
export const RESULTADOS = path.join(RAIZ, 'resultados');

export async function leerJSON(ruta, porDefecto = undefined) {
  if (!existsSync(ruta)) {
    if (porDefecto !== undefined) return porDefecto;
    throw new Error(`No existe ${ruta}`);
  }
  return JSON.parse(await readFile(ruta, 'utf8'));
}

export async function cargarConfig() {
  const config = await leerJSON(path.join(RAIZ, 'config.json'));
  // SITIO permite apuntar a la nueva web (https://nueva.humannaia.com) o a un servidor local sin tocar config.json.
  if (process.env.SITIO) config.sitio = process.env.SITIO;
  config.sitio = config.sitio.replace(/\/+$/, '');
  return config;
}

/**
 * Webs que se miden en cada ejecución. Siempre la real (raíz de `resultados/`, `informe.md`);
 * además, la nueva web de `config.web_nueva` en `resultados/nueva/`, con su propio historial.
 * Si se fija SITIO, solo se mide esa URL como antes.
 */
export async function perfiles() {
  const base = await cargarConfig();
  const lista = [{
    ...base, id: 'real', nombre: base.nombre || base.sitio, omitir_auditorias: [],
    tmp: TMP, resultados: RESULTADOS, informe: path.join(RAIZ, 'informe.md'), manual: path.join(RAIZ, 'datos', 'manual.json'),
  }];
  const n = base.web_nueva;
  if (!process.env.SITIO && n?.sitio && n.urls?.length) {
    lista.push({
      ...base, id: 'nueva', nombre: n.nombre || n.sitio, sitio: n.sitio.replace(/\/+$/, ''), urls: n.urls,
      omitir_auditorias: n.omitir_auditorias || [], nota: n.nota || null,
      tmp: path.join(TMP, 'nueva'), resultados: path.join(RESULTADOS, 'nueva'),
      informe: path.join(RESULTADOS, 'nueva', 'informe.md'), manual: path.join(RAIZ, 'datos', 'manual-nueva.json'),
    });
  }
  return lista;
}

export function urlCompleta(config, ruta) {
  return new URL(ruta, config.sitio + '/').href;
}

/** "/servicios-humanaia/" -> "servicios-humanaia"; "/" -> "inicio" */
export function slug(ruta) {
  const limpio = ruta.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9-]+/g, '-');
  return limpio || 'inicio';
}

/** Fecha AAAA-MM-DD en hora de Madrid (o la variable FECHA). */
export function fechaHoy() {
  if (process.env.FECHA) return process.env.FECHA;
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

export async function asegurarCarpeta(ruta) {
  await mkdir(ruta, { recursive: true });
}
