# Plan de orquestación Claude + ChatGPT · HumanaIA

_Actualizado: 21/10/2026 · Versión editable: documento "Plan de orquestación Claude + ChatGPT · HumanaIA 2.0" en el proyecto de Claude._

## Resumen

Claude y ChatGPT trabajan en carriles separados sobre humannaia.com, se revisan el uno al otro antes de publicar y miden juntos el avance con un índice común de 0 a 100. La propuesta de ChatGPT "HumanaIA 2.0" (marca, 5 líneas de servicio, método CONECTA, arquitectura de 8 secciones, diagnóstico interactivo y laboratorio) se toma como documento estratégico de partida; este plan define quién ejecuta cada parte, cómo se revisa y cómo se mide.

Tres principios:

- **Un dueño por objeto.** Cada página, plantilla, imagen o ajuste tiene un único agente que lo escribe; el otro solo lo revisa.
- **Nada llega a producción sin doble revisión.** El agente autor entrega, el otro revisa con una lista de control y la persona responsable aprueba.
- **Se mide antes y después.** El Sprint 0 fija la línea base; cada sprint repite la misma batería de pruebas y calcula el % de evolución.

## Estado a 21/10/2026

El Sprint 0 está en marcha: copia de pruebas creada, línea base medida (índice 71,5 sobre la parte técnica) y GitHub funcionando como centro de trabajo. Falta conectar Codex y tres decisiones de la persona responsable.

