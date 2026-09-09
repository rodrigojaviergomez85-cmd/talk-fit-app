# Aviso de versión de prueba + reporte de errores

## Qué verá el estudiante

En la pantalla de inicio, justo entre el botón "Mostrar a mi coach" y la tarjeta del hábito de 66 días, aparece un aviso con símbolo de advertencia, en el idioma de la app:

- Español: "⚠️ Esta app está en prueba y no es el producto final. Puede contener errores y gracias a ti la estamos mejorando. Toca aquí para reportar un problema."
- Inglés: la misma idea en inglés.

Todo el aviso es tocable (área mínima de 44 px) y lleva a una página nueva de reporte.

## Página de reporte (/report)

Formulario corto y móvil primero:

- ¿Qué pasó? (texto, obligatorio)
- ¿Dónde? (lista: Inicio, Práctica, Coach, Progreso, Grabaciones, Cuenta, Otro)
- ¿Qué esperabas? (texto, opcional)
- Correo de contacto (opcional; se rellena solo si la persona tiene sesión)

Al enviar: mensaje de agradecimiento y botón para volver al inicio. Se guarda automáticamente, sin que el usuario lo escriba: módulo/día actual si aplica, idioma, dispositivo/navegador, versión de la app y fecha.

Puede reportar cualquier persona, con o sin cuenta.

## Panel de administración (/admin/bug-reports)

Nueva página visible solo para administradores (misma protección que el reporte de almacenamiento: quien no es admin ve la página como inexistente). Muestra la lista de reportes más recientes con: fecha, texto, sección, módulo/día, dispositivo y correo si lo dejaron. Permite marcar cada reporte como Nuevo / Revisado / Resuelto y filtrar por ese estado.

## Detalles técnicos

- Migración: tabla `public.bug_reports` (id, created_at, user_id nullable, email, message, area, expected, context jsonb, status enum `new|reviewed|resolved`). GRANTs explícitos + RLS: INSERT permitido a `anon` y `authenticated`; SELECT/UPDATE solo para admins vía `has_role(auth.uid(),'admin')`; `service_role` con acceso completo.
- Envío mediante `createServerFn` (`src/lib/bug-reports.functions.ts`) con validación Zod, límite de longitud (máx. 2000 caracteres) y límite simple de frecuencia por usuario/IP para evitar spam.
- Lectura/actualización mediante server functions protegidas que reutilizan el patrón `assertAdmin` de `storage-report.functions.ts`.
- Rutas nuevas: `src/routes/report.tsx` y `src/routes/admin.bug-reports.tsx`, cada una con su propio `head()` (título y descripción propios; el panel admin con `noindex`).
- Textos nuevos en `src/i18n.tsx` (claves `report.*`), sin tocar claves existentes.
- El aviso se inserta en `src/routes/index.tsx` entre el enlace a `/coach-check` y `<HabitCard />`, usando tokens del diseño (sin colores fijos).
- Sin cambios en práctica, progreso, cuotas, IA ni grabaciones.

## Verificación

Typecheck, suite de pruebas y prueba en navegador: envío del formulario con y sin sesión, visibilidad del aviso en ambos idiomas, y acceso al panel solo como admin.
