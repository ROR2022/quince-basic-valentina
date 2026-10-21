# Plan de implementación: paleta rosa para la invitación (testing something)

## 1. Objetivo y alcance

Rediseñar el sistema de color de la invitación para que el rosa sea el tono dominante en toda la experiencia, sin perder la legibilidad, el carácter elegante ni la ambientación mágica. La propuesta visual de referencia es [palette-proposal.md](./palette-proposal.md).

Este trabajo incluye:

- definir tokens reutilizables en CSS para la nueva paleta;
- sustituir el predominio actual de verde bosque y azul noche en fondos, superficies y efectos;
- actualizar los componentes para que usen esos tokens de forma consistente;
- revisar los colores codificados directamente en estilos, SVG y gradientes;
- ajustar la paleta de muestras de vestimenta y el color de la barra del navegador;
- validar contraste, compilación y presentación en móvil y escritorio.

No incluye, salvo decisión posterior, cambios de tipografía, contenido del evento, estructura de secciones, imágenes, animaciones, música ni comportamiento funcional.

## 2. Estado actual relevante

- [app/globals.css](./app/globals.css) define variables CSS, tokens de tema Tailwind y los colores semánticos de fondo, texto, superficies, bordes y foco.
- [app/layout.tsx](./app/layout.tsx) aplica el color de fondo global y define `viewport.themeColor` con el verde bosque actual.
- Los componentes de [components/invitation](./components/invitation) combinan clases de color (`forest`, `ivory`, `gold`, `quince-*`, etc.) con valores hex y RGBA directos.
- [components/invitation/enchanted-background.tsx](./components/invitation/enchanted-background.tsx) pinta un fondo global bosque-noche, árboles oscuros, niebla verde y luces rosas/doradas.
- [components/invitation/entry-portal.tsx](./components/invitation/entry-portal.tsx) tiene otro gradiente bosque-noche independiente.
- [components/invitation/premium-invitation.tsx](./components/invitation/premium-invitation.tsx) contiene una tarjeta con gradiente claro y varios colores directos que también habrá que coordinar.
- [components/invitation/dress-code.tsx](./components/invitation/dress-code.tsx) muestra `guestColorPalette`, importada desde [lib/config.ts](./lib/config.ts). Es una lista de sugerencias de vestimenta, no el sistema de colores del sitio.

Por tanto, cambiar únicamente las variables de `:root` no completaría el rediseño: los gradientes y valores directos seguirían conservando colores del tema anterior.

## 3. Dirección visual de implementación

### Recomendación inicial

Adoptar la dirección rosa romántica descrita en la propuesta y convertir la estética de “bosque encantado nocturno” en una ambientación mágica floral, cálida y rosada. La intención es que el rosa se perciba en fondos, luces, superficies y detalles, y no solo en el nombre de la quinceañera.

La implementación debe conservar:

- jerarquía de lectura y contraste suficiente para textos y controles;
- una sensación premium mediante champagne/dorado en acentos pequeños;
- profundidad visual mediante capas, transparencias y sombras, pero teñidas de rosa/mauve;
- la personalidad de la invitación y sus animaciones existentes siempre que no dependan visualmente del verde nocturno.

### Distribución orientativa

Usar el reparto de la propuesta como referencia visual, no como cálculo rígido por píxeles:

- 55% rosa, blush y petal;
- 20% lila, lavanda y mauve;
- 15% crema, beige y nude;
- 10% dorado y champagne.

### Distinción necesaria: tema visual y vestimenta

La invitación puede usar el rosa como identidad visual sin cambiar automáticamente la regla de vestimenta. Mientras `reservedColorMessage` indique que el rosa está reservado para Valentina, las muestras de colores recomendados a invitados deben seguir evitando tonos rosas. No mezclar `guestColorPalette` con los tokens decorativos del sitio.

## 4. Sistema de tokens propuesto

Usar nombres semánticos y estables en las utilidades Tailwind, con los valores de la propuesta centralizados en `:root`. Las clases actuales deberían migrar gradualmente hacia estos tokens, evitando volver a introducir hex dispersos.

