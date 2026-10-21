# Propuesta de redefinición de paleta de colores

## Objetivo
Aumentar drásticamente el tono rosa en la invitación, manteniendo una estética elegante, romántica, delicada y premium. La propuesta prioriza un look floral y sofisticado, con rosa como color dominante, pero sin perder legibilidad ni contraste visual.

La idea es pasar de una paleta predominantemente forestal (verde/ivory/dorado) a una invitación más emocional, femenina y cálida, con rosa como eje visual principal, apoyado por tonos lavanda, crema, nude y un pequeño toque dorado para brillo y elegancia.

## Dirección visual
La invitación debería sentirse así:
- romántica y delicada
- elegante y moderna
- floral / de boutique
- premium, pero cálida y accesible
- con la quinceañera como centro visual

## Paleta propuesta

### 1) Base principal
Estos colores serán los que más se usen en fondos, secciones, sobreimpresiones y decoraciones grandes.

- Rosa petal: `#F8D7E4`  
  Uso: fondos suaves, áreas grandes, capas de profundidad.

- Rosa blush: `#F5B7CC`  
  Uso: fondos de tarjetas, contenedores, banners, botones secundarios.

- Rosa vintage: `#E89DB5`  
  Uso: resaltar títulos, badges, iconos, detalles de énfasis.

- Rosa deep: `#D67AA1`  
  Uso: botones principales, texto destacado, bordes de alta prioridad.

- Rosa oscuro: `#B95D82`  
  Uso: textos sobre fondos claros, cabeceras, acentos fuertes.

  Para el CTA con texto crema se recomienda profundizar este tono a `#A84E72`: el valor original `#B95D82` no alcanza el contraste WCAG AA de 4.5:1 con texto crema, mientras que `#A84E72` logra aproximadamente 5.0:1.

### 2) Acentos florales y secundarios
Estos tonos darán profundidad sin saturar demasiado la composición.

- Lila polvo: `#EADAF5`  
  Uso: fondos suaves, vidrio, capas suaves, micro detalles.

- Lavanda suave: `#D7C3E8`  
  Uso: separadores, contornos suaves, bloques secundarios.

- Mauve: `#B698C9`  
  Uso: textos secundarios, iconos, elementos decorativos.

- Rosa bebé: `#FDECF3`  
  Uso: fondo muy claro para legibilidad y contraste limpio.

### 3) Neutros para equilibrio y lectura
Mantener estos tonos para que la invitación no se sienta excesivamente saturada.

- Crema: `#FFF8F4`  
  Uso: fondo base general o texto sobre fondos oscuros.

- Beige nude: `#F2E5DD`  
  Uso: tarjetas, paneles, acentos decorativos.

- Champagne: `#E9D7B8`  
  Uso: dorado cálido, elegante, para elementos de lujo.

- Dorado suave: `#D4AF7A`  
  Uso: líneas, dividers, detalles premium, tipografía selecta.

- Gris lila: `#7F6779`  
  Uso: texto auxiliar, detalles menos importantes.

### 4) Tonos oscuros para textos y contraste
Necesarios para legibilidad y jerarquía visual.

- Rosa oscuro profundo: `#5E2E40`  
  Uso: texto principal sobre fondos claros, botones invertidos.

- Burdeos rosado: `#7A3C52`  
  Uso: titulares grandes, texto de énfasis, detalles premium.

- Marrón rosa: `#6A4A4A`  
  Uso: detalles cálidos o de contraste emocional.

## Propuesta de tokens CSS para implementación futura

```css
:root {
  --rose-petal: #F8D7E4;
  --rose-blush: #F5B7CC;
  --rose-vintage: #E89DB5;
  --rose-deep: #D67AA1;
  --rose-dark: #B95D82;

  --lilac-powder: #EADAF5;
  --lavender-soft: #D7C3E8;
  --mauve: #B698C9;
  --rose-baby: #FDECF3;

  --cream: #FFF8F4;
  --beige-nude: #F2E5DD;
  --champagne: #E9D7B8;
  --gold-soft: #D4AF7A;
  --grape-gray: #7F6779;

  --rose-ink: #5E2E40;
  --rose-bordeaux: #7A3C52;
  --rose-brown: #6A4A4A;
}
```

## Mapa de uso recomendado

### Fondos
- Fondo general: `#FFF8F4` (crema suave)
- Secciones alternas: `#F8D7E4` y `#FDECF3`
- Bloques de destacado: `#F5B7CC`
- Capa de glows y overlays: `#E89DB5` con opacidad baja

### Tipografía
- Títulos principales: `#5E2E40` o `#7A3C52`
- Texto secundario: `#7A3C52` o `#6A4A4A`
- Texto sobre fondo rosado: `#5E2E40` o `#FFF8F4` según contraste

### Botones y CTAs
- Primario: `#D67AA1` o `#B95D82`
- Hover: `#B95D82` o `#7A3C52`
- Texto sobre botón: `#FFF8F4`

### Bordes y divisores
- `#E89DB5`
- `#D7C3E8`
- `#E9D7B8` para detalles premium

### Efectos decorativos
- Glow suave: rosa claro + transparencia
- Sombras: rosa/violáceo muy tenue
- Ilustraciones florales: rosa profundo, lavanda, champagne

## Propuesta de balance visual
Para mantener la invitación hermosa y elegante, la estrategia sería:

- 55% rosa / blush / petal
- 20% lila / lavanda / mauve
- 15% crema / beige / nude
- 10% dorado / champagne

Esto mantiene el carácter rosa dominante sin que la composición se vuelva monótona ni infantil.

## Diferencia con la paleta actual
La paleta actual tiene una base muy verde/forestal y una presencia importante de dorado y beige. La propuesta nueva mantiene la sensación romántica y de evento especial, pero cambia la energía visual a:

- más delicada
- más femenina
- más moderna
- más centrada en el tema de quinceañera / romance / florales

## Recomendación final
La mejor dirección es una base principal en rosa pálido y blush, con acentos en rosa intenso y un toque de lila/dorado para sofisticación. Esto dará una invitación visualmente más intensa, cálida y memorable, manteniendo buen contraste para la información importante.

## Consideración de implementación
La propuesta está pensada para ser aplicada de forma progresiva en:
1. colores de fondo
2. tipografías de títulos y subtítulos
3. botones CTA
4. overlays de decoración
5. bordes y capas
6. paleta sugerida para invitados

No se implementa aún, pero queda lista para ser traducida a `app/globals.css` y a `lib/config.ts` con cambios puntuales y seguros.

## Siguiente paso sugerido
Ajustar esta propuesta con una de estas dos direcciones:
- Opción A: más romántica y pastel
- Opción B: más elegante y intensa con tonos rosa profundo y dorado

Luego sí pasar a la implementación directa en el código.
