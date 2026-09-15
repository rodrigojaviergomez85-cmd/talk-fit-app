# Temporada 6 (Eagles): consistencia de personajes escena por escena

## Qué encontré al revisar

- **No existe ficha canónica de Morgan.** La carpeta de referencias de personajes (`_canon/`) tiene a Vale, Dani, Camila, Mateo, Kat, Beto, Ana, Luis, Mamá y Don Tito, pero **no a Morgan**, ni al director de Northline. Por eso Morgan se dibuja distinta en cada episodio y en varias escenas termina pareciendo una estudiante más.
- **Las 220 imágenes de la temporada nunca se validaron contra quién habla en cada escena.** Hay 151 escenas donde la descripción de la imagen no menciona a alguno de los personajes que hablan ahí. No todas están mal (a veces el personaje habla por teléfono), pero es la lista exacta por donde hay que pasar.
- Los estudiantes recurrentes (Kat, Beto) sí tienen ficha, así que su deriva es de generación, no de falta de referencia.

## Lo que se va a hacer

**1. Crear las fichas canónicas que faltan**
Morgan (ejecutiva estadounidense, 40s, oficina corporativa), el director de Northline y cualquier otro personaje que hable en la temporada y no tenga referencia. Cada ficha fija edad, tono de piel, cabello, ropa y contexto.

**2. Auditoría escena por escena de los 20 episodios**
Para cada una de las 220 imágenes se revisa contra el guion de esa escena:
- ¿Están dibujadas las personas que hablan ahí?
- ¿Morgan se ve como Morgan (ejecutiva) y no como una alumna?
- ¿Los estudiantes se ven iguales de una escena a otra y de un episodio a otro?
- Anatomía correcta, sin texto en la imagen, mismo estilo.

La revisión se hace con hojas de contacto (todas las escenas de un episodio juntas en una sola vista), igual que en temporadas anteriores.

**3. Regenerar solo las imágenes que no cuadran**
Con la ficha canónica del personaje en el prompt, manteniendo el mismo encuadre y momento de la escena. Todas quedan en 768×768 JPG bajo 250 KB.

**4. Alinear las descripciones de cada escena**
Donde la descripción no nombra a quien habla, se corrige para que coincida con el diálogo. También se unifica el idioma de esas descripciones (hoy unos episodios están en español y otros en inglés).

**5. Candado automático para que no vuelva a pasar**
Se agrega a las pruebas de consistencia una regla: toda escena debe nombrar en su descripción a los personajes que hablan en ella (salvo excepciones marcadas como voz por teléfono/pantalla), y todo personaje que habla en la temporada debe tener ficha canónica.

## Verificación final

- Pruebas de consistencia de la temporada en verde (arte presente, peso, voces únicas, formato de diálogo) más la nueva regla.
- Recorrido visual de los 20 episodios lado a lado contra las fichas canónicas.
- Episodios cargando correctamente en teléfono.

## Detalles técnicos

- Referencias nuevas en `src/assets/storybook/_canon/`.
- Regla nueva en `src/services/storybook/eagles-consistency.test.ts`.
- Ajustes de `imageAlt` en los archivos `eagles-epN-*.ts`; no se tocan diálogos, preguntas calificadas, glosario ni voces.
