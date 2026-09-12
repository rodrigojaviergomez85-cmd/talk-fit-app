# Sonido -ed en todos los módulos

Hoy la ayuda del sonido -ed solo aparece en el día 2 de Simple Past. La propuesta es activarla en todos los módulos y todos los días, sin importar el nivel.

## Mi opinión

Tiene sentido activarlo en todas partes: el marcado es automático y solo colorea palabras que realmente terminan en -ed de verbo regular. Si un texto no tiene verbos en pasado, no se pinta nada y la pantalla queda igual que ahora. Así que el riesgo es bajo y el beneficio (que dejen de decir "wa-ched") aplica igual en básico, intermedio y avanzado.

Un matiz: para que no se vuelva ruido visual, propongo mostrar la leyenda de colores y el recordatorio solo cuando el texto de ese día realmente contenga verbos con -ed.

## Qué cambia

- Paso 2 (lectura): palabras -ed en color según su sonido, leyenda y toque para escuchar lento. Ahora en todos los módulos y días.
- Paso 3 (shadowing): mismo coloreado dentro del texto del karaoke, con leyenda.
- Paso 4: recordatorio corto y frase inicial tocable palabra por palabra.
- Paso 5: recordatorio antes de grabar, con botón para escuchar los verbos -ed lento.
- En cualquiera de los pasos, si el texto del día no tiene verbos -ed, no aparece ni leyenda ni recordatorio.

## Qué NO cambia

Currículo, progresión, límites diarios, grabaciones, comparaciones del Paso 2, coach de IA y consumo de créditos quedan exactamente igual. Todo esto es visual y de audio ya existente.

## Detalles técnicos

- Reemplazar la condición `moduleId === "past-stories" && day.day === 2` en `src/routes/practice.tsx` (pasos 2, 3, 4 y 5) por una bandera derivada del contenido del día.
- Nuevo helper en `src/lib/ed-endings.ts` (p. ej. `hasEdWords(text)`) reutilizando `extractEdWords`; calcular una vez por día con `useMemo` sobre `CourseService.getModelText(day)` más los starters del Paso 4.
- Paso 4 evalúa su propia frase inicial; Paso 5 usa el texto modelo del día.
- `EdReminder` ya oculta el botón/lista cuando no hay verbos; añadir que no renderice la tarjeta si la lista viene vacía.
- Pruebas: casos de `hasEdWords` con texto con y sin verbos regulares; correr typecheck y la suite completa.
- Verificación en navegador: un día de Simple Past y un día de un módulo intermedio/avanzado sin verbos -ed para confirmar que no aparece nada.
