# Advanced 1: piloto de arte realista (seres humanos) optimizado para móvil

## Contexto
- Guiones de Advanced 1 (Episodios 1–20) ya están escritos y aprobados.
- Hasta Sharks el estilo visual fue cómic juvenil (benchmark: Sharks 10–15).
- El usuario quiere probar en Advanced un estilo **realista tipo humanos reales** (foto-cinematográfico), sin sacrificar carga móvil.
- Riesgo histórico: Sharks 17 se vio "demasiado realista/oscuro/adulto" y hubo que regenerar. Por eso el piloto es controlado.

## Propuesta de estilo
- Foto-realismo suave tipo "drama de streaming" (no hiper-realismo oscuro): luz cálida natural, piel realista, rostros jóvenes acordes al canon.
- Canon intacto: Vale (latina joven, piel canela clara, cabello negro largo y lacio), Dani (hombre adulto joven, nunca niño ni mujer), Camila (afro-latina hondureña, cabello rizado, blusa morada), Renata, Reed (remoto en pantalla cuando aplique).
- Escenarios coherentes con el guion (oficina de Vale English Academy, aulas, videollamadas).

## Optimización móvil (no negociable)
- 768×768 px, JPG RGB progresivo, **< 250 KB por imagen** (igual que hoy).
- 12 assets por episodio (portada + 11 escenas), sin texto ni logos incrustados, sin bandas ni cortes de cabeza/manos.
- Verificación con contact sheet y peso por archivo antes de dar por bueno un lote.

## Pasos
1. **Piloto de 1 escena**: generar 2–3 variantes realistas de la Escena 1 del Episodio 1 (Vale y Dani en la oficina) para elegir dirección visual antes de comprometer el lote.
2. Con la variante aprobada: producir los **12 assets del Episodio 1** completos.
3. Revisión del usuario del Episodio 1 (match texto–imagen, canon, edad, calidad de carga).
4. Si se aprueba: continuar por lotes de 5 episodios (2–5, 6–10, 11–15, 16–20) con auditoría de consistencia entre lotes usando el Episodio 1 como referencia.
5. Si el realismo no convence: volver al estilo cómic de Sharks 10–15 sin costo (los guiones no cambian).

## Técnico
- Solo se tocan imágenes en `src/assets/storybook/advanced-1/` (nueva carpeta); nada de guiones, voces, código ni rutas.
- Cada lote termina con: normalización a 768×768 JPG progresivo < 250 KB, contact sheet, y prueba de carga en la ruta del episodio con viewport móvil.

## Criterios de aceptación
- Personajes reconocibles y de la edad correcta en cada escena.
- Imagen–texto hacen match escena por escena.
- Ningún archivo supera 250 KB; la página del episodio carga fluida en móvil.
