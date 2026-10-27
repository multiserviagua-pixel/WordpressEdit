# Medición del Índice HumanaIA

Mide cada noche la nueva web (nueva.humannaia.com), la construida y aceptada, y calcula el **Índice HumanaIA (0–100)** y su **% de evolución**, según el plan de orquestación Claude + ChatGPT. Los resultados se guardan en este repositorio, así que el historial queda versionado.

## Qué mide

| Bloque | Peso | Cómo se mide | Quién |
| --- | --- | --- | --- |
| Rendimiento | 20 % | Lighthouse móvil (mediana de 3) + LCP, CLS y TBT frente a objetivo | Automático |
| Accesibilidad | 15 % | Lighthouse | Automático |
| SEO técnico | 15 % | Lighthouse SEO + checklist propia (título, descripción, H1, alt, canonical, og:image, JSON-LD, idioma, enlaces rotos) | Automático |
| Contenido | 20 % | Rúbrica de 10 criterios (`datos/rubrica.md`) | ChatGPT puntúa, Claude revisa |
| Comprensión | 15 % | Test de 60 segundos con perfiles simulados y personas reales | ChatGPT, Claude revisa |
| Conversión | 15 % | Conversiones de GA4 frente al objetivo, con 4 semanas de datos | Claude, revisa la persona responsable |

Cada nota se normaliza a 0–100 frente a su objetivo (`config.json`). El índice es la media ponderada de los bloques medidos; si falta alguno, su peso se reparte y el informe indica la **cobertura**.

- **% evolución** = (actual − base) / base × 100, frente a la primera medición y frente a la anterior. Solo compara bloques medidos en ambas fechas, para que añadir una nota nueva no falsee el resultado.
- **% avance hacia la meta** = (actual − base) / (meta − base) × 100.

## Qué web se mide

- **Desde el 27/10/2026:** la nueva web, nueva.humannaia.com. Se ajusta en `config.json` (`sitio` y `urls`); cada página se añade a `urls` cuando se publica.
- **Antes:** del 21 al 27/10 se midió la web actual (humannaia.com), con otras páginas. Esas mediciones siguen en el historial como **referencia histórica**. Como el objeto medido cambió, no se calculan evolución ni avance hacia la meta frente a ellas. La evolución solo compara mediciones de la misma web, las mismas páginas y las mismas auditorías (campo `objeto` del historial).
- **Sin indexar:** la nueva web está en `noindex` a propósito hasta el lanzamiento, así que Lighthouse omite la auditoría `is-crawlable` (`omitir_auditorias`).

## Cómo se usa

- **Automático:** cada noche (02:00 UTC) se ejecuta *Actions → Medición Índice HumanaIA* y se guardan `informe.md` y `resultados/`.
- **A mano, al cerrar un sprint:** *Actions → Medición Índice HumanaIA → Run workflow*, con una etiqueta como `Cierre Sprint 1`. Se puede indicar otra URL (por ejemplo, https://nueva.humannaia.com) en el campo `sitio`.
- **Notas manuales:** editar `datos/manual.json` con la nota (0–100), el autor y la fecha. Se incorporan en la siguiente medición.
- **Páginas medidas, pesos y objetivos:** `config.json`. Para medir siempre otra web, define la variable de repositorio `SITIO` en *Settings → Secrets and variables → Actions → Variables*.

## Archivos

| Ruta | Contenido |
| --- | --- |
| `informe.md` | Último informe legible |
| `resultados/historial.csv` | Una fila por medición, apta para hojas de cálculo |
| `resultados/historial.json` | Lo mismo en JSON |
| `resultados/AAAA-MM-DD.json` | Detalle completo de cada día |
| `scripts/` | Medición (Lighthouse, SEO) y cálculo del índice, sin dependencias |
| `tests/` | Pruebas del cálculo (`npm test`) |

## Local

Con Node 22: `npm test` para las pruebas y `npm run medir` para una medición completa (Lighthouse se descarga con `npx` y necesita Chrome instalado). `SITIO=https://... npm run seo` mide otra web.

INP solo se puede medir con usuarios reales; mientras no haya datos de campo, se usa TBT como aproximación.
