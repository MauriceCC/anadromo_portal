# Medios para publicación

Todo archivo de esta carpeta debe estar preparado para ser público.

| Carpeta | Contenido |
| --- | --- |
| `game/` | Capturas reales optimizadas |
| `ideation/` | Exportaciones legibles del Miro |
| `storyboard/` | Viñetas ordenadas |
| `videos/` | Clips breves optimizados y pósteres |
| `subtitles/` | Subtítulos `.vtt` |

Usar nombres descriptivos en minúsculas, sin espacios ni tildes: `cueva-entrada-01.webp`, `prueba-01-poster.webp`, `prueba-01-es.vtt`.

Para imágenes, preferir WebP o AVIF cuando convenga, conservando legibilidad; PNG es útil para diagramas. Documentar descripción, crédito y versión del juego en el Markdown correspondiente.

Para videos largos, preferir alojamiento externo y registrar la URL en la ficha de prueba. Para clips locales, usar MP4 o WebM compatibles con la web. Evitar subir grabaciones originales pesadas a Git. Los originales privados pueden mantenerse en `local-only/`, carpeta ignorada, o fuera del repositorio.

Antes de incorporar pruebas con personas, confirmar que el material puede difundirse y retirar datos personales innecesarios. Añadir controles de reproducción, póster y subtítulos o transcripción al implementar.
