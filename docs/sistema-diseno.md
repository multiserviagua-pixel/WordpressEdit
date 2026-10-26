# Sistema de diseño · nueva web HumanaIA

_26/10/2026 · Issue #20 · Dueño: Claude · Revisa: ChatGPT/Codex · Aprueba: persona responsable_

Decisión de la persona responsable (26/10): la nueva web parte **de cero**, **sin Elementor**, con un **tema de bloques moderno**. Se usa **Twenty Twenty-Five** (tema oficial de WordPress, ya instalado) personalizado con estilos globales; no hace falta constructor.

## Logotipo

Aportado por la persona responsable el 26/10/2026 (sustituye al logo blanco de la web actual).

| Archivo | Uso |
| --- | --- |
| `marca/logo-humanaia-original.png` | Original, 1391×1131, fondo transparente |
| `marca/logo-humanaia.webp` | Web: recortado y a 600 px (≈ 87 KB) |
| `marca/icono-humanaia.png` | Icono del sitio, 512×512 |

## Colores

Sacados del degradado del logotipo y del cian de la web actual. Se guardan con los nombres de color del tema para que todos los patrones de Twenty Twenty-Five los usen.

| Nombre en el tema | Nombre | Color | Uso |
| --- | --- | --- | --- |
| base | Blanco | `#FFFFFF` | Fondo |
| contrast | Azul noche | `#02162D` | Texto, fondos oscuros |
| accent-1 | Celeste HumanaIA | `#50B0F0` | Destacados, hover de botones (con texto azul noche) |
| accent-2 | Celeste claro | `#E3F0FD` | Fondos de sección |
| accent-3 | Azul HumanaIA | `#0050D0` | Botones y enlaces (contraste 6,3:1 sobre blanco) |
| accent-4 | Gris texto | `#4F5B66` | Texto secundario |
| accent-5 | Fondo suave | `#F3F8FD` | Tarjetas y bandas |
| accent-6 | Línea | 20 % del color del texto | Bordes y separadores |

No usar el celeste (`accent-1`) para texto sobre blanco: no llega al contraste AA.

## Tipografía

**Manrope** para titulares y texto. Viene incluida en el tema y se sirve desde el propio servidor: sin peticiones a Google Fonts (mejor para privacidad y rendimiento). Titulares en 700 con espaciado −0,02 em.

## Botones y enlaces

- Botón: fondo Azul HumanaIA, texto blanco, esquinas redondeadas completas; al pasar el ratón o con foco, fondo celeste y texto azul noche.
- Enlaces: Azul HumanaIA, subrayados (estilo del tema); al pasar el ratón, azul noche.

## Pendiente

- Validación de ChatGPT (paleta y tono) y aprobación de la persona responsable; `marca.md` (#9) tiene la identidad visual como pendiente de confirmar.
- Cabecera, pie y plantillas cuando esté cerrado el mapa de páginas (#9).
