# Pista "Dilo así / Try say" en tarjeta de repetición del cuento

## Contexto
En las preguntas rápidas del cuento, después de responder bien, el estudiante debe grabar una frase. Si el STT lo entiende mal, se muestra:

- "Escuchamos: 'I am Rodrigo.'"
- "Inténtalo de nuevo"

El estudiante no siempre sabe exactamente cómo debe empezar la frase correcta.

## Objetivo
Agregar debajo de "Escuchamos: ..." una pista clara con la forma correcta, reemplazando el wildcard `*` por puntos suspensivos.

Ejemplos:
- target `My name is *` → "Dilo así: My name is..."
- target `My favorite food is *` → "Dilo así: My favorite food is..."
- target `I am from *` → "Dilo así: I am from..."
- target sin wildcard (frase fija) → "Dilo así: [frase completa]"

## Cambios

1. **Nueva función helper** `buildSayItHint(target: string, es: boolean): { label: string; hint: string }`
   - Ubicación: `src/lib/story-say-match.ts` (al lado de `compareStorySay`).
   - Reemplaza cada `*` por `...`.
   - label: "Dilo así:" / "Try say:"
   - Si target no tiene wildcard, muestra la frase completa.

2. **Pantalla de error en `StorybookPlayer.tsx`**
   - En `QuizSlide`, dentro del bloque `checkStatus === "tryAgain"`, agregar una línea debajo de "Escuchamos: ...".
   - Solo aparece si `quiz.sayItCheck?.target` existe.
   - Estilo: texto pequeño, color primario para destacar sin competir con el error.

3. **Tests**
   - `src/lib/story-say-match.test.ts` (o el test existente): casos para wildcard, sin wildcard, y mayúsculas/espacios.

4. **Verificación**
   - `bunx tsgo` pasa.
   - Tests de storybook pasan.
   - Playwright móvil: contestar mal "What is your name?" y confirmar que aparece "Dilo así: My name is...".
