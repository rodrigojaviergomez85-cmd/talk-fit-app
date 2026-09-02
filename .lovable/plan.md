# Plan: INTERMEDIO — TIGERS (Explain, Defend & Respond) — 20-day module

## Objetivo
Agregar TIGERS como módulo real después de EAGLES (4 semanas / 20 días / 100 Fluency Reps / 12 Test Ready Sprints), reutilizando el motor de EAGLES tal cual. Nada existente cambia de ID ni de comportamiento.

## Qué se construye

### 1. Registro del módulo
- Nuevo `ModuleId` `"tigers"` (id estable, nunca se renombra).
- Entrada en `MODULES`: `order: 7`, `label: "INTERMEDIO"`, `title: "TIGERS"`, `subtitle: "EXPLAIN, DEFEND & RESPOND"`, emoji 🐯, `pilot: false`, `highlights` (explicar por qué, dar ejemplos, comparar, responder objeciones, defender decisiones).
- `isModuleId` acepta `"tigers"`.
- Home, página de módulo, Progreso, Grabaciones (INTERMEDIO → TIGERS → WEEK 1–4), Resume Practice, hábito de 66 días, racha y comparaciones semana/módulo funcionan automáticamente porque todo se resuelve vía `CourseService`.

### 2. Contenido (nuevos archivos `tigers-week-1-course.ts` y `tigers-weeks-2-4-course.ts`)
Reutilizan `makeDay`, `l`, `p`, `card`, `chunks4` de EAGLES. IDs `t1-*` … `t20-*`.

Cada día: modelo de 8 ideas conectadas, Rep 2 en 4 chunks, Rep 4 con 3–5 prompts tipo ANSWER → EXPLAIN → EXAMPLE → COMPARE → DEFEND, Rep 5 con meta creciente (60 s → 105 s), 2 Power Chunks core + 1 stretch tomados del pool de ~15 (The main reason is…, For example…, However…, I see your point, but…, If I had to choose…, It depends on…, Overall…, etc.).

| Semana | Tema | Días clave |
|---|---|---|
| 1 RECOMMEND, REACT & DEFEND | Past → Modals → Semi-modals → 2nd Conditional | D3 y D5 role play multi-turno (3 y 4 turnos) |
| 2 EXPERIENCE, EXPLAIN & INTERVIEW | Progressive → Present Perfect → PP Progressive → Mixed | D10 Job Interview Challenge (4 turnos fijos) |
| 3 COMPARE, PERSUADE & NEGOTIATE | Used to → Comparatives → Superlatives | D13 debate, D14 Sales Negotiation (Plan A/B/C), D15 ¿A quién contratas? (Ana/Carlos/María) |
| 4 PREDICT, REACT & DECIDE | Future → Present Perfect → Mixed → Final | D19 New in the City (info-reveal), D20 TIGERS FINAL |

Multi-turno (D3, D5, D10, D13, D14, D15, D19, D20) usa el `rep5Turns` existente: los turnos son fijos/prescritos, el alumno ve cada turno solo cuando llega (comportamiento actual del `TakeBoard`). Sin IA.

Test Ready Sprints solo en días 1, 3, 5, 7, 9, 10, 11, 13, 15, 16, 18, 20 (12 en total) usando los tipos existentes (`story-retell`, `listen-respond`, `speak-now`, `quick-answers`). Nuevo `interview-quick-response` se mapea a `quick-answers` con preguntas de entrevista. El sprint pasa a ser opcional por día (`testReady?` en el factory) para los 8 días sin sprint.

### 3. Día 20 — banco de escenarios (mecánica nueva, pequeña)
- Nuevo campo opcional `rep5Scenarios: { id, label, labelEs, prompt, turns, cue }[]` en `CourseDay` (WORK / CUSTOMER / LIFE).
- En Practice, al entrar al Día 20 se elige uno al azar del banco (sin IA) y se guarda en la sesión de práctica para que no cambie al reanudar. Rep 5 muestra solo el esqueleto DECISION / WHY / EXAMPLE / OTHER SIDE / WHAT IF? / CONCLUSION (sin modelo completo, `hideModelText`).

