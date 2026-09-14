# Ayuda real en las preguntas personales

Hoy la pista sale demasiado corta: "with…" o "I…". No le da al estudiante la estructura de la respuesta.

## Qué verá el estudiante

La pista se arma desde la pregunta personal, para que siempre calce y sea una oración empezada de verdad:

- "What good news did you receive this year?" → **Empieza así: "I received…"**
- "Who did you spend time with yesterday?" → **Empieza así: "I spent time with…"**
- "What did you buy this week?" → **Empieza así: "I bought…"**
- "How was your day yesterday?" → **Empieza así: "My day was…"**
- "Where did you go yesterday?" → **Empieza así: "I went to…"**

Si por alguna razón no se puede armar desde la pregunta, se usa la pista actual basada en la frase de calificación (por ejemplo "with…"), nunca se queda sin ayuda.

## Cómo se construye

Nueva función en `src/lib/story-say-match.ts` que transforma la pregunta en inicio de respuesta:

1. Quita la palabra interrogativa (What / Who / Where / When / Why / How, con su complemento tipo "good news", "many calls").
2. Detecta el auxiliar y el sujeto:
   - `did you <verbo>` → `I <verbo en pasado>`
   - `do/does you` → `I <verbo>`
   - `are you / were you` → `I am / I was`
   - `was/is your X` → `My X was / is`
   - `will you / are you going to` → `I will / I am going to`
3. Conjuga el verbo al pasado con una tabla de irregulares comunes de las temporadas (go→went, buy→bought, do→did, eat→ate, see→saw, give→gave, get→got, spend→spent, meet→met, feel→felt, tell→told, say→said, make→made, take→took, come→came, have→had, write→wrote, drive→drove, find→found, win→won, sleep→slept, teach→taught, speak→spoke, leave→left, begin→began, read→read, run→ran, sing→sang, sit→sat, stand→stood, think→thought, wake→woke, wear→wore) y reglas regulares (‑e → ‑d, consonante+y → ‑ied, doblar consonante final en verbos cortos).
4. Conserva la cola de la pregunta que sí pertenece a la respuesta ("with", "to", "about", "for") y corta las marcas de tiempo ("yesterday", "this year", "this week", "last night", "at work or school") para que la pista termine abierta con "…".
5. Verificación cruzada: si la frase de calificación (`sayItCheck.target`) empieza con palabras fijas, la pista respeta esas palabras para que la respuesta sugerida siempre sea aceptada al calificar.

No se toca ningún episodio, ni la calificación, ni los intentos, ni Saltar por ahora. Solo cambia el texto de ayuda.

## Verificación

- Pruebas nuevas para la función de pista con las preguntas personales reales de las temporadas 1–5 y Eagles.
- Revisión de las 205 preguntas personales existentes generando su pista y confirmando que todas quedan con estructura completa.
- Typecheck, suite completa de pruebas y revisión visual a 393 px en un episodio de temporada 4 y en el piloto de Eagles.
