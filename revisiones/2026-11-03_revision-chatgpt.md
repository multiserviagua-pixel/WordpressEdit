# Revisión editorial final de preparación del lanzamiento · #60

## Notas internas — informe de revisión, no publicar en la web

Revisión por HTTP del 03/11/2026 sobre nueva.humannaia.com. Lectura completa del texto extraído del HTML de las doce páginas siguientes. Todas respondieron 200, tienen un H1 y conservan noindex,nofollow. No se escribió en WordPress ni se inspeccionó la web real o /staging. No se certifica revisión visual/móvil ni pruebas de envío.

| Página | Resultado editorial |
| --- | --- |
| Portada `/` | Metadescripción, FAQ, rótulos y pie deben incorporar apps, software y webs. Carrusel y formulario con textos exactos en lanzamiento-ajustes-compartidos.md. HTML conserva marcadores de secciones ocultas: revisar visibilidad/accesibilidad antes del paso. |
| Catálogo `/servicios-humanaia/` | Meta, resumen y clasificación actualizados para incluir desarrollo sin IA obligatoria. Etiqueta corta unificada. |
| Consultoría `/servicios-humanaia/consultoria-ia/` | Corregida repetición de concretamos y referencia antigua al servicio. |
| Automatización `/servicios-humanaia/automatizacion-procesos-ia/` | Cuerpo revisado sin corrección de contenido; unificar etiqueta del enlace relacionado al montar. |
| Desarrollo `/servicios-humanaia/desarrollo-aplicaciones-software-webs/` | Cuerpo corresponde al alcance de #58; actualizar URL editorial y etiqueta corta, manteniendo H1 y SEO descriptivos. |
| Formación `/servicios-humanaia/formacion-ia-empresas/` | Cuerpo revisado sin corrección; etiqueta del enlace relacionado. |
| Escuela `/servicios-humanaia/escuela-negocios-ia/` | Sin fechas, titulaciones o precios inventados; sin corrección de cuerpo, etiqueta del enlace relacionado. |
| Educación `/servicios-humanaia/ia-educacion-docentes/` | Público y requisitos se concretan por actividad; sin corrección de cuerpo, etiqueta del enlace relacionado. |
| FAQ `/preguntas-frecuentes/` | Qué hace HumanaIA actualizado a apps móviles, software y webs; no limitar todo desarrollo a IA. |
| Aviso legal `/aviso-legal/` | Sin FUNDAE ni marcadores; titular, NIF, dirección y contacto presentes. Datos registrales ausentes: pendiente de completar/validar por persona responsable antes de considerar cerrado el apartado legal. |
| Privacidad `/politica-de-privacidad/` | Sin FUNDAE ni marcadores. Se conservan hechos declarados; validar proveedores, contrato de encargo y garantía real de transferencias. No se acredita por leer el texto. |
| Cookies `/politica-de-cookies/` | Sin FUNDAE ni marcadores. Declara solo técnicas; Claude debe contrastarlo con servicios efectivamente activos al lanzar, especialmente analítica y contenidos externos. No se ejecutó inventario de cookies en esta revisión editorial. |

## Comprobaciones y correcciones entregadas

- FUNDAE: cero coincidencias en el texto HTML extraído de las doce páginas. No confundir notas internas del repositorio con contenido publicado.
- Marcadores: solo encontrados en HTML de portada, en contadores y Proyectos reales (Nº, cliente/sector, problema/resultado, imagen/vídeo). La nota de Claude de 03/11 08:59Z acredita que Proyectos reales está oculto. Falta comprobación visual/accesible; no se afirma que sean visibles ni que el problema esté resuelto. Se entrega instrucción de exclusión pública, conservando el archivo interno y sin inventar casos.
- La etiqueta corta acordada es «Apps, software y webs». Ya se observa en menú y pie; unificar las otras etiquetas «Aplicaciones, software y webs» en catálogo, breadcrumbs y servicios relacionados. No eliminar la descripción completa de la ficha.
- Consultoría: «El desarrollo puede formar parte del trabajo posterior. Definimos contigo su alcance al plantear el proyecto».
- Los títulos SEO de las nueve páginas comerciales están dentro de 50–60 caracteres; las descripciones de los archivos revisados, entre 140–160. Avisos legales conservan títulos breves por su función; no se rellenan con palabras clave.
- Fotos, credenciales y testimonios se conservan según estado documentado; no se amplían ni se crean citas o métricas nuevas.

## Aspectos legales que requieren evidencia, no texto inventado

El artículo 10.1.b de la [LSSI, BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10) contempla los datos de inscripción registral cuando corresponda. La ausencia de esos datos en una sociedad no permite declarar este control como aprobado; la persona responsable debe aportarlos o validar su situación. No se añade un marcador visible para suplirlos.

La política de privacidad afirma condiciones de proveedores y transferencias que deben corresponder a los contratos reales. La [AEPD](https://www.aepd.es/preguntas-frecuentes/6-transferencias-internacionales-bcr-codigos-de-conducta/1-transferencias-internacionales/FAQ-0601-supuestos-rgpd-para-transferencias-internacionales) distingue decisiones de adecuación y otras garantías; no se deduce de la marca Google qué mecanismo aplica al contrato concreto. Se deja esta validación al responsable con evidencia, sin sustituirla por una promesa genérica.

No se certifica cumplimiento legal integral ni se altera titularidad, NIF, conservación, contratos o consentimiento. La revisión editorial queda realizada; lanzamiento pendiente de montaje de correcciones, comprobación final y decisiones de #60.

## Rama temporal

Por encargo humano directo se borró `claude/48-medio-temporal`, fijando el borrado al SHA 8aa0c86ddf4ac3da6c4d520e4a154b871eeddb35 para evitar borrar trabajo posterior. No había PR abierta de esa rama; comprobación remota posterior sin coincidencias.
