# Fuentes y materiales de referencia

Consulta inicial: 2026-10-02, rama `main`. Los enlaces a la rama pueden cambiar; antes de publicar evidencia técnica, fijar el commit correspondiente a la versión documentada.

| Fuente | Uso | Alcance |
| --- | --- | --- |
| [Repositorio de Unity](https://github.com/lawryuke/anadromo) | Contexto técnico | Listado de archivos y README consultados |
| [PelagicWater.mat](https://github.com/lawryuke/anadromo/blob/main/src/anadromo/Assets/Scenes/Locations/PelagicLocation/PelagicWater.mat) | Referencia de color del agua | Valor `_Color` consultado |
| [WaterMediterranean.mat](https://github.com/lawryuke/anadromo/blob/main/src/anadromo/Assets/Scenes/Locations/MediterraneanLocation/WaterMediterranean.mat) | Referencia turquesa | Valor `_Color` consultado |
| [seabed-scene.png](https://github.com/lawryuke/anadromo/blob/main/src/anadromo/Assets/Screenshots/seabed-scene.png) | Inspección visual del entorno | Vista técnica; no captura de portada |
| [Mapa de caverna](https://github.com/lawryuke/anadromo/blob/main/docs/cavern-map.jpg) | Posible material del proceso | Localizado en listado; contenido aún no revisado |
| Descripción del autor en esta conversación | Premisa e historia inicial | Confirmado por el autor; no validación del código |

## Por recibir

- Enlace al tablero de Miro y exportación legible: https://miro.com/app/board/uXjVHsf8r7k=/?share_link_id=317241796153
- Storyboard real, orden de viñetas y comentarios del autor. El story board esta en public/media/storyboard, y aqui tambien se encuentran otros bocetos importantes que sirvieron para la creacion del story board
- Lista de mecánicas implementadas, controles y evidencia por versión.
  Mecánicas: aleteo (los jugadores deben de mover sus manos simulando el nado para desplazarse), giros (los jugadores deben girar su cabeza hacia los lados para girar, pueden dirigir su aleteo), sacudida (cuando una lamprea se imprena en el jugador este debe de agitar las muñecas lo más rápido posible, para desprenderse de la lamprea) hambre (el aleteo y golpes de cualquier forma gasta la barra de hambre que vendria  a ser como nuestra barra de vida, mientras más baja este, mas gris se irá poniendo la pantalla), pirañas (al entrar en su rango irán a atacar , lampreas (al entrar en su rango, se acercarán y se impregnarán en el jugador, se detiene cualquier tipo de movimiento hasta que el jugador se sacuda lo suficientemente rápido para no morir), pez linterna (son peces ciegos, pero que pueden aun escuchar; si notan al jugador, apagarán su luz y se aproximarán hacia él, el jugador deberá de quedarse quieto para evitar ser atacado), bloop (criatura de tamaño colosal, si entra en contacto con el jugador, es muerte automática), tiburones-orcas (navegan con un recorrido en la cueva, el impacto es muerte instantánea para el jugador), krills (brillan de color naranja para señalar al jugador que pueden ser devorados), medusas (en todo el juego, aparecen para guiar al jugador por el camino adecuado o indicarle que se está retornando).
  Controles: Hay 2 controles, las manos que sirven para la sacudida y aleteo; y la cabeza, que sirve para girar y direcionar
  No hay evidencia por version.  
- Textos sobre decisiones de interacción y sus ejemplos concretos. Ya detallados en content/incoming/experience.md
- Capturas representativas y datos del equipo para créditos. Estaran en public/media/game
- Videos de pruebas, contexto, observaciones y cambios resultantes. Estaran en public/media/videos

Mantener autoría y atribuciones de los recursos utilizados. La presencia de un asset en Unity no confirma su uso en la versión final. Los assets fueron descargados de plataformas gratuitas
