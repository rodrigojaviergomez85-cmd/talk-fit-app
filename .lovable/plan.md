# Plan: Material de apoyo en Natural Method

## Qué se va a hacer
Agregar una tarjeta de "material de apoyo" debajo de los dos botones actuales en `/natural-method`, con instrucciones motivacionales estilo Gen Z para que el estudiante use su cuaderno de vocabulario, aprenda verbos, phrasal verbs e idioms, y revise ortografía.

## Cambios
1. **Nueva sección en `/natural-method`** (`src/routes/natural-method.index.tsx`)
   - Tarjeta visual con ícono de cuaderno/lápiz (`BookOpen` o `Pencil`).
   - Título: "Tu cuaderno de vocabulario" / "Your vocab notebook".
   - Cuerpo con el texto propuesto (ver más abajo).
   - Respetar el tema actual, colores semánticos y bilingüismo de la app.
   - No agregar navegación ni cambiar los dos botones principales.

2. **Textos propuestos (revisar ortografía, tono Gen Z)**

   **ES:**
   ```
   Tu cuaderno de vocabulario es tu mejor aliado. Aprendete de memoria los 100 verbos más comunes: no hay shortcut, es la base de todo. Meta: 10 verbos por día + 10 palabras nuevas sacadas de frases reales de tu serie, audiolibro o peli favorita. También domina los phrasal verbs e idioms del día a día.

   Y porfa, cuando estudies deja las distracciones. Nada de estar viendo el celu a cada rato para ver quién te escribió. Foco total, que el inglés no se aprende a medias. 🔕📵💪🔥

   Antes de grabar, revisa la ortografía. No regrets.
   ```

   **EN:**
   ```
   Your vocab notebook is your bestie. Memorize the 100 most common verbs: no shortcut, it's the foundation. Goal: 10 verbs a day + 10 new words from real phrases in your favorite show, audiobook, or movie. Also own the everyday phrasal verbs and idioms.

   And please, when you study, cut the distractions. No checking your phone every two minutes to see who texted. Full focus — you don't learn English halfway. 🔕📵💪🔥

   Before you hit record, double-check spelling. No regrets.
   ```

3. **Opcional: extraer a i18n**  
   Si se prefiere mantener consistencia, se agregarán las claves `natural.supportTitle` y `natural.supportBody` en `src/lib/i18n.tsx` en lugar de texto inline.

## Qué NO cambia
- Los botones existentes "Verbos más comunes" y "Método natural: audiolibros".
- Rutas, navegación inferior, curso, progreso, Review, Coach, cuotas, reglas de desbloqueo o práctica diaria.
- Contenido de verbos, phrasal verbs, idioms ni audiolibros.

## Verificación
- `bunx tsc --noEmit` pasa.
- Ruta `/natural-method` carga y muestra la nueva tarjeta.
- Captura en móvil (360–430 px) y desktop.
- Texto se ve correctamente en inglés y español.

## Nota
El usuario pidió revisar ortografía. Se propone "Aprendete" manteniendo el tono informal del mensaje original, pero se puede ajustar a "Aprende de memoria" si prefiere más formal.