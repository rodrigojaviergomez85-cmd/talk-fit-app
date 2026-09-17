# Estudiantes bloqueados por Google Play Protect

## Qué está pasando

El mensaje de la captura no viene de Fluency App ni del sitio web. Viene de Android cuando alguien instala un **archivo de instalación (APK)** que fue creado con una versión antigua de Android. Google lo bloquea automáticamente y ya no hay forma de "desbloquearlo" desde nuestro lado: mientras ese archivo siga circulando por WhatsApp, cada vez más teléfonos lo van a rechazar.

La buena noticia: Fluency App **ya se puede instalar directamente desde el navegador**, sin archivo y sin tienda. El proyecto ya tiene la página `/install` con instrucciones para Android y iPhone, y el ícono, nombre y pantalla completa ya están configurados.

Así que la solución no es arreglar el archivo, es dejar de usarlo y llevar a todos por la instalación del navegador.

## Qué haría

### 1. Página de instalación con rescate para quien está bloqueado

En la página de instalación, agregar una sección visible en español para el caso exacto de la captura:

- "¿Te aparece 'Se bloqueó la app no segura'?" — explicar en una línea que ese archivo ya no sirve.
- Paso 1: desinstalar la Fluency App que instalaron con el archivo (mantener presionado el ícono → Desinstalar).
- Paso 2: abrir Chrome y entrar a la dirección oficial.
- Paso 3: instalar desde el botón de la misma página.
- Botón para copiar el enlace oficial, para reenviarlo por WhatsApp.

### 2. Aviso dentro de la app para quien abre desde WhatsApp

Cuando alguien abre el enlace dentro de WhatsApp (donde la instalación no funciona), mostrar un aviso claro de "Abre esto en Chrome" con botón para copiar el enlace. Esto ya existe parcialmente; lo reviso y lo dejo imposible de pasar por alto.

### 3. Mensaje listo para el grupo de WhatsApp

Te dejo un texto corto en español, listo para copiar y pegar en el grupo de feedback, explicando a los estudiantes qué hacer: desinstalar la app vieja, abrir el enlace en Chrome e instalar desde ahí. También sirve como respuesta directa a Alexa.

## Lo que NO cambia

- Nada del contenido, historias, liga, progreso, límites ni cuentas.
- No se toca el diseño general de la app.
- No se agrega modo sin internet ni nada que pueda dejar pantallas en blanco.

## Nota sobre Google Play

Si más adelante quieres estar en la tienda de Google Play de verdad (no un archivo suelto), eso es un proyecto aparte: requiere cuenta de desarrollador, publicación y revisión. Se puede hacer después; esto de arriba resuelve el problema hoy mismo.

## Detalle técnico

- El bloqueo es `targetSdkVersion` obsoleto en un APK envuelto por terceros; no es reparable desde el código web.
- `public/manifest.json` ya está correcto (`display: standalone`, íconos 192/512 + maskable, `theme_color`, `start_url: /`); no se modifica, porque cambiar `start_url`/`id`/`scope` obligaría a reinstalar a quienes ya la tienen.
- Cambios acotados a `src/routes/install.tsx` (nueva sección de rescate + textos ES/EN) y, si hace falta, al aviso de navegador embebido que ya detecta `WhatsApp|Instagram|FBAN|...` en `detectEnv`.
- Sin service worker nuevo, sin `vite-plugin-pwa`.
