# Candados, repaso y niveles intermedios

## Cómo está hoy (verificado en el código)

1. **Candado visible**: en la lista "Mi ruta" de Progreso (`src/components/fluency/progress/JourneyList.tsx:176-182`) los niveles bloqueados solo se muestran como tarjeta no clicable: **no aparece ningún candado ni etiqueta "Bloqueado"**. El candado sí existe, pero solo dentro de "Ver todos los días" (`src/routes/progress.tsx:334-339`).
2. **Días pasados / repaso**: la lógica ya calcula el estado `review` para niveles anteriores al actual (`src/services/journey-service.ts:226-233`) y existe el texto "REPASO / REVIEW" (`src/lib/i18n.tsx:277`), pero la tarjeta de "Mi ruta" **nunca dibuja ese estado**: solo pinta las píldoras "Actual" y "Siguiente". Entrar a un nivel anterior sí funciona; simplemente no se comunica que está disponible para repaso.
3. **Los 3 intermedios juntos**: **no se cumple hoy.** La regla (`src/services/journey-service.ts:236-262`) desbloquea un módulo solo si está en o por debajo del nivel guardado del estudiante, o si el módulo anterior está completo. Ejemplo real: un alumno colocado en TIGERS tiene EAGLES y TIGERS abiertos, pero SHARKS queda bloqueado hasta terminar TIGERS. Solo la familia Avanzado tiene regla especial (se abre completa al terminar los tres intermedios).

## Cambios propuestos

### 1. Candado en niveles no cursados
En la tarjeta de "Mi ruta", cuando el nivel está bloqueado: mostrar un icono de candado pequeño junto al nombre y la etiqueta "Bloqueado / Locked", con el texto de "se abre después de …". Sin cambiar la regla de acceso ni la navegación.

### 2. Etiqueta "Disponible para repaso"
Cuando el estado del nivel sea `review` (nivel anterior al actual, ya accesible), mostrar una píldora "Disponible para repaso / Available for review" en la tarjeta, para que el alumno sepa que puede volver a días pasados. Se agregan los textos bilingües nuevos.

### 3. Intermedio como bloque de 3
Cambiar la regla de desbloqueo para tratar EAGLES, TIGERS y SHARKS como una familia paralela, igual que ya se hace con Avanzado: si el nivel guardado del estudiante es cualquiera de los tres, los tres quedan desbloqueados. Los niveles Basic siguen siendo secuenciales y Avanzado sigue requiriendo los tres intermedios completos.

## Detalles técnicos

- `src/services/journey-service.ts` → `isModuleUnlocked`: añadir rama para `family === "intermediate"` que devuelva `true` cuando el `currentModuleId` guardado pertenezca a los intermedios (además de la regla actual de módulo anterior completo). No se toca la regla de Avanzado ni la de bajar de nivel.
- `src/components/fluency/progress/JourneyList.tsx`: usar el `status` que ya calcula `moduleAccessStatus` para renderizar candado + etiqueta bloqueada y píldora de repaso.
- `src/lib/i18n.tsx`: nuevas claves `prog.pillReview` y reutilización de `status.locked` / `home.unlockAfter`.
- Sin cambios en progreso guardado, grabaciones, cupos, Review ni Home. Se ejecutan typecheck y la suite de tests, más una prueba en navegador de `/progress`.
