# Unificar Progreso y Grabaciones

## Idea

Hoy hay dos pestañas separadas abajo: **Progreso** (números, módulos, días) y **Grabaciones** (comparaciones y audios guardados). Son la misma pregunta del alumno: *"¿estoy mejorando?"* — una lo responde con datos y la otra con su propia voz.

Propuesta: una sola pantalla **Progreso** con dos pestañas internas:

```text
  PROGRESO
  ┌─────────────┬──────────────┐
  │   AVANCE    │    AUDIOS    │
  └─────────────┴──────────────┘
```

- **AVANCE**: lo que ya está en Progreso hoy (racha, días, minutos, módulos y semanas).
- **AUDIOS**: lo que ya está en Grabaciones hoy (primera vs. más reciente, momentos clave, biblioteca de pasos finales, comparaciones).

La barra inferior pasa de 4 a 3 botones: Inicio · Progreso · Cuenta.

## Qué cambia

- Nueva pantalla con pestañas dentro de `/progress`, recordando la última pestaña vista.
- `/recordings` sigue funcionando: lleva a `/progress` en la pestaña de audios (enlaces viejos no se rompen).
- Se quita el botón "Grabaciones" de la barra inferior.
- El botón de "Coach Check" que hoy vive al final de Grabaciones se mantiene dentro de la pestaña de audios.
- Textos en español e inglés para las dos pestañas.

## Qué NO cambia

Nada de práctica, evaluación con IA, cuotas, hábitos, rachas ni almacenamiento de audios. Es solo reorganización de pantallas.

## Detalles técnicos

- `src/routes/progress.tsx`: extraer el contenido actual a un componente interno y añadir un selector de pestañas; parámetro de búsqueda `tab=avance|audios` para navegación directa y persistencia en la URL.
- Mover el cuerpo de `src/routes/recordings.tsx` a `src/components/fluency/RecordingsPanel.tsx` y renderizarlo en la pestaña de audios; `/recordings` queda como redirección a `/progress?tab=audios`.
- `BottomNav.tsx`: quitar el ítem `/recordings`.
- Nuevas claves i18n `progress.tabProgress` / `progress.tabAudio`.
- Verificación: `npx tsc --noEmit`, suite de tests y build.
