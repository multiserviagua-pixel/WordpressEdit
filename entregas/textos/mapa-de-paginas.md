# HumanaIA — arquitectura de contenidos y mapa de páginas

Fecha: 27/10/2026 · Issue #9 · Autor: ChatGPT/Codex · Revisor: Claude.
Estado: propuesta de trabajo. Las ocho áreas siguientes son una propuesta nueva de organización; no se presentan como transcripción de las ocho secciones de HumanaIA 2.0, cuyo original falta. No crear páginas hasta cerrar las decisiones y la revisión.

[PENDIENTE DE CONFIRMAR: propuesta HumanaIA 2.0]

La propuesta original todavía no está en el repositorio, según aclara la persona responsable. Las áreas y recorridos de este borrador son sugerencias nuevas, no decisiones vigentes. Solo las rutas documentadas y las reglas del repositorio sirven de base confirmada; no implementar las áreas propuestas hasta contrastar el original y obtener las revisiones previstas.

## Convención de URL y preservación

Las rutas se expresan relativas a https://nueva.humannaia.com, único entorno de implementación autorizado. No se ejecuta ninguna migración, redirección ni cambio sobre humannaia.com o /staging.

El informe.md del 26/10/2026 documenta las rutas /, /servicios-humanaia/ y /que-es-humanaia/. Se proponen conservar, pendientes de que Claude confirme el inventario en la nueva instalación. Una ruta documentada en una medición no demuestra que exista en nueva.humannaia.com. Las demás rutas son propuestas, no páginas existentes. No usar IDs de la instalación antigua como si pertenecieran a la nueva.

## Ocho áreas propuestas

| Área / página | Ruta propuesta | Objetivo del visitante | Palabra clave propuesta, sin investigación de demanda | CTA | Estado / dependencia |
| --- | --- | --- | --- | --- | --- |
| 1. Inicio | / | Entender qué hace HumanaIA, para quién y cómo empezar | formación y consultoría en inteligencia artificial | Cuéntanos qué necesitas → /contacto/ | Marca y oferta confirmadas; contacto operativo |
| 2. Servicios | /servicios-humanaia/ | Comparar necesidades, alcance y formatos | servicios de inteligencia artificial | Consultar un servicio → /contacto/ | Confirmar cinco líneas; conservar ruta documentada si procede |
| 3. Qué es HumanaIA | /que-es-humanaia/ | Conocer enfoque, equipo real y método validado | qué es HumanaIA | Hablar con HumanaIA → /contacto/ | Fotos, biografías y CONECTA aprobados |
| 4. Diagnóstico | /diagnostico/ | Orientarse según necesidad y contexto | diagnóstico de necesidades de inteligencia artificial | Ver orientación → resultado del diagnóstico | Preguntas y reglas de ChatGPT; desarrollo y pruebas de Claude |
| 5. Laboratorio | /laboratorio/ | Explorar ejemplos y recursos explicados | recursos prácticos de inteligencia artificial | Explorar un recurso → ficha disponible | Alcance, contenido y mantenimiento confirmados |
| 6. Casos | /casos/ | Valorar experiencias documentadas | casos de aplicación de inteligencia artificial | Consultar una necesidad similar → /contacto/ | Solo habilitar con al menos un caso autorizado; sin testimonios inventados |
| 7. Preguntas frecuentes | /preguntas-frecuentes/ | Resolver dudas sobre servicios y siguiente paso | preguntas sobre formación y consultoría en IA | Cuéntanos tu duda → /contacto/ | Respuestas comerciales verificadas |
| 8. Contacto | /contacto/ | Explicar una necesidad y conocer el siguiente paso | contacto HumanaIA | Enviar consulta | Datos reales, privacidad, formulario y entrega de mensajes probados |

Las palabras clave son hipótesis editoriales para que Claude contraste con su auditoría SEO; no se les atribuyen volumen ni posicionamiento.

## Intención de búsqueda por página

Propuesta editorial derivada del mapa, pendiente de contraste con la auditoría de Claude/OpenRush. No se atribuyen datos de demanda.

