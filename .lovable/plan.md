# Rediseño de Home según la imagen de referencia

Rediseñar **solo** `src/routes/index.tsx` (y componentes nuevos pequeños) para que la Home se vea como el mockup: saludo con fecha, tarjeta oscura de práctica de hoy, tarjeta "Mi constancia", "Lo que sigue" y enlace al coach. Sin tocar práctica, progreso, IA, cuotas, grabaciones ni navegación.

## Estructura propuesta (de arriba hacia abajo)

1. **Saludo** — "¡Hola, Rodrigo!" (nombre real del perfil; si no hay, saludo genérico) + fecha local en español/inglés ("Miércoles, 9 de septiembre"). Reutiliza/ajusta `HomeGreeting`.
2. **Tarjeta de práctica de hoy** (fondo navy, como en la imagen):
   - Badge del módulo (`ModuleBadge`) + nombre del módulo + chip "Día N de 20" (fecha real del journey).
   - Etiqueta "TU PRÁCTICA DE HOY" en naranja.
   - Título de la práctica del día (personaje + tema del día actual).
   - Descripción breve del día (existente en los datos del curso).
   - Botón naranja grande "Continuar práctica →" (o "Comenzar práctica" si no hay sesión en curso) que lleva al día actual.
   - Enlace "Ver todos los días" → `/module/$moduleId`.
   - Reutiliza la lógica de `CurrentModuleCard`; solo cambia la presentación a la versión oscura del mockup.
3. **Mi constancia** — tarjeta blanca con:
   - Título "Mi constancia".
   - A la derecha: ícono de flama + "Racha actual · N días seguidos" (racha real).
   - Fila de 7 círculos de la semana actual (Lun–Dom): días con práctica en naranja, día de hoy resaltado con anillo y etiqueta "Hoy", futuros en gris. Reutiliza los selectores de `progress-last7.ts` / lógica de hábito existente.
   - Línea final: "N de 66 días con práctica" (dato del HabitCard actual).
   - Esto reemplaza visualmente el `HabitCard` actual en Home (el HabitCard completo/calendario sigue disponible en Progress si ya está ahí; no se elimina ningún dato).
4. **Lo que sigue** — tarjeta del siguiente módulo bloqueado:
   - Ícono + nombre del módulo siguiente + su teaser bilingüe (ya existe `module-teasers.ts`).
   - Nota con candado: "Se desbloquea al completar {módulo actual}".
   - Reutiliza `NextModuleLocked` con estilo nuevo. Si no hay módulo siguiente, no se muestra.
5. **Enlace coach** — fila blanca "Ver resumen para mi profesor →" → `/coach-check`.
6. **Pie** — "Versión de prueba · Reportar un problema" (enlace a `/report`), más discreto que el banner naranja actual.
7. **Estado de error de carga** se conserva (tarjeta con reintentar).

## Qué NO cambia

- Datos, servicios (`JourneyService`, `Progression`, hábito/racha), auth, sincronización.
- Bottom nav, rutas, Progress, Review, práctica.
- El calendario completo de 66 días se queda fuera de Home (ya vive en Progress/HabitCard); Home solo muestra la semana actual, como en el mockup.

## Detalles técnicos

- Textos nuevos bilingües en `i18n.tsx` (keys `home.*` nuevas; no renombrar keys existentes usadas en otras pantallas).
- Colores con tokens semánticos existentes (navy = token de superficie oscura ya usado en la app o uno nuevo en `styles.css` si no existe; naranja = `primary`).
- Componentes nuevos: `HomeTodayCard.tsx`, `HomeWeekCard.tsx` (o adaptar `HabitCard` con variante compacta), ajuste de `NextModuleLocked` para aceptar estilo/teaser.
- Tipografía y espaciados acordes al mockup, mobile-first, objetivos táctiles ≥44px.

## Verificación

- Typecheck + suite de tests existente.
- Revisión en navegador a 390px: Home con sesión activa (día en curso), sin sesión iniciada hoy, y usuario nuevo; confirmar que el botón continúa la práctica correcta y que la racha/semana coinciden con datos reales.
- Sin tests nuevos salvo que se agreguen selectores de fecha/semana nuevos (en ese caso, test enfocado del selector).
