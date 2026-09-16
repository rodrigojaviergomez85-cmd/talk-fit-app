# Advanced 1 — Episodios 6 a 10 escritos a mano (nivel B2)

Los guiones 6–10 ya están aprobados en el documento `guion-advanced-1-episodios-6-10.md`. Ahora se convierten en episodios reales de la app, escritos a mano con el mismo criterio que los episodios 1–5 ya corregidos.

## Qué se produce por episodio

- 9 escenas de diálogo encadenado, estilo serie real: interrupciones, humor, desacuerdos, narración mínima.
- Vale siempre como maestra experimentada y dueña de su academia; las dudas y la práctica son del estudiante.
- Inglés B2 de verdad: condicionales 2º y 3º, voz pasiva, estilo indirecto, oraciones enfáticas ("What made the difference was…"), present perfect continuous y conectores de matiz (however, although, that being said).
- Al menos dos turnos largos por episodio (3–4 oraciones conectadas).
- Palabras y expresiones tocables con significado en español; phrasal verbs e idioms subrayados como expresión completa.
- 3 preguntas de comprensión con opciones en orden aleatorio y respuesta correcta nacida del diálogo.
- Turno del estudiante exigente, alineado al foco del día.
- Tarjeta de mentalidad o hábito, cierre con grabación de 30 segundos y gancho al siguiente episodio.

## Foco por día (currícula oficial)

| Episodio | Día | Foco |
|---|---|---|
| 6 | 6 | Reto: SITUACIÓN → ACCIÓN → RESULTADO → LECCIÓN |
| 7 | 7 | Un error: RESPONSABILIDAD → ACCIÓN → LECCIÓN, sin culpar a nadie |
| 8 | 8 | Conflicto con control emocional |
| 9 | 9 | Pensamiento orientado al cliente |
| 10 | 10 | Ronda conductual: historias con seguimientos inesperados |

## Ilustraciones

11 imágenes por episodio (portada + escenas) en el mismo estilo cinematográfico luminoso del episodio 1, con las descripciones canónicas de Vale (mostaza), Dani (celeste), Camila (morada), Renata (carmesí) y Reed (azul marino). Mateo no aparece. Cada imagen a 768×768 y menos de 250 KB para que el celular cargue rápido.

## Conexión con la app

Cada episodio se activa en su día (6 al 10) de la Temporada 9, con su resumen "Previously…" y su gancho bilingüe.

## Detalles técnicos

- Nuevos archivos `src/services/storybook/advanced-1-ep6…ep10*.ts`, registro en `index.ts` y días 6–10 en `seasons.ts`.
- Arte en `src/assets/storybook/advanced1-ep6…ep10/`, JPG progresivo sRGB 768×768 < 250 KB.
- Vocabulario: 16 unidades nuevas B1–B2 por episodio en `vocabulary-targets.ts` y toda palabra tocable con entrada en `glossary.ts`.
- Verificación por lote: `bunx vitest run src/services/storybook`, `bunx tsgo --noEmit` y carga de las cinco rutas en móvil.

## Orden de trabajo

Episodio por episodio (6, 7, 8, 9, 10): primero el texto a mano, luego el arte, luego registro y pruebas. Te muestro el resultado al cerrar el lote.
