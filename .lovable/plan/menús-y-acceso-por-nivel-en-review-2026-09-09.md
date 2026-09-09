# Menús y acceso por nivel en Review

## Objetivo
Al entrar a **Review**, mostrar primero tres opciones claras:

1. **Basic**
2. **Intermediate + Advanced**
3. **Interview Simulator / Simulador de entrevistas** — visible como **Próximamente**, sin acceso todavía

## Acceso por nivel

### Menú Basic
Los temas seguirán visibles, pero los que aún no correspondan mostrarán candado y no podrán abrirse.

- **Basic Zero:** ningún Review existente desbloqueado por ahora.
- **Basic 1:** Simple Future.
- **Basic 2:** Simple Future, Simple Present y Present Progressive.
- **Basic 3:** todo lo anterior, más Simple Past y Past Progressive.
- **Basic 4:** todos los temas del menú Basic.

No se creará un módulo nuevo de Basic Zero en esta entrega.

### Menú Intermediate + Advanced
- Desde **Eagles** se desbloquean todos los temas de Basic y todos los siguientes Reviews:
  - Present Perfect
  - Present Perfect Progressive
  - Comparatives
  - Modal Verbs
  - Used to / Be used to / Get used to
  - Past Perfect / Past Perfect Progressive
- Tigers, Sharks y todos los módulos Advanced conservarán ese acceso completo.
- Los alumnos que todavía estén en Basic verán estos temas con candado.

### Cuentas con acceso ilimitado
`english4callcenters@gmail.com` y `auxialeman@gmail.com` podrán abrir los tres menús disponibles, todos los módulos y las cinco prácticas de cada módulo sin restricciones. El simulador seguirá marcado como Próximamente porque aún no tendrá contenido.

## Experiencia de navegación
- `/review` será la selección de los tres menús.
- **Basic** y **Intermediate + Advanced** abrirán páginas propias con sus módulos.
- Cada módulo conservará su guía y sus cinco prácticas actuales.
- Se mantendrá el botón para regresar a Review.
- Los módulos bloqueados mostrarán el nivel necesario y no serán enlaces activos.
- El acceso directo mediante una dirección guardada también respetará el nivel, evitando saltarse el candado.

## Detalles técnicos
- Añadir una clasificación y un nivel mínimo explícitos a cada módulo de Review, en lugar de inferirlos por el título.
- Reutilizar el nivel actual guardado del curso oficial para calcular permisos.
- Centralizar la regla de acceso para que la lista y la protección de las páginas usen exactamente la misma decisión.
- Mantener intactos el progreso independiente de Review, el límite diario, Coach, grabaciones, pasos 1–5 y el desbloqueo secuencial de prácticas.
- Mantener el bypass existente de las dos cuentas ilimitadas.
- Añadir textos bilingües y metadatos propios para las nuevas páginas.

## Verificación
- Probar la matriz completa desde Basic Zero, Basic 1, Basic 2, Basic 3, Basic 4, Eagles y Advanced.
- Confirmar módulos visibles con candado, navegación normal y bloqueo por acceso directo.
- Confirmar acceso total para ambas cuentas ilimitadas.
- Confirmar que cada módulo sigue desbloqueando sus prácticas 1–5 secuencialmente para usuarios normales.
- Ejecutar pruebas de Review, verificación de tipos y revisión móvil de las nuevas pantallas.
