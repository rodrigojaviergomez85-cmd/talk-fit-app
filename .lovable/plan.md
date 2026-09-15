# Sharks — Episodio 1 (piloto B2)

## Qué es
Primer episodio de la Temporada 8 (Sharks), Día 1. Retoma el gancho de Tigers: la empresa estadounidense acepta hablar y Vale entra a su primera negociación internacional en dólares. Sirve de piloto para el nuevo nivel B2; si te gusta, replicamos el formato en los días 2–20.

## Historia
- Vale recibe la llamada de Northline/US: quieren propuesta para tres sedes.
- Aparece el "tiburón": un ejecutivo duro (personaje nuevo, voz propia) que presiona precio y plazos.
- Dani y Camila la ayudan a preparar cifras; Mateo aporta la plataforma.
- Vale no baja el precio: defiende valor, no costo.
- Cliffhanger: el ejecutivo pide una segunda reunión... en Guatemala, en 5 días.

## Lo que sube de nivel (piloto B2)
- 4 turnos hablados: 2 guiados + 2 abiertos de opinión ("Should Vale lower her price? Say why.").
- Monólogo final de 45 segundos en vez del final de 15 s: el estudiante defiende una postura.
- Español bajo demanda: la traducción aparece solo si el estudiante la toca.
- Líneas más largas y naturales (12–20 palabras), audio a 1.0× con opción 1.25×.
- 25 palabras/expresiones nuevas (negociación: *deadline, margin, push back, meet halfway, walk away*), más 5 recicladas de Tigers.
- 3 preguntas calificadas (2 intentos + Skip, opciones aleatorizadas), al menos 1 usando vocabulario reciclado.
- Afirmaciones habladas de perseverancia + cliffhanger, igual que Eagles/Tigers.

## Gramática del día
Negociación y persuasión: condicionales para propuestas ("If you sign for three sites, I can…"), lenguaje de matiz (*would, might, I'd rather*), y conectores de argumentación (*however, that's why, on the other hand*). 6 usos de la estructura objetivo en el diálogo.

## Arte
Cover + 10 escenas (s1–s11), 768×768 JPG bajo 250 KB, sin texto accidental, continuidad con las referencias canónicas de Vale, Dani, Camila y Mateo; diseño canónico nuevo para el ejecutivo.

## Detalles técnicos
- Nuevo `StorybookSpeaker` para el ejecutivo con voz única, agregado al mapa de voces antes de escribir el guion.
- Episodio y Temporada 8 registrados en el servicio de storybook; ruta verificada HTTP 200.
- Glosario 100% con significados; palabras tappeables válidas.
- Candados de ruta oficial sin cambios (episodio actual + 3 anteriores).
- Test de consistencia del episodio (assets reales, voces, glosario, tamaños) + suite Storybook + TypeScript.
- El turno abierto y el monólogo de 45 s se califican por longitud/estructura, no por coincidencia exacta; reutilizan el flujo de grabación existente sin tocar el motor del reproductor.
