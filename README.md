# DYD Plegados — sitio web

Sitio estático (HTML + CSS + JS sin dependencias) preparado para GitHub + Vercel.

## Estructura

```
index.html                     Página única: Inicio, Empresa, Servicios, A medida, Proceso, Trabajos, Presupuesto, Footer
style.css                      Estilos (estética industrial: grafito, blanco, lima) y responsive
config.js                      ÚNICO lugar de datos editables: WhatsApp, contacto, fabricaciones/precios, galería
main.js                        Menú móvil, render de fabricaciones y galería, formulario → WhatsApp
assets/hero-industrial.png     Foto del hero elegida por el cliente (no renombrar ni cambiar la ruta)
assets/trabajos/               Fotos de trabajos reales para la galería
assets/fonts/                  Archivo Black e Inter alojadas en el sitio (licencia SIL OFL)
_headers                       Encabezados de seguridad para Cloudflare Pages (producción)
vercel.json                    Los mismos encabezados para Vercel (demos)
```

## Seguridad

- Sitio estático: sin servidor propio, base de datos ni plugins.
- `_headers` / `vercel.json`: Content-Security-Policy (solo recursos propios), bloqueo de iframes, nosniff, HSTS, Referrer-Policy y Permissions-Policy.
- Al instalar el panel (Decap CMS en `/admin`) hay que ampliar la CSP solo para esa ruta, porque carga scripts externos.
- Cuentas: verificación en dos pasos en GitHub, Cloudflare y el correo de DYD; accesos personales, sin contraseñas compartidas; secretos del login del panel solo como variables de entorno.

## Probar localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
# o: npx serve .
```

Abrir http://localhost:8000. También funciona abriendo `index.html` directamente.

## Configurar datos (config.js)

- `whatsapp`: número oficial en formato internacional, solo dígitos. Cargado: `5491166653155` (+54 11 6665-3155, confirmado por el cliente).
- `mapa`: enlace "Cómo llegar" a la ficha de Google Maps de DYD.
- `telefono`, `email`, `direccion`, `horarios`: se muestran en el footer solo si tienen valor.
- `fabricaciones`: nombre, descripción, imagen, `precio` (`null` = "Consultar") y `disponible`.
- `galeria`: `src: null` muestra un espacio "Foto pendiente". Subir fotos a `assets/trabajos/` (~1200 px de ancho, .webp o .jpg).

## Qué es real y qué no

| Función | Estado |
|---|---|
| Navegación, menú móvil, anclas | Funciona |
| Botones "Consultar" / flotante → WhatsApp con mensaje prearmado | Funciona, con el número oficial de DYD |
| Formulario: validación + armado del mensaje + abrir WhatsApp + copiar | Funciona. **No envía nada por sí mismo**: el cliente debe tocar Enviar en WhatsApp |
| Galería con ampliación | Funciona (1 foto real; resto pendientes) |
| Precios | Se editan en `config.js` (requiere commit). No hay panel de administración |
| Checkout, pagos, facturación | Fuera de alcance |

## Administración de precios y contenido (propuesta)

Hoy el sitio es estático: no tiene base de datos ni login, por lo que **no existe** un panel para el cliente. Para que DYD edite precios, productos y fotos sin depender del desarrollador hace falta autenticación + persistencia. Opciones evaluadas:

1. **Recomendada — CMS basado en Git (Decap CMS) en `/admin`.**
   - El cliente entra a `/admin`, edita productos/precios/fotos en formularios y guarda.
   - Cada cambio se guarda como commit en GitHub y Vercel republica solo (≈1 minuto).
   - Sin base de datos ni servidor propio; el contenido queda versionado (se puede volver atrás).
   - Requiere: mover `fabricaciones`/`galeria` a `data/catalogo.json`, crear una OAuth App de GitHub y una pequeña función serverless en Vercel para el login, y que el usuario de DYD tenga cuenta de GitHub con acceso al repo. Las credenciales van como variables de entorno en Vercel, nunca en el código.
2. **CMS headless o base de datos (Sanity, Supabase, etc.)** — login con email, cambios instantáneos, varios usuarios. Más desarrollo y posibles costos si se superan los planes gratuitos.
3. **Google Sheets publicado como CSV (solo precios)** — lo más simple de usar, pero la planilla queda pública, maneja mal las fotos y depende de Google.

Decisión pendiente con el cliente: si el panel entra en la primera entrega.

## Datos pendientes del cliente

- Correo de contacto.
- Logo original (PNG/SVG); hoy se usa logotipo tipográfico.
- Fotos en alta resolución: puertas terminadas/apiladas, plegadora/operarios, piezas y ejes, puertas instaladas, máquinas y chapas.
- Materiales trabajados y espesores por proceso.
- Productos/trabajos a mostrar y precios vigentes (o "Consultar").
- Dominio y titularidad de las cuentas (GitHub, Vercel, dominio).
- Política de privacidad: el formulario no guarda datos (arma un mensaje de WhatsApp), revisar si se agregan otros canales.

## Pendiente técnico

- `assets/hero-industrial.png` pesa 2,4 MB. Una versión WebP con la misma calidad visual pesa ~170 KB (−93 %). No se aplicó porque implica cambiar la referencia o el archivo de la foto del hero; requiere autorización.
- Con dominio definido: agregar URL absoluta en `og:image` y `canonical`.
