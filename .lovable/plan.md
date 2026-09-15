# Sharks 16–20: nuevas imágenes + auditoría de personajes

Los guiones de los episodios 16 a 20 ya están reescritos a mano. Las 60 ilustraciones actuales corresponden a los diálogos viejos, así que hay que rehacerlas escena por escena y después revisar que todos los personajes se vean como deben.

## Parte 1 — Regenerar las 60 imágenes (12 por episodio)

Para cada episodio (16, 17, 18, 19, 20):

1. Leer el guion escena por escena y escribir, para cada escena, qué se ve: quiénes aparecen, dónde están y qué están haciendo en ese momento del diálogo.
2. Generar portada + 11 escenas con el mismo estilo ilustrado del episodio 2 (webtoon a página completa).
3. Usar las imágenes de referencia de cada personaje para que se vean idénticos a su versión oficial:
   - Vale: blusa mostaza, cabello negro largo y liso.
   - Dani: hombre joven, camisa celeste.
   - Camila: hondureña, piel oscura, cabello rizado negro a los hombros, blusa morada.
   - Renata: rojo carmesí. Reed: azul marino. Lucía: verde bosque.
4. Sin texto, logos ni recuadros dentro de la imagen; sin recortes ni bandas; encuadre completo.
5. Guardar cada imagen a 768×768, RGB progresivo, por debajo de 250 KB, en la carpeta que ya usa cada episodio.
6. Armar una hoja de contactos por episodio para revisar de un vistazo.

## Parte 2 — Revisión de consistencia al terminar

1. Comparar escena por escena: cada imagen contra el texto que acompaña (personajes presentes, lugar, acción).
2. Comparar cada personaje contra su referencia oficial (piel, cabello, edad, ropa, accesorios).
3. Verificar que en el reparto de cada escena no aparezca nadie que no hable ni actúe ahí, y que Mateo no aparezca en Sharks.
4. Regenerar cualquier imagen que no pase.
5. Correr las pruebas de consistencia, currículo y vocabulario de Sharks, más la verificación de tipos, y revisar los episodios en el preview móvil.

## Detalles técnicos

- Archivos de guion: `src/services/storybook/sharks-ep16..ep20*.ts` (ya finales, no se tocan salvo corregir `imageAlt` o el `cast` de una escena).
- Carpetas de arte: `src/assets/storybook/sharks-ep16-a-team-in-three-countries` … `sharks-ep20-sharks-close-deals`.
- Referencias canónicas: `_canon/*.jpg` y `character-canon.ts` / `STYLE.md`.
- Pruebas: suite de storybook (104 tests), `vocabulary-budget.test.ts`, typecheck.
- La capa de relleno genérica `sharks-dialogue-expansions.ts` sigue desactivada para estos cinco episodios.

## Entrega

Los cinco episodios con arte nuevo que coincide con los diálogos escritos a mano, personajes consistentes y pruebas en verde. Pendiente aparte: Advanced 1–3.
