# Plan: Rep 5 — nueva instrucción principal

## Qué cambia (solo Rep 5)

### 1. Eliminar lo de la imagen
- Quitar la fila de chips de cues (ROUTINE / WORK / WE / THEY / BECAUSE / CONCLUSION).
- Quitar la tarjeta BONUS ("Tomorrow I'm going to start a little earlier.").

### 2. Nueva instrucción principal (bilingüe)
Una tarjeta destacada arriba del tablero de tomas con:

- **Título:** "ANSWER THE QUESTION" / "RESPONDE LA PREGUNTA"
- **Pregunta (por día):** Día 1 → "What is your daily routine?" o "What do you do every day?" (cada día tendrá su propia pregunta acorde a su tema).
- **Guía de conectores:** "Usa conectores: **after, later, then** — y si puedes, **because**."
- **Meta:** "Logra al menos **5–10 oraciones** en **30 segundos o más**."

Todo con traducción al español vía `TranslatableText`, igual que el resto de la app.

### 3. Datos por día
- En `course-service.ts` se agrega a cada `CourseDay` un campo `rep5Prompt` con: `question`, `questionEs` (texto específico por día).
- Se elimina el campo `fluencyBonus` (ya no se usa). Los `cues` se conservan en datos pero dejan de mostrarse en Rep 5.

## Lo que NO cambia
- El ejemplo de audio "Want to hear how it should sound?" se mantiene.
- TakeBoard (5 tomas, play/stop/delete, selección de toma final, conteo de oraciones) intacto.
- Flujo de completar el día y resto de reps (0–4) sin cambios.

## Verificación
- Typecheck + `/practice?day=1` responde 200.
- Playwright móvil: confirmar en Rep 5 que ya no aparecen chips ni BONUS y sí la nueva instrucción con pregunta, conectores y meta.