| Página | Intención principal | Límite para evitar solapamiento |
| --- | --- | --- |
| Inicio | Conocer la propuesta global de HumanaIA y elegir un recorrido | Resumen de formación y consultoría; no duplicar fichas ni listado detallado |
| Servicios | Comparar la oferta disponible y decidir qué consultar | Catálogo y alcance; las fichas confirmadas desarrollan cada servicio |
| FAQ | Resolver dudas antes de contactar o contratar | Respuestas concretas; enlazar al servicio pertinente, sin repetir su texto ni usar «servicios de IA» como objetivo principal |

Las preguntas clave de FAQ se decidirán al verificar la oferta y las dudas reales. Claude validará correspondencia entre intención, palabra clave, título y URL; no crear páginas solo para variantes de una misma consulta.

## Páginas subordinadas y auxiliares

- Servicios: crear una ficha por línea confirmada bajo /servicios-humanaia/<slug-aprobado>/. [PENDIENTE DE CONFIRMAR: los cinco nombres y slugs]. No fijar slugs a partir de una oferta inventada.
- Casos: /casos/<slug-autorizado>/ con problema, intervención, límites y evidencia autorizada. Ocultar el área del menú si no hay material publicable.
- Laboratorio: /laboratorio/<slug-recurso>/ con objetivo, instrucciones, límites y fecha de revisión. Etiquetar los ejemplos como demostraciones; no atribuirles resultados reales.
- Blog: /blog/ y /blog/<slug-articulo>/, subordinado al área de recursos en la navegación, si existe capacidad editorial. [PENDIENTE DE CONFIRMAR: calendario, autoría y responsable]. No abrir una sección vacía.
- Aviso legal, privacidad y cookies: propuestas `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies/`. [PENDIENTE DE CONFIRMAR: rutas legales existentes, titularidad y textos vigentes]. Accesibles desde el pie cuando se validen; no cambiar rutas existentes sin inventario ni redactar datos de titularidad inventados.
- Estados de interfaz: confirmación de contacto, errores y página no encontrada con salida a inicio/contacto. No necesitan áreas nuevas del menú.

## Navegación y recorridos

Cabecera propuesta: Servicios · Qué es HumanaIA · Recursos · Contacto. «Recursos» es un botón de submenú, sin página ni ruta `/recursos/`; agrupa Laboratorio, FAQ y Blog solo cuando estén disponibles. Claude debe implementarlo como control accesible, operable por teclado y táctil, no como enlace ficticio a `#`. Casos se incorpora al existir evidencia autorizada. Diagnóstico puede ser el botón destacado cuando esté probado; mientras tanto el destacado conduce a Contacto.

Pie propuesto: marca, contacto validado, enlaces legales y acceso a las áreas publicables. No mostrar correo de Ester hasta confirmarlo en #6, ni inventar teléfonos, dirección o perfiles sociales.

Recorridos principales:
1. Necesidad conocida: Inicio → Servicios → ficha confirmada → Contacto.
2. Necesidad poco definida: Inicio → Diagnóstico → orientación → servicio o Contacto.
3. Búsqueda de confianza: Inicio/Servicio → Qué es HumanaIA → caso autorizado si existe → Contacto.
4. Aprendizaje: Laboratorio/Blog → recurso → servicio relacionado o Contacto.

En móvil, la primera pantalla del inicio debe permitir entender la propuesta y ver el siguiente paso. Validación visual posterior a cargo de ChatGPT; no se afirma que actualmente se cumpla.

## Estructura de contenido por plantilla

Inicio: H1 y explicación concreta → CTA → necesidades y servicios → forma de trabajar, con CONECTA solo tras validación → equipo/evidencia autorizada → dudas esenciales → contacto.

Servicio: H1 → destinatario/necesidad → qué incluye y qué queda fuera → formato y condiciones verificadas → proceso → evidencia disponible → FAQ específica → CTA con contexto.

Marca: H1 → propósito y enfoque → equipo y funciones confirmadas → método validado → datos de contacto.

