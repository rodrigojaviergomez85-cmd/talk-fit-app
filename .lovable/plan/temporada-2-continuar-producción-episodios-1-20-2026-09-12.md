# Temporada 2 · Continuar producción (Episodios 1–20)

## Estado actual
- Los 20 guiones (`vale-s2-*.ts`) están escritos con la misma estructura de la Temporada 1: 10 escenas, 3 preguntas TPRS, vocabulario tocable, afirmación hablada, grabación final máx. 15 s y gancho al siguiente episodio.
- Ya generadas: las 5 portadas de los Episodios 1–5 y las escenas s1–s8 del Episodio 1, todas con referencias canónicas y estilo webtoon consistente.
- Las voces no cambian: Vale = voz juvenil femenina (marin), Ana = nova, Mateo/Luis/Dylan = onyx, Kat/Camila = nova, Mr. Reyes = fable, narrador = alloy. No hay personajes nuevos con voz propia (Beto solo aparece en narración).

## Lo que falta
1. **Imágenes restantes del lote 1 (Episodios 1–5):**
   - Episodio 1: escenas s9 y s10.
   - Episodios 2–5: escenas s1–s10 de cada uno (40 imágenes), usando la portada del episodio como referencia (regla de oro de consistencia).
2. **Registro del lote 1:** actualizar imports de imágenes en los 5 guiones (hoy apuntan a carpetas de la Temporada 1 como placeholder), importar los episodios en `src/services/storybook/index.ts` y poner sus `episodeId` en los días 1–5 de la Temporada 2 en `seasons.ts`.
3. **QA del lote 1:** hoja de contacto visual por episodio (identidad, piel, cabello, ropa, dos brazos/dos manos, continuidad), verificación de hablantes por escena, TypeScript + tests de storybook, y recorrido móvil de al menos un episodio.
4. **Lotes 2–4 (Episodios 6–10, 11–15, 16–20):** mismo ciclo — portada con referencias canónicas, 10 escenas, registro y QA por lote.

## Resultado
Al terminar, los 20 episodios de la Temporada 2 se ven y se escuchan exactamente como la Temporada 1, con desbloqueo de un episodio por día (cuentas internas: todo desbloqueado).
