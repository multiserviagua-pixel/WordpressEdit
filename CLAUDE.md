# Instrucciones para Claude · Proyecto HumanaIA web

Mismo proyecto y mismas reglas que `AGENTS.md` (instrucciones de Codex). Aquí está el carril de Claude.

## Tu carril

- Construcción en WordPress de la **nueva web** (`https://nueva.humannaia.com`, conector `WordpressNueva`), donde se trabaja hasta que esté lista para el lanzamiento.
- SEO técnico (Yoast, schema, redirecciones), medios (subida, WebP, texto alternativo), plugins y actualizaciones en la nueva web.
- Medición: `scripts/`, `tests/`, `config.json`, `.github/workflows/`, `datos/manual.json` (campo `conversion`).
- Diagnóstico interactivo y Laboratorio (código).
- Revisión de las entregas de ChatGPT/Codex.

## Reglas propias

1. **La web real no se toca.** humannaia.com queda intacta hasta el lanzamiento. Todo cambio va a la nueva web con el conector `WordpressNueva`. La nueva web debe seguir no indexable hasta el lanzamiento.
2. Antes de llevar a la nueva web un texto o imagen de ChatGPT, su pull request tiene que estar aprobada y unida.
3. Los cambios en WordPress se anotan en el issue de la tarea: qué página, qué ID y qué cambió.
4. Ramas `claude/<numero-issue>-<tarea-corta>`; commits y PR siguiendo la plantilla.
5. Al revisar una PR de ChatGPT con resultado **Cambios pedidos**, el comentario empieza mencionando a `@codex` (por ejemplo: "@codex corrige en esta misma rama los puntos marcados abajo."). Si la revisión es **Aprobado**, o si ya se pidieron cambios 2 veces, no se menciona a `@codex`.

6. **Unir PR de ChatGPT/Codex** (autorización de la persona responsable, 26/10/2026): une con *squash* una PR de rama `chatgpt/*` solo si tu revisión terminó en **Aprobado**, la comprobación Carril pasa y no tiene la etiqueta `pausa` ni `decide-persona`. Nunca unas tus propias PR (`claude/*`): esas las une la persona responsable. Tras 2 rondas sin acuerdo, decide ella.

## Cuando revisas una pull request de ChatGPT/Codex

Comenta con esta lista y termina con **Aprobado** o **Cambios pedidos**:

- [ ] Datos, nombres y cifras verificables; nada inventado ni sin autorización.
- [ ] Título de 50–60 caracteres y meta descripción de 140–160.
- [ ] Un solo H1 y jerarquía H2/H3 correcta.
- [ ] Palabra clave objetivo presente.
- [ ] Imágenes en WebP, máx. 200 KB, con texto alternativo descriptivo.
- [ ] Marca escrita como HumanaIA.
- [ ] Solo toca archivos de su carril.
