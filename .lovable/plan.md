# Rediseño de Inicio + calendario de 66 días

Me gusta la propuesta. La pantalla de Inicio queda más limpia y el hábito se vuelve visual y motivador. Esto es lo que haría.

## 1. Saludo inicial

Arriba de todo, antes de la tarjeta principal:

- Saludo según la hora local: "Buenos días" / "Buenas tardes" / "Buenas noches" (y su versión en inglés).
- Si la persona inició sesión, se agrega su nombre (o la parte antes del @ de su correo). Si no, solo el saludo.
- Debajo, una línea corta: la fecha de hoy en su idioma.

## 2. Tarjeta principal (como la imagen)

Se mantiene la información actual pero con la jerarquía de la imagen:

- Emblema del módulo + nombre del módulo y nivel, arriba a la izquierda.
- Etiqueta "TU RETO DE HOY".
- Título grande con el reto del día y una línea de apoyo.
- "Día 8 de 20" con barra de progreso y enlace "Ver días →".
- Botón naranja grande: "Continuar práctica →" (o "Empezar Día X" si es nuevo).

## 3. Tarjeta "Tu constancia" con días numerados

- Título "Tu constancia" y a la derecha la racha con la llama.
- Fila de 7 círculos = el bloque de 7 días de hábito donde va la persona. En vez de L M M J V S D, cada círculo muestra el número del día de hábito: 1, 2, 3… hasta 66.
- Círculo con check naranja = día de hábito cumplido; gris = pendiente; el día actual se resalta con borde.
- Debajo: "8 de 66 días de hábito" y enlace "Ver progreso →".
- Toda la fila es pulsable: al tocarla se despliega dentro de la misma tarjeta el calendario completo de 66 días, en 10 bloques de 7 (más los 3 finales), con el mismo estilo de círculos numerados. Se vuelve a tocar y se cierra.
- Los números salen del historial real de días cumplidos que ya guarda la app; no se inventa nada ni cambia cómo se cuenta el hábito.

## 4. Resto de Inicio

- "Mostrar a mi coach" y el aviso de versión de prueba se mantienen, con el mismo estilo de fila limpia de la imagen.
- El módulo siguiente bloqueado se muestra con su emblema y candado, como en la imagen.

## Alcance técnico

- Se editan solo componentes de presentación: `src/routes/index.tsx`, `CurrentModuleCard.tsx`, `HabitCard.tsx`, un nuevo `HabitCalendar.tsx`, y textos nuevos en `i18n.tsx`.
- El calendario se deriva de `habitDates` del estado existente (día 1 = primera fecha cumplida, y así sucesivamente). No se toca `src/lib/habit.ts`, ni el conteo de hábito, racha, progreso, cuotas, grabaciones ni la práctica.
- `HabitCard` en la página de Progreso (`variant="progress"`) conserva su comportamiento actual; el calendario desplegable se activa también ahí solo si lo pides.
- Objetivos táctiles de 44px, sin cambios de rutas ni de datos.

## Qué no cambia

Práctica, Pasos 1–5, IA, cuotas diarias, grabaciones, sincronización, insignias y progreso del curso.
