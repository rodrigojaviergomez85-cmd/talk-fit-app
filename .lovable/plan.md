# Poner en negrita el mensaje del cuaderno en la portada del cuento

## Cambio
En la portada de cada episodio del cuento animado (`StorybookPlayer.tsx`), el segundo mensaje de instrucciones dice:

> "Copia el vocabulario que no te sepas en tu cuaderno..."

Se debe mostrar en **negrita** para que resalte como indicación importante, manteniendo el mismo tamaño y color actuales.

## Archivo a editar
- `src/components/storybook/StorybookPlayer.tsx`
- Líneas ~390-394 del párrafo con el texto del cuaderno.

## Ajuste técnico
Agregar la clase `font-bold` (o `font-semibold` si el equipo prefiere menos peso) al elemento `<p>` que contiene el texto en español e inglés, sin alterar el resto del diseño ni las demás instrucciones.
