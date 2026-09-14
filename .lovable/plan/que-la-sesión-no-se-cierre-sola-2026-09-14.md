# Que la sesión no se cierre sola

Objetivo: una vez que el estudiante entra, sigue dentro aunque pasen horas, cierre la app, se quede sin señal un momento o vuelva al día siguiente.

## Qué encontré

La app sí guarda la sesión en el teléfono y sí la renueva sola. El problema está en cómo reacciona cuando la renovación o una consulta falla por un instante:

- Al abrir la app se pregunta al servidor "¿quién es este usuario?". Si en ese momento no hay internet o el servidor tarda, la respuesta viene vacía y la app asume que nadie inició sesión, aunque la sesión guardada siga siendo válida. Resultado: pantalla de inicio de sesión.
- Cuando el teléfono deja la app en segundo plano por una o dos horas, el permiso temporal de acceso caduca. Al volver, la app no intenta renovarlo primero: consulta directo, falla y saca al usuario.
- Si la renovación falla una sola vez (señal intermitente), se toma como "cerró sesión" y se borra la sesión guardada, así que ya no hay vuelta atrás.

## Qué voy a cambiar

1. Al abrir la app, leer primero la sesión guardada en el teléfono y mostrar al usuario dentro de inmediato; la verificación con el servidor pasa a segundo plano.
2. Si esa verificación falla por red (sin internet, tiempo agotado, error del servidor), no cerrar sesión: mantener al usuario dentro y reintentar.
3. Cerrar sesión solo cuando el servidor diga explícitamente que la sesión ya no es válida, o cuando el usuario toque "Cerrar sesión".
4. Al volver a la app (regresar de segundo plano o recuperar conexión), renovar el acceso antes de pedir datos, con reintentos cortos.
5. Revisar la configuración de duración de sesión en el panel para que el tiempo de permanencia sea largo y la renovación tolere reintentos.
6. Aviso suave y bilingüe solo en el caso real de expiración ("Tu sesión expiró, vuelve a entrar"), en lugar de mandar al login sin explicación.

## Detalles técnicos

- `src/lib/auth.tsx`: sustituir el `getUser()` de arranque por `getSession()` para hidratar el usuario; validar con `getUser()` después y distinguir error de red (`AuthRetryableFetchError`, fallo de fetch) de error de sesión inválida. Nunca poner `user = null` por error de red.
- En `onAuthStateChange`, limpiar cachés solo en `SIGNED_OUT` real; ignorar `INITIAL_SESSION` sin sesión cuando ya hay sesión hidratada localmente.
- Añadir un pequeño "session keeper": en `visibilitychange`/`online`, si el token está por vencer o vencido, llamar `supabase.auth.refreshSession()` con reintento antes de que cualquier consulta dispare un 401.
- Revisar los `getSession()` sueltos en rutas (`practice.tsx`, `ai-coach.tsx`, `StorybookPlayer`, entrevistas) para que, si no hay token, primero intenten refrescar en vez de fallar silenciosamente.
- Ajustar en el backend: expiración de token de acceso y duración de sesión/refresh token amplias, sin caducidad inactiva corta.
- Pruebas: cobertura en Vitest para "error de red no desloguea", "sesión inválida sí desloguea" y "refresco al volver del segundo plano".

Sin cambios en el contenido, las historias, los límites diarios ni el diseño.
