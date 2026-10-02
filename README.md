# Anadromo · Portal del proyecto

Web de presentación y documentación del desarrollo de **Anadromo**, un videojuego en Unity sobre el retorno de un salmón a su río natal.

Esta primera etapa establece la organización del contenido y las referencias visuales. Todavía no hay una aplicación ejecutable ni un framework seleccionado.

## Estructura

```text
content/                Textos destinados a la web, en Markdown
  incoming/             Textos nuevos pendientes de integrar
docs/                   Guías internas de contenido, diseño y fuentes
  templates/            Plantillas para mecánicas y pruebas
public/media/           Material preparado para publicar
  game/                 Capturas del juego
  ideation/             Exportaciones del Miro
  storyboard/           Viñetas del storyboard
  videos/               Clips optimizados y pósteres
  subtitles/            Subtítulos WebVTT
src/                    Reserva para la implementación de la web
  components/           Componentes de interfaz
  layouts/              Estructuras de página
  pages/                Páginas y rutas
  styles/               Estilos y variables visuales
```

## Por dónde comenzar

1. Consultar [el mapa de la web](docs/site-map.md).
2. Completar los textos de `content/` siguiendo [la guía editorial](docs/content-guide.md).
3. Incorporar imágenes y videos según [la guía de medios](public/media/README.md).
4. Usar [la dirección visual](docs/art-direction.md) al implementar la interfaz.

Puedes entregar un texto libre: se conservará su sentido y se integrará en la sección correspondiente. Las afirmaciones sobre mecánicas y principios de interacción deben distinguir entre lo confirmado, lo propuesto y lo pendiente de verificar.

Repositorio del juego: <https://github.com/lawryuke/anadromo>. Fuentes consultadas y pendientes: [referencias](docs/references.md).
