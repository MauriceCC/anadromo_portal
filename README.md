# Anadromo · El instinto de volver

Portal del desarrollo de **Anadromo**, una experiencia marina de exploración y supervivencia en realidad virtual, creada en Unity para Oculus Quest 2.

La web reúne la historia, el proceso de ideación en Miro, bocetos y storyboard, las mecánicas, las decisiones de interacción y los videos de pruebas con usuarios.

## Ejecutar localmente

Requiere Node.js 22 o posterior.

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir <http://localhost:4321/anadromo_portal/>. En macOS/Linux, utilizar `npm` en lugar de `npm.cmd`. Reiniciar el servidor después de editar para regenerar la web.

## Compilar y comprobar

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd test
```

El resultado está en `dist/`. Es una web estática con Markdown, CSS y JavaScript; no necesita backend.

## Estructura

```text
content/                  Textos publicados y catálogo de medios
content/incoming/         Aportes pendientes de integrar (no publicados)
docs/                     Guías internas y referencias
  source-notes/           Copia de los aportes antes de la edición web
public/media/
  game/                   Capturas de enemigos y futuras escenas
  storyboard/             PDF originales y vistas previas WebP
  videos/                 Videos originales (excluidos del build)
  optimized/              Videos comprimidos y pósteres para la web
  subtitles/              Espacio para subtítulos
src/styles/site.css       Diseño visual y adaptación a móvil
src/site.js               Interacciones del navegador
scripts/                  Compilación, servidor local y preparación de medios
tests/                    Comprobaciones funcionales
.github/workflows/        Publicación en GitHub Pages
```

## Publicar en GitHub Pages

En **Settings → Pages**, seleccionar **GitHub Actions** como fuente. El workflow publica los cambios enviados a `main`. Dirección prevista: <https://mauricecc.github.io/anadromo_portal/>.

Consultar [la guía de desarrollo y publicación](docs/deployment.md) para configurar Pages, regenerar videos y agregar capturas. Las copias optimizadas deben incluirse en el commit; el workflow no descarga los originales de Git LFS.

## Editar contenido

Los textos de `content/` alimentan las secciones de la web. Los enlaces, las sesiones de video y las capturas se configuran en `content/media.json`. Las imágenes de enemigos se muestran en «Cómo se juega» y el gameplay completo aparece debajo del bestiario. La galería de escenas aparece al incorporar sus primeras imágenes; la portada actual es una ilustración vectorial, no una captura del juego.

- [Guía editorial](docs/content-guide.md)
- [Implementación](docs/implementation.md)
- [Dirección visual](docs/art-direction.md)
- [Referencias del proyecto](docs/references.md)
- [Repositorio del juego](https://github.com/lawryuke/anadromo)
