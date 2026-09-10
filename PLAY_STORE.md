# Publicar Fluency Reps en Google Play (opción 1: PWA con TWA)

La app ya cumple los requisitos de instalación: manifest, íconos 192/512 + maskable,
nombre, color de tema y modo pantalla completa (`standalone`).

## Pasos

1. **Publica la app y conecta tu dominio propio.**
   Google Play exige un dominio que sea tuyo (ej. `app.fluencyreps.com`).
   Un dominio `*.lovable.app` no sirve para verificar la propiedad.

2. **Crea la cuenta de desarrollador de Google Play** (pago único de 25 USD)
   en https://play.google.com/console

3. **Genera el paquete Android** con Bubblewrap (en tu computadora, requiere Node y Java):

   ```bash
   npm i -g @bubblewrap/cli
   bubblewrap init --manifest https://TU-DOMINIO/manifest.json
   bubblewrap build
   ```

   Esto crea `app-release-bundle.aab` (lo que subes a Play) y una llave de firma
   (`android.keystore`). **Guarda esa llave y su contraseña**: sin ella no podrás
   volver a actualizar la app.

   Alternativa sin línea de comandos: https://www.pwabuilder.com — pegas la URL y
   te descarga el paquete Android.

4. **Verifica el dominio (Digital Asset Links).**
   Bubblewrap/PWABuilder te dan un archivo `assetlinks.json` con la huella SHA-256
   de tu llave. Pásamelo y yo lo publico en `/.well-known/assetlinks.json`.
   Sin este paso la app abre con barra de navegador visible.

5. **Sube el `.aab` a Play Console**, completa ficha (ícono 512, gráfico 1024x500,
   mínimo 2 capturas de pantalla), política de privacidad pública y el cuestionario
   de contenido. Revisión típica: 1–7 días.

## Notas

- Como la app graba audio, en la ficha debes declarar el uso del micrófono y tener
  una política de privacidad accesible por URL.
- Cada cambio que publiques en la web aparece de inmediato dentro de la app de Play;
  solo subes un nuevo `.aab` si cambias ícono, nombre o versión del contenedor.
