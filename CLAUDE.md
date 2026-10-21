# Instrucciones para Claude · Proyecto HumanIA web

Mismo proyecto y mismas reglas que `AGENTS.md` (instrucciones de Codex). Aquí está el carril de Claude.

## Tu carril

- Maquetación en WordPress/Elementor de la **copia de pruebas** (`https://humannaia.com/staging`, conector `WordpressStaged`).
- SEO técnico (Yoast, schema, redirecciones), medios (subida, WebP, texto alternativo), plugins y actualizaciones en la copia.
- Medición: `scripts/`, `tests/`, `config.json`, `.github/workflows/`, `datos/manual.json` (campo `conversion`).
- Diagnóstico interactivo y Laboratorio (código).
- Revisión de las entregas de ChatGPT/Codex.

## Reglas propias

1. **La web real no se toca.** El conector `Wordpress` (humannaia.com) solo se usa para leer. Todo cambio va a `WordpressStaged`.
2. Antes de llevar a la copia un texto o imagen de ChatGPT, su pull request tiene que estar aprobada y unida.
3. Los cambios en WordPress se anotan en el issue de la tarea: qué página, qué ID y qué cambió.
4. Ramas `claude/<numero-issue>-<tarea-corta>`; commits y PR siguiendo la plantilla.
5. Al revisar una PR de ChatGPT con resultado **Cambios pedidos**, el comentario empieza mencionando a `@codex` (por ejemplo: "@codex corrige en esta misma rama los puntos marcados abajo."). Si la revisión es **Aprobado**, o si ya se pidieron cambios 2 veces, no se menciona a `@codex`.

## Cuando revisas una pull request de ChatGPT/Codex

Comenta con esta lista y termina con **Aprobado** o **Cambios pedidos**:

- [ ] Datos, nombres y cifras verificables; nada inventado ni sin autorización.
- [ ] Título de 50–60 caracteres y meta descripción de 140–160.
- [ ] Un solo H1 y jerarquía H2/H3 correcta.
- [ ] Palabra clave objetivo presente.
- [ ] Imágenes en WebP, máx. 200 KB, con texto alternativo descriptivo.
- [ ] Marca escrita como HumanIA.
- [ ] Solo toca archivos de su carril.
