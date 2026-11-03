import { test } from 'node:test';
import assert from 'node:assert/strict';
import { perfiles } from '../scripts/lib/config.mjs';

test('tras el lanzamiento se mide humannaia.com sin omitir is-crawlable', async () => {
  delete process.env.SITIO;
  const lista = await perfiles();
  assert.equal(lista.length, 1);
  const [web] = lista;
  assert.equal(web.sitio, 'https://humannaia.com');
  assert.deepEqual(web.omitir_auditorias, []);
  assert.ok(web.informe.endsWith('informe.md'));
  assert.ok(web.resultados.endsWith('resultados'));
});

test('con SITIO se mide esa web sin omitir auditorías', async () => {
  process.env.SITIO = 'https://ejemplo.test/';
  try {
    const [web] = await perfiles();
    assert.equal(web.sitio, 'https://ejemplo.test');
    assert.deepEqual(web.omitir_auditorias, []);
    assert.equal(web.nota, null);
  } finally {
    delete process.env.SITIO;
  }
});
