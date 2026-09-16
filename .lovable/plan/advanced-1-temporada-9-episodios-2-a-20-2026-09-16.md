# Advanced 1 (Temporada 9) — Episodios 2 a 20

Los guiones ya están escritos y aprobados: episodios 1–5, 6–10, 11–15 y 16–20 están completos en los documentos de guion. El episodio 1 ya está producido y publicado como piloto. Falta producir los 19 restantes.

## Cómo avanzamos

De 5 en 5, igual que el piloto. Cuatro tandas:

1. Episodios 2–5
2. Episodios 6–10
3. Episodios 11–15
4. Episodios 16–20

Al terminar cada tanda te aviso, tú revisas en la app y solo entonces sigo con la siguiente. Así si algo se ve mal (un personaje fuera de estilo, una línea que no suena bien), lo corregimos antes de repetirlo 15 veces.

## Qué lleva cada episodio

- 11 escenas, ~33 líneas de diálogo conectado, 550–650 palabras habladas, tomadas del guion aprobado sin inventar historia nueva.
- Palabras y expresiones tocables con significado en español: mínimo 3 por escena, exactamente dos phrasal verbs completos y una expresión idiomática por episodio, subrayados como expresión entera.
- Preguntas de comprensión con respuestas en orden aleatorio, turnos hablados del estudiante con pistas coherentes con la pregunta, tarjeta de mentalidad/hábito, cierre grabado y gancho para el siguiente episodio.
- Vocabulario: 16 unidades nuevas B1–B2 más 10–20 recicladas por episodio, con prueba automática que lo verifica.
- Voces estables por personaje y reparto canónico (Vale, Dani, Camila, Reed y los invitados del guion).

## Calidad visual

Mantenemos el estilo realista cinematográfico del episodio 1 como referencia fija: cada imagen nueva se compara contra las del episodio 1 antes de aceptarla. Portada más 9 escenas por episodio, 768×768, JPG progresivo bajo 250 KB para que cargue bien en teléfonos de gama media. Sin texto ni logos legibles dentro de la imagen. Si un personaje sale fuera de estilo, se regenera esa imagen, no se deja pasar.

## Revisión antes de entregar cada tanda

- Coherencia de historia y continuidad con Sharks 20 y con los episodios ya publicados.
- Revisión imagen por imagen de los personajes contra el canon.
- Pruebas automáticas de historia, vocabulario y tipos, más una revisión en el teléfono de que el episodio abre y se reproduce sin errores.

## Detalles técnicos

- Un módulo por episodio en `src/services/storybook/advanced-1-epN-*.ts`, registrado en `src/services/storybook/index.ts`.
- Cada episodio ocupa su día correspondiente en la temporada 9 dentro de `seasons.ts`, reemplazando el slot teaser actual; se respetan los bloqueos de ruta oficial (2 episodios nuevos por día).
- Arte en `src/assets/storybook/advanced1-epN-<slug>/`, normalizado a 768×768 RGB progresivo.
- Se extienden el canon de personajes, el glosario base y el presupuesto de vocabulario por episodio.
- Suites: pruebas de storybook, consistencia de reparto, presupuesto de vocabulario y verificación de tipos en cada tanda.
