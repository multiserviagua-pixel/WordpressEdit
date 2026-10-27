import { test } from 'node:test';
import assert from 'node:assert/strict';
import { perfiles } from '../scripts/lib/config.mjs';

test('se miden la web real y la nueva, cada una en su carpeta', async () => {
  delete process.env.SITIO;
  const [real, nueva] = await perfiles();
  assert.equal(real.id, 'real');
  assert.equal(real.sitio, 'https://humannaia.com');
  assert.deepEqual(real.omitir_auditorias, []);
  assert.ok(real.informe.endsWith('informe.md') && !real.informe.includes('nueva'));
  assert.equal(nueva.id, 'nueva');
  assert.equal(nueva.sitio, 'https://nueva.humannaia.com');
  assert.ok(nueva.resultados.endsWith('resultados/nueva'));
  assert.ok(nueva.tmp.endsWith('tmp/nueva'));
  assert.deepEqual(nueva.omitir_auditorias, ['is-crawlable']);
  assert.deepEqual(nueva.pesos, real.pesos);
});

test('con SITIO solo se mide esa web, como antes', async () => {
  process.env.SITIO = 'https://ejemplo.test/';
  try {
    const lista = await perfiles();
    assert.equal(lista.length, 1);
    assert.equal(lista[0].sitio, 'https://ejemplo.test');
  } finally {
    delete process.env.SITIO;
  }
});
