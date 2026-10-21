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
  // SITIO permite apuntar a staging o a un servidor local sin tocar config.json.
  if (process.env.SITIO) config.sitio = process.env.SITIO;
  config.sitio = config.sitio.replace(/\/+$/, '');
  return config;
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
