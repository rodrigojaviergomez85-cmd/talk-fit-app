# Igualar la calidad de imagen de Sharks al nivel del Episodio 2

## Qué encontré

Todas las imágenes tienen el mismo tamaño (768x768), pero el "peso" (nivel de detalle conservado) cae mucho después del Episodio 2:

```text
Ep 1   90 KB promedio
Ep 2  132 KB promedio  <- el que te gustó
Ep 3   88 KB
Ep 4   86 KB
Ep 5   72 KB
Ep 6   75 KB
Ep 7   79 KB
Ep 8   77 KB
Ep 9   77 KB
Ep 10  72 KB
```

El Episodio 2 se produjo con un acabado más fino y con menos compresión al guardar. Del 3 en adelante se usó un acabado más rápido y una compresión más agresiva para bajar el peso, y por eso se ven más suaves, con menos detalle en caras, texturas y fondos.

## Qué haría

1. Fijar el Episodio 2 como referencia oficial de calidad de Sharks (acabado fino, ~130-200 KB por imagen, siempre bajo el límite de 250 KB).
2. Regenerar las 108 ilustraciones de los Episodios 3 al 10 con ese mismo acabado, conservando exactamente la misma escena, composición, personajes canónicos (Vale, Dani, Camila, Reed, Lucía, Renata, Tito) y estilo webtoon sombreado. No cambia ninguna historia ni texto.
3. Guardar con compresión suave para no perder detalle, revisando que cada archivo quede entre ~120 KB y 250 KB.
4. Revisar el Episodio 1 al final y subirlo al mismo nivel si queda por debajo.
5. Revisión visual en hojas de contacto (anatomía, identidad de personajes, nada de texto dentro de la imagen) y pruebas de consistencia; cualquier imagen defectuosa se rehace.
6. Comprobar los episodios en el celular para confirmar que se ven nítidos y cargan bien.

## Detalle técnico

- Reencode JPEG con calidad alta (q~88-92) en vez del perfil agresivo actual; mantener 768x768 y el tope de 250 KB que exige `cast-consistency.test.ts` (mín. 10 KB).
- Regeneración por lotes usando referencias canónicas de `character-canon.ts` y el escenario descrito en cada `scene`.
- Verificación final: `sharks-consistency.test.ts`, `cast-consistency.test.ts`, TypeScript y una ruta de episodio en el preview móvil.

## Nota

Son 108 imágenes; el trabajo se hace por lotes de un episodio a la vez para poder revisarlas antes de seguir.
