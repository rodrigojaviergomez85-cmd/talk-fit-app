# Bloquear el avance sin completar los audios del día

## Problema

En la pantalla del día, el botón "SIGUIENTE DÍA" deja pasar al día siguiente aunque el Paso 2 (audios del día) no esté completo. En la ruta principal del módulo, los días marcados "UP NEXT" también se pueden abrir con un toque.

## Qué se va a hacer

1. **Pantalla del día**: el botón "SIGUIENTE DÍA" queda desactivado con el mensaje de bloqueo hasta que los audios del día estén completos. El botón "DÍA ANTERIOR" sigue igual.
2. **Ruta principal del módulo**: los días futuros se muestran bloqueados (candado, sin toque, tono apagado). Los días completados y el día actual siguen abiertos.
3. **Protección real, no solo visual**: si alguien entra directo por la dirección de un día bloqueado, esa página muestra un aviso de día bloqueado con un botón para volver a su día actual, en lugar de las actividades.
4. **Cuentas de prueba/admin**: siguen navegando libremente, sin bloqueos.
5. **Semana de inicio**: quien eligió empezar en la semana 2, 3 o 4 conserva su día de inicio; no se le bloquea hacia atrás.

## Detalles técnicos

- `JourneyDayRow` (en `src/components/fluency/DailyPracticeCard.tsx`) usa el prop `unlocked` que hoy se calcula pero no se pasa: cuando es `false` se renderiza como `div` (sin `Link`) con icono `Lock` y opacidad reducida.
- `src/routes/module.$moduleId.tsx` pasa `unlocked` a `JourneyDayRow` y cambia la etiqueta "Up next" por "Bloqueado / Locked" en esos días.
- `src/routes/day.$moduleId.$day.tsx`: nuevo guard con `JourneyService.isDayUnlocked(...) || hasUnlimitedAccess()`; si está bloqueado, se renderiza una tarjeta de bloqueo con enlace al día actual. El cálculo de `nextDayOpen` (ya existente, basado en `isDayCompleted`) se mantiene.
- Textos bilingües nuevos en el archivo de traducciones (`day.locked*`).
- Pruebas: casos de `isDayUnlocked` para día completado, día actual, día futuro y bypass de cuenta ilimitada; luego `bunx tsgo --noEmit`, la suite de tests y verificación en navegador móvil de `/day/basic-zero/6`, `/day/basic-zero/7` y `/module/basic-zero`.
