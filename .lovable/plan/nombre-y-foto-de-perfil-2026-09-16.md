# Nombre y foto de perfil

Los estudiantes podrán cambiar su nombre visible y elegir un avatar de una galería segura. Ambos se verán en la liga semanal.

## Qué verá el estudiante

En **Mi cuenta** (`/profile`), arriba de todo, una tarjeta "Mi perfil":

- Su avatar actual (o las iniciales si aún no eligió uno).
- Campo de nombre visible, con guardado y confirmación bilingüe.
- Botón "Cambiar avatar" que abre una galería de ~20 ilustraciones (personas diversas, estilo cálido tipo El Mundo de Vale, sin texto y apropiadas para todo público). Se elige tocando una y se guarda al instante.

En la **liga semanal** (`/liga`) y en la tarjeta de liga del día, cada fila del ranking muestra el avatar junto al nombre. Quien no haya elegido avatar ve el círculo con inicial actual.

Reglas del nombre: entre 2 y 24 caracteres, sin enlaces ni palabras ofensivas (lista de bloqueo básica en español e inglés); se valida en el servidor, no solo en pantalla.

No hay subida de fotos, así que no hay riesgo de contenido inapropiado ni costo de revisión.

## Detalles técnicos

**Datos**
- Migración: agregar `avatar_id text` a `public.profiles` y un trigger/CHECK que valide `display_name` (longitud y recorte de espacios) en el servidor. Las políticas RLS existentes (leer/actualizar solo el propio perfil) ya cubren el caso.
- Actualizar `public.league_board` y `league_board_preview` para devolver también `avatar` (el `avatar_id` del perfil) junto a `name`. Sin cambios en puntos, ranking, ocultamiento ni observer mode.

**Avatares**
- 20 ilustraciones generadas, 256×256 JPG progresivo < 60 KB cada una, en `src/assets/avatars/`, más un catálogo `src/lib/avatars.ts` (`{ id, src, label }`) que es la única fuente de IDs válidos. El servidor rechaza cualquier `avatar_id` fuera del catálogo.

**Código**
- `src/lib/profile.functions.ts`: `getMyProfile` y `updateMyProfile({ displayName?, avatarId? })` con `requireSupabaseAuth`, validación Zod, saneado del nombre y verificación del `avatar_id` contra el catálogo.
- `src/components/fluency/ProfileCard.tsx` (tarjeta) y `AvatarPicker.tsx` (hoja modal con la galería), reutilizando `Button`/`Dialog` existentes y `useAppLang` para textos EN/ES.
- `src/components/fluency/Avatar.tsx` pequeño componente compartido (avatar o inicial) usado en la tarjeta y en las filas de la liga.
- Integración en `src/routes/profile.tsx`, `src/routes/liga.tsx` y `LeagueDaySection.tsx`.

**Pruebas**
- Validación del nombre (largo, vacío, ofensivo) y rechazo de `avatar_id` inválido.
- Que todos los IDs del catálogo tengan su imagen y que las imágenes cumplan el límite de tamaño.
- Que el ranking siga devolviendo los mismos puntos/posiciones con el campo nuevo.
