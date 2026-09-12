# Piloto: pronunciación de -ed en el Paso 2 (solo día 2 de Pasado Simple)

Los estudiantes leen "watched" como "wa-ched" y pronuncian la -ed como sílaba extra. Este es un **piloto limitado**: el marcado aparece únicamente en el Paso 2 del **día 2 del módulo Pasado Simple (`past-stories`, day=2)**. Si funciona, se extiende después.

## Qué verá el estudiante

En el texto del Paso 2 de ese día, cada verbo regular en pasado aparece marcado con un color según su sonido final:

- **/t/**: watched, worked, stopped → suena "watcht", sin sílaba extra
- **/d/**: called, played, learned → suena "calld"
- **/ɪd/**: wanted, needed, decided → sí agrega sílaba: "wan-ted"

Debajo del texto aparece una leyenda pequeña con los tres colores y un ejemplo de cada uno, para entender el código de color sin explicación larga.

Al tocar un verbo marcado se abre el mismo panel de pronunciación lenta que ya existe (0.25x / 0.5x / 0.75x), con una línea extra arriba:

```text
watched  →  "WATCHT"   (no digas "wa-ched")
sonido: /t/
```

Todo bilingüe (español/inglés). En todos los demás días y módulos, el texto se ve y funciona exactamente igual que hoy: sin colores ni leyenda.

## Cómo se decide el sonido

Regla fonética estándar aplicada localmente, sin IA y sin costo:

1. Termina en **-ted / -ded** → /ɪd/ (sílaba extra)
2. Termina en sonido sordo (p, k, f, s, sh, ch, x, th sordo) antes de -ed → /t/
3. Todo lo demás (vocales y sonidos sonoros) → /d/

Se excluyen palabras que terminan en -ed pero no son verbos en pasado (por ejemplo "red", "bed", "need", "speed", "indeed") con una lista corta de excepciones.

## Detalles técnicos

- Nuevo archivo `src/lib/ed-endings.ts`: `classifyEdEnding(word)` devuelve `"t" | "d" | "id" | null`, más la pista fonética ("WATCHT"), excepciones e irregulares que terminan en -ed.
- `src/components/fluency/TappableSentence.tsx`: nueva prop opcional `highlightEd?: boolean`. Cuando es `true`, los verbos con -ed clasificado reciben el color de su sonido y su panel muestra la pista fonética. Cuando es `false` o no se pasa, el componente se comporta idéntico a hoy.
- `src/routes/practice.tsx`: se pasa `highlightEd` solo cuando `module === "past-stories" && day === 2` en el Paso 2; la leyenda aparece solo en ese caso.
- `src/components/fluency/SlowWordPanel.tsx`: prop opcional `edHint` mostrada como encabezado; sin ella no cambia nada.
- Colores con tokens semánticos (o nuevas variables en `src/styles.css`); nada fijo en los componentes.
- Traducciones nuevas en `src/lib/i18n.tsx` (`ed.legend.*`, `ed.hint.*`).
- Tests unitarios de `classifyEdEnding` en `src/lib/ed-endings.test.ts` cubriendo los tres grupos y las excepciones.
- Verificación en el navegador del Paso 2 del día 2 de `past-stories`.

## Lo que NO cambia

Corrección del Paso 2, comparación de audio, cuotas, progresión, grabaciones y llamadas de IA quedan intactas. El audio de palabra usa el mismo servicio con caché existente. Ningún otro día o módulo se ve afectado.
