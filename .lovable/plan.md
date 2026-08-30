# Home limpia: módulos + página propia por módulo

## Objetivo

El menú principal (Home) muestra solo las stats de racha y las tarjetas de módulos. Al tocar un módulo se navega a una página propia del módulo que contiene todo lo que hoy está debajo de cada módulo en Home: tarjeta de práctica del día, encabezado del módulo y la lista completa de días agrupada por semanas.

## Cambios

### 1. Nueva ruta `/module/$moduleId` (`src/routes/module.$moduleId.tsx`)

- Parámetro dinámico: `basic-zero` o `simple-present`.
- Mueve (sin cambios de diseño) el contenido actual de `ModuleSection` en `src/routes/index.tsx`:
  - Header navy del módulo (label, título, subtítulo, meta chips, barra de progreso).
  - `DailyPracticeCard` con el día actual.
  - Lista "All N days" con agrupación por semanas (`JourneyDayRow`, estados COMPLETE / CURRENT / UP NEXT).
- Carga el `JourneyState` igual que Home (`JourneyService.load()` + `pull()`).
- Botón/enlace para volver a Home (flecha atrás o link "‹ Modules").
- `head()` propio: título y description por módulo (Basic Zero — Month 1 / Simple Present — Month 2).
- Si el `moduleId` no existe, redirige a `/`.

### 2. Home simplificada (`src/routes/index.tsx`)

- Mantiene: stats de Streak / Reps / Minutes y el `AppShell`.
- Cada módulo pasa a ser una tarjeta compacta clicable (`<Link to="/module/$moduleId" params={{ moduleId }}>`) con: label, título, subtítulo, meta chips, barra de progreso y `N / M days` — el mismo bloque navy que ya existe, ahora como link completo.
- Se eliminan de Home: `DailyPracticeCard`, la lista "All days" y `JourneyDayRow` (viven ahora en la página del módulo).

### 3. Sin cambios

- Practice, recorder, TakeBoard, audio, sentence counter, DayCompleteScreen, progreso local/cloud, desbloqueo de todos los días: todo igual.
- No se toca contenido de cursos ni servicios más allá de lo necesario para mover la sección.

## Notas técnicas

- `ModuleSection` se convierte en el componente de la página del módulo (puede extraerse a `src/components/fluency/ModuleSection.tsx` para compartir entre rutas).
- El routeTree se regenera solo al crear el archivo de ruta.
- Validación de `moduleId` contra `CourseService.modules()`.

## Verificación

- Typecheck.
- Home muestra solo stats + 2 tarjetas de módulo; click navega a `/module/basic-zero` y `/module/simple-present`.
- Página del módulo muestra header, tarjeta del día, lista por semanas y navega a `/practice?day=N&module=...`.
- Playwright mobile: Home → módulo → día → Practice.
