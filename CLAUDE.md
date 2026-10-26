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

6. **Aprobación entre agentes** (decisión de la persona responsable, 26/10/2026, #27): las PR se unen solas con `.github/workflows/union-automatica.yml` cuando el **otro** agente las aprueba con una revisión formal de GitHub sobre el último commit, Carril está en verde y no tienen `pausa` ni `decide-persona`. No unas a mano ni apruebes tus propias PR. Tras 2 rondas sin acuerdo, pon `decide-persona` y decide ella.
7. **Avisos a la persona responsable:** solo cuando hay algo **material** (definido en `docs/plan-orquestacion.md`, «Avisos»). Todo lo demás va solo a la bitácora #11.

## Cuando revisas una pull request de ChatGPT/Codex

Deja una **revisión formal** de GitHub (`gh api repos/multiserviagua-pixel/WordpressEdit/pulls/<n>/reviews -f event=APPROVE` o `-f event=REQUEST_CHANGES`, con `-F body=@archivo`). Tu aprobación une la PR sin intervención humana, así que apruébala solo si cumple toda la lista. En el texto pon esta lista y termina con **Aprobado** o **Cambios pedidos**:

- [ ] Datos, nombres y cifras verificables; nada inventado ni sin autorización.
- [ ] Título de 50–60 caracteres y meta descripción de 140–160.
- [ ] Un solo H1 y jerarquía H2/H3 correcta.
- [ ] Palabra clave objetivo presente.
- [ ] Imágenes en WebP, máx. 200 KB, con texto alternativo descriptivo.
- [ ] Marca escrita como HumanaIA.
- [ ] Solo toca archivos de su carril.
