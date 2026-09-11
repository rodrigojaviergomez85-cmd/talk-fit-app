# Rediseñar “Mi constancia” en Inicio

## Objetivo
Reemplazar el calendario confuso por el resumen visual mostrado en la imagen de referencia.

## Diseño
- Encabezado “Mi constancia / My consistency” con un ícono de información.
- Primera fila: llama, “Racha actual / Current streak” y el número real de días alineado a la derecha.
- Separador visual.
- Segunda fila: “Reto de 66 días / 66-day challenge” y el progreso real `X/66`.
- Barra horizontal naranja que avance según los días de práctica acumulados.
- Mensaje con trofeo indicando cuántos días faltan para el próximo logro real.
- Mensaje breve: “Completa tu práctica de hoy y suma otro día”, también en inglés.
- El ícono de información mostrará la explicación existente sobre cómo funciona el reto.

## Comportamiento
- La tarjeta no tendrá calendario, números de días individuales, flecha desplegable ni elementos que parezcan días seleccionables.
- La tarjeta será informativa; solo el ícono de información tendrá interacción.
- Se conservarán sin cambios el cálculo de racha, el progreso acumulado, los logros y todas las reglas del reto de 66 días.
- Al completar los 66 días, la barra aparecerá completa y el mensaje cambiará a reto completado.

## Validación
- Revisar español e inglés con progreso en cero, parcial y completo.
- Confirmar en móvil que no haya desbordes ni zonas que parezcan botones.
- Confirmar que una práctica completada actualice la racha, `X/66`, la barra y el próximo logro.
