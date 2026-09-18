# Auditoría de Soporte, Contacto y coherencia legal

Fecha: 18 septiembre 2026. No se modificó ningún archivo; solo se hicieron pruebas de lectura y una inserción de prueba en la tabla de solicitudes.

## Resumen de pruebas ejecutadas

- Rutas verificadas a 390 px: `/soporte`, `/contacto`, `/terminos`, `/privacy-policy`, `/eliminar-cuenta`, `/mis-solicitudes` → todas responden 200 y **ninguna tiene desbordes horizontales**.
- Pruebas reales de permisos sobre la tabla de solicitudes (usuario anónimo, clave pública):
  - Insertar: **permitido** (201). La fila apareció en la base (`0a46ff08…`, nombre "Auditoria").
  - Leer filas: **bloqueado** (devuelve lista vacía).
  - Actualizar: **sin efecto** (la fila conservó su estado "nuevo").
  - Borrar: **sin efecto** (la fila sigue existiendo).
  - Comentarios de soporte: **no legibles** por anónimos.
- Claves: en el frontend solo viaja la clave pública. **No hay clave secreta expuesta.**

## Hallazgos

| Sev. | Bloque | Hallazgo | Archivo | Propuesta |
|---|---|---|---|---|
| BLOQUEANTE | 3 / 5 | La app promete "eliminar tu cuenta y todos tus datos en 2 días hábiles" pero no existe ninguna función de borrado ni proceso automatizado; es solo un correo | `src/routes/eliminar-cuenta.tsx:30,40` | Añadir botón real de solicitud de borrado que cree una solicitud en soporte, o reescribir el texto como "solicitud por correo" con plazo realista |
| BLOQUEANTE | 4 | Los términos existen pero son de 4 párrafos: no cubren edad 18+, uso aceptable, propiedad intelectual, licencia sobre grabaciones, límite de responsabilidad de la IA, disponibilidad, terminación ni ley aplicable | `src/routes/terminos.tsx:23-60` | Redactar términos completos bilingües con el estilo de la política de privacidad |
| IMPORTANTE | 3 | Conviven dos correos sin explicación: soporte `desarrollo.aplicaciones@e4ccglobal.com` y privacidad `privacy@fluencye4cc.app`. Además el segundo probablemente no tiene buzón real | `soporte.tsx:8`, `privacy-policy.tsx:168` | Unificar en el correo de soporte, o dejar los dos explicando cuándo usar cada uno |
| IMPORTANTE | 5 | La política dice "solo el tiempo necesario" sin plazo; el sistema borra tomas intermedias a las pocas horas y los audios finales a los **10 días** | `src/lib/storage-report.ts:29` | Declarar el plazo real de 10 días en la política |
| IMPORTANTE | 5 | La política no menciona la **foto de perfil** ni que se revisa automáticamente con IA; sí se recogen imágenes | `src/lib/avatar-photo.server.ts` | Añadir foto de perfil y su moderación a la lista de datos recogidos |
| IMPORTANTE | 5 | Los audios se envían a **Groq** (transcripción) y al **gateway de IA de Lovable / modelos OpenAI**; la política solo dice "proveedores de confianza" sin nombrarlos | `final-coach-providers.server.ts:10-12`, `api/rep2-correction.ts:27` | Nombrar los proveedores y su finalidad |
| IMPORTANTE | 1 / 3 | El selector de idioma de `/soporte` y `/contacto` usa su propia memoria, distinta del idioma de la app. Al abrir Términos, Privacidad o Eliminar cuenta el idioma puede cambiar solo | `soporte.tsx:9`, `contacto.tsx:10` vs `terminos.tsx:21` | Unificar en el idioma de la app |
| IMPORTANTE | 3 | Fechas: la política tiene fecha efectiva 10 sep 2026; los términos y la página de eliminación **no tienen fecha** | `privacy-policy.tsx:87`, `terminos.tsx` | Poner fecha efectiva coherente en los tres documentos |
| MENOR | 1 | La FAQ de micrófono solo da instrucciones de iPhone, aunque ya existe pestaña Android | `soporte.tsx:33` | Añadir la ruta de ajustes de Android |
| MENOR | 3 | `/contacto` enlaza a Privacidad y Soporte, pero no a Términos ni a Eliminar cuenta; `/privacy-policy` no enlaza a nada | `contacto.tsx:349`, `privacy-policy.tsx` | Pie legal común en las cuatro páginas |
| MENOR | 5 | El coach guarda una **cita corta** de lo que dijo el usuario de forma permanente, mientras la política afirma "las transcripciones no se guardan permanentemente" | `final-audio-coach.server.ts:134` | Precisar: no se guarda la transcripción completa, solo un fragmento citado para la corrección |
| MENOR | 5 | Ningún documento menciona cámara ni GPS. Solo se declara ubicación aproximada por IP, que es correcta | `privacy-policy.tsx:121` | Sin cambios |
| MENOR | 2 | Quedó una solicitud de prueba creada por esta auditoría | base de datos | Borrarla |

Resultados positivos confirmados: `/soporte` es alcanzable desde Mi Cuenta (`profile.tsx:145`) y desde el pie de página; muestra el correo visible y el botón con asunto y plantilla; incluye las 5 preguntas frecuentes pedidas; declara requisitos iOS 15+ y Android 8+, internet y micrófono; **ningún enlace del pie devuelve 404**; el formulario de contacto inserta de verdad, precarga y bloquea el correo con sesión activa, guarda `user_id`, valida correo y mínimo 20 caracteres en español, muestra identificador de ticket y ofrece el correo de soporte si falla la red.

## Cambios propuestos (esperando tu aprobación)

1. Reescribir `/terminos` como documento completo y bilingüe con el estilo de la política de privacidad: objeto, 18+, cuenta y credenciales, uso aceptable, propiedad intelectual, propiedad y licencia de las grabaciones, límite de responsabilidad de la IA, disponibilidad, terminación por ambas partes, ley y jurisdicción de El Salvador, fecha efectiva.
2. Actualizar la política de privacidad: plazo real de 10 días para audios, foto de perfil y su moderación, nombres de los proveedores de IA, matiz sobre la cita del coach, y correo unificado.
3. Corregir la página de eliminación de cuenta para que describa el proceso real.
4. Unificar el idioma de Soporte y Contacto con el de la app y añadir un pie legal común a las cuatro páginas.
5. Completar la FAQ de micrófono con la ruta de Android.
6. Borrar la solicitud de prueba.
