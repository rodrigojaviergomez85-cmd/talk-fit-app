# Coach en vivo: botón discreto y correcciones habladas

## 1. Botón de terminar más suave

Hoy el botón es rojo sólido y parece un botón de emergencia.

- Cambiarlo a un botón discreto: fondo transparente, borde gris suave y texto gris.
- Mantener el mismo tamaño táctil y el texto "Terminar" / "End".

## 2. Temporizador más discreto

- Quitar el tiempo grande junto al estado ("Te escucha · 4:14").
- Dejar solo el estado ("Te escucha" / "Tu coach está hablando").
- Mostrar el tiempo en letra pequeña y gris claro debajo del botón, sin alarma.
- Cuando falte poco (último minuto) sí se resalta, para avisar.

## 3. La coach deja terminar, corrige y hace repetir

Ajustar las instrucciones de la coach para que:

- Nunca interrumpa: espera a que el estudiante termine su idea completa.
- Si hubo un error real, repita la frase corregida de forma clara y corta.
- Pida al estudiante que la repita ("Say it with me: ...").
- Confirme brevemente ("Perfect") y siga la conversación con la siguiente pregunta.
- Si no hubo error, siga normal sin corregir nada.
- Máximo una corrección por turno, para que la charla siga fluyendo.

## Detalles técnicos

- Archivo: `src/components/fluency/LiveCoach.tsx`.
- Botón: reemplazar `bg-destructive` por `border border-border bg-transparent text-muted-foreground`.
- Estado/tiempo: separar `mmss(remaining)` del texto de estado en un `<p>` propio con `text-[11px] text-muted-foreground`, resaltado solo si `remaining <= 60`.
- Prompt: actualizar `SYSTEM_INSTRUCTION` (bloque de corrección) con el ciclo escuchar → corregir → repetir → continuar; sin tocar Gemini Live, límites, avatar ni el resumen final.
- Verificación: `bunx tsgo --noEmit` y revisión visual en móvil.