| Rol | Token sugerido | Valor inicial | Aplicación prevista |
|---|---|---:|---|
| Fondo base | `cream` | `#FFF8F4` | Lienzo y zonas claras principales |
| Fondo rosa suave | `rose-petal` | `#F8D7E4` | Fondos alternos y capas extensas |
| Superficie blush | `rose-blush` | `#F5B7CC` | Tarjetas y contenedores destacados |
| Acento floral | `rose-vintage` | `#E89DB5` | Iconos, bordes y decoraciones |
| Acento principal | `rose-deep` | `#D67AA1` | Elementos interactivos, con texto oscuro si el contraste lo requiere |
| Rosa oscuro | `rose-dark` | `#A84E72` | CTA primario y énfasis de mayor contraste; tono profundizado para lograr contraste AA con texto crema |
| Tinta principal | `rose-ink` | `#5E2E40` | Texto principal sobre superficies claras |
| Tinta de énfasis | `rose-bordeaux` | `#7A3C52` | Encabezados y texto secundario |
| Texto cálido | `rose-brown` | `#6A4A4A` | Texto auxiliar sobre fondos claros |
| Fondo rosa muy claro | `rose-baby` | `#FDECF3` | Superficies suaves y fondos alternos |
| Lila claro | `lilac-powder` | `#EADAF5` | Brillos, fondos secundarios y velos |
| Lavanda | `lavender-soft` | `#D7C3E8` | Separadores y bordes secundarios |
| Mauve | `mauve` | `#B698C9` | Detalles e iconos secundarios |
| Beige nude | `beige-nude` | `#F2E5DD` | Superficies cálidas |
| Champagne | `champagne` | `#E9D7B8` | Detalles premium limitados |
| Dorado suave | `gold-soft` | `#D4AF7A` | Filetes, ornamentos y brillo |
| Gris lila | `grape-gray` | `#7F6779` | Texto auxiliar; verificar contraste antes de usar |

Además de los tokens de color, redefinir los tokens semánticos existentes (`background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input` y `ring`) para que las utilidades compartidas, especialmente los controles de [components/ui/button.tsx](./components/ui/button.tsx), sigan funcionando con el nuevo tema.

La tabla es la base de trabajo; no implica que todos los tonos deban usarse con la misma frecuencia. Los tonos claros no deben usarse como texto sobre fondos claros y los tonos intensos deben someterse a comprobación de contraste antes de asignarles texto blanco.

## 5. Pasos de implementación

### Fase 1: cerrar decisiones visuales antes de editar código

1. Confirmar si se adopta una apariencia mayormente clara (crema y rosa pastel) o si se conserva parte del fondo oscuro nocturno como contraste.
2. Acordar el CTA principal. Recomendación inicial: `rose-dark` (`#B95D82`) con texto crema, y hover `rose-bordeaux` (`#7A3C52`). Reservar `rose-deep` para superficies con texto oscuro si el contraste no permite texto claro.
3. Confirmar que el rosa sigue reservado para la quinceañera como color de vestimenta. La recomendación es conservar el mensaje y la paleta no rosada para invitados.
4. Acordar si la ambientación de árboles/luciérnagas se mantiene, se suaviza o se transforma en decoración floral. No sustituirla por completo sin validar el cambio de identidad visual.

### Fase 2: establecer los tokens globales

1. En [app/globals.css](./app/globals.css), añadir los tokens de la paleta aprobada en `:root`.
2. Exponerlos mediante `@theme inline` con nombres de utilidades coherentes.
3. Remapear los tokens semánticos de Tailwind al nuevo tema claro/rosa, incluyendo fondo, texto, superficies, controles, borde y foco.
4. Revisar el radio, las fuentes y otras reglas base solo para confirmar que no dependen de la paleta; mantenerlos sin cambios.
5. Mantener temporalmente los tokens antiguos únicamente si aún hay consumidores. Eliminarlos al final de la migración tras confirmar que ya no existen referencias.

### Fase 3: rediseñar el fondo ambiental y la entrada

