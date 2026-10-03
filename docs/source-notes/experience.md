# Diseñar la experiencia

Estado: pendiente de textos y ejemplos concretos del autor.

Esta sección explicará cómo las decisiones del juego ayudan a comprender qué hacer, reconocer lo que ocurre y aprender durante el recorrido. El tono público será cercano y centrado en la experiencia del jugador.

Para el desarrollo, las decisiones siempre las tomábamos en conjunto, trabajando por Miro, Meets y Projects, aparte de las sesiones en la universidad. Establecimos por conveniente, recortar todo lo que se tenía planeado, ya que íbamos a realizar un proyecto mucho más largo. 

Establecimos crear 2 escenarios; el primero como primera experiencia y aclimatación al entorno virtual, y el segundo como ya dentro de la cueva, con enemigos peligrosos. Esta convención se realizó para que el usuario aprenda la mecánica de nado y la de comer, establecimos que la barra de "salud" del jugador es una barra de hambre, que si está baja, entonces la visión se comienza a tornar de un torno grisáceo y para revertirla, lógicamente, hay que comer krills. Para el segundo escenario, lo configuramos con una complejidad moderada para que la experiencia sea desafiante al usuario mas no imposible, ya que mediante ensayos de prueba y error se pueden aprender las mecánicas de todos los enemigos añadidos. 

Esta experiencia fue bastante desafiante, nosotros pensábamos que estábamos realizando un buen desarrollo para el usuario, pensamos que lo abarcamos todo, pero llegada la hora de probar con usuarios reales, aprendimos que siempre hay detalles que mejorar y pulir. El mayor ejemplo claro de esto vino cuando se trató de desarrollar la mecánica de movimiento, empleada mediante un aleteo con las manos. 

La primera versión del movimiento fue mediante los mandos de los Oculus Quest 2, luego evolucionó a un gesto muy difícil de replicar par anuestros usuarios ya con las cámaras incorporadas en los Oculus. Tras este inconveniente, nos dimos cuenta que a lo mejor, la solución era mediante una cámara externa, lo cual en su momento trajo consigo una mejora en el movimiento de los usuarios, aunque todavía no estaba pulido, a veces hacían gestos de aleteo y no avanzaban. Seguidamente, identificamos que depender de una cámara externa para captar movimiento con Python a veces no captaba los movimientos de los usuarios, sobre todo si es que llevaban casacas o poleras, razón por la cual decidimos nuevamente retornar a las cámaras de los Oculus, con la diferencia que, en esta ocasión, mejoramos el algoritmo y finalmente pudimos crear un algoritmo que permitiera el nado libremente. Lo que es más, en el trayecto nos dimos cuenta que era más cómodo para los usuarios el sentarlos para evitar que estén girando sobre su eje constantemente.

Otra experiencia intersante fue nuestra zona inicial. Aquí agregamos medusas para que cuando el jugador llegase, se sintiera atraído por la luz que emitían estas y las siguiera, llegando a la siguiente zona; pero notamos que nuestros usuarios tenían problemas para ubicarse. Incluso, una usuario nadó y nadó hacia el infinito del mapa. Fue justamente esta usuario que nos hizo plantear la idea de establecer límites en la zona inicial para evitar este inconveniente.

Por otro lado, notamos que muchas personas en general no conocen la carrera del salmón, por lo que vimos por comveniente agregar escenas de introducción y final.

Entre otras cosas, fue divertido agregar a los enemigos y todas sus mecánicas, investigamos sobre qué especies podrían depredar al salmón y aunque no nos basamos 100 % en la biología marina, tratamos de incorporar a 3 tipos de enemigos diferentes: Pirañas (al notar al usuario se dirigen hacia él), lampreas (se impregnan en el usuario), peces linterna (son ciegos, pero si pasas cerca, te pueden escuchar) y tiburones / orcas (nadan libremente, un golpe ya es muerte instantánea).

## Registro interno de decisiones

| Situación del jugador | Decisión implementada | Principio relacionado | Evidencia |
| --- | --- | --- | --- | --- |
| Camino / ubicación | Medusas que emiten luz de guía | Visibilidad | Captura public/media/ |
| Enemigos | Todos los enemigos son depredadores | Visibilidad | Captura public/media/ |
| Krills | Fuente de alimentación | Visibilidad | Captura public/media/ |
| Comer | sonido de frituras + reestablecimiento de vista | Feedback | Captura public/media/ |
| Sacudida (para lampreas) | sonido de corazón + vista de lamprea impregnada | Feedback | Captura public/media/ |
| Daño | vista se torna gris | Feedback | Captura public/media/ |
| Aleteo | desplazamiento | Feedback + affordance | Captura public/media/ |
| Sacudida | desprenderse de lamprea | Affordance | Captura public/media/ |
| Ser presa | depredadores le causan daño al jugador | Affordance | Captura public/media/ |
| Barra de hambre | los krills forman parte de la dieta de los salmones | Affordance | Captura public/media/ |
| Movimientos | giros y aleteo te mueven por el mundo | Mapeamiento | Captura public/media/ |
| Huida del mapa | se devuelve automáticamente al jugador | Constraints | Captura public/media/ |
| Colisiones | no se puede atraversar estructuras físicas | Constraints | Captura public/media/ |
| Velocidad de aleteo | hay límite de velocidad | Constraints | Captura public/media/ |
| Cantidad comida de krills | Hay límite en la barra de hambre | Constraints | Captura public/media/ |
etc...

Posibles categorías para analizar, sin afirmar que ya estén implementadas: retroalimentación, consistencia de controles, claridad de objetivos, reconocimiento de señales y recuperación ante errores.

Al recibir un texto sobre principios, vincularlo a una mecánica o momento real. Publicar la explicación de esa decisión y, si es útil, una nota breve con el principio asociado. Seguir [la guía editorial](../docs/content-guide.md).
