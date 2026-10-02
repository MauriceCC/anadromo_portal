# Dirección visual marina

Estado: propuesta inicial basada en materiales consultados del repositorio de Unity. No es una paleta oficial aprobada.

## Referencias observadas

`PelagicWater.mat` declara `_Color: {r: 0.11764707, g: 0.44706756, b: 0.49019608, a: 1}` y `WaterMediterranean.mat` declara `{r: 0, g: 0.5882353, b: 0.67058825, a: 1}`. Como conversión numérica directa a RGB de 8 bits, dan aproximadamente `#1E727D` y `#0096AB`.

Son referencias de material: la iluminación, el shader, el espacio de color y el posprocesado pueden producir colores distintos en pantalla. No se ha comprobado que esos materiales pertenezcan al recorrido final del juego.

La captura `seabed-scene.png` muestra geometría del entorno en azul muy oscuro sobre un fondo gris; sirve de referencia técnica limitada, no como imagen de portada. Falta recibir capturas representativas de la introducción, la cueva y el río natal.

## Paleta propuesta para la web

| Color | Valor | Uso | Procedencia |
| --- | --- | --- | --- |
| Profundidad | `#061B26` | Fondo principal | Propuesta editorial |
| Agua oscura | `#103440` | Paneles y superficies | Propuesta editorial |
| Agua pelágica | `#1E727D` | Detalles y gradientes | Aproximación del material |
| Turquesa | `#0096AB` | Elementos decorativos | Aproximación del material |
| Espuma | `#EDF6F4` | Texto principal | Propuesta editorial |
| Bruma | `#B7CDCF` | Texto secundario | Propuesta editorial |
| Salmón | `#F49B83` | Acento puntual | Propuesta; no extraída del protagonista |

## Composición y movimiento

- Dar protagonismo a capturas reales, títulos amplios y una lectura cómoda del proceso de desarrollo.
- Sugerir el viaje desde aguas abiertas hacia la cueva y el río mediante transiciones de fondo discretas.
- Reservar el color salmón para acciones y detalles clave; evitar saturar todas las secciones.
- Combinar una tipografía expresiva en títulos con una de lectura clara en textos; selección pendiente.
- Usar movimiento suave y opcional; respetar `prefers-reduced-motion`, navegación por teclado y foco visible.
- Verificar contraste al implementar, especialmente sobre fotografías. No asumir que todo color de la paleta sirve para texto pequeño.
- Los videos tendrán controles y no reproducirán audio automáticamente.

Fuentes enlazadas en [references.md](references.md).
