# Modo episodio: lectura fluida para los capítulos con diálogo

Me parece muy buena idea. Hoy el episodio vive dentro de la pantalla normal de la app: por eso la ilustración cuadrada, las tarjetas de diálogo y el menú de abajo pelean por el mismo espacio y "Siguiente" queda tapado. Los cinco cambios que propones resuelven exactamente eso. Los aplicaría solo a las escenas con diálogo (Eagles en adelante); las escenas de narración de las temporadas 1–5 siguen igual.

## Lo que cambia

**1. Ilustración compacta y fija**
La escena se fija arriba y ocupa como un tercio de la pantalla, recortada para que las caras queden visibles. Solo el diálogo se desplaza debajo. Al tocarla se abre a pantalla completa y se cierra con un toque. En pantallas bajas o con letra grande, la imagen se encoge sola, y hay una flecha para contraerla y ganar espacio de lectura.

**2. Diálogo más ligero y sincronizado**
Menos margen entre intervenciones, sin negrita en todo el párrafo (solo el nombre del personaje destacado). La intervención que está sonando se marca con "· Hablando" y color, y la lista se desplaza sola para seguir el audio. Si el estudiante sube a revisar algo, el auto-desplazamiento se detiene y aparece un botón "Seguir audio" para retomarlo.

**3. Barra de reproducción fija abajo**
Un solo control agrupado: Reproducir/Pausar escena (acción principal), Repetir frase actual, velocidad 0.75× / 1×, y Español como apoyo opcional. "Reproducir escena" escucha todas las intervenciones en orden; el botón junto a cada personaje repite solo esa parte.

**4. Consultar palabras sin perder el punto**
Al tocar una palabra, el audio se pausa (no se reinicia). Sale una tarjeta pequeña con significado y pronunciación lenta. Al cerrarla, "Continuar" retoma desde la misma intervención.

**5. Vista dedicada del episodio**
Mientras dura la historia se oculta el menú inferior de la app. Arriba quedan "Salir" y el progreso de escenas; abajo, "Anterior" y "Siguiente" siempre visibles sobre la barra de audio, con margen para el borde del teléfono. Al salir se guarda la escena donde iba y al volver se retoma ahí.

## Detalles técnicos

- `StorybookPlayer` gana un modo inmersivo: contenedor `100dvh` en columna (cabecera fija, imagen fija, diálogo con scroll propio, barra de audio + navegación fijas abajo con `env(safe-area-inset-bottom)`).
- `src/routes/natural-method.cuento.$storyId.tsx` deja de envolver el reproductor en `AppShell` (o le pasa un `hideNav`), de modo que `BottomNav` no se renderiza durante el episodio.
- Altura de imagen: `clamp` sobre `dvh` (~30%) con reducción automática en alturas cortas y estado contraído persistido.
- `speakDialogue` en `src/services/storybook/dialogue-audio.ts` expone pausa/reanudación y la línea activa; la barra fija y el panel de palabra usan ese estado para pausar y continuar sin reiniciar la escena.
- Auto-scroll a la línea activa con `scrollIntoView`, cancelado al detectar scroll manual del usuario.
- Posición del episodio guardada en el progreso local existente de storybook.
- Tipografía del diálogo: peso normal, ~17px, `leading-relaxed`; solo el nombre del hablante en mayúsculas/negrita.
- Sin cambios en guiones, preguntas calificadas, voces, límites de grabación ni cuotas.
- Verificación: Vitest de storybook, TypeScript y revisión visual a 393×852 y en una pantalla más baja.

## Alcance

Piloto en Eagles episodio 1 (escenas con diálogo); si funciona, se aplica al resto de Eagles al crearlos. Las temporadas 1–5 no se tocan.
