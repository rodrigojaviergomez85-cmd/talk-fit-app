# Reemplazo de badges por emblemas geométricos estilo logo deportivo

## Objetivo
Sustituir los 11 badges actuales (`src/assets/badges/*.png`) por los nuevos emblemas geométricos planos (estilo del tigre/tiburón de la imagen de referencia), ya generados y aprobados visualmente en la propuesta.

## Mapeo de archivos
| Módulo | Animal | Archivo origen (propuesta) | Destino |
|---|---|---|---|
| Basic Zero | Pollito | badge-proposal/basic-zero-chick-v2.png | src/assets/badges/basic-zero.png |
| Basic 1 | Conejo | badge-proposal/simple-future-rabbit.png | src/assets/badges/simple-future.png |
| Basic 2 | Abeja | badge-proposal/simple-present-bee.png | src/assets/badges/simple-present.png |
| Basic 3 | Elefante | badge-proposal/past-stories-elephant.png | src/assets/badges/past-stories.png |
| Basic 4 | Zorro | badge-proposal/mixed-tenses-fox.png | src/assets/badges/mixed-tenses.png |
| EAGLES | Águila | badge-proposal/eagles-eagle.png | src/assets/badges/eagles-week-1.png |
| TIGERS | Tigre | badge-proposal/tigers-tiger.png | src/assets/badges/tigers.png |
| SHARKS | Tiburón | badge-proposal/sharks-shark.png | src/assets/badges/sharks.png |
| Advanced 1 | León | badge-proposal/advanced1-lion.png | src/assets/badges/advanced-1.png |
| Advanced 2 | Lobo | badge-proposal/advanced2-wolf.png | src/assets/badges/advanced-2.png |
| Advanced 3 | Fénix | badge-proposal/advanced3-phoenix.png | src/assets/badges/advanced-3.png |

## Pasos
1. Copiar los 11 PNG aprobados desde `/mnt/documents/badge-proposal/` a `src/assets/badges/`, sobrescribiendo los archivos actuales (mismos nombres → no hay que tocar imports).
2. Verificar en `src/components/fluency/ModuleBadge.tsx` que el fondo circular claro en badges `lg` siga funcionando con los nuevos emblemas (tienen fondo transparente; el contraste debería mejorar). Ajustar solo si el chequeo visual lo requiere.
3. Verificar visualmente con Playwright (viewport 1280x1800) en: Home (badge actual + siguiente bloqueado), `/module/tigers` (badge grande), lista de niveles (PlacementPicker) y `/progress` (filas + grid de 11 emblemas, estados bloqueado en grises).
4. Ejecutar `npx tsc --noEmit`, `npx vitest run` y `npm run build`.

## Fuera de alcance
- No se tocan componentes, textos, progreso, cuotas, AI, grabaciones ni el diseño de Home.
- No se eliminan los archivos de propuesta de `/mnt/documents/`.

## Detalles técnicos
- Los imports en `ModuleBadge.tsx` apuntan a los mismos nombres de archivo, por lo que el reemplazo es solo de binarios.
- Alt text bilingüe existente se mantiene (los animales coinciden con los actuales: chick, rabbit, bee, elephant, fox, eagle, tiger, shark, lion, wolf, phoenix).
