# Temporada 6 (Eagles): episodios 2–6 alineados a la currícula oficial

El guion maestro B1→B2 ya está aprobado y el mapa día↔currícula de la Temporada 6 ya existe. Solo falta producir los episodios. Este plan cubre los días 2–6 (el día 1, "The Offer", ya está hecho).

## Regla por episodio (ya aprobada)

- Casi todo diálogo estilo serie americana (máximo 1 línea de narrador de contexto al abrir).
- La gramática del día aparece mínimo 6 veces en el diálogo; las 3 preguntas calificadas usan exactamente esa estructura; solo se repasa gramática ya vista.
- 2–3 momentos "tu turno" (grabación con verificación flexible), afirmaciones no calificadas, grabación final de 15 s, cliffhanger.
- Voces fijas por personaje, fichas canónicas en `_canon/`, 11 imágenes por episodio (cover + s1–s10), JPG 768×768 bajo 250 KB, sin texto en las imágenes, anatomía correcta.

## Episodios a construir

| Día | Episodio | Gramática del día (currícula Eagles) | Trama |
|---|---|---|---|
| 2 | "The proposal" | could / should / might (opciones) | Vale y Dani arman la propuesta para la empresa |
| 3 | "The competitor" | Consejos: should / shouldn't / must | El mentor aconseja a Vale frente al competidor |
| 4 | "The objection" | need to / don't have to (venta) | Vale ayuda a Morgan a elegir el plan y responde objeciones |
| 5 | "What would you do?" | Segundo condicional (If I…, I would…) | "¿Y si perdemos el contrato?" |
| 6 | "Then & now" | Pasado progresivo + presente progresivo | Antes y ahora en la escuela |

Los títulos/teasers coinciden con los slots ya definidos en `src/services/storybook/seasons.ts` (días 2–6).

## Trabajo técnico

- Un archivo por episodio en `src/services/storybook/eagles-epN-*.ts`, con formato de diálogo (`lines` por escena), glosario bilingüe tocable al 100%, y pistas coherentes con la pregunta (como ya se corrigió en temporadas anteriores).
- Registrar cada episodio en `index.ts` y llenar los slots 2–6 en `seasons.ts`.
- Extender `eagles-curriculum-alignment.test.ts` para verificar día correcto y estructura gramatical en las preguntas calificadas.
- Continuidad visual: mismas referencias canónicas de Vale, Dani, Camila, Morgan; auditoría de anatomía/identidad en las 55 imágenes nuevas.
- Bloqueo por ruta oficial (2 episodios nuevos al día, repaso hacia atrás) sin cambios.

## Triple chequeo de consistencia (imágenes y voces)

Cada episodio pasa por tres revisiones antes de darse por terminado:

1. **Al generar** — cada imagen se compara contra la ficha canónica del personaje (piel, cabello, edad, ropa, proporciones, dos brazos y dos manos, sin texto en la imagen) y se regenera si algo no cuadra. Cada línea de diálogo queda asignada a la voz fija del personaje.
2. **Revisión automática** — pruebas que verifican: las 11 imágenes existen y pesan menos de 250 KB en 768×768; cada personaje que habla tiene voz registrada; ningún personaje comparte voz con otro; la voz de un personaje es la misma en todos los episodios de la temporada.
3. **Revisión final lado a lado** — se comparan los 5 episodios nuevos contra el episodio 1 y contra temporadas previas: mismo rostro y vestuario de Vale, Dani, Camila y Morgan, misma edad aparente, escenarios y objetos coherentes; y escucha de una escena por episodio para confirmar que cada voz suena igual que antes.

Si algo falla en cualquiera de los tres pasos, se corrige y se repite el paso.

## Verificación

- TypeScript y suite Vitest completa en verde, incluidas pruebas de unicidad de voces y cobertura de arte.
- Recorrido móvil (393×852) por cada episodio: diálogo, palabras tocables, "tu turno", final y cliffhanger.
