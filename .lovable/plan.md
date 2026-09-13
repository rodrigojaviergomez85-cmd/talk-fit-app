# Temporada 3 — Episodios 6 a 20 (Basic 2 · Simple Present)

Completar los 15 episodios que faltan de "La nueva rutina de Vale", con los mismos controles de calidad de las temporadas 1 y 2.

## Qué se va a crear

**Semana 2 (días 6–10) — Rutinas de otras personas**
- Ep 6: La rutina de la mamá de Vale (videollamada familiar).
- Ep 7: Mateo entrena fútbol antes del turno.
- Ep 8: El guardia del barrio y su rutina de servicio.
- Ep 9: Ana ensaya para un casting.
- Ep 10: Reto de la semana. Cliffhanger: Ana invita a Vale al casting.

**Semana 3 (días 11–15) — Explicar procesos (first, then, next, finally)**
- Ep 11: Mr. Reyes enseña a configurar la app del trabajo.
- Ep 12: El equipo hace pizza en la oficina.
- Ep 13: Pedir comida por app (vocabulario de comida).
- Ep 14: Vale le explica a Beto cómo preparar su lunch.
- Ep 15: Reto de procesos. Cliffhanger: algo raro pasa en el casting.

**Semana 4 (días 16–20) — Presente progresivo (¿qué está pasando ahora?)**
- Ep 16: En el parque, describiendo lo que ve.
- Ep 17: En la playa con amigos (energía TikTok).
- Ep 18: Vuelve el cliente difícil; todos trabajando a la vez.
- Ep 19: Noche en casa: "I am becoming disciplined."
- Ep 20: Final de temporada — Vale da su primera clase demo a sus amigos. Hook a Temporada 4 (pasado simple).

## Reglas de calidad aplicadas a cada episodio

- 10–11 ilustraciones propias estilo webtoon (nada reciclado de T1/T2), revisadas contra las referencias oficiales: identidad, edad, tono de piel, cabello, ropa, accesorios, anatomía (manos/brazos), props y continuidad.
- Voces estables: Vale marin, Mateo joven alegre, Dylan juvenil, Beto tímido, narrador, jefe, voz femenina y masculina genéricas. Verificación real de audio por episodio.
- 3 preguntas rápidas por episodio: 2 personales validadas por IA + 1 repetición guiada. Variedad WH obligatoria (What, Who, When, Where, Why, How), mínimo una que no sea What.
- Gramática nueva solo presente simple y progresivo; sin pasado. Repaso de futuro integrado: 2–3 menciones naturales por episodio y una escena de planes por semana.
- Afirmaciones motivacionales rotadas, sin validación de IA.
- Vocabulario: todas las palabras tappeables con glosario en español, 12–15 activas, 5–8 recicladas de temporadas anteriores.
- Grabación final máx. 15 segundos con LISTEN TO ME, un solo CTA "AHORA GRABA TUS AUDIOS" y cliffhanger con "Lo ves en el siguiente día".
- Desbloqueo de 1 episodio por día completado; cuenta interna ve todo.

## Detalles técnicos

- Nuevos archivos `src/services/storybook/vale-s3-*.ts` (uno por episodio) registrados en `index.ts`.
- `seasons.ts`: reemplazar los slots `null` de los días 6–20 por los episodios reales con su teaser bilingüe.
- Imágenes en `src/assets/storybook/vale-s3-epN/`, comprimidas bajo ~300 KB cada una.
- Verificación por lote: `tsgo`, suite de pruebas de storybook (glosario, cobertura say-it, variedad de preguntas, seasons) y revisión móvil en 394px con Playwright.
- Guard: ningún episodio de T3 importa assets de temporadas anteriores.

## Entrega

Tres lotes: 6–10, 11–15, 16–20. Cada lote queda revisado y funcionando antes de pasar al siguiente; al final, repaso visual completo de la temporada.
