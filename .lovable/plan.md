# Advanced 3 · Week 4 — Reflect & Connect

## Objetivo
Publicar los episodios 16–20 de la temporada 11 exactamente como fueron entregados y cerrar *El mundo de Vale* sin modificar episodios anteriores ni otras funciones de la app.

## Implementación
- Copiar byte por byte los cinco guiones adjuntos a `src/services/storybook/`.
- Aplicar manualmente el soporte del diff porque no coincide limpiamente con el estado vigente:
  - registrar los episodios 16–20 en el índice;
  - completar los días 16–20 de Advanced 3 sin alterar teasers;
  - agregar a Abril al tipo, las tres asignaciones de voz y el canon visual;
  - incorporar las 23 entradas de glosario, `abril` y `tomás` como nombres propios;
  - añadir las diez líneas aprobadas a la prueba de fidelidad.
- No modificar diálogos, cursos, práctica, progreso, grabaciones, estrellas, liga, episodios 1–15 ni temporadas 1–10.

## Arte
- Crear exactamente 50 imágenes nuevas: `cover.jpg` y `s1.jpg`–`s9.jpg` en cada una de las cinco carpetas nuevas.
- Generar cada escena desde su propio `imageAlt`, respetando el canon de Abril, Vale, Julieta, Lidia, Reed, Óscar, Dani, Mía, Nico, Camila y Barrett.
- Mantener a Keller, Tomás y el cliente únicamente como voces cuando corresponde; Doña Estela aparecerá solo como texto en el chat.
- Recrear los tres planos espejo usando como referencias las imágenes previas indicadas.
- Verificar especialmente `PAID` en episodio 16 escena 4 y el único mensaje `Estela: Comé` en episodio 17 escena 8.
- Normalizar las 50 imágenes como JPEG RGB progresivo, cuadradas y optimizadas para móvil.

## Verificación
- Confirmar que los cinco guiones copiados siguen idénticos a los adjuntos.
- Comprobar que existen exactamente 50 imágenes nuevas y revisar visualmente cada una contra su `imageAlt` y canon.
- Ejecutar la suite completa de Vitest y la comprobación de TypeScript.
- Abrir el episodio 20 en móvil y verificar Julieta, Abril, sus nombres/voces y los veinte días completos de la temporada 11.
- Reportar archivos creados, archivos modificados y fecha UTC de las 50 imágenes.
