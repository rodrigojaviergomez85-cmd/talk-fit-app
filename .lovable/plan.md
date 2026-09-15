# Mapa maestro — Temporada 7 (Tigers): "El competidor"

Módulo: `tigers` · 20 episodios (uno por día) · formato serie (diálogo fluido estilo sitcom, casi sin narrador, igual que Temporada 6).
Trama: una cadena grande de academias copia el modelo de Vale y va por el contrato de Northline. Vale debe argumentar, dar evidencia y negociar.
Reparto fijo: Vale, Dani, Camila, Morgan, Mateo, Don Tito. Nuevos: **Bryan** (gerente del competidor, voz masculina adulta), **Sofía** (nueva maestra de la escuela, voz femenina joven).

| Día | Tema del curso | Foco de inglés | Escena de la historia | Turnos del estudiante |
|---|---|---|---|---|
| 1 | A Decision I Made | Pasado simple: contar una decisión y por qué | Vale cuenta cómo decidió abrir la escuela cuando aparece el competidor | Contar una decisión propia · por qué · qué pasó después |
| 2 | What Could Happen? | could · might · would | Dani y Vale listan qué podría pasar si pierden Northline | Tres posibilidades · la más probable · tu reacción |
| 3 | Give Advice & Defend It | should · would · if I were you | Don Tito aconseja; Camila no está de acuerdo | Dar un consejo · defenderlo · responder a la objeción |
| 4 | What Needs to Change? | needs to · has to · doesn't have to | Auditoría interna: qué cambia en la escuela | Qué necesita cambiar · qué no hace falta · prioridad |
| 5 | What Would You Do? | Segundo condicional | "Si tuvieras que bajar el precio, ¿lo harías?" | Tu decisión · tu razón · la otra cara |
| 6 | Then vs Now | Pasado progresivo + presente progresivo | La escuela hace un año vs. hoy | Antes · ahora · por qué cambió |
| 7 | Tell Me About Your Experience | Present perfect + ejemplo | Bryan reta a Vale: "¿Han enseñado a una empresa?" | Una experiencia · un ejemplo concreto · el resultado |
| 8 | What Have You Been Working On? | Present perfect progressive | Sofía cuenta en qué ha estado trabajando | En qué has estado trabajando · el reto · el avance |
| 9 | Why Are You Ready? | Mezcla: pasado, perfect, perfect progressive | Vale prepara la defensa del contrato | Evidencia 1 · evidencia 2 · conclusión |
| 10 | Job Interview Challenge | Transferencia: entrevista real | Dani entrevista para su primer puesto formal en la escuela | Respuesta · razón · ejemplo |
| 11 | How Things Have Changed | used to | Don Tito y la tecnología: cómo se enseñaba antes | Antes solía... · ahora · qué es mejor |
| 12 | Compare & Choose | Comparativos cortos | Dos locales para el segundo salón | Comparar · elegir · justificar |
| 13 | Compare & Defend | Comparativos largos | Presencial vs. en línea frente a Morgan | Tu postura · la otra cara · tu cierre |
| 14 | Sales Negotiation | Superlativos + comparativos | Negociación con Northline contra la oferta de Bryan | Mejor valor · comparación · cierre |
| 15 | Who Would You Hire? | Presente simple: evaluar | Vale y Camila eligen entre dos maestros | Tu elección · por qué · la objeción |
| 16 | What Do You Think Will Happen? | Futuro: will · going to | El competidor abre enfrente | Predicción · razón · plan |
| 17 | What Have You Accomplished? | Present perfect: logros | Cierre del trimestre en la escuela | Logro · evidencia · siguiente meta |
| 18 | How Have You Been Changing? | Present perfect progressive | Dani reflexiona sobre su año | Cómo has cambiado · el reto · lo que sigue |
| 19 | New in the City | Tiempos mezclados, información que cambia | Un cliente nuevo llega con datos que cambian dos veces | Decidir · ajustar · concluir |
| 20 | TIGERS Final — Defend Your Decision | Transferencia completa | La junta final: Vale defiende su decisión y gana la renovación. Gancho a Sharks: hay que crecer rápido | Decidir · explicar · comparar · defender |

## Reglas de producción
- Mínimo 6 usos naturales de la estructura del día por episodio.
- 3 preguntas calificadas con esa estructura (2 intentos + Saltar), pistas coherentes con la pregunta.
- 2–3 turnos hablados del estudiante por episodio.
- Afirmación hablada no calificada ("I can do it", "English is easy", "Mistakes are part of the process") — capa de perseverancia permanente.
- Cierre hablado final de 15 segundos.
- Cliffhanger al final de cada episodio.
- 11 imágenes 768×768 bajo 250 KB por episodio, con triple check: continuidad de personajes (tono de piel, cabello, ropa), anatomía correcta, sin texto en las imágenes.
- Voces fijas y únicas por personaje, iguales que en temporadas anteriores.
- Registro en la ruta oficial: 1 episodio por día, máximo 2 nuevos por día, repaso de anteriores, futuros bloqueados.
- Glosario táctil con significado y pronunciación en el 100% de las palabras.
- Respuestas correctas de las preguntas rápidas en orden aleatorio.

## Cómo se implementará
1. Crear los 20 guiones (servicios de episodio) con diálogo fluido estilo sitcom.
2. Registrar los 20 episodios en Temporada 7 (días 1–20 del módulo Tigers).
3. Generar las 220 ilustraciones (11 por episodio) con los prompts canónicos y revisarlas en lotes.
4. Cobertura de glosario al 100%, compresión de imágenes bajo 250 KB.
5. QA final: TypeScript, pruebas enfocadas del Storybook, revisión visual lado a lado, verificación de rutas, y actualización del roadmap.
