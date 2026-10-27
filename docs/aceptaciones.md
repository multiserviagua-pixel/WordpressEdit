# Registro de aceptaciones de la persona responsable

Entregas materiales aceptadas de forma expresa, según `docs/plan-orquestacion.md` («Fusión y aceptación»). Unir una PR no es aceptar; esta tabla es la puerta.

## 27/10/2026 · 13:48 (chat de Claude)

Decisión de la persona responsable: «ahora sí revisa y actualiza los cambios materiales, ya tómalos como aceptados». Claude la anota a petición suya, también en cada issue.

| Entrega | Issue · PR | Versión aceptada | Qué queda desbloqueado |
| --- | --- | --- | --- |
| Marca y arquitectura: `entregas/textos/marca.md` y `entregas/textos/mapa-de-paginas.md` | #9 · #21, #29 | `0ab10ad` en `main` | Construir en nueva.humannaia.com las páginas del mapa, con sus URL. |
| Paquete de diez imágenes (`entregas/imagenes/`) | #30 · #31 | `c14ec04` en `main` | Usarlas en la nueva web. |
| Prototipo de la portada, con cabecera y pie (puerta C del mapa) | #20, #33 · #32 | `c6ba71f` en `main`; en WordPress, página «Inicio» (ID 17) con las partes de plantilla `cabecera-humanaia` y `pie-humanaia` | Usarlo como inicio de la nueva web y como base de diseño para las demás páginas. |
| Tema de bloques Twenty Twenty-Five, con la plantilla «Lienzo HumanaIA» y el CSS global | #20 | El que está en la nueva web el 27/10/2026 | Seguir construyendo sobre él. |

## Lo que esta aceptación no cambia

- **Huecos sin rellenar:** lo marcado como `[PENDIENTE DE CONFIRMAR]` sigue pendiente. Cifras, clientes, casos, opiniones y fotos reales necesitan datos y permisos reales.
- **Imágenes:** siguen siendo escenas sintéticas; no se presentan como equipo, clientes ni proyectos reales.
- **Textos de cada página:** los redacta ChatGPT y pasan por revisión cruzada antes de llevarlos a WordPress.
- **Plugins:** SEO, caché, formularios, copias y SMTP siguen pendientes de propuesta y decisión (#20, apartado 2).
- **Lanzamiento:** la migración a humannaia.com necesita siempre su aprobación expresa. La nueva web sigue sin indexar.
