# Corregir Eagles Ep. 1: línea de Vale y pronombres de Morgan

## Qué está mal
1. **Línea de Vale (escena 11):** "I answered in English because I promised myself I would" — Vale ya es maestra de inglés fluida, no tiene sentido que contar la llamada suene como si hablar inglés fuera un reto personal.
2. **Pronombres de Morgan:** el guion usa "he/his" (escena 11 y preguntas q1 y q3), pero Morgan está dibujada como mujer y habla con voz de mujer (voz `femaleMature`). Todo debe ser "she/her".

## Cambios (solo `src/services/storybook/eagles-ep1-the-offer.ts`)
- Escena 11, línea de Vale: reescribirla como profesional fluida, manteniendo la práctica de pasado simple (meta gramatical del día):
  - `"Morgan called at nine, and the whole meeting was in English — smooth and professional."`
  - Línea siguiente: `"She said it was expensive, but I explained the numbers and she listened."`
  - Ajustar las traducciones al español de ambas.
- Pregunta q1: "his team" → "her team" (inglés y español ya dicen "su equipo", solo cambia el inglés).
- Pregunta q3 / respuesta modelo: "He asked for a proposal by Friday." → "She asked for a proposal by Friday."
- Barrer el episodio completo por cualquier otro "he/his/him" refiriéndose a Morgan y corregirlo (incluye el teaser del episodio 2 si aplica).
- Agregar a las pruebas una regla simple: el episodio no contiene "he"/"his" asociado a Morgan.

## Verificación
- Vitest del storybook + chequeo de TypeScript.
- Revisar la ruta del episodio en el navegador.

## Detalles técnicos
- Archivo único: `src/services/storybook/eagles-ep1-the-offer.ts`; prueba en la suite de tests del storybook.
- No se tocan voces, arte, ni otros episodios o temporadas.
