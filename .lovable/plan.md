# Temporada 2 · Producción completa (Episodios 1–20)

## Respuesta a la pregunta
Sí: todo funciona igual que en la Temporada 1. Los 20 guiones ya están escritos con la misma estructura — solo falta generar las ilustraciones y publicar los episodios. No hay que construir nada nuevo de audio ni de voces: se reutiliza el mismo sistema.

## Lo que ya está hecho
- 20 guiones completos (`vale-s2-*.ts`) con 10 escenas, 3 preguntas TPRS, vocabulario tocable, afirmación hablada, grabación final máx. 15 s y gancho al siguiente episodio.
- Estructura de la Temporada 2 en `seasons.ts` (20 días, desbloqueo diario, teasers), con `episodeId: null` pendiente de registro.

## Lo que falta (este plan)
Por cada episodio, igual que la Temporada 1:

1. **Ilustraciones webtoon** — portada + 10 escenas por episodio, usando las referencias canónicas de `src/assets/storybook/_canon/` y las reglas de `STYLE.md` (tono de piel de Vale, dos brazos/dos manos, ropa y peinado fijos por personaje).
2. **Registro** — importar cada episodio en `src/services/storybook/index.ts` y poner su `episodeId` en el slot del día correspondiente en `seasons.ts`.

El audio, las voces por personaje, las palabras tocables con significado en español, las preguntas TPRS, la afirmación hablada con estrella y el botón LISTEN TO ME ya vienen incluidos en los guiones y en el reproductor — funcionan automáticamente al registrar cada episodio.

## Voces (sin cambios)
- Vale: voz femenina juvenil aprobada (`marin`), misma en los 20 episodios.
- Mateo, Luis, Kat, Dylan, Camila, Mr. Reyes, Ana: mismas voces estables de la Temporada 1.
- Beto (personaje nuevo de la Temporada 2): se le asigna una voz masculina joven y se documenta en `STYLE.md`.

## Orden de trabajo y control de calidad
- Producción en 4 lotes de 5 episodios: 1–5, 6–10, 11–15, 16–20. Cada lote queda visible en la app al terminar.
- Triple chequeo por lote (el sistema de QA acordado):
  - **Visual:** hoja de contacto de cada episodio — identidad, tono de piel, cabello, ropa, anatomía (dos brazos/dos manos), mapas/props y continuidad entre escenas. Cualquier error se regenera antes de seguir.
  - **Audio:** verificación automática de que cada línea tiene su personaje asignado + muestra real de TTS por personaje (una escucha de Vale y de cada voz nueva).
  - **Técnica:** TypeScript + tests de storybook + recorrido móvil en el navegador de al menos un episodio por lote.

## Notas técnicas
- Archivos de guiones: `src/services/storybook/vale-s2-*.ts` (ya existen).
- Imágenes nuevas: `src/assets/storybook/vale-s2-ep<N>/` (portada `cover.jpg` + `s1.jpg`…`s10.jpg`).
- Registro: `src/services/storybook/index.ts` y `src/services/storybook/seasons.ts` (slots de la Temporada 2).
- Voces: `src/services/storybook/voices.ts` (agregar solo Beto).
- Desbloqueo: sin cambios — un episodio por día de práctica; cuentas internas ven todo desbloqueado.
