# Arreglar la pantalla de inicio en blanco

## Qué está pasando

La pantalla de inicio carga el esqueleto gris y nunca muestra el contenido. La app entera se queda sin activarse en el navegador (esto también afecta a otras pantallas como Progreso).

Causa confirmada en el navegador de prueba: el aviso opcional de "ponle cara a tu perfil" que agregamos en el inicio llama a una función del servidor (`markAvatarPromptSeen`) que el servidor ya no está entregando al navegador. El navegador reporta:

```text
SyntaxError: The requested module '/src/lib/profile.functions.ts'
does not provide an export named 'markAvatarPromptSeen'
```

Al fallar ese módulo, React no puede montar la app y queda la pantalla vacía.

## Plan

1. Reiniciar el servidor de desarrollo para descartar una versión vieja en caché y volver a comprobar si la función se entrega correctamente.
2. Si sigue faltando (causa real en el código): dejar de importar esa función suelta desde el inicio y marcar el "aviso ya visto" a través de la función de perfil que sí funciona (`updateMyProfile`, ampliada con una bandera `promptSeen`), eliminando la función huérfana.
3. Hacer el aviso a prueba de fallos: si la llamada al perfil falla, el aviso simplemente no se muestra y el inicio sigue cargando normal (nunca debe poder tumbar la pantalla).
4. Verificar en el navegador: inicio con sesión iniciada muestra saludo, tarjeta del día, semana y menú; sin errores en consola; también revisar Progreso y Liga.
5. Correr las pruebas de perfil/liga y el chequeo de tipos.

## Detalles técnicos

- Archivos: `src/components/fluency/AvatarPrompt.tsx`, `src/lib/profile.functions.ts`, `src/routes/index.tsx`.
- Sin cambios de base de datos: `avatar_prompt_seen_at` ya existe y se sigue usando.
- No se toca el diseño ni el resto de funciones del inicio.