1. Actualizar [components/invitation/enchanted-background.tsx](./components/invitation/enchanted-background.tsx):
   - convertir el gradiente bosque-noche a una base crema/blush o a la variante aprobada;
   - teñir rayos, niebla, viñeta, luna y partículas con la nueva paleta;
   - reemplazar siluetas verde-negras por tonos mauve/rosa oscuro, o ajustar/eliminar esas capas si reducen la legibilidad;
   - mantener las animaciones y el respeto por movimiento reducido.
2. Actualizar el gradiente, arco decorativo, botón y texto de [components/invitation/entry-portal.tsx](./components/invitation/entry-portal.tsx) para que la pantalla de entrada sea parte del mismo tema.
3. Cambiar los colores directos de [components/invitation/floating-fireflies.tsx](./components/invitation/floating-fireflies.tsx), [components/invitation/floating-blossoms.tsx](./components/invitation/floating-blossoms.tsx), [components/invitation/magical-butterflies.tsx](./components/invitation/magical-butterflies.tsx) y [components/invitation/envelope-rain.tsx](./components/invitation/envelope-rain.tsx) para evitar verdes residuales y usar tokens o una paleta decorativa centralizada compatible con SVG.

### Fase 4: migrar las secciones y los controles

Revisar las clases antiguas y valores directos en estos componentes, manteniendo estructura, contenido y comportamiento:

- [components/invitation/basic-hero.tsx](./components/invitation/basic-hero.tsx): retrato, nombre, ornamentos y texto introductorio.
- [components/invitation/basic-countdown.tsx](./components/invitation/basic-countdown.tsx): título, cifras, tarjetas y etiquetas.
- [components/invitation/premium-invitation.tsx](./components/invitation/premium-invitation.tsx): fondo impreso, tipografía, sello, ornamentos y sus colores hexadecimales directos.
- [components/invitation/basic-event-details.tsx](./components/invitation/basic-event-details.tsx): paneles, horarios, mapa, divisores e iconos.
- [components/invitation/dress-code.tsx](./components/invitation/dress-code.tsx): encabezados, aviso de color reservado y contraste de los nombres de muestra.
- [components/invitation/basic-attendance.tsx](./components/invitation/basic-attendance.tsx): campos, estados de foco, opciones seleccionadas, errores y botones.
- [components/invitation/basic-gift-options.tsx](./components/invitation/basic-gift-options.tsx): tarjeta, sobre ilustrado, iconos y textos.
- [components/invitation/basic-cta.tsx](./components/invitation/basic-cta.tsx): CTA, panel/modal, textos, estados de hover y elementos interactivos.
- [components/invitation/music-player.tsx](./components/invitation/music-player.tsx): botón fijo, fondo, borde y etiqueta.
- [components/invitation/footer.tsx](./components/invitation/footer.tsx): fondo, texto y ornamentos de cierre.
- [components/invitation/section-reveal.tsx](./components/invitation/section-reveal.tsx): comprobar si tiene estilos de color propios; cambiar solo si procede.
- [components/ui/button.tsx](./components/ui/button.tsx): comprobar que variantes y estados usan los tokens semánticos, sin introducir colores específicos del tema innecesarios.

Para cada componente, reemplazar las utilidades forestales/ivory/doradas que ya no correspondan por tokens semánticos de la nueva paleta. Los gradientes y estilos inline deben usar variables CSS, tokens Tailwind o variables de color documentadas, no valores antiguos duplicados.

### Fase 5: datos de vestimenta y tema del navegador

1. Revisar `guestColorPalette` en [lib/config.ts](./lib/config.ts): conservar la exclusión de rosa para las sugerencias de vestimenta, salvo instrucción explícita distinta. Ajustar muestras solo si la revisión visual revela colores que chocan con el nuevo tema.
2. Actualizar `viewport.themeColor` en [app/layout.tsx](./app/layout.tsx) para que coincida con el nuevo color dominante aprobado, previsiblemente `rose-dark` o `rose-blush` según el diseño final.
3. Confirmar que textos y mensajes no insinúan que los colores sugeridos para vestimenta son los colores de marca del sitio.

