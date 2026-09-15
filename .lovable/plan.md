# Evitar errores de personajes y diálogos en El Mundo de Vale

Los errores repetidos han sido de tres tipos: (1) una línea asignada al personaje equivocado, (2) un dibujo que no corresponde al personaje que habla, y (3) personajes que cambian de aspecto entre episodios. Hoy cada temporada tiene su propia revisión suelta y los dibujos se piden a mano, así que los errores solo aparecen cuando un estudiante los ve.

La propuesta es convertir la "biblia de personajes" en un archivo único del que dependan tanto los guiones como los dibujos, y que una prueba automática revise las 8 temporadas completas antes de publicar.

## Qué se construye

**1. Biblia de personajes única**
Un solo archivo con la ficha oficial de cada personaje: nombre, edad, piel, cabello, ropa, voz, temporadas en las que aparece y en cuáles no. Vale, Dani, Camila, Kat, Mateo, Morgan, Don Tito, Bryan, Sofía, Mr. Herrera, Beto, Ana, Mr. Reed y los invitados.

**2. Cada escena declara su reparto**
Cada escena de cada episodio lleva la lista de quiénes aparecen en el dibujo. Eso permite comparar automáticamente "quién habla" contra "quién está dibujado".

**3. Una sola prueba para las 8 temporadas**
Reemplaza las revisiones sueltas por episodio y verifica en todos los episodios:
- ningún personaje habla en una temporada donde no existe
- todo el que habla en una escena está en el reparto de esa escena
- el texto de cada escena no nombra a alguien que no esté declarado
- cada personaje tiene voz asignada y siempre la misma
- no quedan imágenes de relleno y todas pesan menos de 250 KB

**4. Los dibujos se piden desde la biblia**
Un ayudante arma la descripción física exacta desde la ficha del personaje, para que nunca se genere una imagen con una descripción escrita de memoria.

**5. Lista de revisión visual**
Antes de cerrar una temporada: hoja de contacto con todos los dibujos, revisando rostro, piel, cabello, ropa, edad adulta, dos brazos y sin texto dentro de la imagen.

## Detalles técnicos

- Nuevo `src/services/storybook/character-canon.ts` con las fichas y las temporadas válidas por personaje.
- Campo `cast` opcional en el tipo de escena, obligatorio en episodios nuevos; se completa de forma incremental en los existentes.
- Nuevo `src/services/storybook/cast-consistency.test.ts` que recorre todos los episodios registrados en `seasons.ts`; las pruebas actuales de Eagles/Tigers/Sharks quedan como reglas extra de trama.
- `buildCharacterPrompt(id)` en la biblia, usado para toda generación o corrección de arte.
- Se corre con las pruebas existentes; no cambia nada que vea el estudiante.

## Alcance

No se reescriben guiones ni se regeneran dibujos en este trabajo: es la red de seguridad. La prueba mostrará la lista de incoherencias que ya existen hoy, y esas se corrigen después por temporada, en orden.
