# Salir de la práctica + entrada por día

## 1. Salir de los audios ya no guarda "Continuar Día 1 · Paso 3"

Hoy, al salir a la mitad, la app guarda el paso y en Inicio aparece "CONTINUAR DÍA 1 · PASO 3". Nuevo comportamiento:

- El aviso de salida cambia de tono y de contenido:
  - Título: "¿SEGURO QUE QUIERES SALIR?" / "ARE YOU SURE YOU WANT TO EXIT?"
  - Motivación: "Ya casi terminas. Tus audios son los que te dan la fluidez que quieres." / versión en inglés.
  - Advertencia: "Si sales, tu avance de esta práctica se perderá."
  - Botones: "SEGUIR PRACTICANDO" (principal, destacado) y "SALIR" (secundario).
- Al elegir SALIR se borra la sesión guardada de ese día, así que Inicio vuelve a mostrar el botón único "EMPEZAR MI PRÁCTICA" (sin "Paso 3").
- Al salir, el estudiante regresa a la pantalla de elección del día (historia recomendada / audios obligatorios) de ese mismo día, no al Inicio.

## 2. La pantalla de elección muestra la semana y el día

En la cabecera se agrega "SEMANA 1 · DÍA 1 DE 20" (la semana se calcula: días 1–5 = semana 1, 6–10 = semana 2, etc.), en español e inglés.

## 3. "Ver todos los días" lleva a la pantalla de elección

Al abrir la lista de días y tocar cualquier día, se abre la pantalla de elección de ese día (historia del mundo de Vale si ese día tiene episodio, más los audios obligatorios), en vez de entrar directo a los audios.

## Detalles técnicos

- `src/routes/practice.tsx`: reescribir `ExitDialog` (textos, orden/estilo de botones) y en `onExit` llamar `PracticeSessionService.clear(moduleId, dayNumber)` antes de navegar a `/day/$moduleId/$day`.
- `src/routes/day.$moduleId.$day.tsx`: quitar la restricción implícita a episodios; la pantalla ya funciona sin episodio (solo muestra la tarjeta de audios). Añadir etiqueta de semana calculada `Math.ceil(day/5)`.
- `src/components/fluency/DailyPracticeCard.tsx`: `JourneyDayRow` y la tarjeta de día enlazan a `/day/$moduleId/$day` en vez de `/practice`.
- `src/components/fluency/CurrentModuleCard.tsx`: el CTA usa el hub del día siempre (se elimina la condición `basic-zero && day <= 5 && sin sesión`); si hay sesión activa el texto sigue diciendo "Continuar".
- Nuevas claves bilingües en `src/lib/i18n.tsx` para el aviso de salida y la etiqueta de semana.
- Verificación: `tsgo`, tests existentes de práctica/storybook y revisión móvil (394px) del flujo salir → pantalla de elección → Inicio sin "Paso 3".
