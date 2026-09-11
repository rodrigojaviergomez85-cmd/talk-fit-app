# AI Coach en la barra inferior + Progreso en menú desplegable

## Qué cambia para el estudiante

1. En la barra inferior, el botón **Progreso** se reemplaza por **AI Coach**.
2. En **Inicio**, justo debajo del botón "MOSTRAR A MI COACH", aparece un menú desplegable con el acceso a **Progreso** (Avance y Audios). Cerrado por defecto.
3. Nueva pantalla **AI Coach**: un chat sencillo para preguntas de inglés.

## Cómo funciona el chat

- Respuestas cortas y directas (gramática, vocabulario, pronunciación escrita, uso de frases).
- Solo responde temas de inglés; si preguntan otra cosa, responde amablemente que solo ayuda con inglés.
- Sin memoria: cada pregunta es independiente y nada se guarda al salir o recargar.
- Máximo **10 consultas por día** por cuenta. Al llegar al límite se muestra un mensaje bilingüe indicando que se reinicia al día siguiente.
- Las cuentas ilimitadas (english4callcenters, auxialeman, leticiamgth) no tienen límite.
- Contador visible tipo "3 / 10 hoy".
- Interfaz bilingüe (español/inglés) como el resto de la app.
- Requiere haber iniciado sesión.

## Detalles técnicos

- `src/components/fluency/BottomNav.tsx`: la entrada `/progress` se cambia por `/ai-coach` (icono de mensaje), nueva clave i18n `nav.aiCoach`.
- Nuevo componente colapsable en Inicio (`src/routes/index.tsx`) debajo del enlace a `/coach-check`, con enlace a `/progress`. La ruta `/progress` se conserva intacta.
- Nueva ruta `src/routes/ai-coach.tsx`: chat en memoria (sin persistencia), lista de mensajes, campo de texto, estado de carga y manejo de errores del gateway.
- Nuevo endpoint `src/routes/api/ai-coach.ts` siguiendo el patrón de `api/sentence-count.ts`:
  - `verifyRequestUser` para exigir sesión.
  - `consume_ai_quota` vía `consumeQuota(userId, "ai-coach", 10, 86400)`, omitido para cuentas ilimitadas (verificación en servidor con `is_unlimited_test_user`).
  - Llamada a Lovable AI Gateway con un modelo económico y streaming, prompt de sistema que restringe el alcance al inglés y exige respuestas breves.
  - Sin guardar mensajes ni transcripciones en base de datos.
- Sin cambios en currículo, progresión, cuotas de práctica, Review, Natural Method ni Test Ready.

## Recomendaciones

- Limitar la respuesta a ~120 palabras para mantener el costo bajo y la lectura móvil cómoda.
- Mostrar 3 preguntas sugeridas al abrir el chat (ej. "¿Cuándo uso have/has?") para que el estudiante sepa qué preguntar.
- Advertencia corta: "Este coach explica gramática; no evalúa tu pronunciación grabada."
