# Nueva Home (parecida a tu imagen)

Solo cambia la pantalla de Inicio. Nada del curso, progreso, audios, IA, Review, límites ni desbloqueos se toca.

## Cómo quedará, de arriba a abajo

1. **Saludo**: "¡Hola, Rodrigo!" en grande y debajo la fecha de hoy en tu idioma (Miércoles, 9 de septiembre).
2. **Tarjeta azul oscuro de la práctica de hoy**
   - A la izquierda, el **emblema real de tu módulo** (el pollito de Basic Zero, el tigre, el águila, etc. — el mismo dibujo que ya usas en Avance, no un ícono nuevo).
   - Al lado, el nombre del módulo. A la derecha, la píldora "Día 2 de 20".
   - Etiqueta naranja "TU PRÁCTICA DE HOY", el título del día ("Sofia — My Introduction") y dos líneas de descripción.
   - Botón naranja ancho: "Continuar práctica →" (o "Empezar práctica" si aún no empezó ese día).
   - Enlace subrayado "Ver todos los días".
3. **Mi constancia**: llama actual y "8 días seguidos" arriba a la derecha; los siete días de la semana (Lun–Dom) con su número de fecha real; los días con práctica en naranja, hoy con anillo y la palabra "Hoy"; abajo "9 de 66 días con práctica".
4. **Lo que sigue**: módulo siguiente con su emblema en gris, nombre, su frase de presentación y la nota "Se desbloquea al completar Basic Zero", con candado.
5. **Fila** "Ver resumen para mi profesor" con flecha.
6. **Pie**: "Versión de prueba · Reportar un problema".
7. **Barra inferior** igual que ahora, sin cambios.

## Datos reales, no de ejemplo

Todo sale de tu información actual: módulo activo, día actual, título del día, racha, días practicados, hábito de 66 días, siguiente módulo y sus reglas de desbloqueo. Si aún no hay datos cargados, se ve un estado de carga; si falla, aparece el botón de reintentar como hoy.

## Notas técnicas

- Editar `src/routes/index.tsx` y ajustar/crear componentes de Home (`CurrentModuleCard`, tarjeta semanal, `NextModuleLocked`), reutilizando `ModuleBadge` para el emblema en la tarjeta navy y en la tarjeta bloqueada.
- Datos vía `JourneyService`, `Progression`, `course-service`, `habit.ts` y `module-teasers.ts`. Sin cambios de lógica ni de servicios.
- Textos nuevos en `src/lib/i18n.tsx` (ES/EN); nada codificado en un solo idioma.
- Colores por tokens del tema (navy/naranja); sin colores fijos en los componentes.
- Verificación: idioma ES/EN, fechas locales, 360/390/430 px y escritorio, foco y tamaños táctiles ≥44px, typecheck, pruebas y build.
