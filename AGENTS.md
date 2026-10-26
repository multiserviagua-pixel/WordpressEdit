# Instrucciones para Codex (ChatGPT) · Proyecto HumanaIA web

Este repositorio coordina la mejora de **humannaia.com** entre ChatGPT/Codex y Claude, según el *Plan de orquestación Claude + ChatGPT · HumanaIA 2.0*. Lee también `README.md`.

## Tu carril

- Estrategia, marca y mapa de páginas.
- Textos de todas las páginas (inicio, servicios, casos, FAQ, blog).
- Imágenes generadas, iconos e imagen para redes.
- Preguntas y lógica de recomendaciones del diagnóstico interactivo.
- Puntuación de contenido con `datos/rubrica.md` y test de comprensión.
- Revisión de las entregas de Claude.

**No es tu carril** (lo hace Claude): maquetar en WordPress/Elementor, SEO técnico, medios, plugins, código de `scripts/` y de `.github/workflows/`. Si algo de esto necesita cambiar, abre un issue para Claude; no lo edites.

## Reglas

1. **Marca:** en los textos se escribe siempre **HumanaIA**. El dominio y los emails siguen siendo `humannaia.com`.
2. **WordPress:** no modifiques WordPress. Si tienes acceso, solo puedes leer la nueva web `https://nueva.humannaia.com`, donde se construye la web hasta su lanzamiento. Nunca escribas en la web real `https://humannaia.com`.
3. **Nada inventado:** ni cifras, ni clientes, ni testimonios, ni casos. Lo no verificado se marca `[PENDIENTE DE CONFIRMAR: ...]`.
4. **Un dueño por archivo:** solo editas archivos de tu carril (abajo). Para cambiar algo de Claude, abre un issue.
5. **Una tarea = un issue = una rama = una pull request.**

## Cómo trabajar una tarea

1. Toma un issue con la etiqueta `dueño:chatgpt`.
2. Crea una rama `chatgpt/<numero-issue>-<tarea-corta>` desde `main`.
3. Escribe los archivos en su carpeta:
   - Textos: `entregas/textos/<pagina>.md` (plantilla en `entregas/textos/_plantilla.md`).
   - Imágenes: `entregas/imagenes/<seccion>/<nombre-descriptivo>.webp`, máx. 200 KB, con su texto alternativo en `entregas/imagenes/alt.md`.
   - Notas de rúbrica y comprensión: `datos/manual.json` (solo los campos `contenido` y `comprension`) y la justificación en `revisiones/AAAA-MM-DD_rubrica.md`.
4. Abre la pull request con la plantilla, enlazando el issue (`Cierra #N`) y marcando tu autochequeo.
5. Claude revisa. Si pide cambios, corrige en la misma rama. Cuando Claude pide cambios, su comentario empieza mencionando a `@codex`: atiéndelo en cuanto lo recibas, en esa misma rama, sin abrir otra pull request. Tras dos rondas sin acuerdo, decide la persona responsable.
6. La persona responsable aprueba y une la pull request. Después Claude lleva el contenido a la nueva web en WordPress.

## Code Review Rules

*(Cuando revisas una pull request de Claude.)*

Comenta en la pull request con esta lista y termina con **Aprobado** o **Cambios pedidos**:

- [ ] La página de la nueva web dice exactamente el texto aprobado.
- [ ] Tono, nombre HumanaIA y paleta de marca coherentes.
- [ ] La llamada a la acción se ve sin hacer scroll en móvil.
- [ ] El recorrido del visitante tiene sentido.
- [ ] Los textos alternativos describen de verdad cada imagen.
- [ ] No queda contenido de la plantilla demo.

## Archivos de tu carril

```
entregas/textos/**
entregas/imagenes/**
revisiones/*_rubrica.md
revisiones/*_comprension.md
revisiones/*_revision-chatgpt.md
datos/manual.json   (campos contenido y comprension)
```
