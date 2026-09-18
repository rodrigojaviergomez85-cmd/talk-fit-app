# Corregir el pitido de AI Coach en vivo

## Objetivo
Eliminar el beep o chasquido molesto durante la conversación sin cambiar la voz de Vale, los controles, el límite de minutos ni el comportamiento de la sesión.

## Plan
1. **Reproducir y aislar el origen**
   - Probar una conversación real en móvil y registrar cuándo aparece el sonido: inicio, cambio entre fragmentos, pausa/reactivación o interrupción.
   - Distinguir si proviene de la reproducción de Vale o de la captura del micrófono.

2. **Corregir la continuidad del audio**
   - Ajustar la cola PCM de la voz para que los fragmentos se reproduzcan como un flujo continuo, sin cortes bruscos, huecos ni superposición.
   - Suavizar únicamente los bordes necesarios para evitar clicks/beeps, sin alterar el tono, la velocidad o la claridad de Vale.
   - Vaciar correctamente la cola cuando Gemini interrumpa una respuesta, al pausar o al terminar, evitando residuos de audio.

3. **Proteger la captura del micrófono**
   - Mantener cancelación de eco y supresión de ruido.
   - Confirmar que el nodo usado para capturar audio permanezca completamente silenciado en la salida y que pausar/reactivar no genere sonido audible.

4. **Verificación**
   - Añadir pruebas para la secuencia y limpieza de fragmentos de audio.
   - Ejecutar comprobación de tipos y las pruebas relacionadas con AI Coach.
   - Probar en viewport móvil una sesión real, incluyendo conversación, pausa/reactivación, ayudas y finalización.
   - Reportar si algún comportamiento específico del teléfono no puede verificarse desde el navegador de prueba.

## Alcance
Solo se modificará el audio de “Hablar en vivo”. No se cambiarán minutos, cuotas, textos, diseño, historial, otras voces ni otros episodios.
