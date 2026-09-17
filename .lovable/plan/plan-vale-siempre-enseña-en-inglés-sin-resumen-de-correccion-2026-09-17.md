# Plan: Vale siempre enseña en inglés, sin resumen de correcciones al final

## Lo que cambia

1. **Vale nunca conversa en español.** Si el estudiante dice "no entiendo" o pide explicación en español:
   - Responde en inglés, más lento y con palabras más simples.
   - Repite o reformula la pregunta de otra manera.
   - Puede dar UNA pista corta en español (máximo una frase) y regresar de inmediato al inglés.
2. **Quitar el resumen de correcciones al final.** Como ya corrige en vivo (te dice la frase correcta y te hace repetirla), al terminar la sesión Vale solo da una despedida corta en español con una frase para practicar — sin lista de errores.

## Detalles técnicos

- Solo se edita `src/components/fluency/LiveCoach.tsx`:
  - `SYSTEM_INSTRUCTION`: regla explícita de "eres una profesora de inglés; la conversación es siempre en inglés" + comportamiento ante "no entiendo" (más lento, reformular, una pista en español como máximo).
  - Se elimina la instrucción de recordar errores y el resumen de errores.
  - `SUMMARY_PROMPT` pasa a ser una despedida breve en español con una frase para practicar.
- Sin cambios en avatar, límites de tiempo, endpoint, ni audio.
- Verificación: `bunx tsgo --noEmit` y prueba en el preview.
