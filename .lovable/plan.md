# Foto de perfil real, con filtro anti-vulgaridad

Los estudiantes podrán subir su propia foto. Antes de que alguien la vea, una revisión automática con IA decide si es apta. Además, cualquier estudiante podrá reportar una foto y tú la revisas desde el panel.

La galería de avatares se queda: quien no quiera subir foto elige un avatar o deja sus iniciales.

## Cómo funciona para el estudiante

1. En Mi cuenta toca "Cambiar foto" y elige entre **subir mi foto** o **elegir un avatar**.
2. Al subir, la app recorta la imagen a un cuadrado, la reduce y la envía.
3. Mientras la IA revisa (unos segundos) se muestra "Revisando tu foto…".
4. Si es apta, la foto queda visible de inmediato en Mi cuenta y en la liga semanal.
5. Si no es apta, se borra y aparece un mensaje bilingüe: "Esta foto no se puede usar. Sube una foto tuya, sin contenido ofensivo." Puede intentar de nuevo o elegir un avatar.

## Qué rechaza la revisión automática

- Desnudos, contenido sexual o sugerente, ropa interior.
- Violencia, sangre, armas, drogas.
- Odio, símbolos extremistas, gestos ofensivos.
- Texto o letreros ofensivos dentro de la imagen.
- Imágenes con datos personales visibles (documentos, tarjetas).

Se aceptan fotos normales de personas, y también fotos decentes que no sean un rostro (mascota, paisaje). Ante la duda, la IA rechaza.

## Reportes

- En la liga semanal, al tocar el avatar de otro estudiante aparece "Reportar foto".
- Un reporte oculta la foto de inmediato solo si acumula 3 reportes distintos; siempre queda registrado.
- En el panel de administración se agrega la sección "Fotos reportadas": ves la foto, quién la subió y decides **aprobar** (vuelve a mostrarse y no se puede reportar otra vez) o **quitar** (vuelve a iniciales y el estudiante recibe aviso al entrar).

## Protecciones de costo y abuso

- Máximo 3 subidas por estudiante al día y 1 revisión de IA por subida.
- Solo JPG/PNG/WebP, máximo 5 MB antes de recortar; la app sube ~512×512 (menos de 150 KB).
- Las fotos se guardan en un almacén privado; la app muestra enlaces firmados de corta duración.
- El estudiante puede quitar su foto cuando quiera.

## Detalles técnicos

- Nuevo bucket privado `avatars`, con reglas que permiten a cada estudiante escribir solo en `user_id/…`.
- `profiles` gana `avatar_photo_path`, `avatar_status` (`pending`/`approved`/`rejected`/`hidden`), `avatar_reviewed_at`, `avatar_upload_day`, `avatar_uploads_today`.
- Nueva tabla `avatar_reports` (reportante, dueño, motivo, estado) con RLS: insertar solo propio reporte, leer solo admin.
- `src/lib/avatar-upload.functions.ts`: `uploadMyPhoto` (valida tamaño/tipo, guarda, llama a la moderación, decide estado, borra si rechaza), `removeMyPhoto`, `reportAvatar`, y admin `listReportedAvatars` / `resolveAvatarReport` con verificación de rol vía `has_role`.
- Moderación con Lovable AI Gateway (`openai/gpt-6-astra`, entrada de imagen, salida estructurada `{allowed, reason}`); la imagen va como base64 desde el servidor, nunca desde el navegador. Cada llamada se registra en `ai_call_log` con el endpoint `avatar-moderation`, igual que el resto.
- `league_board` y `league_board_preview` devuelven la foto solo cuando `avatar_status = 'approved'`; si no, avatar de galería o iniciales.
- Componentes: se amplía `LearnerAvatar` para mostrar foto firmada, `AvatarPicker` gana la pestaña de subida con recorte cuadrado, y `/liga` gana el menú de reporte.
- Pruebas: validación de tipo/tamaño, límite diario, transición de estados, ocultamiento por 3 reportes, y que la liga nunca muestre fotos no aprobadas.

## Fuera de alcance

- No se cambian límites de práctica, retención de audio ni nada del currículo.
