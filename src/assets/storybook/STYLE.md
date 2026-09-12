# "El mundo de Vale" — guía de estilo e ilustración

## Estilo visual (usar en todos los prompts)

> Clean 2D webtoon cartoon illustration, flat colors, bold clean line art,
> warm beige background, friendly TikTok-comic energy, square 1024x1024.

Sin texto dentro de la imagen (salvo la portada). Una acción clara por viñeta.

## Personajes canónicos (diseños aprobados)

**REGLA DE ORO:** en cada generación o edición de imagen que incluya alguno de
estos personajes, pasar la portada del episodio correspondiente
(`vale-ep<N>/cover.jpg`) como imagen de referencia y describir la ficha exacta
de abajo. Esto evita que un personaje cambie de edad, pelo o ropa entre escenas.

- **Vale** — mujer joven latina de 19 años, pelo negro LARGO (hasta la espalda),
  camiseta amarillo mostaza. Nunca pelo corto/castaño, nunca aspecto masculino.
- **Mateo** — joven de ~20 años, pelo negro corto, chaqueta de mezclilla azul
  sobre camiseta blanca.
- **Mr. Reyes** — hombre MAYOR (45+), pelo oscuro con canas, BARBA COMPLETA con
  canas, camisa gris de vestir con corbata oscura. Nunca joven, nunca sin
  barba, nunca en mezclilla.
- **Kat** — joven de 21 años, pelo rizado naranja, chaqueta de mezclilla sobre
  camiseta blanca.
- **Dylan** — 22, cliente canadiense. Pelo castaño corto, pecas, sudadera verde.
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