### Fase 6: limpieza y consistencia

1. Buscar en `app/` y `components/` referencias restantes a tokens forestales/nocturnos y a los hex/RGBA de la paleta anterior.
2. Distinguir referencias intencionales (por ejemplo, detalles visuales conservados) de residuos accidentales y documentar la razón de las primeras en el plan de trabajo/PR.
3. Eliminar tokens antiguos que hayan quedado sin consumidores y actualizar comentarios de CSS/componentes que describan la paleta bosque como tema principal.
4. Verificar estados normales, hover, foco, seleccionado, deshabilitado y mensajes de error.

## 6. Criterios de aceptación

- El rosa es visualmente dominante en la pantalla de entrada y a lo largo de todas las secciones, no solo en el nombre o en pequeños acentos.
- No quedan fondos, niebla ni superficies principales verde bosque/azul noche salvo que se aprueben expresamente como contraste intencional.
- Los elementos decorativos, fondos, textos, botones, tarjetas y formularios comparten una única escala de tokens, sin hex antiguos dispersos.
- Se conserva el mensaje de que el rosa está reservado para la quinceañera, y las sugerencias de vestimenta no lo contradicen.
- Los textos normales alcanzan contraste mínimo WCAG AA de 4.5:1; los textos grandes, 3:1. Los controles, bordes significativos y foco son distinguibles en sus estados.
- La invitación sigue siendo legible sobre fondos, imágenes, overlays y superficies translúcidas.
- Se conserva el contenido, navegación, interacciones, animaciones, cuenta regresiva, formulario de asistencia y reproducción de música.
- El diseño es usable en viewport móvil y escritorio, sin desbordamiento ni controles con contraste insuficiente.
- La compilación y el lint configurados por el proyecto terminan sin errores nuevos.

## 7. Validación prevista

1. Ejecutar `pnpm lint` después de la migración.
2. Ejecutar `pnpm build` para validar TypeScript, Tailwind y compilación de Next.js.
3. Abrir la página en móvil y escritorio y revisar visualmente, como mínimo:
   - portal de entrada;
   - hero y cuenta regresiva;
   - invitación premium;
   - detalles y dress code;
   - formulario de asistencia en estados normal, foco y error;
   - opciones de regalo, CTA/modal, reproductor y footer.
4. Medir contraste de cada par texto/fondo real, incluidas opacidades y gradientes. No asumir que un color pasa AA por su nombre o apariencia.
5. Comparar con el estado actual para detectar regresiones de legibilidad y confirmar que los elementos interactivos conservan affordance.

El repositorio no muestra una suite de pruebas específica para estos componentes en el inventario consultado; por eso la validación planificada prioriza lint, build y revisión visual/accesible, sin proponer instalar herramientas nuevas.

## 8. Archivos previstos

### Cambios principales

- `app/globals.css`
- `app/layout.tsx`
- `components/invitation/*.tsx` (componentes enumerados en la fase 4 y las piezas decorativas de la fase 3)
- `lib/config.ts` (solo si se ajusta la paleta de vestimenta)

### Sin cambios previstos

- `app/page.tsx`: el montaje de secciones y el comportamiento de la página no deberían necesitar cambios para actualizar el tema.
- `package.json` y `pnpm-lock.yaml`: no se prevén dependencias nuevas.
- Activos de `public/`: no se prevén sustituciones de imágenes ni música en esta etapa.

## 9. Decisiones confirmadas para esta implementación

- Fondo predominantemente claro, en crema y rosa pastel.
- Se conservan los árboles y las luciérnagas, teñidos en rosa y mauve.
- El CTA usa una variante más profunda de `rose-dark`: `#A84E72`. La propuesta original `#B95D82` no alcanza 4.5:1 con texto crema; `#A84E72` sí alcanza aproximadamente 5.0:1.
- El rosa sigue reservado para Valentina en el código de vestimenta; las sugerencias a invitados permanecen sin tonos rosas.
- Champagne/dorado suave permanece como acento decorativo, no como color de texto pequeño.
