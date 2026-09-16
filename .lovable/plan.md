# Calendario de rango en el panel de actividad

Hoy el panel muestra los últimos 7 días en cuadritos y una gráfica con selector de 7/15/30 días o mes por mes. Falta poder elegir un periodo exacto (por ejemplo del 1 al 15 de septiembre) y verlo día por día en cuadritos.

## Qué se agrega

Al final del panel de actividad, una nueva sección **"Elegir periodo"**:

1. Un calendario donde eliges fecha de inicio y fecha final (por ejemplo 1 sept – 15 sept). Muestra el periodo elegido en texto y un botón para volver a los últimos 7 días.
2. Debajo, una cuadrícula de cuadritos: **un cuadrito por cada día del periodo**, con la fecha corta arriba y **solo el número de usuarios únicos activos ese día**.
   - Mismo estilo de color que los cuadritos de los últimos 7 días (más intenso = más usuarios).
   - En móvil se acomodan varios por fila y hacen scroll vertical natural.
3. Al tocar un cuadrito se muestra el desglose de ese día (prácticas, El Mundo de Vale, simulador, Review, Coach IA), igual que ahora.
4. Debajo de la cuadrícula: promedio por día, mejor día y días con actividad del periodo elegido.

Lo que ya existe (cuadritos de 7 días arriba y la gráfica) se queda igual.

## Detalle técnico

- `src/components/fluency/ActivityCalendar.tsx`: nueva sección con `Calendar` de shadcn en `mode="range"` dentro de un `Popover`, estado `customRange {from,to}`, y reutilización del componente de cuadrito existente para la cuadrícula.
- Los datos vienen de la misma función `getAdminDailyActivity` con `from`/`to` del rango elegido; el RPC ya acepta rangos arbitrarios hasta 400 días. Se valida `from <= to` y se limita a 400 días antes de pedir.
- Se agrega un helper de formato de rango en `src/lib/admin-daily-activity.ts` y su test.
- Verificación: tests existentes, typecheck y revisión visual de `/admin/metrics` en móvil.
