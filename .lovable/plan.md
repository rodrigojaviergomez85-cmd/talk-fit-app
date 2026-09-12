# Pronunciación de los verbos en -ed (Paso 2)

Los estudiantes leen "watched" como "wa-ched" y pronuncian la -ed como sílaba extra. La idea es que, mientras leen el texto del Paso 2, vean de inmediato qué sonido tiene cada -ed y puedan escucharlo.

## Qué verá el estudiante

En el texto del Paso 2, cada verbo regular en pasado aparece marcado con un color según su sonido final:

- **/t/** (rojo suave): watched, worked, stopped → suena "watcht", sin sílaba extra
- **/d/** (azul suave): called, played, learned → suena "calld"
- **/ɪd/** (verde suave): wanted, needed, decided → sí agrega sílaba: "wan-ted"

Debajo del texto aparece una leyenda pequeña con los tres colores y un ejemplo de cada uno, para que entiendan el código de color sin explicación larga.

Al tocar uno de esos verbos se abre el mismo panel de pronunciación lenta que ya existe (0.25x / 0.5x / 0.75x), pero con una línea extra arriba:

```text
watched  →  "WATCHT"   (no digas "wa-ched")
sonido: /t/
```

Todo bilingüe (español/inglés), y el resto de las palabras del texto sigue funcionando igual que hoy.

## Cómo se decide el sonido

Regla fonética estándar aplicada localmente, sin IA y sin costo:

1. Termina en **-ted / -ded** → /ɪd/ (sílaba extra)
2. Termina en sonido sordo (p, k, f, s, sh, ch, x, th sordo) antes de -ed → /t/
3. Todo lo demás (vocales y sonidos sonoros) → /d/

Se excluyen palabras que terminan en -ed pero no son verbos en pasado regular (por ejemplo "red", "bed", "need", "speed", "indeed") con una lista corta de excepciones, para no marcar de más.

## Detalles técnicos

- Nuevo archivo `src/lib/ed-endings.ts`: `classifyEdEnding(word)` devuelve `"t" | "d" | "id" | null`, más la pista fonética que se muestra ("WATCHT"), lista de excepciones y verbos irregulares que terminan en -ed.
- `src/components/fluency/TappableSentence.tsx`: al tokenizar, si `classifyEdEnding` devuelve un valor, el botón de la palabra recibe la clase de color correspondiente y marca el estado con el tipo de sonido.
- `src/components/fluency/SlowWordPanel.tsx`: acepta una prop opcional `edHint` y la muestra como encabezado del panel; sin la prop se comporta exactamente igual que hoy.
- Leyenda: componente pequeño dentro de `TappableSentence` (o justo debajo, en el Paso 2 de `src/routes/practice.tsx`), visible solo si el texto contiene al menos un verbo marcado.
- Colores: tokens semánticos existentes o nuevas variables en `src/styles.css`; nada de colores fijos en los componentes.
- Traducciones nuevas en `src/lib/i18n.tsx` (`ed.legend.*`, `ed.hint.*`).
- Tests unitarios de `classifyEdEnding` en `src/lib/ed-endings.test.ts` cubriendo los tres grupos y las excepciones.

## Lo que NO cambia

Lógica de corrección del Paso 2, comparación de audio, cuotas, límites, progresión, grabaciones y llamadas de IA quedan intactas. El audio de palabra usa el mismo servicio con caché que ya existe.
