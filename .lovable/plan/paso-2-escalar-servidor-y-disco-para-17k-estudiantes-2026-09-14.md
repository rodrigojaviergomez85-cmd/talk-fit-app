# Paso 2: Escalar servidor y disco para 17k estudiantes

## Objetivo
Preparar el backend para una carga mucho mayor antes de lanzar a 17,000 estudiantes, mejorando capacidad de cómputo y espacio de almacenamiento.

## Qué se va a hacer

1. Abrir el selector de tamaño de servidor de Lovable Cloud para mostrar el precio exacto en créditos y que elijas entre Large o XL.
   - XL es la opción más segura para 17k usuarios con picos de uso entre 6 y 8pm.
   - Los costos se muestran en créditos antes de confirmar.
2. Abrir el selector de disco para aumentar a 200–500 GB.
   - Recomendación: 500 GB para crecer sin preocuparse por grabaciones de audio y TTS cache en los próximos meses.
3. Aplicar los cambios y verificar que la base de datos se reinicie con el nuevo tamaño.
4. Correr `db_health` para confirmar que la instancia respondió con recursos ampliados.

## Decisiones que necesitas tomar

- Tamaño de servidor: **Large** (más barato, riesgo en picos) o **XL** (recomendado para 17k).
- Tamaño de disco: **200 GB** o **500 GB**.

## Cómo se cobra

- Lovable Cloud consume créditos del saldo del workspace; no es un cargo automático en tarjeta.
- El costo mensual depende del tamaño elegido y del tráfico real (consultas, grabaciones, TTS, AI).
- Hoy Tiny gasta ~0.6 créditos/día en Cloud. XL costará varias veces eso. Con 745 créditos restantes en este ciclo, lo más probable es que necesites un top-up mensual para sostener 17k estudiantes.
- El selector muestra el precio exacto en créditos antes de aplicar.

## Cómo se verificará

- `db_health` reportará el nuevo tamaño de instancia y espacio libre.
- No se tocará código de la app en este paso.
- Si el crédito disponible no alcanza, se detendrá y se explicará opciones.

## Nota

Paso 1 (límites y ventana de episodios de Vale) ya está aplicado. Paso 2 es solo infraestructura.