# Avanzado no se desbloquea al terminar los 3 intermedios

## Causa (confirmada en el código)

La regla de Avanzado sí existe: se abre cuando EAGLES, TIGERS y SHARKS están "completos" (`journey-service.ts:258-260`). El problema es la definición de "completo": un módulo cuenta como terminado solo si tiene registros de **los 20 días** (`moduleComplete`: `completedCount >= totalDays`).

Pero un alumno que eligió empezar en la semana 2, 3 o 4 (autoubicación) comienza, por ejemplo, en el día 16 y **nunca registra los días 1-15**. Aunque termine todo lo que le correspondía, ese módulo nunca llega a 20/20, así que Avanzado queda cerrado para siempre. Lo mismo pasa con cualquier día que quedó saltado por cualquier motivo.

## Solución propuesta

Un módulo cuenta como completo cuando el alumno terminó **todos los días desde su punto de inicio**:

1. **`moduleComplete` respeta el día de inicio**: los días anteriores al día donde el alumno empezó (por semana de autoubicación, según lo guardado en preferencias) cuentan como satisfechos. Si terminó del día 16 al 20 en SHARKS, SHARKS está completo.
2. **Día de inicio por módulo**: para módulos sin autoubicación directa (ej. solo se colocó en EAGLES), el día de inicio es el primer día con actividad registrada, o el día 1 si no hay registros. Así nadie queda atascado por días viejos que nunca le tocó hacer.
3. **Sin cambios para quien ya tenía Avanzado abierto**: las cuentas ilimitadas y quienes ya iniciaron Avanzado no se ven afectados.
4. **Efecto en cadena correcto**: al completarse los tres intermedios, Avanzado 1/2/3 se abren (la familia Avanzado ya es paralela entre sí). Los niveles Basic siguen iguales.

## Detalles técnicos

- `src/services/journey-service.ts`: ajustar `moduleComplete` para que compare contra los días esperados desde el punto de inicio del alumno (usando `startWeek` guardado cuando el módulo es el de su colocación, y el menor día con registro en otro caso), en vez de exigir siempre 20/20.
- Pruebas nuevas: alumno colocado en semana 4 de SHARKS que termina días 16-20 → SHARKS completo → Avanzado se abre; alumno que empieza en día 1 sigue necesitando los 20 días; días saltados a la mitad sí cuentan como pendientes.
- Ejecutar la suite de Vitest y typecheck; verificación en navegador de `/progress` con un estado que reproduzca el caso.

## Nota

Si en tu caso específico tú completaste los 20/20 días de los tres intermedios y aún así no se abre, lo verifico contra tu cuenta durante la implementación (puede haber un día sin registro por un error anterior) — la misma corrección lo cubre.
