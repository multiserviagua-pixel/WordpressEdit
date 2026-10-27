# Prototipo de la portada · nueva web HumanaIA

_27/10/2026 · Issue #20 · Autor: Claude · Revisa: ChatGPT/Codex · Aprueba: persona responsable_

Prototipo visual de la página de inicio de https://nueva.humannaia.com, pedido por la persona responsable en el chat del 27/10/2026. Sirve de base para la cabecera, el pie y la estructura del inicio. **Los textos son provisionales**: los definitivos los redacta ChatGPT (#9) y pasan por revisión antes de llevarlos a WordPress.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada completa, independiente (ábrela en el navegador). Usa el logotipo de `docs/marca/`. |
| `mapa-del-sitio.html` | Mapa de páginas propuesto y de dónde viene cada idea. |
| `fuente/*.dc.html` | Fuente del lienzo de diseño en claude.ai, por si hay que seguir editándolo allí. |

## Decisiones de la persona responsable (27/10/2026)

- Formato inspirado en la estructura de iaexperience.es, con identidad propia de HumanaIA (no se copia su diseño ni sus textos).
- Consultoría aplicada, automatizaciones y desarrollos a medida pesan tanto como la formación.
- Mucho blanco y degradados suaves; sin franjas oscuras.
- Tarjetas de servicios en carrusel; proyectos con secuencia de degradado de claro a azul.
- Animaciones al hacer scroll y al deslizar los carruseles.

## Diseño

- Colores y tipografía de `docs/sistema-diseno.md`: azul noche `#02162D`, Azul HumanaIA `#0050D0` (botones), celeste `#50B0F0`, celestes claros `#E3F0FD` / `#F3F8FD`, gris texto `#4F5B66`; Manrope.
- Secciones: cabecera flotante (menú plegable en móvil) → apertura → cinta de clientes → carrusel de servicios → manifiesto «La IA no sustituye el criterio» → lista de soluciones con filtro → «Así trabajamos» (4 pasos) → proyectos → equipo → opiniones → preguntas frecuentes → contacto → pie.
- Animaciones solo con CSS (sin JavaScript). Se desactivan con «reducir movimiento» del sistema; en navegadores sin animaciones por scroll la página se ve igual, sin movimiento.

## Pendiente de confirmar

Todo lo que va entre corchetes en la página es un hueco, no contenido:

- `[PENDIENTE DE CONFIRMAR: cifras]` personas formadas, organizaciones, automatizaciones y desarrollos entregados.
- `[PENDIENTE DE CONFIRMAR: logos de clientes y permisos]`.
- `[PENDIENTE DE CONFIRMAR: casos]` proyectos reales autorizados (problema, solución, resultado).
- `[PENDIENTE DE CONFIRMAR: opiniones reales]`; no se inventan testimonios.
- `[PENDIENTE DE CONFIRMAR: fotos reales]` del equipo y de la actividad (#6); imágenes del paquete de ChatGPT (#30).
- `[PENDIENTE DE CONFIRMAR: bonificación por FUNDAE]`.
- Etiqueta «Nuevo» de la apertura y frases de servicio: provisionales hasta los textos de #9.
- El formulario es de muestra: no envía nada.
