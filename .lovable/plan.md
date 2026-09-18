# Rediseño de AI Coach — Hablar en vivo

## Resultado

La pestaña **Hablar** se convertirá en una experiencia móvil enfocada en la pregunta actual de Vale, usando la conversación de voz real que ya existe. Se conservarán el avatar actual, Gemini Live, las interrupciones, el límite de 5 minutos por sesión y 15 minutos diarios, el acceso privado y el registro actual de uso.

## Interfaz de Hablar

- Reorganizar `AI Coach` en una columna móvil limpia, con pestañas compactas **Chat / Hablar / Práctica** antes de iniciar.
- Crear tres vistas reales: preparación, conversación activa y conversación finalizada.
- En preparación, mostrar el avatar actual de Vale, el nivel curricular conocido, minutos disponibles, contexto real y un único botón **Empezar a hablar**.
- Durante la llamada, ocultar las pestañas y la navegación inferior; mostrar encabezado compacto, nivel/tema, tiempo restante, avatar reducido, estado de audio y la intervención actual del coach como elemento principal.
- Mantener la pregunta visible mientras el alumno responde y ofrecer un historial plegable con mensajes diferenciados de Vale y del alumno. El historial seguirá siendo temporal y no se guardará.
- Aplicar la identidad azul/naranja mediante tokens del sistema, con equivalentes en modo oscuro, safe areas, objetivos táctiles adecuados y movimiento reducido cuando corresponda.

## Controles conectados a la voz real

- **En español:** enviar una solicitud contextual a la sesión activa para explicar brevemente la intervención actual en español y volver a invitar una respuesta sencilla en inglés.
- **Más lento:** pedir a Vale que repita la misma intervención con ritmo realmente más lento, sin alterar el tema.
- **Dame una idea:** solicitar una pista corta adaptada al nivel, sin completar la respuesta.
- Evitar solicitudes simultáneas o repetidas mientras una ayuda se procesa, y reflejar el estado real de preparación/reproducción.
- **Pausar micrófono:** desactivar la entrada real del dispositivo sin cerrar la sesión; **Activar micrófono** la restaurará con el mismo contexto. El contador continuará según las reglas actuales.
- Hacer que terminar, cerrar, cambiar de pestaña o abandonar la página libere una sola vez micrófono, audio y conexión, y registre una sola vez los segundos usados.

## Estados y datos reales

- Derivar las etiquetas visibles de los eventos actuales: conectando, turno del alumno, preparando respuesta, Vale hablando, micrófono pausado, error y sesión finalizada.
- Usar las transcripciones reales para la pregunta protagonista y el historial; no usar textos, cronómetros ni eventos simulados del documento.
- Compartir con Vale el nivel curricular ya guardado para evitar que lo pregunte de nuevo; usar el módulo actual como contexto inicial y permitir que la charla siga adaptándose.
- Mantener los permisos, límites, allowlist privada, proveedor, modelo, facturación y almacenamiento actuales sin cambios.
- Mostrar acciones claras para permiso denegado, conexión perdida y minutos agotados.

## Navegación de cinco accesos

- Reagrupar la navegación inferior en **Inicio / Practicar / Método / Coach / Cuenta**.
- Crear una pantalla sencilla de **Practicar** con accesos a Review/Repaso y Simulador de entrevista, conservando todas las rutas existentes y sus enlaces directos.
- Mantener oculta la navegación inferior solo mientras la conversación en vivo esté activa.

## Componentes y pruebas

- Usar los componentes de botones existentes y añadir los componentes AI Elements necesarios para el historial conversacional, sin sustituir el flujo de voz actual.
- Separar la presentación de Hablar en piezas pequeñas para pregunta, ayudas, controles e historial, manteniendo la lógica de audio centralizada.
- Añadir pruebas para: estados y etiquetas, ensamblado de transcripciones, bloqueo de ayudas duplicadas, pausa/reactivación real, cierre idempotente y navegación de cinco accesos.
- Ejecutar pruebas pertinentes, comprobación completa de tipos, build y lint.
- Probar en navegador a 320, 390 y 430 px y escritorio: inicio, permiso, conexión, escucha, respuesta, tres ayudas, pausa/reactivación, historial, cierre, error y límite.
- Capturar el resultado móvil con sesión activa e historial plegado. Las comprobaciones que requieran hablar y escuchar físicamente en un teléfono se informarán como prueba manual pendiente si el entorno no puede verificarlas de forma real.

## Archivos previstos

- `src/components/fluency/LiveCoach.tsx`
- `src/components/fluency/CoachAvatar.tsx` (solo ajustes de tamaño/estado si son necesarios)
- `src/routes/ai-coach.tsx`
- `src/components/fluency/BottomNav.tsx`
- Nueva ruta de Practicar y componentes pequeños del rediseño
- `src/styles.css` y textos bilingües
- Pruebas nuevas o ampliadas del coach y navegación

No se agregarán tablas ni almacenamiento de audio/transcripciones, ni se cambiarán cuotas, proveedor o modelo.
