# Corrección del Paso 2 más fácil de entender visualmente

## Problema
En la tarjeta "¡CASI!", el estudiante recibe dos párrafos completos ("Tú dijiste" y "Intenta") y debe compararlos letra por letra para descubrir dónde estuvo su error. Con párrafos largos (como el de la captura) es casi imposible ubicarlo.

## Propuesta
El motor de comparación (`src/lib/rep2-match.ts`) ya calcula internamente un diff palabra por palabra (faltantes, extras, reemplazos), pero hoy solo expone una sola palabra de "foco". Vamos a exponer ese diff a la interfaz y resaltar las diferencias con color:

```text
TÚ DIJISTE
"If I received [$2000] I could do many different things with it.
 One [possible] is to travel because I've never left the country."
          ↑ $2000 y possible en ámbar/rojo + tachado suave

INTENTA
"If I received [five thousand dollars], I could do many different
 things with it. One [possibility] is to travel because I've never
 left the country."
          ↑ correcciones en verde/naranja + negrita
```

- Palabra distinta en lo que dijo el estudiante → color ámbar/rojo suave.
- Palabra correcta en la versión objetivo → negrita + color de marca.
- Palabras que coinciden → texto normal (sin ruido visual).
- Si hay demasiadas diferencias (más de ~4), se mantiene el comportamiento actual: solo resaltar la palabra de foco, para no convertir la tarjeta en un árbol de navidad.

## Cambios técnicos

1. **`src/lib/rep2-match.ts`**: exportar el diff público (lista de operaciones `missing` / `extra` / `replace` con las palabras originales del target y del transcript). Sin cambiar la lógica de decisión `good` / `correct` / `asr_uncertain`, tolerancias, palabras protegidas ni `nearMatch` (QA-only).
2. **`src/routes/api/rep2-correction.ts`**: incluir el diff en la respuesta al navegador (solo palabras, sin datos internos).
3. **`src/components/fluency/Rep2Feedback.tsx`**: renderizar "Tú dijiste" e "Intenta" palabra por palabra con resaltado cuando el diff tiene 4 o menos diferencias; si no, usar el resaltado de foco actual. Se conserva `highlightFocus` como respaldo.
4. **Cliente (`practice.tsx` o donde se consuma la corrección)**: pasar el diff recibido al componente.
5. **Traducciones**: ninguna etiqueta nueva obligatoria; se reusan "Tú dijiste / Intenta".

## Qué NO cambia
- Sin nuevas llamadas a IA: el diff ya se calcula localmente en el servidor.
- Sin cambios en cuotas, reintentos, perfiles por nivel, ni reglas de tolerancia.
- Estados `good` y `uncertain` se mantienen iguales.
- Botones (Escuchar otra vez / Intentar otra vez / Saltar) sin cambios.

## Verificación
- Pruebas unitarias del diff público en `rep2-match.test.ts`.
- `tsgo --noEmit` y suite completa de Vitest.
- Revisión visual en navegador móvil con un caso "casi" para confirmar el resaltado.
