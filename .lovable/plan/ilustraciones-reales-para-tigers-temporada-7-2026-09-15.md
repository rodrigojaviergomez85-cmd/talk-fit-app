# Ilustraciones reales para Tigers (Temporada 7)

## Por qué hay imágenes de relleno

Cuando escribí los 20 episodios de Tigers, creé las 240 imágenes como archivos temporales (un círculo de color) solo para que la temporada abriera sin errores mientras terminaba el texto, las voces y el glosario. Nunca se reemplazaron por dibujos reales. En Eagles y en las temporadas 1 a 5 sí se generó cada escena una por una, por eso ahí sí se ven los personajes.

Esas imágenes de relleno pesan unos 6 KB cada una; las reales pesan entre 150 y 250 KB. Es la única diferencia pendiente entre Tigers y las temporadas ya cerradas.

## Qué haría

Producir las 240 ilustraciones reales de Tigers con el mismo estilo y los mismos personajes de Eagles, por tandas de cinco episodios:

1. Tanda 1: episodios 1 a 5
2. Tanda 2: episodios 6 a 10
3. Tanda 3: episodios 11 a 15
4. Tanda 4: episodios 16 a 20

En cada tanda:
- Generar portada y 11 escenas por episodio, siguiendo lo que describe cada escena.
- Mantener a Vale, Dani, Camila, Morgan, Mateo, Don Tito, Bryan, Sofía y Mr. Herrera siempre iguales: mismo rostro, piel, cabello y ropa que en las temporadas anteriores.
- Revisar cada tanda en una hoja de contactos antes de seguir, para cazar manos faltantes, caras raras, texto dentro del dibujo o personajes cambiados.
- Dejar cada imagen cuadrada y liviana para que cargue rápido en el teléfono.

Al final: prueba automática que impide volver a dejar imágenes de relleno, revisión visual de los 20 episodios y cierre de la temporada en el roadmap.

## Detalles técnicos

- Referencias canónicas: `src/assets/storybook/_canon` y `STYLE.md`.
- Salida: 768×768 JPG, menos de 250 KB, en `src/assets/storybook/tigers-ep*/`.
- Nueva prueba `src/services/storybook/tigers-consistency.test.ts`: valida existencia de cover + s1–s11, dimensiones, peso máximo y peso mínimo (para detectar marcadores de posición), replicando `eagles-consistency.test.ts`.
- Sin cambios en los guiones, voces, preguntas ni rutas: ese trabajo ya quedó revisado y en verde (48 pruebas).
