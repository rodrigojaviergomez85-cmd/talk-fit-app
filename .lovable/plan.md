# Plan: Material de apoyo en Natural Method

## Qué se va a hacer
Agregar una tarjeta de "material de apoyo" debajo de los dos botones actuales en `/natural-method`, con instrucciones motivacionales estilo Gen Z para que el estudiante use su cuaderno de vocabulario, aprenda verbos, phrasal verbs e idioms, y evite distracciones al estudiar.

## Cambios
1. **Nueva sección en `/natural-method`** (`src/routes/natural-method.index.tsx`)
   - Tarjeta visual con ícono de cuaderno (`BookOpen`).
   - Título: "Tu cuaderno de vocabulario" / "Your vocab notebook".
   - Cuerpo con el texto aprobado (ver más abajo).
   - Respetar el tema actual, colores semánticos y bilingüismo de la app.
   - No agregar navegación ni cambiar los dos botones principales.

2. **Textos aprobados**

   **ES:**
   ```
   Tu cuaderno de vocabulario es tu mejor aliado. Aprendete de memoria los 100 verbos más comunes: no hay shortcut, es la base de todo. Meta: 10 verbos por día + 10 palabras nuevas sacadas de frases reales de tu serie, audiolibro o peli favorita. También domina los phrasal verbs e idioms del día a día. Y porfa, nada de estar viendo el cel con distracciones: apaga notificaciones y concéntrate, tu futuro vale mucho más. 💪🔥
   ```

   **EN:**
   ```
   Your vocab notebook is your bestie. Memorize the 100 most common verbs: no shortcut, it's the foundation. Goal: 10 verbs a day + 10 new words from real phrases in your favorite show, audiobook, or movie. Also own the everyday phrasal verbs and idioms. And please, no getting distracted by your phone: turn off notifications and focus, your future is worth way more. 💪🔥
   ```

3. **Claves i18n**
   - Agregar `natural.supportTitle` y `natural.supportBody` en `src/lib/i18n.tsx`.
   - Usarlas desde `src/routes/natural-method.index.tsx`.

## Qué NO cambia
- Los botones existentes "Verbos más comunes" y "Método natural: audiolibros".
- Rutas, navegación inferior, curso, progreso, Review, Coach, cuotas, reglas de desbloqueo o práctica diaria.
- Contenido de verbos, phrasal verbs, idioms ni audiolibros.

## Verificación
- `bunx tsc --noEmit` pasa.
- Ruta `/natural-method` carga y muestra la nueva tarjeta.
- Captura en móvil (360–430 px) y desktop.
- Texto se ve correctamente en inglés y español.
