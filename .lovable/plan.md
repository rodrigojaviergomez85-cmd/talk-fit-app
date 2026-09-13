# Paso 4: reubicar el disclaimer "Práctica sin IA"

## Objetivo

En el Paso 4 (HAZLO TUYO / MAKE IT YOURS) de la práctica diaria, el disclaimer "Práctica sin IA · No hay evaluación automática" aparece actualmente justo debajo del título del paso. Los estudiantes se confunden y se quedan esperando que la IA califique. Se moverá el mensaje justo debajo del temporizador/contador del grabador, donde lo verán en el momento de grabar.

## Cambios

### 1. `src/routes/practice.tsx` — `Rep4MakeItYours`

- Quitar `<NoAiDisclaimer tKey="rep4.noAi" />` de su ubicación actual (debajo de `RepHeader`).
- Colocar el mismo `<NoAiDisclaimer tKey="rep4.noAi" />` justo debajo del componente `VoiceRecorder`, de modo que quede debajo del timer/círculo naranja.
- Mantener el estilo existente (`text-center text-[11px] leading-snug text-muted-foreground`).

El mensaje seguirá siendo:

- ES: "🎙️ Práctica sin IA · No hay evaluación automática."
- EN: "🎙️ Practice without AI · No automatic evaluation."

### 2. Step 3 y otros pasos

- No se modifica el disclaimer del Paso 3 (shadowing), que permanece bajo su header.
- No se tocan textos, traducciones ni tests porque el copy no cambia.

## Verificación

- `bunx tsgo` sin errores.
- Screenshot móvil del Paso 4 confirmando que el disclaimer aparece debajo del grabador y que no queda espacio vacío prominente arriba.
