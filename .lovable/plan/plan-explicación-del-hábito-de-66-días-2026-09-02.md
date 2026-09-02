# Plan: Explicación del Hábito de 66 Días

## Objetivo
Agregar una explicación clara y bilingüe (ES/EN) de **qué es** el reto de 66 días y **por qué** existe, accesible desde la tarjeta del hábito y en la celebración del día 66.

## Contenido de la explicación (bilingüe)
- **Qué es**: Un reto para completar 66 días de práctica de speaking (no tienen que ser consecutivos — el progreso no se pierde).
- **Por qué 66**: Una explicación simple basada en la idea popular de que formar un hábito toma ~66 días de repetición (investigación de hábitos, University College London), conectada con la fluidez en inglés: la repetición diaria convierte hablar en automático.
- **Sin presión**: Reforzar el mensaje "no pierdes nada si faltas un día".

## Cambios

### 1. `src/lib/habit.ts`
- Agregar constante exportada `HABIT_EXPLANATION: { title, what, why, noShame }` con copy ES/EN reutilizable.

### 2. Nuevo componente `src/components/fluency/HabitExplainer.tsx`
- Bottom sheet / diálogo (reutilizar patrón existente tipo `MomentSheet`) con:
  - Título: "¿QUÉ SON LOS 66 DÍAS?" / "WHAT ARE THE 66 DAYS?"
  - Sección "Qué es" y sección "Por qué 66 días" (con el dato del estudio de hábitos)
  - Mensaje final sin presión: "Si faltas un día, tu progreso sigue aquí."
  - Botón cerrar con touch target ≥44px.

### 3. `src/components/fluency/HabitCard.tsx`
- Agregar un link sutil tipo "¿Por qué 66 días?" (icono `Info` de lucide + texto) junto al título de la tarjeta, en variantes Home y Progress, que abre el `HabitExplainer`.

### 4. `src/components/fluency/DayCompleteScreen.tsx` (celebración `habit-66`)
- En el bloque del milestone de 66 días, agregar un link/botón "¿Por qué 66 días?" que abre el mismo `HabitExplainer`, para que el usuario entienda el significado del logro al alcanzarlo.

## Notas técnicas
- Sin cambios de base de datos ni backend.
- Todo el texto respeta el idioma de la app (`useAppLang`), ES primario.
- Mobile-first, ≥44px touch targets, respeta `motion-reduce`.

## Verificación
- Revisar en el preview (Home y Progress) que el link abre el sheet y el texto se ve correcto en ES y EN.
