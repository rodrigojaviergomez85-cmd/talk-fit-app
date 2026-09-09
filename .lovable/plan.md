# Módulo especial: Cuenta tu película favorita en pasado

Un módulo nuevo dentro de Review, pensado para la pregunta de filtro que hoy reprueba mucha gente. El estudiante primero **escribe** su historia con una plantilla, la IA se la **corrige por escrito**, y después practica hablado los Pasos 2–5 **con su propio texto corregido**.

## Mi recomendación sobre el costo

Es viable para 17,000 estudiantes, porque separamos las dos cosas:

- La corrección escrita es texto puro y es lo más barato que hay (un modelo pequeño y rápido). Con máximo 3 correcciones por estudiante, el gasto por historia es mínimo.
- Los Pasos 2–5 **no agregan gasto nuevo**: reutilizan exactamente lo que ya existe hoy (comparación local del Paso 2 y el Coach del Paso 5) y siguen el mismo tope diario de prácticas y la misma cuota de Coach que ya limitan el consumo.

Protecciones para que no se dispare:
- Máximo 3 correcciones por historia (contador guardado en la cuenta, no en el teléfono).
- Si el estudiante pide corregir el mismo texto sin cambios, devolvemos la corrección guardada sin volver a pagar.
- Límite de largo del texto y validación antes de enviar (mínimo 12 líneas; sin máximo, pero con tope técnico de caracteres).
- Cuenta de prueba interna sigue exenta, como hoy.

## Cómo lo vive el estudiante

1. **Guía** (7 tarjetas bilingües): cómo se cuenta una película en pasado — verbos regulares e irregulares frecuentes en cine (watched, went, saw, told, found, decided, ended), `didn't + verbo base`, `was/were`, conectores de secuencia (first, then, after that, at the end), y los errores típicos.
2. **Escribe tu historia** con plantilla de 5 bloques:
   - Título y dónde/cuándo la viste
   - Personajes principales
   - Cómo empieza
   - El problema / el momento clave
   - El final y tu opinión
   Cada bloque tiene ejemplo, traducción y meta de líneas. Mínimo 12 líneas en total; mostramos un estimado de segundos hablados (60–120 s) para que sepan si ya alcanza.
3. **Corrección de la IA** (hasta 3 veces): devuelve el texto corregido bloque por bloque, con la lista de cambios agrupados por regla (pasado irregular, `didn't`, `was/were`, orden), explicación corta en español y el porqué. Nada de puntajes ni CEFR.
4. **Confirmar historia final**: el estudiante acepta el texto corregido. Ese texto queda como el objetivo real de los pasos siguientes.
5. **Pasos 2–5 con su propia historia**, igual que en el resto de Review:
   - Paso 2 · COPIA: la historia se divide por bloques/párrafos y la va copiando trozo por trozo (comparación local contra su propio texto).
   - Paso 3 · SHADOWING: karaoke del mismo texto.
   - Paso 4 · HAZLA TUYA: 3 preguntas WH sobre su película (what happened, why, how long).
   - Paso 5 · FINAL: cuenta la película completa; 3 grabaciones obligatorias, 4 y 5 opcionales, selección de la toma final, Coach y el retake evaluado que ya existe.

## Detalles técnicos

- Nuevo módulo `review-movie-story` en el registro de Review, con guía, errores típicos y perfil de corrección del Paso 2. No toca los módulos existentes.
- Nuevo tipo de práctica "escrita": la historia del estudiante se convierte en tiempo de ejecución en el material objetivo de los Pasos 2–5, en vez de venir de contenido fijo.
- Tabla nueva `movie_stories` (user_id, bloques del borrador, texto corregido, correcciones aplicadas, `correction_count`, hash del último texto corregido, timestamps) con RLS por usuario y GRANTs.
- Endpoint nuevo `/api/movie-story-correction`: autenticado, valida entrada con Zod, aplica el tope de 3 y la caché por hash del texto, y usa un modelo de texto económico del gateway. Devuelve texto corregido + correcciones agrupadas; nunca devuelve puntajes.
- Paso 2: se agrega el texto confirmado del estudiante como objetivo confiable para `/api/rep2-correction`, igual que ya se hace con los objetivos de Review, con perfil de tolerancia de nivel básico.
- Paso 5: reutiliza el Coach actual sin llamadas extra; el contexto del prompt es la historia confirmada.
- Contabilidad del tope diario de prácticas: solo la primera grabación real consume cupo; escribir y corregir no consume cupo de práctica.
- Pruebas: validación de largo, tope de 3 correcciones, caché por texto idéntico, división por bloques del Paso 2 y las 3 preguntas WH del Paso 4.