### 4. Etiquetas EXPLICA / JUSTIFICA / DEFIENDE
- Campo opcional `repLabel` por prompt de Rep 4 y en Rep 5 (`"explain" | "justify" | "defend"`) → `RepHeader` muestra la etiqueta en ES/EN junto al título existente. Solo TIGERS lo usa.

### 5. Celebración y siguiente módulo
- `progress-moments.ts`: entradas `TRANSFORMATION`, `MODULE_EMOJI` (🐯) y `NEXT_UP` para `"tigers"`. Copy de cierre: "🐯 TIGERS COMPLETE · INTERMEDIO · MES 2 ✓ · 20 DÍAS · 100 FLUENCY REPS · 12 TEST READY SPRINTS" + lista "AHORA PUEDES PRACTICAR CÓMO:" (7 ítems del spec). Nunca "YOU ARE B2".
- `nextModuleAfter("eagles-week-1")` ahora devuelve TIGERS como módulo real (CTA a `/module/tigers`); `nextModuleAfter("tigers")` devuelve SHARKS como PRÓXIMAMENTE (se elimina el stub `UPCOMING_NEXT_UP.tigers`).
- "ESCUCHA TU CAMBIO" (Día 1 vs Día 20) reutiliza Final Reps existentes.
- `ModuleMoment`: quitar el caso especial de título "EAGLES" y usar `module.title` para ambos.
- `PlacementPicker`: mantiene EAGLES como opción "Intermedio"; TIGERS no se ofrece en placement (solo se llega completando EAGLES o cambiando de nivel manualmente). Nadie se mueve automáticamente.

### 6. Badges
- `habit.ts`: generalizar los días de role play/servicio/ventas a un mapa por módulo; TIGERS suma a CONVERSATION READY (días multi-turno) y SALES CHALLENGE (D14). Se agrega badge de módulo "TIGERS COMPLETE" vía la lógica de módulos existente. IDs de badges actuales no cambian.

### 7. Imágenes (`src/assets/tigers/`)
~20 imágenes generadas con el estilo navy/naranja profesional actual (sin caricaturas de tigre): escenas de decisión, tarjetas de ofertas de trabajo A/B, planes A/B/C, perfiles Ana/Carlos/María, ciudad downtown vs cerca de la oficina, tecnología antes/ahora, entrevista.

## Fuera de alcance
- Peer Motivation: no existe en el código actual; no se construye ahora (el spec pide no modificar su arquitectura).
- SHARKS, AI Coach, calificación CEFR.

## Detalles técnicos
- Archivos nuevos: `src/services/tigers-week-1-course.ts`, `src/services/tigers-weeks-2-4-course.ts`, `src/assets/tigers/*.jpg`.
- Archivos editados: `src/lib/types.ts` (ModuleId, `rep5Scenarios`, `repLabel`), `src/services/course-service.ts`, `src/services/eagles-week-1-course.ts` (solo `testReady` opcional en el factory; datos EAGLES intactos), `src/lib/progress-moments.ts`, `src/lib/habit.ts`, `src/components/fluency/ModuleMoment.tsx`, `src/routes/practice.tsx` (selección de escenario D20 + etiquetas), `src/services/practice-session.ts` (persistir `scenarioId`).
- Sin migraciones de base de datos: `progress`, `recordings`, `test_ready_progress` y `achievements` ya están keyed por `module_id + day`.

## Verificación
- EAGLES día 20 completado → NextUp muestra TIGERS con ruta funcional.
- Día 3, 10, 14, 15, 19, 20 en móvil (iPhone/Android viewport): turnos aparecen uno a uno, sin overflow horizontal.
- Día 20 asigna un escenario y lo conserva al reanudar.
- Solo 12 días muestran Test Ready.
- Progreso/Grabaciones agrupan TIGERS por semana; hábito 66 días suma al completar un día TIGERS.
