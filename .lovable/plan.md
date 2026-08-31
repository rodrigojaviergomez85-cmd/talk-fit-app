# Pulido visual de Practice, audio y Progreso

Solo presentación. No se toca currículo, grabaciones, resume, validación de habla, idioma, onboarding ni autenticación.

## 1. Jerarquía de botones

Se crea un set consistente en Practice:
- Primario (naranja, grande): escuchar, grabar, continuar.
- Secundario (contorno neutro): reproducir mi grabación, intentar de nuevo.
- Terciario (texto pequeño): saltar, traducir, cancelar, ayuda.

## 2. Skip deja de competir

- En Rep 1 el botón grande naranja pasa a ser: primario `ESCUCHAR EL MODELO` y, debajo, un enlace pequeño `saltar por ahora`. Cuando el audio ya terminó, el primario pasa a `SIGUIENTE REP`.
- `SALTAR ESTA FRASE` y `SALTAR ESTA PREGUNTA` (Rep 2 y 4) quedan con el mismo estilo terciario: texto pequeño, color neutro, sin fondo, área de toque cómoda (min 44px) y `aria-label` claro.
- La lógica de saltar no cambia (sigue contando como "skipped" en el resumen).

## 3. Controles de traducción

- La píldora `ES` pasa a `ES · TRADUCIR` (`ES · TRANSLATE` con interfaz en inglés), con borde suave, estado hover/focus visible y estado activo/presionado (`aria-expanded`).
- Se revisa cada pantalla de Practice para dejar un solo control de traducción por bloque cuando hoy hay dos apilados.
- El interruptor global "Ayuda en español" no cambia.

## 4. Encabezados sin repeticiones

- Paso 0 muestra `INTRO` (se elimina `PASO 0 · INTRO`); las reps siguen como `REP 1 DE 5 · ESCUCHA`, etc.
- Encabezado compacto: metadata pequeña (módulo/semana/día), título de la lección, y luego `INTRO` o `REP X DE 5`, sin repetir el mismo dato dos veces.
- En la lista de semanas se evita `SEMANA 1 · Week 1`: si el título de la semana ya empieza con "Week N/Semana N", se muestra solo el subtítulo.

## 5. Audio: play / pause / resume + progreso

Se mejora `AudioPlayer` (usado por modelo y frases):
- Estados: `▶ ESCUCHAR` → `⏸ PAUSA` → `▶ CONTINUAR`, más reinicio cuando el audio terminó.
- Indicador simple de progreso: `00:08 / 00:34` y una barra fina.
- Un solo audio a la vez: al iniciar cualquier audio (modelo, frase o grabación del alumno) se detiene el anterior.
- Estado de carga `CARGANDO AUDIO…` y estado de error limpio: `NO SE PUDO REPRODUCIR EL AUDIO.` + `REINTENTAR` (nunca error técnico crudo).
- Sin autoplay nuevo.

## 6. Reps 1–4

- Rep 1: título ESCUCHA, imagen/visual si existe, botón grande de reproducir + progreso, texto opcional colapsado, y `saltar por ahora` pequeño.
- Rep 2: orden visual claro Escuchar → Grabar → (Escucharme) → Siguiente; el botón Siguiente sigue deshabilitado hasta un intento, ahora con estado deshabilitado evidente y texto de ayuda "Graba una vez para continuar".
- Rep 3: pantalla distinta y mínima: `SHADOW`, "Habla con el audio", acción primaria `EMPEZAR SHADOWING` / `PAUSA`.
- Rep 4: prompts visuales, sin párrafos largos, primario grabar, skip terciario.
- Rep 5 (TakeBoard): sin cambios de lógica ni de estructura; solo se alinean los estilos de botones.

## 7. Página de Progreso

- Se mantiene el dashboard y la acción "Ver todos los días".
- Dentro de esa vista, los días se agrupan en secciones colapsables por **módulo** con su contador y estado (COMPLETADO / ACTUAL / SIGUIENTE); el módulo actual abierto, los demás cerrados. Dentro del módulo abierto, solo la semana actual abierta.
- El día actual se resalta con un tratamiento sutil pero evidente (borde + etiqueta ACTUAL).
- Estados COMPLETADO / ACTUAL / SIGUIENTE usan el sistema de idioma global (nada mezclado).

## 8. Consistencia, móvil y accesibilidad

- Nombres de reps uniformes: LISTEN / COPY / SHADOW / MAKE IT YOURS / YOUR TURN (y sus equivalentes en español).
- Sin `undefined` / `NaN` visibles; estados de carga y guardado limpios.
- Revisión en ancho de móvil: sin scroll horizontal, CTA alcanzable, controles de audio y traducción sin cortes.
- Etiquetas accesibles en play/pause, foco visible en skip y traducir, progreso con texto además de color.

## Detalles técnicos

- `src/components/fluency/AudioPlayer.tsx`: máquina de estados idle/loading/playing/paused/ended/error, tiempo y barra; `AudioService` expone pausa/reanudación y sigue garantizando un único audio activo.
- `src/routes/practice.tsx`: `REP_TITLES[0]` → `INTRO`; `SkipLink` reutilizado en Rep 1; jerarquía de botones vía componentes existentes `PrimaryButton` / nuevos estilos secundario y terciario; helper text del botón deshabilitado.
- `src/components/fluency/TranslatableText.tsx`: etiqueta `ES · TRADUCIR`, estados hover/focus/pressed, `aria-expanded`.
- `src/routes/progress.tsx`: `AllDays` pasa a secciones por módulo colapsables con la lógica de expansión descrita, reutilizando `WeekBlock` y `StatusBadge`.
- `src/routes/module.$moduleId.tsx`: deduplicación del título de semana.
- Verificación: `bunx tsgo --noEmit` + recorrido con Playwright en 390px para los tests 1–10 de la solicitud.
