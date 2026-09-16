# Comparación: guiones aprobados 11–15 vs episodios entregados

Comparé línea por línea el documento aprobado (`guion-advanced-1-episodios-11-15-v2.md`) contra los cinco episodios que están en la app. Los episodios 16–20 todavía no existen en la app, así que la comparación cubre 11–15.

## Resultado

| Ep | Líneas guion | Líneas app | Coinciden | Diferencias |
|----|--------------|------------|-----------|-------------|
| 11 | 28 | 28 | 25 | 3 (solo nombres) |
| 12 | 28 | 28 | 26 | 2 (solo nombres) |
| 13 | 23 | 23 | 22 | 1 (solo nombres) |
| 14 | 25 | 25 | 24 | 1 (solo nombres) |
| 15 | 31 | **24** | **0** | Diálogo completamente distinto |

### Episodios 11 a 14: fieles, con cambios de nombre

El diálogo es idéntico al aprobado. Las únicas diferencias son sustituciones de personajes que se hicieron durante la producción:

- **Nelson → Barrett** (ep 11 y 14)
- **Elena → Lidia** (ep 11, 12 y 13)
- **Lucía → Elena** en una línea del ep 12 ("Retention went from forty-one per cent…")

Estas sustituciones se hicieron para evitar choques con personajes que ya existen en Sharks/Tigers, pero nunca se reflejaron en el documento aprobado, así que hoy guion y app no concuerdan.

### Episodio 15: no corresponde al guion aprobado

Aquí sí hay un incumplimiento real:

- Ninguna de las 31 líneas aprobadas aparece en la app; el episodio tiene 24 líneas nuevas escritas aparte.
- Queda corto: 484 palabras habladas contra 548 del guion y el mínimo de 550 de nuestra regla.
- Escenas clave del guion se perdieron: la ronda "Why this contract, in thirty seconds, and I will interrupt you", la respuesta de la deserción en el mes dos, la ronda sobre el curso cerrado con condicional tercero, y la crítica del excolega.

## Qué propongo hacer

1. **Reescribir el episodio 15 sobre el guion aprobado**: usar sus 31 líneas tal cual, completar hasta 33 líneas y 550–650 palabras dentro de las mismas 11 escenas, conservando el arte, las voces, el reparto y los identificadores actuales. Se revisan también sus dos preguntas, el glosario tocable, los 2 phrasal verbs + 2 idioms y el cierre de 30 segundos.
2. **Cerrar la brecha de nombres en 11–14**: dejar en la app los nombres canónicos (Barrett y Lidia) y corregir el documento aprobado para que diga lo mismo, más la línea del ep 12 que debe nombrar a Lidia en vez de Elena. Así el guion vuelve a ser la fuente fiel de lo que ve el estudiante.
3. **Verificación**: prueba automática que compare, episodio por episodio, cada línea de la app contra el guion aprobado, para que esto no vuelva a pasar en 16–20.
4. Con 11–15 alineados, retomamos los guiones 16–20.

## Detalles técnicos

- Reescritura en `src/services/storybook/advanced-1-ep15-the-room-that-interrupts.ts` (solo texto, `lines`, `words`, quizzes y expresiones; sin tocar imports de arte ni ids de escena).
- Corrección del documento `/mnt/documents/guion-advanced-1-episodios-11-15-v2.md` en las 7 líneas con nombres desalineados.
- Nueva prueba en `src/services/storybook/` que valide texto contra guion y los presupuestos de líneas/palabras; se ejecutan además las suites de storybook, consistencia de reparto y verificación de tipos.
