# Temporada 2: de repetir frases a responder preguntas

## Lo que encontré

Revisé los 20 episodios de la temporada 2. Confirmado: **todas** las tarjetas de "Ahora dilo tú" son repetición literal de la frase del cuento (por ejemplo `Tomorrow, I'm going to wake up early.`). Ninguna pide una respuesta propia del estudiante, así que hoy no se practica comprensión de preguntas ni respuesta libre.

## Lo que voy a hacer

En cada episodio de la temporada 2, **2 de las 3 tarjetas** pasan a ser pregunta personal abierta; la primera se queda como repetición guiada (modelo antes de producir).

Ejemplo del cambio:

```text
Antes:  Ahora dilo tú → "After lunch, I'm going to study English."
Ahora:  Ahora contesta tú → "What are you going to study tomorrow?"
        Ejemplo: I'm going to study ...
        Válido: "I'm going to study math with my sister"
        No válido: repetir la pregunta, o decir solo "I'm going to study"
```

Reglas de calificación (IA):
- Debe decir la estructura completa (`I'm going to ...`) **y** agregar al menos una palabra propia.
- Repetir la pregunta no se acepta.
- Se mantiene el máximo de 2 intentos, el "Great job, champion!", el sonido, la pista "Try say: ..." y el botón de continuar.
- Las tarjetas de afirmación (I can do it, etc.) siguen sin validación.

## Diseño de las preguntas

Cada pregunta personal usa el objetivo gramatical del día del módulo Basic 1:
- Episodios 1–5: `What are you going to do tomorrow?` → `I'm going to ...`
- Episodios 6–10: planes de otras personas → `He/She is going to ...`
- Episodios 11–15: `will / won't` → `I will ...`
- Episodios 16–20: contraste, cambios de plan y predicciones → `I think I will ...`, `I'm not going to ...`

## Detalles técnicos

- `src/services/storybook/types.ts`: agregar a `StorybookQuiz` los campos opcionales `sayItAskEn` / `sayItAskEs` (pregunta dirigida al estudiante) y usar `sayItCheck.target` con comodín, por ejemplo `I'm going to * *`, con `allowShortAnswer: false`.
- `src/lib/story-say-match.ts`: ya soporta comodines; ajustar `buildSayItHint` para mostrar `I'm going to ...` como pista.
- `src/components/storybook/StorybookPlayer.tsx`: cuando existe `sayItAskEn`, el encabezado dice "¡Correcto! Ahora contesta tú:" / "Correct! Now you answer:", se muestra la pregunta (con botón ESCUCHAR) y debajo el ejemplo de estructura en gris.
- Editar los 20 archivos `src/services/storybook/vale-s2-*.ts` para convertir las tarjetas 2 y 3.
- Pruebas: casos del matcher (acepta respuesta con contenido propio, rechaza la pregunta repetida y la estructura vacía), más `bunx tsgo` y verificación móvil en un episodio.
