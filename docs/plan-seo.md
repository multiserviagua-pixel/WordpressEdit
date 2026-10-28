# Plan SEO · primeros en Google España

_27/10/2026 · #20 · Autor: Claude · Revisa: ChatGPT/Codex · Decide: persona responsable_

**Objetivo de la persona responsable (27/10/2026):** estar en los primeros puestos de los buscadores, empezando por **Google España**.

**Estado de este documento:** plan **propuesto**, no autorizado. Las metas, la estrategia local y las nuevas fichas se presentan primero a la persona responsable en el chat; nada de lo de abajo se ejecuta hasta que ella lo acepte (revisión de #44, punto 4). La aprobación de esta PR no acepta la estrategia.

**Datos y evidencia:** OpenRush, herramienta `inspect_keyword` (y `research_keywords`), mercado España (país; OpenRush no admite ciudad ni indica dispositivo), idioma español. Muestras observadas el 27/10/2026 entre las 17:52 y las 18:18 UTC (`observed_at`, origen `live_serp`); la consulta se puede repetir con `inspect_keyword` y la misma búsqueda, país e idioma. Campos usados:

- **Volumen/mes** = `monthly_volume`, media mensual de los últimos 12 meses.
- **Competencia en anuncios** = `competition_level` (LOW/MEDIUM/HIGH) y **CPC** = `cpc_usd`. Miden la puja en Google Ads, **no** la dificultad orgánica.
- **SERP** = `serp_top` y `serp_features` de la misma consulta: una sola muestra, sin repetición por ubicación ni dispositivo.

La **dificultad orgánica no se ha medido**. Lo que se dice abajo sobre ella son hipótesis de trabajo deducidas de una SERP.

**Lo que este plan no promete:** Google no garantiza posiciones. El plan propone un orden de prioridad de búsquedas y qué haría cada uno.

**Hasta el lanzamiento no cuenta nada:** la nueva web está en `noindex` a propósito. Todo lo de abajo se prepara antes para posicionar desde el primer día.

## 1. Qué hay hoy en Google España

- **«consultoría ia» (320/mes; competencia en anuncios MEDIUM, CPC 6,68 $; intención `informational`).**
  - Arriba: resumen de IA de Google y bloque de empresas en el mapa (*local pack*).
  - Orgánicos (muestra de las 18:17 UTC): Accenture, `ia-consultoria.com`, YouTube, Ringover y blogs de consultores.
- **«consultoria inteligencia artificial» (90/mes; competencia en anuncios LOW, CPC 8,95 $; intención `commercial`).**
  - Arriba: también bloque del mapa y anuncios.
  - Orgánicos: KeepCoding, EY, consultoras pequeñas, rankings e IBM.
- **«inteligencia artificial ávila»:** en la muestra del 27/10 no aparece ningún proveedor de servicios entre los 10 primeros; salen libros, noticias de Tribuna de Ávila y Ávilared, y YouTube. **Hipótesis:** hay poca oferta local posicionada; falta comprobarlo con más muestras.
- **«inteligencia artificial para docentes» (50/mes):** guías y herramientas. Un competidor de referencia (iaexperience.es) aparece 6.º con una página de curso.
- **«curso ia para empresas» (90/mes):** Google, academias y escuelas de negocio. Competencia en anuncios HIGH y CPC de unos 15 $.

**Lectura (hipótesis):** en los términos nacionales genéricos aparecen marcas grandes con mucha autoridad. Parece más alcanzable empezar por lo local, los nichos y el bloque del mapa, que en la muestra aparece por encima de Accenture. En el bloque del mapa influyen la relevancia, la distancia y la prominencia de la ficha ([Google](https://support.google.com/business/answer/7091)), así que la posición depende también de desde dónde se busque.

## 2. Búsquedas objetivo, por niveles

| Nivel | Búsqueda | Volumen/mes (`monthly_volume`) | Competencia en anuncios (`competition_level`) | Página candidata (propuesta) |
| --- | --- | --- | --- | --- |
| A · local y marca | HumanaIA, Humanaia Ávila | marca (sin dato) | sin dato | Inicio |
| A | consultoría IA Ávila · formación IA Ávila · inteligencia artificial Ávila | sin dato | sin dato; en la SERP de muestra no hay proveedores en el top 10 | Inicio + ficha de Google Business Profile |
| A | bloque del mapa para «consultoría ia» o «consultoria inteligencia artificial» buscadas desde Ávila y alrededores | — | no aplica | Google Business Profile |
| B · nicho comercial | consultoria inteligencia artificial | 90 | LOW (CPC 8,95 $) | Ficha de consultoría |
| B | inteligencia artificial para docentes | 50 | HIGH (CPC 1,77 $) | Ficha de docentes |
| B | agentes de ia para empresas | 70 | MEDIUM (CPC 9,67 $) | Ficha de desarrollo a medida |
| B | automatización de procesos con ia | 210 | MEDIUM (CPC 6,16 $) | Ficha de automatización |
| B | consultoría ia | 320 | MEDIUM (CPC 6,68 $) | Ficha de consultoría (ver nota) |
| C · volumen alto | formación en inteligencia artificial · formación ia | 260 · 480 | «formación ia»: HIGH (CPC 11,09 $); la otra, sin consultar en esta ronda | Ficha de formación |
| C | curso ia para empresas · curso inteligencia artificial | 90 · 1.900 | «curso ia para empresas»: HIGH (CPC 14,85 $); la otra, sin consultar en esta ronda | Ficha de formación + contenidos |
| C · informativas | inteligencia artificial en educación (110) · automatización con ia (260) | — | variable | Blog/Recursos, cuando exista |

**Sin plazos:** la versión anterior daba plazos (1–3, 3–6 meses…). No se pueden deducir de una SERP, así que se retiran; el orden de niveles es solo una hipótesis de prioridad.

**Regla:** una búsqueda principal por página, para que dos páginas no compitan por lo mismo.

**Nota sobre «consultoría ia»:** el inicio ya tiene título y meta aprobados en #40, que resumen toda la oferta; no es su búsqueda principal en este plan. La intención específica («consultoría ia») se propone para la ficha de consultoría. La asignación final de palabras clave a cada página es **análisis SEO editorial de ChatGPT**; esta tabla solo la propone. No cambia el mapa aceptado (#9) ni crea rutas: los nombres y rutas de las fichas siguen siendo los del mapa.

## 3. Quién hace qué

### Claude (SEO técnico, WordPress)

1. **Datos estructurados:**
   - `Organization` y `ProfessionalService` (empresa local): nombre HumanaIA, dirección de Ávila, teléfonos, `contacto@humannaia.com`, logotipo y zona de servicio;
   - preguntas frecuentes: se mantienen como **contenido** útil. Google retiró en 2026 los resultados enriquecidos de FAQ ([novedades de Google Search](https://developers.google.com/search/updates), entradas de mayo y junio de 2026), así que el marcado `FAQPage` no se plantea como tarea que dé visibilidad en Google;
   - `Service` en cada ficha.
2. **Títulos y descripciones:** configurar en Yoast los que entregue ChatGPT (50–60 y 140–160 caracteres). El texto y la búsqueda de cada página los decide ChatGPT; Claude los configura y comprueba. Empiezo por el inicio aprobado en #40.
3. **Mapa del sitio y robots:** el mapa del sitio solo con páginas publicables. El `noindex` se mantiene hasta el lanzamiento.
4. **Lanzamiento (solo con aprobación expresa de la persona responsable):** quitar el `noindex`, comprobar `robots.txt` y:
   - redirecciones 301 de las direcciones antiguas que cambien (las actuales `/servicios-humanaia/` y `/que-es-humanaia/` se conservan);
   - alta en Google Search Console y Bing Webmaster Tools;
   - envío del mapa del sitio.
5. **Velocidad y accesibilidad:** mantener rendimiento y accesibilidad cerca de 100 (hoy, 100 y 100 en el inicio).
6. **Enlazado interno:** el inicio lleva a cada ficha, cada ficha a contacto y a sus preguntas frecuentes, y Recursos enlaza a las fichas.
7. **Seguimiento:** cada semana, posiciones de las búsquedas de esta tabla en Google España, con su historial en el repositorio, desde el lanzamiento.

### ChatGPT (textos y SEO editorial)

1. **Análisis SEO editorial:** intención, palabra clave principal de cada página y metadatos (título y meta descripción).
2. **Fichas de servicio:** una por línea confirmada, centrada en su búsqueda y con estas partes:
   - para quién es;
   - qué incluye y qué no;
   - formato;
   - proceso;
   - preguntas frecuentes propias;
   - siguiente paso.

   Sin datos inventados.
3. **Preguntas frecuentes:** basadas en las dudas reales que muestra Google («La gente también pregunta») y en las del equipo.
4. **Mención local natural:** Ávila y Castilla y León donde sea verdad, por ejemplo en formación presencial y sede. Sin forzar la palabra clave.
5. **Calendario de Recursos o Blog:** solo si hay capacidad para publicar con regularidad (`mapa-de-paginas.md`).

### Persona responsable (lo que solo puede hacer ella)

1. **Ficha de Google Business Profile** de HumanaIA en Ávila:
   - categoría principal de consultoría o formación;
   - los mismos nombre, dirección, teléfono y email que en la web;
   - fotos reales;
   - horario.

   Es lo que da acceso al bloque del mapa.
2. **Reseñas reales** de clientes y alumnos en esa ficha. Nunca inventadas ni compradas.
3. **Enlaces y menciones locales:** Cámara de Comercio de Ávila, asociaciones empresariales, centros educativos y universidades con los que se colabore, y medios locales (Diario de Ávila, Ávilared, Tribuna de Ávila).
4. **Aprobar** las fichas de servicio y sus rutas (#9).

### Al final del proyecto, antes del lanzamiento

- **Textos para contactar a empresas con las que HumanaIA ya ha trabajado**, para pedirles un enlace o una mención en su web. Lo redacta ChatGPT y Claude lo revisa. La persona responsable pasará la lista de empresas. Pedido el 27/10/2026: Claude debe recordárselo al terminar.

## 4. Cómo se mide

- **Antes del lanzamiento:** el índice técnico de la nueva web (`informe.md`, SEO técnico 87,7 en el inicio) y este plan en marcha.
- **Después del lanzamiento:**
  - posición semanal de cada búsqueda de la tabla;
  - clics e impresiones en Search Console;
  - aparición en el bloque del mapa desde Ávila.

  **Metas propuestas (no son previsiones ni están aceptadas):** por ejemplo, nivel A en el top 3 y nivel B en el top 10. Las fija la persona responsable tras verlas en el chat y se revisan con datos reales tras el lanzamiento.
- **Revisión:** cada trimestre se revisan la tabla y los niveles con datos reales.
