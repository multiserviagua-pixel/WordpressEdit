# HumanaIA web

Centro de trabajo para construir la nueva web de **HumanaIA** en **https://nueva.humannaia.com** entre ChatGPT/Codex y Claude, con revisión cruzada y medición del avance.

- Plan: [`docs/plan-orquestacion.md`](docs/plan-orquestacion.md) (copia del documento editable en el proyecto de Claude).
- Instrucciones de cada agente: [`AGENTS.md`](AGENTS.md) (Codex) y [`CLAUDE.md`](CLAUDE.md) (Claude).
- Medición nocturna del Índice HumanaIA: [`MEDICION.md`](MEDICION.md) · último informe en [`informe.md`](informe.md).

## Quién hace qué

| Carril | Dueño | Revisa |
| --- | --- | --- |
| Estrategia, textos, imágenes, preguntas del diagnóstico, rúbrica y comprensión | ChatGPT/Codex | Claude |
| WordPress (nueva web, nueva.humannaia.com), SEO técnico, medios, plugins, código y medición | Claude | ChatGPT/Codex |
| Fotos reales, autorizaciones, decisiones y aprobación final | Persona responsable | — |

## Flujo de una tarea

1. La tarea se abre como **issue** con la plantilla *Tarea*: dueño, revisor, sprint y criterios de aceptación.
2. El dueño trabaja en una rama `chatgpt/<issue>-…` o `claude/<issue>-…` y abre una **pull request**.
3. La comprobación **Carril** verifica que solo toca archivos de su carril.
4. El otro agente revisa con su lista de control y comenta **Aprobado** o **Cambios pedidos** (máx. 2 rondas).
5. Si la PR es de ChatGPT y la revisión de Claude termina en **Aprobado**, la une Claude; si es de Claude, la une la persona responsable. Si es contenido, Claude lo lleva después a la nueva web en WordPress.

## Entornos

| Entorno | URL | Quién escribe |
| --- | --- | --- |
| Web real | https://humannaia.com | Nadie (intacta hasta el lanzamiento) |
| Nueva web (en construcción) | https://nueva.humannaia.com | Claude (conector WordpressNueva) |
| Copia antigua (abandonada) | https://humannaia.com/staging | Nadie |

## Carpetas

| Ruta | Contenido | Dueño |
| --- | --- | --- |
| `entregas/textos/` | Texto de cada página, con su SEO | ChatGPT/Codex |
| `entregas/imagenes/` | Imágenes WebP para la web y `alt.md` | ChatGPT/Codex |
| `revisiones/` | Rúbricas, tests de comprensión y revisiones largas | Ambos |
| `datos/` | Notas manuales del índice y rúbrica | Ambos (por campo) |
| `docs/` | Plan de orquestación | Claude (con revisión de ChatGPT) |
| `scripts/`, `tests/`, `config.json`, `.github/` | Medición y automatización | Claude |
