# Sharks: cerrar tests, auditoría imagen-vs-texto desde el Ep. 10, luego 16–20

## Estado actual
- Episodio 9: guion nuevo (Vale da su primera clase de Kids en un salón real; Renata llama desde la escena 5) y las 12 ilustraciones ya regeneradas en estilo webtoon del Ep. 2 — cover + s1–s11, 768×768, RGB, todas bajo 250 KB. Renata solo aparece desde s5.
- Episodios 10–15: guiones reescritos a mano (socio de Kids, no compra; falla en Guatemala; números; Marco; cliente perdido/recuperado).
- Tests de Sharks: 21 de 22 pasando. Falta 1 palabra al episodio 14 (499 de 500 mínimo).

## Pasos

### 1. Cerrar el episodio 14
- Extender una línea de diálogo con 1–2 palabras naturales para pasar el mínimo de 500 palabras habladas.
- Re-correr los tres tests enfocados (consistencia, currículo, presupuesto de vocabulario) hasta que pasen los 22.

### 2. Auditoría imagen-vs-texto, episodios 10–15 (nuevo requisito)
- Para cada episodio 10–15: leer el guion escena por escena y comparar contra un contact sheet de sus 12 imágenes (cover + s1–s11).
- Regla: cada imagen debe mostrar lo que el texto de su escena dice — lugar, personajes presentes, acción, props (p. ej., si el texto es una clase de kids en Guatemala, no puede ser una oficina; si Renata habla por teléfono, se muestra la llamada).
- Regenerar solo las imágenes que no hagan match, con el estilo webtoon del Ep. 2 (768×768, cuadro completo, sin bandas/texto/logos/recortes, < 250 KB, apariencia canónica de personajes: Vale mostaza, Dani azul claro, Camila morado, Renata carmesí).
- Verificar el problema pendiente del import de `cover.jpg` del episodio 13 en runtime.

### 3. Pausa para revisión del usuario
- El usuario revisa los episodios 9–11 en la app (ya lo pidió). No avanzar a 16–20 hasta su visto bueno.

### 4. Episodios 16–20: reescritura manual (después de la revisión)
- Reescribir guiones escena por escena según el arco aprobado: equipo en tres países (16), presión de inversionista (17), rechazar crecimiento a toda costa (18), acuerdo regional (19), cierre multinacional y la ambición política de Dani (20).
- Estándar por episodio: 11 escenas, 33 líneas conectadas, 500–650 palabras habladas, ≥3 palabras tocables con traducción por escena, exactamente 2 phrasal verbs + 1 idiom/collocation, quizzes únicos coherentes, Say It, afirmaciones, final y cliffhanger.
- Actualizar los presupuestos de vocabulario en `vocabulary-targets.ts` para 16–20 (≥16 unidades nuevas B1–B2 por episodio).
- Quitar 16–20 de la capa genérica `sharks-dialogue-expansions.ts` hasta dejarla vacía y eliminarla.
- Auditoría imagen-vs-texto también para 16–20 (mismo procedimiento del paso 2) y regenerar lo que no coincida.

### 5. QA final
- Tests: consistencia Sharks, alineación curricular, presupuesto de vocabulario, glosario (100% tokens con significado), Say It, TypeScript.
- Verificación de rutas/imports de las 5 temporadas afectadas.
- Confirmar proyección del vocabulario activo hacia la meta de 3500 palabras.

## Notas técnicas
- Canon: Vale (maestra/empresaria salvadoreña, blusa mostaza), Dani (hombre, empleado de Vale en Sharks), Camila (morado), Renata (socia potencial de Kids en Monterrey, NO compradora), Lucía (verde bosque), Reed (azul marino). Marco solo se menciona, no aparece. Mateo prohibido en Sharks.
- Estilo de arte de referencia: episodio 2 de Sharks — ilustración webtoon, no fotorrealista.
- No tocar temporadas 1–5.
