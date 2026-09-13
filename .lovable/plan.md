# Audiolibros: temporadas plegables (menos scrolling)

Hoy la sección del mundo de Vale en Audiolibros muestra las 20 tarjetas de cada temporada una tras otra: muchísimo scroll. Lo convertimos en **2 tarjetas plegables** (Temporada 1 y Temporada 2), cada una con imagen y descripción breve.

## Cómo se verá

```text
┌─────────────────────────────────────┐
│ [img] TEMPORADA 1 · BÁSICO ZERO     │
│       El primer empleo de Vale      │
│       Vale llega a su primer…  20 ep│
│                                 (▾) │
├─────────────────────────────────────┤
│ [img] TEMPORADA 2 · BÁSICO 1        │
│       El reto de Vale · planes      │
│       y futuro…                20 ep│
│                                 (▾) │
└─────────────────────────────────────┘
```

- Cada tarjeta: imagen representativa (portada del episodio 1 de la temporada), título, descripción breve de 1 línea, número de episodios y flecha.
- Al tocarla se despliega la lista de episodios (la misma que existe hoy: desbloqueados con portada, bloqueados con candado). Nada cambia en reglas de desbloqueo ni en los episodios.
- Se abre por defecto **solo la temporada donde va el estudiante** (la que tiene su día actual desbloqueado y sin terminar). La otra queda plegada. Para tu cuenta (acceso ilimitado) se abre la Temporada 2, la más reciente.
- Las secciones de abajo (Nivel básico / intermedio / avanzado) ya son plegables y no se tocan.

## Detalles técnicos

- `src/services/storybook/seasons.ts`: agregar `blurb` (es/en) a cada temporada y una imagen representativa (reusar portada del episodio 1, ya comprimida).
- `src/routes/natural-method.audiobooks.tsx`: convertir `SeasonMap` en tarjetas plegables con `aria-expanded`, estilo consistente con `LevelSection`; dentro se renderiza la lista de episodios actual sin cambios.
- Temporada por defecto abierta: la del módulo activo del estudiante (`JourneyService` + `unlockedDay`); si terminó la 1, se abre la 2.
- Verificación: TypeScript, pruebas de storybook, y Playwright móvil (394px) confirmando que cabe sin scroll excesivo y que al desplegar se ven los episodios.