| Área | Estado | Dónde |
| --- | --- | --- |
| Marca | Nombre comercial decidido: **HumanaIA** (dominio y emails siguen en humannaia.com) | — |
| Nueva web | WordPress propio en el subdominio nueva.humannaia.com (Axarnet), con su base de datos y no indexable; ahí se construye la web hasta el lanzamiento. La copia humannaia.com/staging queda abandonada | Conector WordpressNueva |
| Web real | Sin cambios; solo lectura | Conector Wordpress |
| Centro de trabajo | GitHub con carriles, plantillas y comprobación automática de carril (PR #1 y #2 unidas) | Este repositorio |
| Medición | Nocturna en GitHub Actions; línea base 71,5/100 con el 50 % del peso medido (rendimiento 54, accesibilidad 95, SEO 71) | [`informe.md`](../informe.md) |
| Ciclo automático de Claude | Tarea programada "Turno HumanaIA web": laborables 8:59, 11:59, 14:59, 17:59 y 20:59 | [Bitácora #11](https://github.com/multiserviagua-pixel/WordpressEdit/issues/11) |
| Correcciones en la copia | Marca, erratas, enlaces, SEO de 3 páginas y texto alternativo de 12 imágenes | [Issue #10](https://github.com/multiserviagua-pixel/WordpressEdit/issues/10) |
| Codex (ChatGPT) | Pendiente de conectar al repositorio; tiene asignadas las tareas #3, #4 y #9 | [`AGENTS.md`](../AGENTS.md) |

**Decisiones pendientes de la persona responsable:** papelera de 80 borradores de la plantilla en la copia; desactivar WPForms y AI Engine en la copia; corregir a mano el banner o esperar al Sprint 2 (#8); confirmar el email de Ester y compartir fotos reales (#6); copia de seguridad de la web real (#5).

## Reparto de roles

ChatGPT lleva la estrategia, el texto y las imágenes; Claude lleva la ejecución técnica en WordPress, el SEO técnico, el desarrollo y las pruebas; la persona responsable decide y aprueba. El reparto sigue las fortalezas de cada uno, y ChatGPT entrega su trabajo en GitHub mediante Codex y no edita WordPress, así que nunca hay dos agentes tocando Elementor a la vez.

| Área | Dueño (escribe) | Revisor | Por qué este reparto |
| --- | --- | --- | --- |
| Estrategia, marca, método CONECTA, mapa de páginas | ChatGPT | Claude | Ya redactó la propuesta HumanaIA 2.0; Claude contrasta con lo que existe en el sitio |
| Textos: inicio, servicios, casos, FAQ, blog | ChatGPT | Claude | Redacción y tono; Claude revisa datos, SEO on-page y longitud |
| Imágenes generadas, iconos, imagen para redes | ChatGPT | Claude | Genera imágenes; Claude revisa peso, formato, alt y coherencia |
| Maquetación en Elementor, plantillas, menús | Claude | ChatGPT | Acceso de escritura a la copia vía Easy MCP AI; ChatGPT revisa fidelidad al texto y a la marca |
| SEO técnico: Yoast, schema, redirecciones, sitemap | Claude | ChatGPT | Datos de OpenRush y Site Kit; ChatGPT revisa títulos y descripciones como redactor |
| Medios: subida, WebP, alt, limpieza de la demo | Claude | ChatGPT | Operaciones masivas en la biblioteca |
| Diagnóstico interactivo y Laboratorio (código) | Claude | ChatGPT | Desarrollo y pruebas automatizadas; ChatGPT revisa preguntas, rutas y textos |
| Preguntas del diagnóstico y lógica de recomendaciones | ChatGPT | Claude | Contenido de negocio; Claude valida que sea implementable |
| Plugins, actualizaciones, copias, staging | Claude | Persona responsable | Riesgo técnico alto; siempre con copia previa |
| Pruebas: rendimiento, accesibilidad, enlaces, formularios | Claude | ChatGPT | Batería automatizada |
| Pruebas de comprensión y recorrido de usuario | ChatGPT | Claude | Simula perfiles de visitante y puntúa con rúbrica |
| Fotos reales, autorizaciones de casos, aprobación final | Persona responsable | — | Ningún agente puede aportarlas ni decidirlas |

## Reglas de orquestación

La coordinación pasa por GitHub (este repositorio) y por el registro de auditoría de Easy MCP AI, que anota qué agente toca qué en WordPress y cuándo.

1. **Una tarea = un issue = una rama = una pull request.** Cada issue lleva dueño, revisor y sprint (etiquetas `dueño:*`, `revisa:*`, `sprint-*`). Ramas `chatgpt/<issue>-…` o `claude/<issue>-…`.
2. **Instrucciones en el propio repositorio.** [`AGENTS.md`](../AGENTS.md) (lo lee Codex) y [`CLAUDE.md`](../CLAUDE.md) (lo lee Claude) fijan carriles, reglas y listas de control.
3. **Comprobación automática de carril.** Si una rama de ChatGPT toca código o una de Claude toca textos o imágenes de ChatGPT, la pull request falla.
4. **ChatGPT entrega en GitHub, no en WordPress.** Textos en `entregas/textos/`, imágenes en `entregas/imagenes/`; Claude los lleva a la copia cuando la pull request está unida.
5. **Solo la nueva web se modifica.** Toda escritura va a nueva.humannaia.com; la web real queda intacta hasta el lanzamiento.
6. **Nada se une sin la persona responsable.** Las IAs proponen y revisan; solo ella une a `main`.
7. **Nada destructivo en automático.** Borrar, cambiar plugins o ajustes de seguridad queda como `decide-persona`.
8. **Pausa y trazabilidad.** La etiqueta `pausa` detiene a los agentes; cada turno deja resumen en la bitácora #11 y los cambios en WordPress se anotan en su issue (página, ID, cambio).
9. **Material en bruto en Drive.** Fotos originales y archivos grandes se comparten por Drive; lo que va a la web pasa por GitHub.

## Revisión cruzada

Cada entrega la revisa el agente que no la hizo, con una lista de control fija; si no la supera vuelve al autor, y tras dos rondas sin acuerdo decide la persona responsable.

```mermaid
flowchart LR
    T[Tarea en tablero<br/><i>dueño y revisor</i>] --> A[Autor entrega<br/><i>con autochequeo</i>]
    A --> R[Revisión cruzada<br/><i>el otro agente</i>]
    R --> D{¿Cumple la lista?}
    D -- "no: cambios al autor<br/>(máx. 2 rondas, luego decide la persona)" --> A
    D -- sí --> S[Copia de pruebas y pruebas<br/><i>batería conjunta</i>]
    S --> H[Aprobación humana<br/><i>persona responsable</i>]
    H --> P[Publicar y medir<br/><i>Claude, con registro</i>]
```

**Lista de control de Claude al revisar a ChatGPT:** datos y nombres verificables, sin casos ni métricas sin autorización; título de 50–60 caracteres y descripción de 140–160; un solo H1 y jerarquía H2/H3; palabra clave objetivo presente; imágenes ≤ 200 KB en WebP con alt descriptivo; marca escrita como HumanaIA.

**Lista de control de ChatGPT al revisar a Claude:** la página publicada dice exactamente el texto aprobado; tono y paleta de marca; llamada a la acción visible sin hacer scroll en móvil; recorrido del visitante coherente; textos alternativos que describen de verdad la imagen; nada de contenido de la plantilla demo.

## Fases y sprints

Las 8 fases de la propuesta de ChatGPT se agrupan en 5 sprints; se proponen sprints de dos semanas, unas 11 semanas en total, a ajustar con la disponibilidad real del equipo. En cada sprint los dos agentes trabajan en paralelo sobre objetos distintos, y no se pasa al siguiente sin superar su puerta.

| Sprint | ChatGPT | Claude | Puerta de salida |
| --- | --- | --- | --- |
| **0 · Proteger y medir** | Rúbrica de contenido; test de comprensión del inicio | Copia, staging y borradores; línea base del índice | Índice base publicado |
| **1 · Identidad y arquitectura** | Documento maestro de marca; mapa de páginas y URL | Auditoría SEO y palabras clave; limpieza de demo y erratas | Posicionamiento aprobado |
| **2 · Diseño y plataforma** | Texto del inicio; imágenes e iconos | Prototipo y sistema de diseño; actualizaciones en la copia | Prototipo validado |
| **3 · Contenido y desarrollo** | Servicios, casos y FAQ; preguntas del diagnóstico | Plantillas y contenidos tipo; diagnóstico y laboratorio | Pruebas funcionales correctas |
| **4 · SEO y lanzamiento** | Revisión final de textos; test con 3 personas reales | Schema, sitemap y redirecciones; migración y monitorización | **Índice ≥ meta y aprobación** |

Cada puerta exige: revisión cruzada cerrada, batería de pruebas pasada y comparada con el sprint anterior, y aprobación de la persona responsable.

## Pruebas conjuntas y % de evolución

Al final de cada sprint los dos agentes pasan la misma batería sobre las mismas URL y el resultado se resume en un Índice HumanaIA de 0 a 100. Claude ejecuta las pruebas automáticas, ChatGPT las de comprensión y contenido, y cada uno revisa los resultados del otro. Una diferencia de más de 10 puntos entre las notas de ambos en una misma prueba obliga a revisarla con la persona responsable. El detalle técnico de la medición está en [`MEDICION.md`](../MEDICION.md).

### Batería de pruebas del sitio

| Bloque | Peso | Qué se mide | Quién ejecuta | Herramienta |
| --- | --- | --- | --- | --- |
| Rendimiento | 20 % | LCP ≤ 2,5 s, INP ≤ 200 ms (TBT en laboratorio), CLS ≤ 0,1 en móvil; nota Lighthouse | Claude | GitHub Actions + Lighthouse |
| Accesibilidad | 15 % | Nota Lighthouse, alt en imágenes, contraste, foco | Claude | Lighthouse + revisión manual |
| SEO técnico | 15 % | Auditoría de sitio, metadatos, schema, enlaces rotos, indexación | Claude | Checklist propia, OpenRush, Search Console |
| Contenido | 20 % | Rúbrica de 10 criterios ([`datos/rubrica.md`](../datos/rubrica.md)) | ChatGPT puntúa, Claude revisa | Rúbrica compartida |
| Comprensión | 15 % | ¿Un visitante entiende en 60 s qué hace HumanaIA, para quién y cómo empezar? 5 perfiles simulados + 3 personas reales | ChatGPT | Test y guion |
| Conversión | 15 % | Contactos, uso del diagnóstico, clics en llamadas a la acción | Claude | Site Kit (GA4) |

### Fórmulas

Cada métrica se normaliza a 0–100 frente a su objetivo; el índice es la suma ponderada:

```math
I = \sum_{k} w_k \cdot \min\left(100,\ 100 \cdot \frac{m_k}{\text{objetivo}_k}\right)
```

La evolución de cada sprint y el avance hacia la meta:

```math
\%\,\text{evolución} = 100 \cdot \frac{I_{\text{actual}} - I_{\text{base}}}{I_{\text{base}}} \qquad \%\,\text{avance} = 100 \cdot \frac{I_{\text{actual}} - I_{\text{base}}}{I_{\text{meta}} - I_{\text{base}}}
```

En métricas donde menos es mejor (LCP, CLS, errores) se usa objetivo / valor en lugar de valor / objetivo. La evolución solo compara los bloques medidos en ambas fechas.

### Desempeño de los agentes

| Métrica | Cómo se calcula | Meta |
| --- | --- | --- |
| Aprobación a la primera | Entregas aceptadas sin cambios / entregas | ≥ 70 % |
| Defectos hallados en revisión cruzada | Defectos que el revisor encuentra por entrega | Bajando sprint a sprint |
| Defectos escapados | Errores que llegan a producción | 0 críticos |
| Retrabajo | Horas de corrección / horas totales | ≤ 20 % |
| Cambios fuera de tablero | Cambios en el registro de auditoría sin tarea | 0 |

Los objetivos numéricos de conversión se fijan cuando haya cuatro semanas de datos.

## Herramientas

Ya están en marcha Easy MCP AI (web real y copia), GitHub con Actions, WP Staging y OpenRush. Faltan conectar Codex, una copia de seguridad de la web real, optimización de imágenes y caché.

### Conectores y servicios

| Conector o servicio | Para quién | Uso en el plan | Estado |
| --- | --- | --- | --- |
| [Easy MCP AI](https://easymcpai.com/blog/claude-mcp-wordpress) · web real ("Wordpress") | Claude y ChatGPT | Solo lectura y comparación | Conectado |
| Easy MCP AI · nueva web ("WordpressNueva") | Claude (escritura), ChatGPT (lectura) | Todo el trabajo en WordPress | Conectado a Claude |
| GitHub (este repositorio) | Ambos | Centro de trabajo: issues, pull requests, revisiones, medición | Conectado a Claude |
| Codex (ChatGPT) | ChatGPT | Escribir en GitHub: ramas y pull requests de contenido | Pendiente de conectar |
| GitHub Actions + Lighthouse | Automático | Medición nocturna del índice | Funcionando |
| OpenRush | Claude | Auditoría SEO, palabras clave, competidores | Conectado |
| Google Drive | Ambos | Fotos originales y material en bruto | Conectado a Claude |
| Search Console y GA4 ([guía](https://seranking.com/blog/best-seo-mcps/)) | Ambos | Clics, consultas y conversiones; disponibles en Easy MCP AI | Sin conectar |

### Plugins de WordPress

| Plugin | Acción | Motivo |
| --- | --- | --- |
| WP Staging | Instalado (21/10) | Copia de pruebas; también hace copias de seguridad. Pasar cambios a la web real con un clic requiere la versión Pro |
| UpdraftPlus o copia del hosting | Pendiente | Copia completa de la web real antes de tocarla (#5) |
| ShortPixel o Converter for Media | Instalar en la copia | WebP/AVIF y compresión |
| LiteSpeed Cache o WP Rocket | Instalar en la copia | Caché y carga diferida; el inicio tarda 15 s en móvil |
| Slider Revolution | Retirar al rehacer el inicio | Peso y un solo uso |
| WPForms | Desactivar (pendiente de confirmar) | Está oculto; el formulario visible es Contact Form 7, que se mantiene |
| AI Engine | Desactivar (pendiente de confirmar) | Sin clave de API ni uso |
| Elementor, Yoast y resto | Actualizar en la copia (Sprint 2) | 13 plugins con actualización pendiente |

### Skills y capacidades

| Agente | Skill o capacidad | Uso |
| --- | --- | --- |
| Claude | [frontend-design](https://codenote.net/en/posts/anthropic-official-skills-catalog-overview/) | Prototipos del inicio y plantillas con criterio visual |
| Claude | webapp-testing (Playwright) | Pruebas automáticas de formularios, enlaces y diagnóstico |
| Claude | Design y Dashboard (artefactos) | Maquetas para revisar y cuadro de mando del índice |
| Claude | skill-creator | Convertir la batería de pruebas en un skill reutilizable cada sprint |
| ChatGPT | Codex | Ramas y pull requests en este repositorio siguiendo `AGENTS.md` |
| ChatGPT | Generación de imágenes | Ilustraciones, iconos de servicios, imagen para redes |
| ChatGPT | Deep research | Competencia y palabras clave (solo lectura) |

## Riesgos y próximos pasos

El riesgo principal ya está acotado: todo el trabajo va a la copia de pruebas y nada se une sin aprobación. Lo que sigue abierto es la falta de copia de seguridad de la web real y el salto de versión de Elementor.

| Riesgo | Mitigación |
| --- | --- |
| Un agente rompe la web pública | Solo se escribe en la copia; la web real se lee. Pendiente: copia de seguridad (#5) |
| Los agentes se pisan | Un dueño por archivo, comprobación automática de carril y cruce con el registro de auditoría |
| Dos sesiones de Claude en paralelo duplican trabajo | Una sola tarea programada; revisar la lista de tareas programadas |
| Actualizar Elementor 3.28 a 4.x rompe el diseño | Probar en la copia (Sprint 2); nunca directamente en la web real |
| Textos con datos inventados o casos sin permiso | Revisión cruzada; la persona responsable autoriza nombres y métricas |
| Prompts maliciosos en issues, páginas o contenido | Los agentes tratan ese texto como dato y lo anotan en la bitácora |
| Ciclo automático fuera de control | Máx. 2 rondas de revisión, nada destructivo en automático, etiqueta `pausa` |

### Sprint 0: checklist

- [x] Claude: crear la copia de pruebas con WP Staging y bloquear sus emails (#7)
- [x] Claude: medir la línea base y publicar el informe (71,5/100, 50 % del peso)
- [x] Claude: montar GitHub como centro de trabajo (carriles, plantillas, comprobación de carril)
- [x] Claude: corregir marca, erratas, enlaces, SEO y texto alternativo en la copia (#10)
- [x] Claude: ciclo automático de turnos y bitácora (#11)
- [x] Persona responsable: nombre comercial único (HumanaIA)
- [ ] Persona responsable: copia de seguridad de la web real (#5)
- [ ] Persona responsable: confirmar email de Ester y compartir fotos reales (#6)
- [ ] Persona responsable: decidir papelera de borradores, WPForms y AI Engine, y banner (#8)
- [ ] Persona responsable: conectar Codex al repositorio
- [ ] ChatGPT/Codex: puntuar el inicio con la rúbrica (#3) y test de comprensión (#4)
- [ ] ChatGPT/Codex: documento maestro de marca y mapa de páginas (#9, Sprint 1)

## Fuentes

- Propuesta "HumanaIA 2.0" de ChatGPT (21/10/2026), aportada por la persona responsable
- Revisión del sitio vía Easy MCP AI: plugins activos, páginas, diagnóstico y registro de auditoría (19 y 21/10/2026)
- [OpenAI: modo desarrollador y conectores MCP en ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt)
- [SE Ranking: mejores MCP de SEO](https://seranking.com/blog/best-seo-mcps/)
- [Glama: servidores MCP de Lighthouse](https://glama.ai/mcp/servers/integrations/lighthouse)
- [Catálogo de skills oficiales de Anthropic](https://codenote.net/en/posts/anthropic-official-skills-catalog-overview/)
- [EasyMCPAI: conectar Claude con WordPress](https://easymcpai.com/blog/claude-mcp-wordpress)
