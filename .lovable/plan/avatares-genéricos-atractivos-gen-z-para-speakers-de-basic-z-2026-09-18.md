# Avatares genéricos atractivos Gen Z para speakers de Basic Zero Week 1

## Objetivo
Reemplazar la "C" (fallback de iniciales) junto a "Escucha a Carlos" en el rediseño de Paso 1 · Escucha de Basic Zero Semana 1 por una imagen humana genérica atractiva para Gen Z, con variante mujer para speakers femeninos.

## Alcance
- Solo Basic Zero Week 1 dentro del componente `Week1ListenScreen`.
- No modificar el contenido curricular, diálogos, ni otros módulos.
- Si un día ya tiene `avatarSrc` propio, se respeta; el avatar genérico es fallback por género cuando falta.

## Pasos

1. **Generar dos avatares genéricos**
   - Hombre joven atractivo, estilo humano realista cálido, sin texto, sin fondo llamativo.
   - Mujer joven atractiva, mismo estilo visual.
   - Formato 768×768 px, JPG progresivo RGB, objetivo < 250 KB para móviles.
   - Guardar en `src/assets/avatars/generic-male.jpg` y `src/assets/avatars/generic-female.jpg`.

2. **Conectar avatares a los personajes de Basic Zero Week 1**
   - En `src/services/basic-zero-course.ts`, asignar `avatarSrc` a los objetos `Person` de Carlos, Sofía, Daniel, Valeria y Miguel (o a la construcción `speaker` de `week1Day`) según `gender`.
   - Asegurar que la imagen masculina se use para Carlos/Daniel/Miguel y la femenina para Sofía/Valeria.

3. **Actualizar `Week1ListenScreen.tsx` para respetar fallback por género**
   - El componente ya lee `speaker?.avatarSrc`; verificar que no haya lógica que fuerce iniciales cuando existe imagen.
   - Si el día no define `speaker` o no tiene `avatarSrc`, mantener el fallback actual de iniciales (`initials(name)`) o agregar un fallback neutro (nota musical) solo si no hay speaker.

4. **Verificar tipos y ajustar tipado si es necesario**
   - `Speaker` en `src/lib/types.ts` ya debería soportar `avatarSrc`, `avatarAlt` y `name`; confirmar.
   - Si `Speaker` no tiene `avatarSrc`, extenderlo.

5. **Pruebas y validación**
   - TypeScript sin errores.
   - Test unitario o actualización de `Week1ListenScreen.test.ts` para confirmar que el avatar se renderiza según el género del speaker.
   - Playwright móvil (360/390/430 px) para verificar que "Escucha a Carlos" muestra la foto en lugar de "C" y que la imagen se carga correctamente.
   - Revisar peso de las imágenes y que no superen 250 KB.

## Entregables esperados
- `src/assets/avatars/generic-male.jpg`
- `src/assets/avatars/generic-female.jpg`
- `src/services/basic-zero-course.ts` con `avatarSrc` en speakers de Week 1
- `src/components/fluency/Week1ListenScreen.tsx` sin regresiones
- Tests actualizados y capturas móviles de los días 1–5 de Basic Zero Week 1