/*
 * DYD PLEGADOS — Configuración del sitio
 * ------------------------------------------------------------------
 * ÚNICO lugar donde se cargan datos de contacto y contenido editable.
 * Todo lo que esté vacío ("") o en null NO se muestra en la web.
 * No completar con datos sin confirmar con DYD.
 */
window.DYD_CONFIG = {
  // WhatsApp oficial en formato internacional, solo números, sin "+", espacios ni guiones.
  // Ejemplo de formato (NO es el número real): "5491100000000"
  // Confirmado por el cliente (ficha de Google de DYD: +54 11 6665-3155).
  whatsapp: "5491166653155",

  instagram: "dyd.plegados",

  // Datos de contacto. Lo que esté vacío no se muestra.
  telefono: "+54 11 6665-3155",
  email: "", // PENDIENTE
  direccion: "Antonio Sáenz 1910 (esq. Italia)",
  horarios: "Lunes a viernes de 8 a 17 h",
  localidad: "José León Suárez, Buenos Aires",
  mapa: "https://www.google.com/maps/place/?q=place_id:ChIJWXb_h2C7vJURH6e3MuaT9MI",

  // Fabricaciones y productos. precio: null => se muestra "Consultar".
  // precio admite texto libre, ej.: "Desde $ 000.000" (cargar solo precios confirmados y vigentes).
  fabricaciones: [
    {
      nombre: "Puertas metálicas",
      descripcion: "Puertas fabricadas en nuestro taller. Contanos medidas y uso para cotizar.",
      imagen: "assets/trabajos/puerta-metalica.webp",
      precio: null,
      disponible: true
    },
    {
      nombre: "Escaleras y escalones",
      descripcion: "Escaleras metálicas y escalones de chapa, a medida de tu espacio.",
      imagen: "assets/trabajos/escalera-caracol.webp",
      precio: null,
      disponible: true
    },
    {
      nombre: "Parrillas y estructuras",
      descripcion: "Parrillas y estructuras metálicas fabricadas según tu proyecto.",
      imagen: "assets/trabajos/parrilla-estructura.webp",
      precio: null,
      disponible: true
    },
    {
      nombre: "Piezas y perfiles plegados",
      descripcion: "Piezas y perfiles a partir de plano, muestra o medidas.",
      imagen: "assets/trabajos/perfiles-plegados.webp",
      precio: null,
      disponible: true
    },
    {
      nombre: "Desarrollos especiales",
      descripcion: "¿Necesitás algo que no está en la lista? Lo evaluamos con vos.",
      imagen: "assets/trabajos/modulos-chapa-plegada.webp",
      precio: null,
      disponible: true
    }
  ],

  // Galería de trabajos reales (fotos del Instagram de DYD). src: null => espacio "Foto pendiente".
  // forma: "grande" (2x2), "alto" (vertical, 2 filas) o vacío (normal).
  galeria: [
    { src: "assets/trabajos/parrilla-estructura.webp", titulo: "Parrilla y estructura metálica", forma: "grande", ancho: 900, alto: 506 },
    { src: "assets/trabajos/escalera-caracol.webp", titulo: "Escalera caracol", forma: "alto", ancho: 640, alto: 967 },
    { src: "assets/trabajos/puerta-metalica.webp", titulo: "Puertas metálicas", forma: "alto", ancho: 700, alto: 982 },
    { src: "assets/trabajos/perfiles-plegados.webp", titulo: "Perfiles plegados", ancho: 865, alto: 947 },
    { src: "assets/trabajos/escalones-chapa-semillada.webp", titulo: "Escalones de chapa semillada", ancho: 850, alto: 953 },
    { src: "assets/trabajos/modulos-chapa-plegada.webp", titulo: "Módulos de chapa plegada", ancho: 900, alto: 513 },
    { src: "assets/trabajos/pieza-plegada-taller.webp", titulo: "Pieza plegada en el taller", ancho: 900, alto: 952 },
    { src: "assets/trabajos/perfil-varios-pliegues.webp", titulo: "Perfil con varios pliegues", ancho: 895, alto: 985 },
    { src: "assets/trabajos/chapa-plegada-acanalada.webp", titulo: "Chapa plegada acanalada", ancho: 900, alto: 924 },
    { src: "assets/trabajos/trabajo-segun-plano.webp", titulo: "Trabajo según plano", ancho: 741, alto: 975 }
  ]
};
