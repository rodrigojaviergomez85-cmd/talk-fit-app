# Avatar 2D con habla natural

## Problema confirmado
Los dos cuadros actuales no son el mismo retrato: cambian el rostro, cabello, hombros y encuadre en más de la mitad de la imagen. Alternarlos según el volumen produce un salto visual, aunque la medición del audio funcione correctamente.

## Implementación
1. Sustituir el intercambio de retratos completos por un avatar 2D en capas:
   - un único retrato base estable;
   - boca separada y perfectamente alineada;
   - varias formas de boca, no solo abierta/cerrada;
   - parpadeo y respiración muy sutiles sin mover el encuadre.
2. Mantener la boca sincronizada con el audio real del coach:
   - suavizar la señal de volumen;
   - combinar volumen, ritmo y pausas para escoger las formas de boca;
   - cerrar gradualmente durante silencios;
   - evitar cambios demasiado rápidos y repetitivos.
3. Precargar todas las capas antes de iniciar la conversación para evitar parpadeos o cuadros en blanco en iPhone.
4. Conservar los estados actuales: esperando, escuchando, pensando y hablando; solo se reemplazará la animación visual del habla.
5. Respetar “reducir movimiento” y mantener los recursos livianos para móvil.

## Verificación
- Probar una respuesta completa y confirmar que cabeza, cabello y cuerpo permanezcan inmóviles mientras habla.
- Confirmar que la boca siga frases rápidas, lentas y pausas sin verse cortada.
- Revisar Safari móvil, rendimiento, carga inicial y cierre de audio.
- Confirmar que conversación, correcciones y límites diarios no cambien.
