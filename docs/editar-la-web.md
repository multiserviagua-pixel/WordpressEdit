# Cómo editar la nueva web tú mismo

_27/10/2026 · Issue #20 · Autor: Claude_

La portada de https://nueva.humannaia.com está dividida en piezas con nombre propio. Puedes cambiar textos, enlaces o imágenes de una pieza sin tocar las demás.

## Dónde está cada cosa

| Qué quieres cambiar | Dónde se edita en WordPress | Afecta a |
| --- | --- | --- |
| Logo, menú y botón «Hablemos» | **Apariencia → Editor → Patrones → Partes de plantilla → Cabecera HumanaIA** | Todas las páginas con la plantilla «Lienzo HumanaIA» |
| Pie (enlaces, aviso legal, ©) | **Apariencia → Editor → Patrones → Partes de plantilla → Pie HumanaIA** | Todas las páginas con esa plantilla |
| Una sección de la portada | **Páginas → Inicio → Editar**, y en la **Vista de lista** (icono ☰ arriba a la izquierda) eliges la sección por su nombre | Solo esa sección |
| Colores, tamaños y animaciones | **Apariencia → Editor → Estilos → ⋮ → CSS adicional** | Toda la web nueva |

Secciones de la portada, en orden: **Apertura · Cinta de clientes · Carrusel · Cuéntanos tu caso · Manifiesto · Soluciones (con filtro) · Así trabajamos · Proyectos · Equipo · Opiniones · Preguntas frecuentes · Contacto**.

## Cambiar un texto

1. Abre la sección en la Vista de lista. Se ve como código HTML.
2. Busca la frase (Ctrl + F en el navegador) y cambia solo el texto que hay **entre** las etiquetas, por ejemplo `<h2 …>Este texto</h2>`.
3. Pulsa **Vista previa** dentro del bloque para comprobarlo y luego **Guardar**.

No borres las etiquetas (`<…>`) ni los atributos `class="…"`: son los que dan el diseño.

## Cambiar una imagen

1. Sube la imagen en **Medios** (WebP, máximo 200 KB, con texto alternativo).
2. Copia su URL y sustitúyela en el `src="…"` de la etiqueta `<img>` de la sección.

## Reordenar, duplicar o quitar secciones

En la Vista de lista, arrastra la sección o usa su menú ⋮ (Duplicar / Eliminar). Cada sección es independiente, así que moverla no rompe las demás.

## Si algo sale mal

Cada guardado crea una revisión: **Página → Revisiones** permite volver a la versión anterior. Las partes de plantilla y el CSS también guardan su historial.

## Reglas que siguen valiendo

- La web nueva sigue **sin indexar** hasta el lanzamiento.
- Los textos definitivos los propone ChatGPT (#9) y pasan por revisión.
- Nada de cifras, clientes ni opiniones inventados: lo que va entre corchetes es un hueco.

La copia del CSS que hay en WordPress está en `docs/prototipo-portada/wordpress/estilos-globales.css`.
