# Historia interactiva piloto (lectura en voz alta + TPRS)

Una historia completa dentro de la app, pensada para A1-A2, con cuatro momentos seguidos. Si funciona con los estudiantes, repetimos el mismo molde para las demás historias.

## 1. Escuchar la historia

- La historia se divide en frases cortas (unas 12-18).
- Voz generada por la app, con botones 0.5x / 0.75x / 1x.
- Estilo karaoke: la frase que suena se resalta grande; las demás quedan visibles pero apagadas.
- Botones: reproducir, pausar, reiniciar.

## 2. Entender (frase por frase)

- Al tocar una frase se abre su significado en español (traducción escrita por ti, revisada, sin espera).
- Dentro de la frase, cada palabra se puede tocar para escucharla lenta y sílaba por sílaba (igual que en el Paso 2 de la práctica).
- Las palabras clave de la historia (8-12) se marcan y quedan listadas abajo como "Mi cuaderno de vocabulario": palabra, significado en español, la frase donde apareció y botón de escuchar.

## 3. Leer en voz alta

- El estudiante lee la historia con el audio (shadowing) y luego graba su lectura.
- Cuenta regresiva para no alargarse, igual que en las prácticas.

## 4. TPRS: preguntas y luego tu versión

- Primero: 3 preguntas habladas sobre la historia (quién, qué, dónde/por qué). Cada una con audio de la pregunta y grabación de la respuesta.
- Después: "Continúa la historia" — el estudiante graba su propia continuación usando al menos 3 palabras nuevas, que aparecen en pantalla como recordatorio.

## Contenido del piloto

Escribo una historia original de nivel básico (presente simple, ~150-200 palabras, tono de caricatura para niños de 4-7 años pero con tema atractivo para jóvenes), con su traducción por frase y su lista de vocabulario. Tú la puedes cambiar después; todo el texto vive en un solo archivo.

## Dónde vive

Nueva sección dentro de Natural Method → Audiolibros: una tarjeta arriba que dice "Historia interactiva (nueva)" y abre la experiencia. Los enlaces externos actuales se quedan igual.

## Detalles técnicos

- Datos: `src/services/stories/<id>.ts` con `lines[]` (texto en inglés, traducción ES, palabras clave) y `vocab[]` (palabra, ES, frase de origen).
- Ruta: `src/routes/natural-method.story.$storyId.tsx` con `head()` propio.
- Reutilizo `ShadowKaraoke` para el karaoke, `AudioService` para el audio y la lógica de sílabas de `src/lib/syllables.ts` para la pronunciación por palabra; el grabador y la cuenta regresiva salen de `VoiceRecorder`.
- Las grabaciones de esta sección son locales de la pantalla: no tocan progreso, cuotas de práctica, Final Coach ni sincronización en la nube.
- Sin llamadas de IA en tiempo real: audio TTS cacheado como ya se hace en `/api/tts`; traducciones escritas.
- Sin cambios en módulos, Review, entrevistas, límites ni navegación inferior.

## Verificación

- Typecheck y pruebas existentes.
- Revisión en móvil (393 px) en español e inglés: karaoke resalta la frase correcta, el toque en frase muestra el español, el toque en palabra la pronuncia lento, las 3 preguntas y la continuación permiten grabar.
