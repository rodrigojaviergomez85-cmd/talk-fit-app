# "El mundo de Vale" — guía de estilo e ilustración

## Estilo visual (usar en todos los prompts)

> Clean 2D webtoon cartoon illustration, flat colors, bold clean line art,
> warm beige background, friendly TikTok-comic energy, square 1024x1024.

Sin texto dentro de la imagen (salvo la portada). Una acción clara por viñeta.

## Elenco fijo

- **Vale** — 19, salvadoreña. Piel morena clara, pelo negro largo y ondulado con
  media coleta, camiseta amarillo mostaza. Expresiva, tímida pero jugetona.
- **Mr. Reyes** — 45, supervisor latino. Camisa gris, corbata azul oscuro, barba
  corta, gesto serio y difícil de leer.
- **Kat** — 21, compañera relajada. Pelo corto rizado teñido naranja, chaqueta de
  mezclilla, camiseta blanca.
- **Dylan** — 22, cliente canadiense. Pelo castaño corto, pecas, sudadera verde,
  calle nevada de fondo.
- **Mamá de Vale** — 45, en casa, delantal, no habla inglés.

## Molde de episodio

1. Extraer los chunks de la semana del módulo.
2. Guion de 10–14 escenas: gancho → conflicto → chunk clave 3 veces → giro → cliffhanger.
3. Glosario completo y traducciones al español escritas a mano.
4. Ilustraciones con este estilo y estas fichas.
5. `bunx vitest run src/services/storybook` + prueba en móvil.

## Archivos

- Imágenes: `src/assets/storybook/vale-ep<N>/cover.jpg`, `s1.jpg`…
- Episodio: `src/services/storybook/<slug>.ts` con `moduleId`, `week`,
  `previously`, `reviewWords`, escenas, quizzes y cliffhanger.
- Registro: `src/services/storybook/index.ts` y `seasons.ts`.
