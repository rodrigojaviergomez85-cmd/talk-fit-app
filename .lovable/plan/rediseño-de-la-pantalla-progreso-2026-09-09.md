# Rediseño de la pantalla Progreso

Sí, leí el documento completo y la imagen. Reorganizo la pestaña "Resumen" de Progreso siguiendo el estilo de la referencia, pero dejando **la ruta de módulos siempre visible** (no como botón), con datos reales del estudiante.

## Nuevo orden de la pantalla (pestaña Resumen)

1. Encabezado: "Tu progreso" / "Paso a paso, Champion." (sin duplicar el título actual).
2. Tarjeta azul marino del **módulo actual**: nombre real, insignia y teaser corto en el idioma elegido. Si terminó todo, muestra un estado de finalización, no un módulo inventado.
3. **Últimos 7 días**: cinco indicadores hacia la meta de cinco días con práctica, contando fechas distintas (incluye fines de semana). Al llegar a cinco: "Meta cumplida". Tiempo hablado con reglas honestas: 1–59 s = "Menos de 1 min", cero real = "Aún sin tiempo registrado", sin dato = "Sin datos".
4. **Escucha tus intentos**: dos reproductores compactos (primer intento / más reciente) usando el reproductor autorizado actual. El subtítulo "de la misma práctica" solo aparece si ambos audios son realmente del mismo módulo y día; si no, se muestra un estado breve con acceso a "Mis audios". Un audio a la vez.
5. **Mi constancia**: días reales acumulados, meta de 66, barra y próximo logro real.
6. **Mi ruta** (siempre desplegada, justo debajo): todos los módulos con insignia, nivel y nombre, teaser breve, estado real (actual, completado, disponible, bloqueado) y avance. El actual se destaca en naranja; los bloqueados se ven pero no se abren.
7. **Estadísticas y logros**: se conservan totales, récords, insignias y el detalle de días/semanas por módulo, agrupados debajo.

La pestaña "Mis audios" y el acceso directo `/progress?tab=audio` no cambian.

## Reglas que se respetan

- Los desbloqueos siguen viniendo de la lógica actual de acceso; no se deduce nada por el orden de las tarjetas ni se cambian requisitos de Advanced.
- Sin nuevas llamadas de IA, sin tablas, migraciones, cuotas ni cambios en Review, Test Ready o grabaciones.
- Un solo idioma por tarjeta según la preferencia del usuario.
- Los teasers son objetivos de práctica, nunca promesas de dominio, empleo ni certificación.

## Detalles técnicos

- `src/routes/progress.tsx`: reestructurar la pestaña Resumen en secciones nuevas; extraer subcomponentes (`CurrentModuleCard`, `Last7DaysCard`, `ListenAttemptsCard`, `HabitCard`, `JourneyList`) a `src/components/fluency/progress/`.
- Nuevo mapa tipado `src/lib/module-teasers.ts` con los 11 teasers ES/EN por ID estable; no toca `course-index.ts` ni descripciones compartidas.
- Actividad reciente: selector de solo lectura sobre `habitDatesOf(state)` filtrado a los últimos 7 días; no se reetiquetan los números de `weekStats`.
- Comparación de audios: envolver `firstVsLatest` con una verificación de mismo `moduleId` + `day`; si no coincide, estado alterno.
- Encabezado: opción local en `AppShell` (o encabezado propio en Progress) para no duplicar título; los estados de carga/error/sincronización pendiente siguen visibles.
- Se reutilizan `ModuleBadge`, `StatusBadge`, `Progression`, `JourneyService`, `habit.ts`, i18n y el sistema de audio existente.

## Verificación

- `npx vitest run` y compilación del proyecto.
- Pruebas nuevas solo para: ruta visible con los 11 módulos y teasers, mapeo módulo/insignia por nivel, bloqueo preservado, cero actividad / repeticiones / fin de semana, tiempo <1 min / cero / ausente, y 0–1–2 grabaciones sin comparar módulos distintos.
- Revisión visual a 360, 390 y 430 px y en escritorio: sin scroll horizontal ni contenido bajo la barra inferior.
