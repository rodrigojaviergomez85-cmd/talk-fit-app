# Corregir inconsistencias de personajes en el Episodio 3

## Problema confirmado (auditoría de las 11 imágenes de `vale-ep3`)

- **s1**: Mr. Reyes correcto (barba, corbata), pero la persona en la puerta parece un hombre joven — debe ser **Vale**.
- **s3**: Mr. Reyes aparece como un joven con chamarra de mezclilla (el error que reportaste) y no hay Vale.
- **s5**: Vale aparece con cabello corto café y suéter rosa — su diseño real es cabello largo negro + playera amarilla.
- **s6** y **s8**: el segundo personaje parece hombre — debe ser Vale.
- **s10**: Kat está bien, pero los dos de atrás parecen hombres — deben ser Vale y Mateo.
- Correctas y sin cambios: **cover, s2, s4, s7, s9** (estas definen el diseño canónico).

## Diseños canónicos (referencia: cover.jpg)

- **Vale**: joven de 19 años, cabello largo negro, playera amarilla/mostaza.
- **Mateo**: joven de ~20 años, cabello negro corto, chamarra de mezclilla azul sobre playera blanca.
- **Mr. Reyes**: hombre mayor, cabello oscuro con canas, barba completa, camisa gris con corbata oscura.

## Solución

1. **Editar las 6 imágenes incorrectas** (s1, s3, s5, s6, s8, s10) con edición de imagen IA, usando `cover.jpg` como imagen de referencia de personajes para mantener coherencia. Cada edición corrige solo los personajes, conservando composición, estilo webtoon y escenario.
2. **Documentar los personajes en `src/assets/storybook/STYLE.md`**: agregar una sección "Personajes canónicos" con la descripción exacta de Vale, Mateo, Mr. Reyes, Kat, Dylan y Mr. Reyes, para que todos los episodios futuros (4–20) usen la misma ficha y esto no vuelva a pasar.
3. **Verificación visual en el navegador móvil** recorriendo las escenas corregidas del Episodio 3.

## Detalles técnicos

- Herramienta: `edit_image` con `image_paths: [imagen_a_corregir, cover.jpg]` y prompt de corrección de personajes; se conservan dimensiones 1024×1024.
- No se toca código, guion ni audio; solo assets de imagen + STYLE.md.
