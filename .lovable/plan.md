# Temporada 6 (Eagles): cómo se hila con la currícula oficial

## Regla maestra

Cada temporada = un módulo. Cada episodio = un día de ese módulo.
Temporada 6 = módulo Eagles (20 días / 4 semanas). El episodio del día N usa
**la misma gramática y la misma función comunicativa** que el Día N de Eagles,
dentro de la trama de Vale (su escuela crece y llega el primer contrato con una
empresa internacional).

Regla de contenido por episodio:
- La gramática del día aparece de forma natural en el diálogo (mínimo 6 usos claros).
- Las 3 preguntas calificadas del episodio usan exactamente esa estructura.
- Solo se repasa gramática ya vista (temporadas 1–5 y días previos de Eagles).
- Se mantiene todo lo aprobado: casi todo diálogo estilo serie americana, afirmaciones
  no calificadas, final de 15 segundos, cliffhanger, voces fijas por personaje.

## Mapa día por día (trama ↔ currícula)

**Semana 1 — Contar, aconsejar y vender (el primer contrato)**
1. Pasado simple, contar qué pasó → La llamada de Morgan: Vale cuenta cómo le fue.
2. could / should / might → Vale y Dani ven opciones para la propuesta.
3. Consejos: should / shouldn't / must → El mentor aconseja a Vale.
4. need to / don't have to (venta) → Vale ayuda a Morgan a elegir el plan.
5. Segundo condicional (If I…, I would…) → "¿Y si perdemos el contrato?"

**Semana 2 — Comparar tiempos y resolver problemas**
6. Pasado progresivo + presente progresivo → Antes y ahora en la escuela.
7. Present perfect (experiencias) → "Have you ever taught a company?"
8. Present perfect progressive → El esfuerzo de estas semanas.
9. Servicio al cliente #1 → Un estudiante corporativo se queja.
10. Transferencia a un problema nuevo → Falla la plataforma el día del arranque.

**Semana 3 — Antes/ahora y comparar opciones**
11. used to → Vale recuerda el call center.
12. Comparativos cortos → Dos horarios para la empresa.
13. Comparativos largos (more flexible…) → Presencial vs. en línea.
14. Superlativos → Elegir el mejor plan para Northline.
15. Presente simple (cualidades) → ¿Qué hace a un gran maestro/empleado?

**Semana 4 — Futuro, logros y cierre profesional**
16. Futuro (going to / will) → La expansión a otro país.
17. Present perfect: already / yet / so far → Balance del contrato.
18. Present perfect progressive (esfuerzo largo) → Dani y su nuevo camino.
19. Servicio al cliente #2: cliente molesto → Reclamo del director de Northline.
20. Venta consultiva (cierre) → Cierre del contrato y gancho a Sharks.

## Ajuste al Episodio 1 ya existente

El episodio 1 ya existe con la llamada de Morgan, pero sus tres preguntas
calificadas están en presente ("They freeze when they speak…", "I recommend…",
"She needs a proposal by Friday"), y el Día 1 de Eagles es **pasado simple:
contar qué pasó**. Se ajusta así, sin tocar dibujos ni personajes:
- Se añade una escena corta de cierre donde Vale le cuenta a Dani cómo estuvo la
  llamada, en pasado.
- Las tres preguntas calificadas pasan a pasado simple / contar qué pasó
  ("What happened in the call?", "Why was it important?", "What did you do after that?").
- Se conservan los conectores del Día 1: because… · after that… · overall…

## Detalles técnicos

- Fuente de verdad: `src/services/eagles-week-1-course.ts` (días 1–5) y
  `src/services/eagles-weeks-2-4-course.ts` (días 6–20); campos `topic` y `focus`.
- `src/services/storybook/seasons.ts`: la temporada 6 ya está ligada al módulo
  `eagles-week-1`; se van agregando los slots de día 2–20 conforme se creen.
- Cada episodio nuevo: archivo en `src/services/storybook/`, registro en
  `index.ts`, 11 imágenes (cover + s1–s10), JPG 768×768 bajo 250 KB, voces desde
  `voices.ts`.
- Nueva prueba `eagles-curriculum-alignment.test.ts`: verifica que cada episodio
  registrado de la temporada 6 declare el día correcto y que sus preguntas
  calificadas contengan la estructura gramatical de ese día.
- El bloqueo por ruta oficial ya existente se mantiene sin cambios.

## Orden de trabajo propuesto

1. Ajustar el Episodio 1 al Día 1 (pasado simple) + prueba de alineación.
2. Construir los días 2–5 (semana 1 completa) y revisarlos contigo.
3. Continuar por semanas: 6–10, 11–15, 16–20.
