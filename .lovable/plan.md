# Reorganizar /progress: simplificar y reordenar secciones

## Objetivo
Reducir la carga visual de la pantalla `/progress` moviendo **Mi ruta** justo debajo de **Últimos 7 días** y eliminando las secciones **Escucha tus intentos** y **Mi constancia**, que son redundantes o poco usadas.

## Cambios propuestos
1. Reordenar `src/routes/progress.tsx` para que el flujo sea:
   - Módulo actual
   - Últimos 7 días
   - Mi ruta (`JourneyList`)
   - Mis estadísticas (colapsable)
   - Mis insignias (colapsable)
2. Eliminar de `/progress`:
   - Import y uso de `ListenAttemptsCard`
   - Import y uso de `HabitCard`
3. Dejar intactos:
   - `src/components/fluency/progress/ListenAttemptsCard.tsx`
   - `src/components/fluency/progress/HabitCard.tsx`
   - `HomeWeekCard` en Home (la constancia sigue visible en Home)
   - Pestaña Audio de `/progress` y todas sus funcionalidades

## Verificación
1. `bunx tsc --noEmit` sin errores.
2. Ejecutar tests de Vitest relacionados con progreso.
3. Navegar a `/progress` en vista móvil y confirmar:
   - El orden de secciones es el nuevo.
   - No aparece "Listen to my attempt" / "Escucha tus intentos".
   - No aparece "My consistency" / "Mi constancia".
   - Mi ruta se renderiza correctamente debajo de Últimos 7 días.
   - Los colapsables de Stats y Badges siguen funcionando.
