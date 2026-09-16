# Volver al día y avanzar al siguiente

## Qué cambia para el estudiante

1. Al terminar la **historia** (Paso 1), el botón de salida ya regresa a la pantalla del día. Se mantiene igual.
2. Al terminar los **audios del día** (Paso 2), el botón final de la pantalla de felicitación dirá "Volver a mi día" y llevará a la pantalla del día que acaba de practicar, en lugar de al inicio.
3. Al volver, la pantalla del día vuelve a consultar los puntos: la actividad aparece marcada con "✓ 150 pts" y la barra "Tus puntos de hoy" sube (por ejemplo 150/300 o 300/300).
4. Abajo de la pantalla del día aparece un botón **"Siguiente día"**:
   - Si el siguiente día ya está disponible, lleva a la pantalla de ese día.
   - Si aún no está disponible (o ya es el último día del módulo), el botón se muestra apagado con un mensaje corto: "Mañana se abre el Día X" / "Módulo terminado".
   - Todo bilingüe (español/inglés) según el idioma activo.

## Detalles técnicos

- `src/components/fluency/DayCompleteScreen.tsx`: el botón final navega a `/day/$moduleId/$day` con el día actual; mantiene el texto "Continuar" solo cuando no hay día válido al que volver.
- `src/routes/day.$moduleId.$day.tsx`: añadir el bloque de "Siguiente día" al final, usando `JourneyService` / `isDayUnlocked` para decidir si está habilitado, y `<Link to="/day/$moduleId/$day">` para navegar.
- Los puntos ya se refrescan al entrar y al enfocar la ventana (`useLeagueDay`); además se forzará un refresco cuando la pantalla vuelve a ser visible, para que el estudiante vea el cambio inmediatamente después de completar.
- Nuevas etiquetas de texto en el archivo de idiomas; sin cambios de base de datos ni de reglas de puntos.
- Verificación: chequeo de tipos, pruebas existentes y revisión en el navegador móvil del flujo práctica → día → siguiente día.
