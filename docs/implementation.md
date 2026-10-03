# Organización de la implementación

- `scripts/build.mjs`: carga una lista explícita de Markdown, compone el HTML y copia solo medios públicos referenciados. No publica archivos internos ni videos originales.
- `src/styles/site.css`: diseño adaptable, paleta marina y movimiento opcional.
- `src/site.js`: navegación móvil, selección de partes de video, filtros y sección activa.
- `scripts/serve.mjs`: servidor de desarrollo con soporte de rangos para video.
- `scripts/prepare-media.py`: copias optimizadas y vistas previas.
- `content/media.json`: enlaces del proyecto, sesiones de video y futura galería.
- `.github/workflows/pages.yml`: compilación y despliegue a Pages.
- `tests/site.spec.js`: comprobaciones funcionales con Chromium.

La web no requiere un framework de interfaz: el contenido se genera en HTML y las interacciones usan JavaScript nativo. Los Markdown son contenido de confianza editado en el repositorio, no entradas públicas de usuarios.

Las carpetas vacías `src/components/`, `src/layouts/` y `src/pages/` se conservaron de la estructura inicial para una futura separación si crece el portal; la implementación actual está documentada arriba.
