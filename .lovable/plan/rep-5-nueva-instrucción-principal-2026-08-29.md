# Rep 5: nueva instrucción principal

## Qué cambia

En el Paso/Rep 5 se elimina lo que aparece en la imagen:
- la fila de chips (ROUTINE, WORK, WE / THEY, BECAUSE, CONCLUSION)
- la tarjeta naranja BONUS

En su lugar, una sola tarjeta de instrucciones destacada (inglés + botón ES), con:
- Pregunta principal: **What is your daily routine?** / *What do you do every day?*
- Guía: usa conectores **after, later, then** y, si puedes, un **because**
- Meta: **5–10 oraciones en 30 segundos o más**

Se mantienen sin cambios: el ejemplo de audio modelo, el TakeBoard de 5 tomas, el conteo de oraciones y el flujo de completar el día. Sin corrección ni feedback.

## Detalle técnico

- `src/lib/types.ts`: ya tiene `rep5Prompt: { question, questionEs }`; se elimina `fluencyBonus` y se amplía `rep5Prompt` con los textos de conectores/meta si hacen falta.
- `src/services/course-service.ts`: completar `rep5Prompt` para los 5 días y quitar los `fluencyBonus` restantes (incluido el del día que aún lo tiene) y `cues` en el uso de Rep 5.
- `src/routes/practice.tsx` (~líneas 548–560): quitar `<CueRow cues={day.cues} />` y el bloque `day.fluencyBonus`; renderizar la nueva tarjeta bilingüe con `TranslatableText`. `CueRow` sigue usándose en otros reps, no se borra.
- Verificación: typecheck y revisión de `/practice?day=1` en móvil.
