# Restaurar botón de escuchar en STEP 2 (COPY)

## Problema
En el componente `Rep2Copy` de `src/routes/practice.tsx` se eliminó el reproductor de audio que permite escuchar las oraciones del chunk antes de grabar. La instrucción sigue diciendo “Listen to the 2 sentences, then record them together”, pero no hay botón para hacerlo.

## Cambio propuesto
Reinsertar justo antes del `VoiceRecorder`:

```tsx
<AudioPlayer text={chunkText} label={t("practice.listen")} rate={0.9} voice={day.speakerVoice} />
```

- `chunkText` ya se calcula en `Rep2Copy` con `rep2ChunkText(chunk)`.
- `AudioPlayer` ya está importado desde `@/components/fluency/AudioPlayer`.
- La clave `practice.listen` ("ESCUCHAR" / "LISTEN") sigue en `src/lib/i18n.tsx`.
- Colocarlo entre la tarjeta de oraciones y el botón de grabar mantiene el flujo: leer/escuchar → grabar.

## Verificación
1. `bunx tsc --noEmit` sin errores.
2. Navegar a un día con STEP 2 (COPY), por ejemplo `simple-future` día 2, y confirmar:
   - Aparece el botón "ESCUCHAR" / "LISTEN" debajo de las oraciones.
   - Al tocarlo reproduce el audio del chunk.
   - El botón de grabar sigue apareciendo debajo.
3. Probar en móvil (vista actual del usuario) para confirmar que no rompe el layout.
