/**
 * =====================================================
 * SISTEMA DE COMPONENTES REUTILIZABLES
 * Urban Plaza Mall
 * =====================================================
 *
 * PROPÓSITO:
 * Este archivo permite tener un único header y footer que se carga
 * automáticamente en todas las páginas del sitio.
 *
 * BENEFICIO:
 * Si necesitas cambiar el menú, logo, o cualquier elemento del header/footer,
 * solo lo cambias aquí y se actualiza en TODAS las páginas.
 *
 * FUNCIONAMIENTO:
 * 1. Define el HTML del header y footer como strings
 * 2. Cuando se carga una página, inserta automáticamente estos elementos
 * 3. Marca la página actual en el menú de navegación
 * =====================================================
 */

// ============================================
// DEFINICIÓN DEL HEADER
// ============================================
// Contiene: Logo, botón hamburguesa y navegación principal
const headerHTML = `
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

  <header>
    <div class="header-container">
      <a href="index.html" class="logo-link" aria-label="Ir a la página de inicio - Urban Plaza Mall">
        <img src="imagenes/logo.jpeg" alt="Urban Plaza Mall" class="header-logo">
      </a>

      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menú de navegación">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="site-nav" aria-label="Navegación principal">
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="entretenimiento.html">Entretenimiento</a></li>
          <li><a href="locales-mejorado.html">Locales</a></li>
          <li><a href="ofertas.html">Ofertas</a></li>
          <li><a href="gastronomia.html">Gastronomía</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>
`;

// ============================================
// DEFINICIÓN DEL FOOTER
// ============================================
// Contiene: Información del mall, enlaces rápidos, contacto y redes sociales
const footerHTML = `
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>Urban Plaza Mall</h3>
        <p>Tu destino urbano para moda, gastronomía y entretenimiento.</p>
        <div class="social-icons">
          <a href="https://facebook.com/urbanplazamall" aria-label="Síguenos en Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://instagram.com/urbanplazamall" aria-label="Síguenos en Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://twitter.com/urbanplazamall" aria-label="Síguenos en Twitter" title="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://tiktok.com/@urbanplazamall" aria-label="Síguenos en TikTok" title="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="locales-mejorado.html">Nuestros Locales</a></li>
          <li><a href="ofertas.html">Ofertas</a></li>
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="entretenimiento.html">Entretenimiento</a></li>
          <li><a href="gastronomia.html">Gastronomía</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contacto</h3>
        <ul>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Av. Principal 1234, CABA
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a href="tel:+541112345678">+54 11 1234-5678</a>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:info@urbanplazamall.com">info@urbanplazamall.com</a>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            Lun-Dom: 10:00 - 22:00 hs
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Urban Plaza Mall. Todos los derechos reservados.</p>
    </div>
  </footer>
`;

// ============================================
// FUNCIÓN PRINCIPAL: CARGAR COMPONENTES
// ============================================
/**
 * Esta función inserta el header y footer en la página actual
 *
 * CÓMO FUNCIONA:
 * 1. Toma el HTML del header y lo inserta al inicio del <body>
 * 2. Toma el HTML del footer y lo inserta al final del <body>
 * 3. Llama a la función para marcar la página actual en el menú
 *
 * CUÁNDO SE EJECUTA:
 * Automáticamente cuando se carga cualquier página del sitio
 */
function cargarComponentes() {
  // Insertar header al inicio del body (después de la etiqueta <body>)
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Insertar footer al final del body (antes de cerrar </body>)
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Llamar a la función que resalta la página actual en el menú
  marcarPaginaActual();

  // Inicializar funcionalidad del menú hamburguesa
  inicializarMenuHamburguesa();
}

// ============================================
// FUNCIÓN: MARCAR PÁGINA ACTUAL
// ============================================
/**
 * Marca visualmente la página actual en el menú de navegación
 *
 * EJEMPLO:
 * Si estás en "servicios.html", el enlace "Servicios" se marcará
 * con un fondo y línea de color para que sepas dónde estás.
 *
 * CÓMO FUNCIONA:
 * 1. Obtiene el nombre del archivo actual (ej: "ofertas.html")
 * 2. Busca todos los enlaces del menú
 * 3. Encuentra el que apunta a la página actual
 * 4. Le agrega el atributo aria-current="page" para marcarlo
 * 5. Elimina el href para evitar enlaces redundantes (accesibilidad)
 */
function marcarPaginaActual() {
  // Obtener el nombre del archivo actual (ej: "contacto.html")
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  // Obtener todos los enlaces de navegación
  const enlaces = document.querySelectorAll('nav a');

  // Revisar cada enlace
  enlaces.forEach(enlace => {
    // Si el enlace apunta a la página actual
    if (enlace.getAttribute('href') === paginaActual) {
      // Marcarlo como página actual (esto aplica estilos CSS especiales)
      enlace.setAttribute('aria-current', 'page');
      // Eliminar href para que no sea clickable y evitar enlaces redundantes
      enlace.removeAttribute('href');
      // Mantener apariencia de enlace pero sin funcionalidad
      enlace.style.cursor = 'default';
    }
  });
}

// ============================================
// FUNCIÓN: MENÚ HAMBURGUESA MÓVIL
// ============================================
/**
 * Inicializa la funcionalidad del menú hamburguesa para dispositivos móviles
 *
 * CÓMO FUNCIONA:
 * 1. Detecta el click en el botón hamburguesa
 * 2. Alterna entre abrir y cerrar el menú
 * 3. Cambia el icono del botón (hamburguesa ↔ X)
 * 4. Cierra el menú al hacer click en un enlace
 */
function inicializarMenuHamburguesa() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  // Si no existe el botón hamburguesa, salir de la función
  if (!navToggle || !nav) return;

  // Manejar click en el botón hamburguesa
  navToggle.addEventListener('click', function() {
    const estaAbierto = this.getAttribute('aria-expanded') === 'true';

    // Alternar estado
    this.setAttribute('aria-expanded', !estaAbierto);
    nav.classList.toggle('nav-abierto');

    // Prevenir scroll del body cuando el menú está abierto
    if (!estaAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Cerrar menú al hacer click en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-abierto');
      document.body.style.overflow = '';
    });
  });

  // Cerrar menú al hacer click fuera de él
  document.addEventListener('click', function(event) {
    const clickDentroNav = nav.contains(event.target);
    const clickEnBoton = navToggle.contains(event.target);
    const menuAbierto = nav.classList.contains('nav-abierto');

    if (!clickDentroNav && !clickEnBoton && menuAbierto) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-abierto');
      document.body.style.overflow = '';
    }
  });

  // Cerrar menú al cambiar tamaño de ventana (de móvil a desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-abierto');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// EJECUCIÓN AUTOMÁTICA
// ============================================
/**
 * Este código se ejecuta automáticamente cuando se carga la página
 *
 * LÓGICA:
 * - Si la página aún está cargando → espera a que termine
 * - Si ya terminó de cargar → ejecuta inmediatamente
 *
 * RESULTADO:
 * El header y footer aparecen automáticamente en todas las páginas
 * que incluyan este archivo JavaScript
 */
if (document.readyState === 'loading') {
  // Si la página está cargando, esperar al evento DOMContentLoaded
  document.addEventListener('DOMContentLoaded', cargarComponentes);
} else {
  // Si ya terminó de cargar, ejecutar inmediatamente
  cargarComponentes();
}
