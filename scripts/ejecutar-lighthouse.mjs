// Ejecuta Lighthouse (móvil) varias veces por URL y guarda la ejecución mediana.
// Mide la web real y, si está en config.web_nueva, también la nueva web (cada una en su carpeta).
// Pensado para GitHub Actions, donde `npx` descarga Lighthouse y Chrome ya está instalado.
// Uso: node scripts/ejecutar-lighthouse.mjs
import { spawnSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { perfiles, urlCompleta, slug, asegurarCarpeta } from './lib/config.mjs';
import { mediana } from './lib/calculo.mjs';

async function medir(config) {
  const carpeta = path.join(config.tmp, 'lighthouse');
  await asegurarCarpeta(carpeta);
  const version = config.lighthouse.version;
  const repeticiones = Number(process.env.LH_REPETICIONES || config.lighthouse.repeticiones);
  // La nueva web está en `noindex` a propósito hasta el lanzamiento: esa auditoría se omite allí.
  const omitir = config.omitir_auditorias?.length ? [`--skip-audits=${config.omitir_auditorias.join(',')}`] : [];
  let fallos = 0;

  for (const ruta of config.urls) {
    const url = urlCompleta(config, ruta);
    const informes = [];
    for (let i = 1; i <= repeticiones; i++) {
      const destino = path.join(carpeta, `${slug(ruta)}-${i}.json`);
      const r = spawnSync('npx', [
        '--yes', `lighthouse@${version}`, url,
        '--output=json', `--output-path=${destino}`, '--quiet',
        '--only-categories=performance,accessibility,seo,best-practices',
        ...omitir,
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      ], { stdio: 'inherit' });
      if (r.status !== 0) { console.error(`Lighthouse falló en ${url} (intento ${i})`); continue; }
      informes.push(JSON.parse(await readFile(destino, 'utf8')));
      await rm(destino);
    }
    if (!informes.length) { fallos++; continue; }
    // Se conserva la ejecución con la nota de rendimiento mediana, como recomienda Lighthouse.
    const notas = informes.map((x) => x.categories.performance.score ?? 0);
    const objetivo = mediana(notas);
    const elegido = informes.find((x) => (x.categories.performance.score ?? 0) === objetivo) || informes[0];
    await writeFile(path.join(carpeta, `${slug(ruta)}.json`), JSON.stringify(elegido));
    console.log(`[${config.id}] Lighthouse ${slug(ruta).padEnd(22)} rendimiento ${Math.round(objetivo * 100)} (${informes.length} ejecuciones)`);
  }
  return fallos === config.urls.length;
}

async function main() {
  const lista = await perfiles();
  let todoFallo = true;
  for (const config of lista) {
    const fallo = await medir(config);
    if (fallo) console.error(`[${config.id}] Lighthouse no pudo medir ninguna página de ${config.sitio}`);
    // La web real decide el resultado del paso; un fallo de la nueva web no detiene la medición.
    if (config.id === 'real') todoFallo = fallo;
  }
  if (todoFallo) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
