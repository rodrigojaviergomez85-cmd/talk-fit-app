# QA de El Mundo de Vale (antes de cerrar una temporada)

La prueba automática (`src/services/storybook/cast-consistency.test.ts`) ya cubre
guiones, voces y archivos. Esta lista cubre lo que solo se ve mirando los dibujos.

## Antes de generar arte

1. Copiar la descripción del personaje con `buildScenePrompt([...])` de
   `character-canon.ts`. Nunca describir a un personaje de memoria.
2. Declarar el `cast` de la escena en el guion antes de pedir la imagen.

## Hoja de contacto (todas las imágenes de la temporada, una al lado de la otra)

Para cada imagen revisar:

- [ ] El personaje que habla en la escena está dibujado.
- [ ] Rostro y edad coinciden con episodios anteriores (nadie se ve niño).
- [ ] Tono de piel correcto (Vale tan claro-medio, Dani café medio, Camila café oscuro).
- [ ] Cabello correcto (Vale lacio largo, Dani rizado corto, Camila rizado a los hombros).
- [ ] Ropa canónica (Vale mostaza, Dani celeste, Camila morado).
- [ ] Dos brazos, uno a cada lado, manos con cinco dedos.
- [ ] Proporciones adultas.
- [ ] Sin texto, letreros ni letras dentro de la imagen.
- [ ] 768×768 y menos de 250 KB.

## Antes de publicar

- [ ] `bunx vitest run src/services/storybook/`
- [ ] Abrir el primer y el último episodio en el teléfono y escuchar dos escenas.