Caso: H1 → contexto autorizado → problema → intervención demostrable → evidencia y límites → siguiente paso. Si no hay evidencia suficiente, no publicarlo como caso.

Recurso: H1 → objetivo → instrucciones → ejemplo rotulado como ejemplo → límites/fecha/autor → siguiente paso.

Cada página publicable usa entregas/textos/_plantilla.md: un solo H1, H2/H3 coherentes, palabra clave aprobada, título SEO de 50–60 caracteres y descripción de 140–160. Este mapa y marca.md son documentos internos, no páginas con metadatos publicables.

## Contrato de contenido para el diagnóstico

Propuesta funcional para validar, todavía sin cuestionario aprobado:
- Recoger contexto, necesidad principal, experiencia y preferencia de acompañamiento; evitar pedir datos sensibles.
- Cada respuesta debe llevar a una recomendación de una oferta realmente disponible o a contacto si no existe encaje.
- Permitir «No lo sé» y volver atrás; no forzar una recomendación comercial.
- Explicar por qué aparece una orientación y sus límites. No diagnosticar personas ni asignar puntuaciones de capacidad o éxito empresarial.
- El acceso a la orientación no debe depender de entregar datos de contacto, salvo decisión explícita y revisión de privacidad.
- ChatGPT entrega preguntas, textos de resultados y tabla de reglas; Claude valida viabilidad y prueba todas las rutas, incluidos vacíos y errores.

[PENDIENTE DE CONFIRMAR: alcance definitivo del diagnóstico, datos que se conservarán, texto de privacidad y oferta a la que enlaza cada resultado].

## Dependencias y puertas de implementación

| Orden | Entrega | Responsable | Condición de salida |
| --- | --- | --- | --- |
| A, en paralelo | #9: marca y arquitectura; #20: inventario de nueva web | ChatGPT / Claude respectivamente | Original contrastado, decisiones registradas y factibilidad revisada |
| B | Tema, constructor, plugins y recursos de marca | Propuesta de Claude; decide persona responsable | Aprobación humana y copia previa para cambios técnicos que lo exijan |
| C | Texto del inicio y prototipo con cabecera/pie | ChatGPT / Claude | Texto revisado por el otro agente y fusionado por el flujo autorizado; aceptación humana del prototipo como entrega material |
| D | Servicios y contenido de confianza; formularios | ChatGPT / Claude | Oferta y evidencia verificadas, contenidos aprobados y pruebas correctas |
| E | Diagnóstico y Laboratorio | Preguntas/textos de ChatGPT; código de Claude | Reglas aprobadas y cobertura funcional completa |
| F | Comprensión, rúbrica, accesibilidad, rendimiento y SEO | Ambos según carril | Misma URL/versión medidas, revisión cruzada cerrada y aprobación humana |

#3 y #4 permanecen pendientes: definir y capturar el objeto actual permitido y obtener evidencia antes de puntuar. La nota provisional de Drive no se convierte automáticamente en datos/manual.json.

## Revisión solicitada a Claude

1. Confirmar inventario de URL, páginas e IDs de nueva.humannaia.com y compatibilidad de rutas.
2. Identificar necesidades de plantillas y bloqueos de #20; proponer cambios en este mapa mediante revisión.
3. Validar las palabras clave con evidencia y evitar páginas que compitan por la misma intención.
4. Confirmar no indexación y bloqueo de correos salientes durante construcción. Las pruebas de envío requieren destinatarios controlados y autorización antes de habilitar mensajes reales.
5. Validar rutas del diagnóstico y necesidades del Laboratorio sin instalar ni implementar antes de sus dependencias.

La revisión de Claude de #21 aprobó la entrega como parcial, no apta para implementar; este ajuste atiende sus sugerencias de Recursos, rutas legales e intención de búsqueda. La arquitectura definitiva sigue pendiente. Las PR ordinarias pueden integrarse tras revisión cruzada conforme al flujo autorizado; la aceptación humana de la entrega material es una puerta distinta. No implementar decisiones dependientes ni publicar por el mero hecho de fusionar un borrador.
