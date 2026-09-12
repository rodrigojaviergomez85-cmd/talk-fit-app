# Preguntas rápidas del cuento: de "ella" a "tú"

## Problema
En el cuento "El primer día de Vale", cada pregunta rápida funciona así:

1. Pregunta: **"What is her name?"** (¿Cómo se llama ella?)
2. El estudiante toca la respuesta: **Vale**
3. Luego la app le pide decir en voz alta: **"My name is Vale."**

El paso 3 confunde: suena como si "My name is Vale" fuera la respuesta a "What is her name?", cuando en realidad la respuesta ya se dio al tocar "Vale". Además, repite el nombre de Vale en vez de preparar al estudiante para hablar de sí mismo.

## Solución (propuesta del usuario, afinada)
Después de responder correctamente, el estudiante practica **la pregunta en forma personal** — la frase que usará en la vida real:

| Pregunta rápida | Respuesta (sin cambios) | Nuevo "Ahora dilo tú" |
|---|---|---|
| What is her name? | Vale | **What is your name?** (¿Cómo te llamas tú?) |
| What is Vale's favorite food? | Pupusas | **What is your favorite food?** (¿Cuál es tu comida favorita?) |
| Where is Vale from? | El Salvador | **Where are you from?** (¿De dónde eres?) |

- El texto de apoyo en español cambia de "Dilo tú: «...»" a **"Ahora pregúntala tú: «...»"** para que quede claro que ahora le toca hacer la pregunta, no repetir la respuesta.
- El audio de ejemplo usa la misma voz del episodio; solo cambia el texto.
- Esto conecta con el cierre del episodio, donde el estudiante se presenta a sí mismo ("My name is…", "I am from…"): primero practica preguntar, luego responde sobre sí mismo.

## Cambios técnicos
Solo datos del cuento, sin tocar el reproductor:

- `src/services/storybook/vale-first-day.ts`: actualizar `sayIt` y `sayItEs` de las tres preguntas (`q1`, `q2`, `q3`).

## Verificación
- Typecheck sin errores.
- Recorrido del cuento en móvil hasta la pregunta 1: confirmar que tras tocar "Vale" aparece "What is your name?" con su audio y el botón de grabar.
