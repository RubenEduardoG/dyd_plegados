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
  // PENDIENTE: mientras esté vacío, WhatsApp se abre con el mensaje listo y pide elegir el contacto.
  whatsapp: "",

  instagram: "dyd.plegados",

  // PENDIENTES — se muestran en el footer solo cuando tengan valor confirmado.
  telefono: "",
  email: "",
  direccion: "", // A. Sáenz 1910 figura en una publicación: confirmar vigencia y autorización antes de cargarla.
  horarios: "",

  localidad: "José León Suárez, Buenos Aires",

  // Fabricaciones y productos. precio: null => se muestra "Consultar".
  // precio admite texto libre, ej.: "Desde $ 000.000" (cargar solo precios confirmados y vigentes).
  fabricaciones: [
    {
      nombre: "Puertas metálicas",
      descripcion: "Puertas fabricadas en nuestro taller. Contanos medidas y uso para cotizar.",
      imagen: null, // PENDIENTE: foto real de puertas terminadas/apiladas
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
      nombre: "Piezas y ejes",
      descripcion: "Piezas metálicas a partir de plano, muestra o medidas.",
      imagen: null, // PENDIENTE: foto real de piezas/ejes
      precio: null,
      disponible: true
    },
    {
      nombre: "Desarrollos especiales",
      descripcion: "¿Necesitás algo que no está en la lista? Lo evaluamos con vos.",
      imagen: null,
      precio: null,
      disponible: true
    }
  ],

  // Galería de trabajos reales. src: null => se muestra un espacio "Foto pendiente".
  // Subir las fotos a assets/trabajos/ (ideal: .webp o .jpg de ~1200 px de ancho).
  galeria: [
    { src: "assets/trabajos/parrilla-estructura.webp", titulo: "Parrilla y estructura metálica", ancho: 900, alto: 506 },
    { src: null, titulo: "Puertas metálicas terminadas" },
    { src: null, titulo: "Plegado en taller" },
    { src: null, titulo: "Piezas y ejes metálicos" },
    { src: null, titulo: "Puertas instaladas" },
    { src: null, titulo: "Chapas y maquinaria" }
  ]
};
