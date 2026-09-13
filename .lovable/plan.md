# Plan: indicar PASO 1 y PASO 2 en las burbujas del hub del día

## Objetivo
En la pantalla `/day/basic-zero/1` (hub de elección del día), agregar una leyenda gris pequeña arriba de cada burbuja para que el estudiante vea el orden de los pasos:
- Burbuja de Vale (recomendado): **PASO 1**
- Burbuja de audios obligatorios: **PASO 2**

## Cambios propuestos

### 1. Claves de traducción
En `src/lib/i18n.tsx` agregar dos entradas bilingües:
- `day.step1Label`: ["PASO 1", "STEP 1"]
- `day.step2Label`: ["PASO 2", "STEP 2"]

### 2. UI en el hub del día
En `src/routes/day.$moduleId.$day.tsx`:
- Antes del `Link` de la burbuja de Vale, renderizar `<span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("day.step1Label")}</span>`.
- Antes del `Link` de la burbuja de audios, renderizar `<span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("day.step2Label")}</span>`.
- Mantener la estructura, colores y comportamiento actuales; solo se añade la etiqueta.

## Criterios de aceptación
- En móvil, justo arriba de cada burbuja se lee "PASO 1" y "PASO 2" en letra gris, más pequeña que el resto del texto de la burbuja.
- El diseño no se desborda ni empuja el botón fuera de la pantalla.
- Al cambiar el idioma de la app, las etiquetas cambian a "STEP 1" / "STEP 2".

## Archivos a modificar
- `src/lib/i18n.tsx`
- `src/routes/day.$moduleId.$day.tsx`
