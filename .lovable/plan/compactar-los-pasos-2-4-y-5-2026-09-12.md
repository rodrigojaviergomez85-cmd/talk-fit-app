# Compactar los Pasos 2, 4 y 5

## Recomendación
Sí conviene. En móvil las imágenes de esos pasos repiten contexto y alargan el recorrido antes de escuchar o grabar. La única excepción será **Present Progressive**, donde la escena sí es necesaria para describir qué está ocurriendo.

## Cambios
- Ocultar imágenes, secuencias visuales y tarjetas ilustradas en los Pasos 2, 4 y 5 de los módulos normales.
- Mantener esas imágenes cuando la lección enseñe **Present Progressive**.
- Aplicar la misma regla dentro de **Review**, identificando específicamente `review-present-progressive`.
- Mantener intactas las imágenes de los Pasos 0/Intro, 1 y 3.
- No cambiar textos, audio, velocidades, grabaciones, correcciones, navegación, progreso, cuotas ni desbloqueos.

## Detalles técnicos
- Centralizar una condición explícita para decidir si la imagen es pedagógicamente esencial, reutilizando la identificación de contenido progresivo ya existente.
- Pasar esa decisión a los componentes compartidos de los Pasos 2, 4 y 5 para evitar que una imagen reaparezca desde otro bloque de apoyo.
- En Review, impedir también la imagen exterior que actualmente aparece desde el Paso 2 en adelante, salvo en Present Progressive.

## Validación
- Comprobar en móvil un módulo común: sin imágenes en Pasos 2, 4 y 5.
- Comprobar Present Progressive: imágenes visibles en Pasos 2, 4 y 5.
- Comprobar el mismo comportamiento en Review.
- Confirmar que escuchar, velocidades, selección de palabras, grabar, avanzar y finalizar siguen funcionando.
- Ejecutar las verificaciones de tipos y pruebas relacionadas con práctica y Review.
