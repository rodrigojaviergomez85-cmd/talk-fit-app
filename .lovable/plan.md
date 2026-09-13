# Pantalla del día compacta estilo Audiolibros

## Objetivo
Que `/day/:moduleId/:day` se vea tan compacta como la lista de Audiolibros (imágenes 84/85): ambas opciones visibles sin scroll en un teléfono gama media (~360–394 px de ancho, ~640 px de alto útil).

## Cambios en `src/routes/day.$moduleId.$day.tsx`

**1. Encabezado más bajo**
- Combinar "DÍA X DE 20" + tema en una sola línea compacta (tema `text-lg`, subtítulo ES en `text-xs`).
- Botón "Volver" se mantiene pero más delgado (`h-9`).

**2. Tarjeta de historia → fila compacta (estilo Audiolibros)**
- Reemplazar la portada grande `aspect-[4/3]` por una miniatura redondeada `size-20` a la izquierda (misma imagen del episodio, crop cuadrado centrado en el rostro: `object-cover object-top`).
- Fila: miniatura + columna de texto + flecha.
- Texto: etiqueta naranja `RECOMENDADO · 7–10 MIN` en `text-[10px]`, título del episodio en `text-[15px] font-extrabold`, una sola línea de apoyo "Toca las palabras y responde en voz alta" en `text-xs`.
- Mantener badge "Ya la viste ✓" inline si aplica.
- Borde naranja `border-primary` para seguir marcándola como recomendada.

**3. Tarjeta de audios → fila compacta**
- Mismo patrón de fila: ícono micrófono en círculo naranja + texto + flecha.
- Chip "OBLIGATORIO" inline junto al título en vez de línea propia; una sola línea de descripción en `text-xs`.
- Padding `p-3.5` en vez de `p-5`.

Resultado esperado: encabezado + 2 filas + navegación inferior visibles a la vez en pantallas pequeñas.

## Sin cambios
- Navegación (mismos destinos), lógica de desbloqueo/visto, i18n (se reutilizan claves; solo se acortan textos si hace falta), la tarjeta grande desaparece solo de esta pantalla — Audiolibros y el reproductor no se tocan.

## Verificación
- Playwright móvil (394×716): captura mostrando ambas opciones sin scroll; clic en cada fila navega correctamente.
