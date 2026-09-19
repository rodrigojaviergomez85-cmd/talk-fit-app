# Color verde para respuesta correcta en Gramática del día · Basic 3 Week 1

Resumen: en el examen de gramática del piloto Basic 3 (past-stories) semana 1, la opción/respuesta correcta debe resaltarse en verde al seleccionarse. Las demás cohortes y módulos conservan el estilo actual.

## Cambios

1. **Componente `src/components/fluency/GrammarQuizScreen.tsx`**
   - Detectar cohorte piloto: `moduleId === "past-stories" && day >= 1 && day <= 5`.
   - En esa cohorte, cuando `checked.correct === true`, aplicar estilos de éxito (`border-success bg-success/10`) en lugar del tinte primario naranja.
   - Mantener rojo (`border-destructive bg-destructive/10`) para la opción fallida seleccionada por el usuario.
   - Aplicar el cambio a los tres tipos de ítem:
     - **Opción múltiple**: la opción correcta se pinta de verde.
     - **Find the mistake**: la palabra correcta se pinta de verde.
     - **Rearrange**: cuando la oración ordenada es correcta, el contenedor de la respuesta se pinta de verde.
   - En el bloque de retroalimentación global ("¡Correcto!"), conservar el icono Check y el tono positivo; no cambiar a rojo.

2. **Uso de tokens semánticos**
   - Usar `success` / `success-foreground` ya definidos en `src/styles.css` para no romper dark mode ni hardcodear hexadecimales.

3. **Verificación**
   - `bunx tsc --noEmit`.
   - Vitest: al menos los tests existentes de grammar-quiz.
   - Playwright en viewport móvil: abrir `/gramatica?module=past-stories&day=1`, responder un ítem correcto de cada tipo y confirmar que la selección correcta aparece en verde, mientras que una selección incorrecta sigue en rojo.
