# Reescritura manual de Sharks, episodios 9–20

## Estado actual

Los episodios 9–20 de Sharks siguen usando el relleno genérico automático (`sharks-dialogue-expansions.ts`): frases de negocios idénticas insertadas alrededor de las líneas originales. Es la misma causa del episodio 3 desconectado y aburrido. Los episodios 3–8 ya fueron reescritos a mano con éxito.

## Propuesta

Reescribir a mano los 12 episodios restantes en **3 chunks de 4 episodios**, para que puedas revisar cada chunk antes de seguir:

- **Chunk 1:** Episodios 9–12 (la llamada de México, ¿socio o rival?, qué salió mal, dilo con números)
- **Chunk 2:** Episodios 13–16 (la negociación dura, perder un cliente, recuperarlo, un equipo en tres países)
- **Chunk 3:** Episodios 17–20 (el inversionista, decir no con respeto, el trato regional, cierre de temporada)

## Cómo se escribirá cada episodio

Igual que hicimos con el 3 y el 4–8, escena por escena:

1. Se preserva la trama original, el título, el cliffhanger y la continuidad con Tigers y el resto de Sharks.
2. 11 escenas, 33 líneas de diálogo natural estilo conversación real (pregunta → respuesta → reacción), ~500–650 palabras.
3. Solo personajes del canon con sus voces asignadas; Reed siempre remoto desde Houston cuando aplique; Dani es hombre y trabaja para Vale.
4. Mínimo 3 palabras tocables por escena, traducidas, contextuales; exactamente 2 phrasal verbs + 1 idioma/collocación por episodio, subrayados como expresión completa.
5. Preguntas de comprensión únicas por episodio, basadas en la trama real (evento inicial, decisión a la mitad, cierre/gancho), con opciones y ejemplos "Say It" coherentes — nada de preguntas repetidas.
6. `imageAlt` descriptivo y coherente con dónde está cada personaje.
7. Traducciones nuevas agregadas al glosario.
8. Al terminar cada chunk: suite de storybook + TypeScript, y te aviso para que revises en el preview.

## Al final (chunk 3)

- Eliminar por completo `sharks-dialogue-expansions.ts` y el set `SHARKS_RICH_EPISODES` — ya no quedará ningún episodio con relleno genérico.
- Auditoría final de continuidad de toda la temporada (1–20).

## Lo que NO cambia

Imágenes existentes, voces, orden de escenas, bloqueos de ruta, estrellas, grabaciones finales.

## Detalles técnicos

- Archivos: `src/services/storybook/sharks-ep{9..20}-*.ts` (reescritura completa de cada archivo, mismo formato que ep4–ep8).
- Glosario: `src/services/storybook/glossary.ts` (entradas nuevas).
- Limpieza final: borrar `sharks-dialogue-expansions.ts` y su import donde se use.
- Verificación: `bunx vitest run src/services/storybook` + `bunx tsgo --noEmit` por chunk.
