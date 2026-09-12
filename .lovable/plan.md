# Agregar Interview Simulator al menú inferior (6 botones)

## Contexto
Actualmente el menú inferior tiene 5 botones: Inicio / Review / Método Natural / AI Coach / Mi Cuenta. El usuario quiere que Interview Simulator aparezca ahí sin reemplazar ninguno, dejando 6 botones en total.

## Cambios propuestos

### 1. Textos bilingües
- Agregar clave `nav.interview` en `src/lib/i18n.tsx`.
- Etiqueta corta para caber en móvil, por ejemplo: `["SIM", "INT"]` o `["ENTREV", "INTVW"]`.

### 2. Componente `BottomNav.tsx`
- Importar icono `BriefcaseBusiness` de `lucide-react`.
- Agregar sexto ítem apuntando a `/review/interview-simulators` (el hub de simuladores: B4 / Intermediate / Advanced).
- Ajustar tamaños para 6 botones en pantallas angostas:
  - Reducir icono a `size-5` (20 px).
  - Reducir texto a `text-[9px]`.
  - Reducir padding vertical y gap.
  - Mantener `flex-1` y `justify-between` distribuidos.
- Preservar estado activo (`activeProps`) y `aria-label`.

### 3. Lógica de acceso
- No se modifica autenticación, límites, progreso ni Review.
- Interview Simulator seguirá usando su flujo existente dentro de `/review/interview-simulators`.
- El contador y bloqueo de 2 entrevistas diarias se mantiene exactamente igual.

### 4. Verificación
- Typecheck (`bunx tsc --noEmit`).
- Tests existentes.
- Preview móvil: confirmar que 6 botones caben sin overflow ni saltos de línea en viewport pequeño.

## Notas de implementación
- No se crea ruta nueva; se reusa `/review/interview-simulators`.
- No se tocan los simuladores B4, Intermediate ni Advanced.
- Se puede considerar en el futuro si 6 botones en iPhone SE se sienten apretados, pero por ahora se resuelve con escala.
