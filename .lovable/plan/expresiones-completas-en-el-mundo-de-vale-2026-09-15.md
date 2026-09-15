# Expresiones completas en El Mundo de Vale

## Objetivo
Mostrar cada phrasal verb e idiom como una sola expresión interactiva. Por ejemplo, **back out** quedará subrayado completo y al tocar cualquier parte mostrará **“echarse para atrás / retractarse”**, no las traducciones separadas de *back* y *out*.

## Cambios
1. Hacer que el texto del diálogo reconozca expresiones de varias palabras antes de dividirlo en palabras individuales.
2. Renderizar toda la expresión con un único subrayado y una sola zona táctil.
3. Al tocarla:
   - pausar el audio actual;
   - pronunciar la expresión completa;
   - mostrar su significado conjunto en español;
   - guardarla completa en el cuaderno del episodio.
4. Reconocer también la forma usada realmente en la conversación, por ejemplo **showed up** como variante de **show up**, conservando el significado contextual completo.
5. Aplicar esta regla a Sharks Episodio 2 y dejarla como estándar obligatorio para todos los episodios nuevos de Sharks y Advanced.
6. Mantener las palabras normales funcionando individualmente cuando no formen parte de una expresión.

## Validación
- Comprobar **back out**, **show up / showed up** y **the bottom line** dentro del diálogo.
- Confirmar que no se creen botones separados para las palabras internas de una expresión.
- Probar puntuación, mayúsculas y expresiones repetidas dentro de una línea.
- Añadir pruebas para evitar que futuras expresiones vuelvan a separarse.
- Revisar el episodio en teléfono y confirmar audio, significado y cuaderno.

## Detalles técnicos
- El lector recibirá las expresiones del episodio y realizará coincidencias de frase completa, priorizando la expresión más larga.
- Las expresiones podrán declarar variantes utilizadas en el guion para cubrir conjugaciones sin adivinar significados.
- El significado mostrado vendrá del registro de la expresión, no de la suma de traducciones individuales.
