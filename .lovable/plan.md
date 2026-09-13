# Plan: "Saltar por ahora" visible desde el inicio

## Objetivo
El botón sutil **"Saltar por ahora" / "Skip for now"** debe aparecer desde el primer momento, no solo después de un intento fallido.

## Cambio único
En `src/components/storybook/StorybookPlayer.tsx` (componente `QuizSlide`):

- **Hoy:** el botón aparece solo cuando `checkStatus === "tryAgain"` y `attempts >= 1` (después del primer intento fallido).
- **Nuevo:** el botón aparece en cuanto el estudiante contestó correctamente la pregunta y todavía no ha grabado exitosamente — es decir, visible desde antes del primer intento, durante la grabación y después de fallos.
- Se mantiene: gris, pequeño, subrayado, debajo de la tarjeta de grabación; al tocarlo avanza sin estrella ni sonido de celebración.
- Se mantiene: la respuesta correcta a la pregunta sigue siendo obligatoria para que aparezca la sección de grabación (y con ella el botón Saltar).
- Se oculta una vez que el estudiante grabó bien (ya no hace falta) o cuando se agotaron los 2 intentos y aparece el botón naranja "Continuar" (para no mostrar dos salidas duplicadas).

## Verificación
- `bunx tsgo` y pruebas de storybook.
- Playwright móvil: el botón visible antes de grabar, sigue visible tras un fallo, y al tocarlo avanza.
