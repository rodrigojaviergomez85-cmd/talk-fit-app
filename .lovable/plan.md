# Sharks: revisión del usuario de Ep. 9–11, luego continuar 12–20

## Lo que ya está listo para revisar ahora

El usuario quiere ver los episodios 9, 10 y 11 antes de seguir. Ya están reescritos a mano con la nueva trama aprobada:

- **Ep. 9 — The call from Mexico**: Vale da su primera clase real de Vale Kids en el centro comunitario; Renata la ve en video y llama desde Monterrey para preguntar cómo abrir un programa similar (ya no hay compra del negocio). Final: se revela que Renata también atiende clientes corporativos.
- **Ep. 10 — Partner or rival**: Vale y Renata definen reglas — Kids juntas, clientes corporativos separados. Final: Lucía reporta que una clase en Guatemala salió mal.
- **Ep. 11 — What went wrong**: la clase de Guatemala falló porque el maestro nunca fue capacitado; Vale asume la culpa, pausa el crecimiento y va a disculparse en persona. Final: Camila tiene los números reales.

Cada uno tiene 11 escenas, 33 líneas de diálogo conectado, 2 phrasal verbs + 1 idiom subrayados como expresión completa, quizzes con opciones aleatorias, prompts de grabación coherentes, y vocabulario traducido por escena.

**Cómo revisarlos**: en la app, entrar a El Mundo de Vale → Temporada 8 (Sharks) → Episodios 9, 10 y 11. (Con la cuenta sin límites se pueden abrir aunque la ruta oficial no haya llegado ahí.)

## Pendiente cuando el usuario apruebe seguir

1. **Verificar tests** de Ep. 11–15 (consistencia, currículo, presupuesto de vocabulario). Ya se corrigieron: conteo de palabras del Ep. 12 (ahora ~502), presupuestos de vocabulario 11–15 alineados a las nuevas tramas, y los Ep. 13–15 salieron de la capa de expansión genérica que descartaba líneas reales.
2. **Reescribir a mano Ep. 16–20** según el arco aprobado:
   - Ep. 16: coordinar un equipo en tres países.
   - Ep. 17: presión de un inversionista.
   - Ep. 18: decir no al crecimiento a cualquier costo.
   - Ep. 19: acuerdo regional.
   - Ep. 20: cierre multinacional; Dani revela su ambición política (puente a Advanced).
   - Mismo estándar: 11 escenas, 33 líneas, 500–650 palabras, ≥3 palabras tocables traducidas por escena, ≥16 unidades nuevas de vocabulario B1–B2 por episodio, quizzes únicos basados en la trama, Say It coherentes, finale y cliffhanger que conecta con el siguiente episodio.
3. **Actualizar presupuestos de vocabulario** de Ep. 16–20 en `vocabulary-targets.ts` para que calcen con los nuevos guiones.
4. **Limpiar la capa de expansión genérica**: quitar 16–20 del set y eliminar los frames genéricos que ya no se usen.
5. **QA final**: `sharks-consistency`, `sharks-curriculum-alignment`, `vocabulary-budget`, `glossary` (100% de tokens con significado en español), `say-it-coverage`, TypeScript completo, y verificación de rutas/imágenes (incluido el import de `cover.jpg` del Ep. 13).

## Notas técnicas

- Marco no es un speaker permitido en Sharks; en Ep. 13 hablan Vale, Dani y Camila sobre él (offscreen).
- Mateo está prohibido en Sharks; el coprotagonista es Dani (hombre, empleado de Vale en esta temporada).
- Renata es socia potencial de Kids, no compradora. Reed sigue como ejecutivo remoto de Northline.
- No tocar el arte existente salvo que una escena reescrita lo haga contradictorio.
