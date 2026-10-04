# Desarrollo y publicación

El portal genera HTML estático con Node.js 22 y Markdown. No necesita servidor de aplicación ni servicios externos para leer el contenido. Las dependencias están fijadas en `package-lock.json`.

## Vista local

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir <http://localhost:4321/anadromo_portal/>. En macOS/Linux usar `npm` en lugar de `npm.cmd`. El servidor también admite la raíz `/`.

Después de editar Markdown, estilos o scripts, reiniciar el servidor para regenerar. `npm.cmd run build` produce `dist/`; este directorio es generado y se vacía al compilar, por lo que no debe editarse directamente.

## GitHub Pages

1. Subir los cambios del portal, incluyendo `public/media/optimized/` y las vistas previas WebP de los PDF.
2. En el repositorio **MauriceCC/anadromo_portal**, abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. El workflow `.github/workflows/pages.yml` compila y publica al recibir un push en `main`. También puede ejecutarse desde Actions con **Run workflow**. En pull requests solo compila.
4. La dirección prevista, salvo dominio personalizado, es <https://mauricecc.github.io/anadromo_portal/>.

Los enlaces a estilos, scripts y medios son relativos; funcionan bajo la ruta del repositorio y en la raíz de un dominio. No se ha ejecutado una publicación desde el desarrollo local.

## Videos y Git LFS

Los originales de `public/media/videos/` superan en conjunto el tamaño permitido para una web en Pages y usan Git LFS. **No se copian a `dist/`**. El checkout del workflow usa `lfs: false`, de modo que no descarga esos originales.

Las copias de `public/media/optimized/` conservan la duración completa, utilizan H.264/AAC, un máximo de 640 × 480 y 24 fps. Cada archivo tiene un presupuesto aproximado de 70 MB; el video se solicita cuando se utiliza el reproductor (`preload="none"`). Esta compresión prioriza registrar la interacción sin cargar varios GB; los originales conservan la calidad fuente.

La excepción de `.gitattributes` hace que esas copias se versionen como archivos normales, sin LFS. Cada una debe estar por debajo de 90 MB. El build tiene además un presupuesto de 900 MB para todo el sitio.

Para regenerar después de agregar o cambiar originales:

```powershell
python -m pip install --target .cache/tools imageio-ffmpeg pymupdf Pillow
python scripts/prepare-media.py
npm.cmd run build
```

El script también genera la primera página de cada PDF como vista previa WebP. Conserva los archivos originales. Las herramientas Python son opcionales para mantenimiento de medios; no se requieren en Pages ni para compilar con las copias ya preparadas.

Agregar cada sesión o parte en `content/media.json`. Los títulos de las sesiones identifican los archivos aportados, sin atribuirles versiones del algoritmo ni hallazgos específicos que no estén documentados.

El gameplay general se publica por separado en «Cómo se juega». Para preparar su copia optimizada y las capturas de enemigos a partir de los originales locales de `resources/`, ejecutar `python scripts/prepare-resources.py` con Pillow e imageio-ffmpeg instalados. Los originales de `resources/` están ignorados por Git; versionar solo las copias de `public/media/game/` y `public/media/optimized/`. El gameplay no sustituye los registros de las pruebas con usuarios ni representa clips individuales de ataques.

## Capturas del juego

La portada usa una ilustración vectorial identificada como tal. Las capturas de enemigos se muestran en el bestiario. La galería de escenas no se muestra mientras no haya entradas en `gallery`.

1. Guardar capturas optimizadas en `public/media/game/`.
2. Agregar entradas en `gallery` dentro de `content/media.json`:

```json
{
  "src": "media/game/cueva-entrada.webp",
  "alt": "Descripción de lo que se ve en la captura",
  "caption": "Pie de foto y contexto de la escena"
}
```

3. Compilar. La galería aparecerá automáticamente.

## Contenido y accesibilidad

Los Markdown principales en `content/` alimentan la web durante el build. Mantener un título `#`, una introducción y los bloques `##` del esquema actual; la composición de cada sección está en `scripts/build.mjs`. Se conservaron los aportes previos a la edición en `docs/source-notes/`. Esa carpeta, las guías internas, `incoming/` y `gallery.md` no se publican.

Hay navegación por teclado, foco visible, menú móvil, respeto a movimiento reducido, acordeones nativos y controles de video. Quedan por aportar subtítulos o transcripciones revisadas de las grabaciones y las atribuciones específicas de assets. El contenido publicado corresponde a la descripción del equipo, sin métricas de pruebas inventadas.

## Verificación

```powershell
npx.cmd playwright install chromium
npm.cmd test
```

Las comprobaciones cubren carga bajo la subruta del repositorio, recursos, documentos PDF, videos con solicitudes parciales, selección de partes, filtros, spoilers y navegación móvil.

Referencias oficiales: [workflow de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
