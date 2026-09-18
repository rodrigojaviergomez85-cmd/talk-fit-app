# Advanced 3 · semana 3: revisión de arte y arreglo de voces bajas

Dos trabajos en una sola entrega: subir el volumen de Óscar y Mía, y revisar una por una las 50 imágenes de los episodios 11 al 15.

## 1. Óscar y Mía se oyen muy bajo

Encontré la causa. El volumen no se controla en la app: cada personaje tiene una "instrucción de actuación" que se le da al generador de voz, y eso decide qué tan fuerte suena.

- Óscar usa hoy la instrucción escrita para Beto, un niño tímido de 17 años. Esa instrucción pide literalmente voz "suave", "queda", "titubeante". Por eso casi no se escucha.
- Mía usa la instrucción escrita para Dylan, que además de ser la de **un hombre joven** pide un tono "relajado y tranquilo". Ni le corresponde ni tiene energía.

Arreglo: darle a cada uno su propia instrucción, con volumen y presencia normales.

- Óscar: joven salvadoreño de 19 años, nervioso pero **audible**, hablando a volumen normal de conversación. Sigue sonando joven e inseguro, pero ya no susurra.
- Mía: mujer joven de 20 años, clara, despierta y segura, volumen normal.

Beto y Dylan se quedan exactamente como están: no se toca su voz.

Importante: los audios ya generados están guardados. Al darles instrucción nueva, Óscar y Mía se vuelven a generar la próxima vez que alguien abra esas escenas; el resto de la app no se regenera ni gasta de más.

## 2. Revisión de las 50 imágenes de la semana 3

Reviso una por una, contra la descripción escrita de cada escena y contra el canon visual de cada persona:

- Dani: camisa celeste, pelo negro corto y rizado, sin bigote, adulto joven.
- Vale: 24 años, pelo negro largo y lacio con raya al medio, blusa amarillo mostaza.
- Mía: 20 años, polo negro, diadema, pelo corto rojo.
- Nico: rasgos salvadoreños, flequillo pesado, sudadera con capucha. Nunca rasgos asiáticos.
- Óscar: 19 años, cara redonda, sin barba, polo negro grande, sin gafete.
- Mr. Reed: estadounidense de unos 55, pelo gris plateado, afeitado, traje azul marino.
- Doña Estela: salvadoreña de unos 50 y tantos, moño bajo con canas, blusa verde con cárdigan, en la cocina de la casa.
- Elena: unos 50, delantal crema sobre blusa color óxido, bolsa de pan.
- Camila: afrolatina, pelo rizado, gafete de visita. Barrett: bob oscuro, lentes sin marco.
- Julieta: solo dentro de pantalla en el episodio 12.

También reviso que cada escena sea el lugar correcto (salón en círculo, bus 42 de noche, cocina de la casa, sala de Bogotá a oscuras solo como foto en el celular), que no aparezca nadie que no debería estar, y que el estilo siga siendo fotográfico realista en las 50.

Solo regenero las que fallen, en su mismo archivo y sin cambiar la composición aprobada. Al terminar te digo cuáles cambié y por qué.

## 3. Revisión de voces de toda la temporada

Verifico que ningún personaje de Advanced 3 comparta la misma voz con otro, que cada uno que habla tenga voz propia y no la del narrador, y que Doña Estela suene como una señora de su edad y no como la mamá de temporadas anteriores.

## Lo que no se toca

Guiones y diálogos, cursos, práctica, progreso, grabaciones, estrellas, liga, episodios 1 al 10 y temporadas 1 a 10.

## Detalle técnico

- `src/lib/course-audio.server.ts`: dos tonos nuevos en `Tone`, `TONES` y `TONE_INSTRUCTIONS` (por ejemplo `nervous` para Óscar y `bright` para Mía). Los tonos existentes `shy` y `youthful` quedan intactos para Beto y Dylan.
- `src/lib/model-tone.ts`: agregar los mismos dos valores al tipo `ModelTone`.
- `src/services/storybook/voices.ts`: `speakerTone("oscar")` y `speakerTone("mia")` apuntan a los tonos nuevos.
- El caché de audio usa la clave `tono/voz/hash(texto)`, así que el tono nuevo genera clave nueva: no hay que purgar nada ni se invalida el resto del catálogo.
- Arte: solo archivos dentro de `src/assets/storybook/advanced3-ep11..ep15`, mismos nombres, 768×768 JPEG progresivo bajo 250 KB.
- Al final: `npx vitest run` completo y `npx tsc --noEmit`, incluidos `voices`, `cast-consistency` y los tests de fidelidad de Advanced 3.
