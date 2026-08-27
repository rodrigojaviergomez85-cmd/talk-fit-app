# Instrucciones de práctica también en español

## Objetivo
Además de las frases y preguntas (que ya tienen botón ES), las **instrucciones, títulos y notas de cada repetición** deben tener su traducción al español para que un principiante que no entiende nada de inglés pueda seguir la sesión.

## Alcance

### 1. Componente `Instruction` bilingüe
- Extender `Instruction` en `src/routes/practice.tsx` con prop opcional `es` (traducción escrita a mano).
- La traducción se muestra debajo del título en inglés, controlada por el mismo sistema existente: botón **ES** individual + toggle "Mostrar todo en español" (`SpanishProvider`/`useSpanishAll`).
- Implementación simple: si hay `es`, mostrar el texto en español con estilo secundario (texto más pequeño, `text-muted-foreground` en cursiva o similar) cuando el toggle global o el botón ES está activo.

### 2. Traducciones de las 9 repeticiones
Añadir `es` a cada instrucción/nota de `RepBody` y cada rep, escritas a mano:

- Rep 1 "Mira las frases. Escucha cada una." → "Escucha y observa…" (títulos actuales de cada rep: Listen, Echo, etc.)
- Rep 3 "Speak WITH the model." → "Habla CON el modelo."
- Slow shadowing note "Copy the speaker's rhythm…" → "Copia el ritmo, el énfasis y la pronunciación del hablante."
- Natural speed "Now match natural English." → "Ahora iguala el inglés natural."
- Rep 7 (hablar sin modelo), Rep 8 (preguntas personales), Rep 9 (hablar libre), Rep 10 (rep final) — instrucción y nota de cada una.
- Encabezados de sección dentro de reps (heading de Shadowing, etiquetas como "Your answer", etc. donde aporten).

### 3. Pantallas de análisis y resumen
- Textos de carga "Your AI coach is listening…" y las instrucciones de Quick Fix / Summary reciben línea en español debajo (estáticas, dentro del mismo proveedor para respetar el toggle).

### 4. Sin cambios funcionales
- Solo presentación: no se toca grabación, IA, ni navegación. Las traducciones viven junto al texto en inglés en `practice.tsx`.

## Verificación
- `bunx tsgo --noEmit` pasa.
- Revisión en preview con Playwright: con el toggle OFF no se ve español; con ON (o botón ES) aparecen las instrucciones en español en las 9 reps.
