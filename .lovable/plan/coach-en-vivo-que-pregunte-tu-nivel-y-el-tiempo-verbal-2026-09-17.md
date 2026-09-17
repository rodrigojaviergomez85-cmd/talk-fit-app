# Coach en vivo: que pregunte tu nivel y el tiempo verbal

Hoy el coach saluda y empieza a charlar de cualquier cosa. El cambio hace que la sesión empiece con dos preguntas rápidas y que la práctica se adapte a tus respuestas.

## Cómo se sentirá

1. Al iniciar, Vale saluda y pregunta tu nivel: básico, intermedio o avanzado (la pregunta se hace en inglés muy simple y, si no entiendes, ella la repite en español).
2. Después pregunta qué quieres practicar: presente, pasado o futuro.
3. A partir de ahí hace preguntas reales solo de ese tiempo verbal, adaptadas a tu nivel.
4. Cada 5 o 6 intercambios te pregunta si quieres seguir con el mismo tiempo o cambiar a otro.
5. Al terminar, el resumen final en español se mantiene igual (hasta 3 correcciones y una frase para practicar), añadiendo el nivel y el tiempo que practicaste.

Adaptación por nivel:
- Básico: frases muy cortas, vocabulario cotidiano, habla lenta, preguntas de sí/no y respuestas de una frase.
- Intermedio: preguntas abiertas, frases de dos partes, ritmo normal.
- Avanzado: preguntas de opinión, seguimiento con "why", expresiones más naturales, turnos más largos.

Si no contestas la pregunta del nivel en un par de intentos, Vale asume intermedio y sigue, para que nunca se trabe.

## Detalles técnicos

- Único archivo a cambiar: `src/components/fluency/LiveCoach.tsx`.
- Reescribir `SYSTEM_INSTRUCTION` con el flujo por fases (nivel → tiempo verbal → práctica → cambio de tiempo), las reglas de adaptación por nivel y las reglas actuales que se conservan: recast natural sin interrumpir, turnos de máximo 3 frases, español solo si el estudiante está perdido.
- Reescribir `GREETING_PROMPT` para que la primera intervención sea saludo + pregunta de nivel con las tres opciones.
- Ampliar `SUMMARY_PROMPT` para que el resumen mencione nivel y tiempo verbal practicados.
- Sin cambios en el endpoint `src/routes/api/live-coach.ts`, ni en límites (5 min por sesión, 15 min diarios), ni en el avatar, ni en el audio.
- Verificación: `bunx tsgo --noEmit` y carga de `/ai-coach` en móvil 440×807; la conversación real se prueba hablando en el iPhone.
