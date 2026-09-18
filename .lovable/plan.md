# Renombrar botón inferior "Práctica" → "Repaso"

## Objetivo
Cambiar la etiqueta del botón del menú inferior que actualmente dice "Práctica" (icono de pesas) para que diga "Repaso" en español.

## Cambio
- En `src/lib/i18n.tsx`, actualizar la clave `"nav.practice"`:
  - Español: `"PRÁCTICA"` → `"REPASO"`
  - Inglés: se mantiene `"PRACTICE"`

## Verificación
- Revisar que `src/components/fluency/BottomNav.tsx` siga usando `nav.practice` y que el icono no cambie.
- Confirmar que el texto renderizado en el menú inferior sea "Repaso".
