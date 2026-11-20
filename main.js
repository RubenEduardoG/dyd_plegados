(function () {
  "use strict";

  var cfg = window.DYD_CONFIG || {};
  var waNumber = String(cfg.whatsapp || "").replace(/\D/g, "");
  var hasNumber = waNumber.length >= 10;

  if (!hasNumber) {
    console.info("[DYD] WhatsApp oficial sin configurar en config.js: los enlaces abren WhatsApp para elegir el contacto.");
  }

  function waUrl(text) {
    return "https://wa.me/" + (hasNumber ? waNumber : "") + "?text=" + encodeURIComponent(text);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Enlaces directos a WhatsApp ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Menú móvil ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");

  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("no-scroll", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("menu-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (m) {
    if (m.matches) setMenu(false);
  });

  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  /* Botón flotante: oculto mientras se ven los CTA del hero o la sección de presupuesto */
  var waFloat = document.querySelector(".wa-float");
  if (waFloat && "IntersectionObserver" in window) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id || "hero-actions"] = en.isIntersecting; });
      waFloat.classList.toggle("is-hidden", Object.keys(visible).some(function (k) { return visible[k]; }));
    }, { threshold: 0.05 });
    [document.querySelector(".hero .actions"), document.getElementById("presupuesto")].forEach(function (el) { if (el) io.observe(el); });
  }

  /* ---------- Fabricaciones (desde config.js) ---------- */
  var fabGrid = document.getElementById("fab-grid");
  if (fabGrid && Array.isArray(cfg.fabricaciones)) {
    fabGrid.innerHTML = cfg.fabricaciones.filter(function (f) { return f.disponible !== false; }).map(function (f) {
      var media = f.imagen
        ? '<img src="' + esc(f.imagen) + '" alt="' + esc(f.nombre) + '" loading="lazy" decoding="async" width="900" height="506">'
        : '<div class="ph" aria-hidden="true"><span>FOTO PENDIENTE</span></div>';
      var precio = f.precio ? esc(f.precio) : "Consultar";
      var msg = "Hola DYD Plegados, quiero consultar por: " + f.nombre + ".";
      return '<article class="fab-card">' +
        '<div class="fab-media">' + media + '</div>' +
        '<div class="fab-body"><h3>' + esc(f.nombre) + '</h3><p>' + esc(f.descripcion) + '</p>' +
        '<div class="fab-foot"><span class="price"><small>Precio</small>' + precio + '</span>' +
        '<a href="' + waUrl(msg) + '" target="_blank" rel="noopener" aria-label="Consultar por ' + esc(f.nombre) + ' en WhatsApp">Consultar <span aria-hidden="true">→</span></a></div></div>' +
        '</article>';
    }).join("");
  }

  /* ---------- Galería (desde config.js) ---------- */
  var gallery = document.getElementById("gallery");
  if (gallery && Array.isArray(cfg.galeria)) {
    gallery.innerHTML = cfg.galeria.map(function (g, i) {
      if (!g.src) {
        return '<figure class="g-item g-ph"><div class="ph"><span>FOTO PENDIENTE</span></div><figcaption>' + esc(g.titulo) + '</figcaption></figure>';
      }
      var dims = g.ancho && g.alto ? ' width="' + g.ancho + '" height="' + g.alto + '"' : "";
      return '<figure class="g-item"><button type="button" class="g-open" data-i="' + i + '" aria-label="Ampliar foto: ' + esc(g.titulo) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.titulo) + '" loading="lazy" decoding="async"' + dims + '></button>' +
        '<figcaption>' + esc(g.titulo) + '</figcaption></figure>';
    }).join("");

    var lb = document.getElementById("lightbox");
    var lbImg = document.getElementById("lightbox-img");
    var lbCap = document.getElementById("lightbox-cap");
    gallery.addEventListener("click", function (e) {
      var btn = e.target.closest(".g-open");
      if (!btn) return;
      var g = cfg.galeria[+btn.getAttribute("data-i")];
      lbImg.src = g.src;
      lbImg.alt = g.titulo;
      lbCap.textContent = g.titulo;
      if (typeof lb.showModal === "function") lb.showModal();
      else window.open(g.src, "_blank", "noopener");
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) lb.close();
    });
  }

  /* ---------- Footer: solo datos confirmados ---------- */
  var fc = document.getElementById("footer-contact");
  if (fc) {
    var items = [];
    if (cfg.direccion) items.push(esc(cfg.direccion));
    if (cfg.localidad) items.push(esc(cfg.localidad));
    if (cfg.horarios) items.push(esc(cfg.horarios));
    if (hasNumber) items.push('<a href="' + waUrl("Hola DYD Plegados, quiero hacer una consulta.") + '" target="_blank" rel="noopener">WhatsApp</a>');
    if (cfg.telefono) items.push('<a href="tel:' + esc(String(cfg.telefono).replace(/[^\d+]/g, "")) + '">' + esc(cfg.telefono) + "</a>");
    if (cfg.email) items.push('<a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a>");
    if (cfg.mapa) items.push('<a href="' + esc(cfg.mapa) + '" target="_blank" rel="noopener">Cómo llegar ↗</a>');
    fc.innerHTML = items.map(function (x) { return "<li>" + x + "</li>"; }).join("");
  }

  /* ---------- Datos de contacto en la sección Presupuesto ---------- */
  var ci = document.getElementById("contact-info");
  if (ci) {
    var rows = [];
    if (cfg.direccion || cfg.localidad) {
      rows.push("<dt>Taller</dt><dd>" + esc([cfg.direccion, cfg.localidad].filter(Boolean).join(", ")) +
        (cfg.mapa ? '<br><a href="' + esc(cfg.mapa) + '" target="_blank" rel="noopener">Cómo llegar ↗</a>' : "") + "</dd>");
    }
    if (cfg.horarios) rows.push("<dt>Horario</dt><dd>" + esc(cfg.horarios) + "</dd>");
    if (cfg.telefono) rows.push('<dt>WhatsApp y teléfono</dt><dd><a href="tel:' + esc(String(cfg.telefono).replace(/[^\d+]/g, "")) + '">' + esc(cfg.telefono) + "</a></dd>");
    if (cfg.email) rows.push('<dt>Correo</dt><dd><a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a></dd>");
    ci.innerHTML = rows.join("");
    ci.hidden = !rows.length;
  }
  if (cfg.instagram) {
    var ig = "https://www.instagram.com/" + encodeURIComponent(cfg.instagram) + "/";
    document.querySelectorAll("[data-ig], #ig-link").forEach(function (a) { a.href = ig; });
  }
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Formulario → mensaje de WhatsApp ---------- */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");
  if (!form) return;

  var rules = {
    nombre: function (v) { return v.length >= 2 ? "" : "Ingresá tu nombre o el de tu empresa."; },
    servicio: function (v) { return v ? "" : "Elegí qué necesitás."; },
    espesor: function (v) {
      if (!v) return "";
      var n = parseFloat(v.replace(",", "."));
      return /^\d+([.,]\d+)?$/.test(v) && n > 0 ? "" : "Usá solo números, por ejemplo 1,6.";
    },
    cantidad: function (v) {
      if (!v) return "";
      return /^\d+$/.test(v) && +v > 0 ? "" : "Indicá una cantidad en números enteros.";
    },
    detalle: function (v) { return v.length >= 15 ? "" : "Contanos un poco más del trabajo (mínimo 15 caracteres)."; }
  };

  function check(name) {
    var el = form.elements[name];
    var msg = rules[name](el.value.trim());
    var err = document.getElementById("e-" + name);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach(function (name) {
    var el = form.elements[name];
    el.addEventListener("blur", function () { if (el.value.trim() || el.hasAttribute("aria-invalid")) check(name); });
    el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") check(name); });
  });

  function buildMessage() {
    var v = function (n) { return form.elements[n].value.trim(); };
    var lines = ["Hola DYD Plegados, quiero pedir un presupuesto.", ""];
    lines.push("• Nombre / empresa: " + v("nombre"));
    lines.push("• Servicio: " + v("servicio"));
    if (v("material")) lines.push("• Material: " + v("material"));
    if (v("espesor")) lines.push("• Espesor: " + v("espesor") + " mm");
    if (v("cantidad")) lines.push("• Cantidad: " + v("cantidad"));
    lines.push("• Detalle: " + v("detalle"));
    return lines.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(rules).forEach(function (name) {
      if (!check(name) && !firstBad) firstBad = form.elements[name];
    });
    if (firstBad) {
      status.hidden = false;
      status.className = "form-status is-error";
      status.textContent = "Revisá los campos marcados para poder armar la consulta.";
      firstBad.focus();
      return;
    }

    var text = buildMessage();
    var url = waUrl(text);
    window.open(url, "_blank", "noopener");

    status.hidden = false;
    status.className = "form-status is-ok";
    status.innerHTML =
      "<p><b>Tu consulta está lista en WhatsApp.</b> " +
      "Todavía no fue enviada: revisala y tocá <b>Enviar</b> para que nos llegue. Si WhatsApp no se abrió, usá el botón.</p>" +
      (hasNumber ? "" : '<p class="warn">Número oficial de WhatsApp pendiente de configuración: WhatsApp te va a pedir elegir el contacto.</p>') +
      '<div class="status-actions"><a class="btn btn-lime" href="' + url + '" target="_blank" rel="noopener">ABRIR WHATSAPP</a>' +
      '<button type="button" class="btn btn-ghost" id="copy-msg">COPIAR MENSAJE</button></div>';

    document.getElementById("copy-msg").addEventListener("click", function () {
      var btn = this;
      var done = function () { btn.textContent = "MENSAJE COPIADO"; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (err) { /* sin soporte */ }
    document.body.removeChild(ta);
  }
})();
