# Sharks: corregir arte del Ep. 9, revisión del usuario, luego 16–20

## Hallazgo: el texto del Ep. 9 ya abre bien; las imágenes son del guion viejo

El guion reescrito del Ep. 9 ya abre con lógica: Vale y Dani acomodan sillas en el centro comunitario (escena 1), Vale dirige juegos de movimiento con los doce niños (escenas 2–4), Camila graba el video, y solo después (mitad del episodio) suena el teléfono con la llamada de Renata desde Monterrey.

El problema que ve el usuario son **las ilustraciones**: siguen siendo las del guion anterior (llamada con Renata), así que visualmente el episodio "empieza en una llamada con una desconocida" aunque el texto diga otra cosa.

## Trabajo aprobado pendiente

1. **Regenerar el arte del Ep. 9** para que coincida con el guion nuevo, estilo webtoon ilustrado del Ep. 2 (768×768, cuadro completo, sin bandas ni texto, <250 KB, personajes canónicos: Vale latina de 19 años, piel canela cálida, cabello negro largo lacio, blusa mostaza; Dani con camisa celeste):
   - s1: Vale y Dani acomodando sillas pequeñas en un salón real del centro comunitario, sábado temprano.
   - s2: Vale dirigiendo el juego de movimiento con doce niños ("jump / freeze").
   - s3: Camila grabando el juego del dinosaurio con su teléfono.
   - s4: Dani contando formularios de inscripción mientras los niños salen con sus padres.
   - s5–s11: auditar una por una contra el guion nuevo y regenerar las que muestren la llamada antes de tiempo o escenas inexistentes; la llamada de Renata solo debe aparecer desde la escena donde el texto la introduce.
   - cover: Vale en el salón con los niños, no en videollamada.
2. **Revisión del usuario**: con el arte corregido, el usuario revisa Ep. 9, 10 y 11 en la app (El Mundo de Vale → Temporada 8).
3. **Verificar tests** de Ep. 11–15 (ya corregidos: palabras del Ep. 12 ~502, presupuestos de vocabulario 11–15, Ep. 13–15 fuera de la capa genérica).
4. **Reescribir a mano Ep. 16–20** (arco aprobado: equipo en tres países → inversionista → decir no → acuerdo regional → cierre multinacional con Dani revelando su ambición política), 11 escenas / 33 líneas / 500–650 palabras / ≥16 unidades B1–B2 nuevas por episodio.
5. **Actualizar presupuestos de vocabulario** 16–20 y **eliminar la capa de expansión genérica** restante.
6. **QA final**: sharks-consistency, sharks-curriculum-alignment, vocabulary-budget, glossary (100% tokens con significado), say-it-coverage, TypeScript, rutas e imports de imágenes (incluido `cover.jpg` del Ep. 13).

## Notas técnicas

- Marco no es speaker permitido en Sharks (offscreen en Ep. 13). Mateo prohibido; Dani es hombre, empleado de Vale en esta temporada. Renata es socia potencial de Kids, no compradora.
- No tocar el guion del Ep. 9 salvo que el usuario pida cambios tras verlo con el arte correcto.
