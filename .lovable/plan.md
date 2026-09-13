# Arreglar portadas que no cargan en Audiolibros

## Diagnóstico (ya verificado)
- No es el internet del usuario: el servidor local responde 200 para todas las portadas.
- En la vista previa del usuario fallaron varias imágenes a la vez (portadas ep2, ep3, ep5, ep6 y `past-stories.png` en Home). La causa real: las imágenes del storybook pesan 1.2–1.7 MB cada una y la lista de Audiolibros intenta cargar ~20 portadas pesadas al mismo tiempo; en conexiones lentas o con el servidor de vista previa ocupado, varias peticiones fallan.
- El código referencia las portadas correctamente (imports de Vite); no hay rutas rotas.

## Cambios

1. **Comprimir todas las imágenes del storybook** (`src/assets/storybook/**`, portadas y escenas de ep1–ep20 y s2-ep1–5):
   - Redimensionar a máximo 1024px de lado y re-comprimir JPG a calidad ~80 (con `ffmpeg` o PIL, sin cambiar nombres ni rutas).
   - Objetivo: bajar de ~1.5 MB a ~150–250 KB por imagen (10x más liviano). La calidad visual en pantalla de celular se mantiene.
2. **Carga diferida en la lista**: agregar `loading="lazy"` y `decoding="async"` a los `<img>` de portadas en `src/routes/natural-method.audiobooks.tsx` para que solo carguen las visibles al hacer scroll.
3. **Revisar `src/assets/badges/past-stories.png`** (también falló en Home) y comprimirla si es pesada.

## Verificación
- Confirmar peso final de cada imagen (<300 KB).
- Prueba móvil con Playwright: abrir `/natural-method/audiobooks`, hacer scroll por toda la lista y verificar que todas las portadas se ven; abrir un episodio y pasar escenas para confirmar que las escenas cargan y se ven nítidas.
- `tsc` + tests de storybook.

## Nota
Si más adelante quieres carga instantánea incluso en redes muy lentas, el siguiente paso sería mover las imágenes a la CDN de Lovable Assets; no es necesario ahora.
