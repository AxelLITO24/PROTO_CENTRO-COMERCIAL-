/**
 * =====================================================
 * BUSCADOR Y MAPA INTERACTIVO DE LOCALES
 * Urban Plaza Mall
 * =====================================================
 *
 * FUNCIONALIDADES PRINCIPALES:
 * 1. Buscador de locales en tiempo real
 * 2. Mapa interactivo de locales por piso
 * 3. Modal con información detallada de cada local
 * 4. Menú hamburguesa para móviles
 * 5. Navegación accesible por teclado
 *
 * Este archivo se usa principalmente en: locales-mejorado.html
 * Pero también maneja funciones globales como el menú hamburguesa
 * =====================================================
 */

// ============================================
// BASE DE DATOS DE LOCALES
// ============================================
/**
 * Objeto que contiene información de todos los locales comerciales del mall
 *
 * ESTRUCTURA:
 * - ID del local (usado para identificarlo en el código)
 * - nombre: Nombre comercial del local
 * - descripcion: Qué vende o qué servicios ofrece
 * - ubicacion: En qué piso y número de local está
 * - imagen: Ruta de la imagen del local
 * - categoria: Tipo de negocio (tecnologia, moda, gastronomia, etc.)
 *
 * PARA AGREGAR UN LOCAL NUEVO:
 * Copia el formato de cualquier local existente y cambia los datos
 */
const localesData = {
    'gamer-pro': {
        nombre: 'Gamer Pro, PC Gamers',
        descripcion: 'La meca del hardware. Venta y armado de PCs de alto rendimiento, periféricos de última generación y accesorios e-Sports.',
        ubicacion: 'Planta Baja - Local 1',
        imagen: 'imagenes/logos/gamerPro.png',
        categoria: 'tecnologia',
        url: "https://axellito24.github.io/2da-entrega/"
    },
    'hermes-gear': {
        nombre: 'Tecnología Hermes Gear',
        descripcion: 'Gadgets, dispositivos móviles y wearables inteligentes de las marcas más exclusivas. Lo último en conectividad.',
        ubicacion: 'Planta Baja - Local 2',
        imagen: 'imagenes/logos/hermes.png',
        categoria: 'tecnologia',
        url: "https://jhonem.github.io/ladingHermes/"
    },
    'collective': {
        nombre: 'The Collective (Moda)',
        descripcion: 'Concept Store multimarca. Prendas de diseñadores emergentes y colecciones de moda urbana y vanguardista.',
        ubicacion: 'Planta Baja - Local 3',
        imagen: 'imagenes/collective_fashion.png',
        categoria: 'moda'
    },
    'studio-fit': {
        nombre: 'Studio Fit (Deportes)',
        descripcion: 'Ropa deportiva técnica y calzado de alto rendimiento, enfocado en running, yoga y entrenamiento funcional.',
        ubicacion: 'Planta Baja - Local 4',
        imagen: 'imagenes/studio_fit.jpg',
        categoria: 'deportes'
    },
    'belle-epoque': {
        nombre: 'Pastelería Belle Epoque',
        descripcion: 'Pastelería artesanal de lujo. Repostería fina, chocolates y macarons, perfectos para un café con estilo.',
        ubicacion: 'Primer Piso - Local 5',
        imagen: 'imagenes/logos/belle.png',
        categoria: 'gastronomia',
        url: "https://euge-90.github.io/belle-epoque-pasteleria/"
    },
    'green-life': {
        nombre: 'Green Life Market',
        descripcion: 'Tienda de productos orgánicos, suplementos, alimentos plant-based y jugos naturales. El lado saludable del urbanismo.',
        ubicacion: 'Primer Piso - Local 6',
        imagen: 'imagenes/green_life.jpg',
        categoria: 'alimentacion'
    },
    'conceptBA': {
        nombre: '.ConceptBA ',
        descripcion: 'Muebles y Decoración, productos que embellecen los espacios y cuentan historias.',
        ubicacion: 'Primer Piso - Local 7',
        imagen: 'imagenes/logos/conceptBA.png',
        categoria: 'hogar',
        url: "https://jupuiguade.github.io/ConceptBA_TP_Individual"
    },
    'barber-club': {
        nombre: 'The Barber Club',
        descripcion: 'Barbería premium con estilo vintage. Cortes, afeitados clásicos y venta de productos de cuidado masculino exclusivo.',
        ubicacion: 'Primer Piso - Local 8',
        imagen: 'imagenes/barber_club.jpg',
        categoria: 'servicios'
    },
    'vision-total': {
        nombre: 'Óptica Visión Total',
        descripcion: 'Venta de lentes de contacto, exámenes visuales y colecciones exclusivas de gafas de sol de diseñador.',
        ubicacion: 'Segundo Piso - Local 9',
        imagen: 'imagenes/vision_total.png',
        categoria: 'salud'
    },
    'pets-spa': {
        nombre: "Pet's Urban Spa",
        descripcion: 'Tienda y spa para mascotas. Productos orgánicos, accesorios de diseño y servicios de peluquería y bienestar canino/felino.',
        ubicacion: 'Segundo Piso - Local 10',
        imagen: 'imagenes/pets_spa.png',
        categoria: 'mascotas'
    },
    'travel-hub': {
        nombre: 'Travel Hub (Agencia Boutique)',
        descripcion: 'Agencia de viajes especializada en experiencias de lujo, destinos exóticos y escapadas de fin de semana con estilo.',
        ubicacion: 'Segundo Piso - Local 11',
        imagen: 'imagenes/travel_hub.jpg',
        categoria: 'servicios'
    }
};

// ============================================
// OPTIMIZACIÓN: DEBOUNCE
// ============================================
/**
 * Función de optimización para el buscador
 *
 * PROBLEMA QUE RESUELVE:
 * Sin debounce, cada letra que escribes ejecuta una búsqueda.
 * Si escribes "Gamer" (5 letras), se hacen 5 búsquedas.
 *
 * CON DEBOUNCE:
 * Espera 300ms después de que dejes de escribir para buscar.
 * Si escribes "Gamer" rápido, solo se hace 1 búsqueda.
 *
 * BENEFICIO:
 * Mejora el rendimiento y reduce uso de recursos del navegador.
 *
 * @param {Function} func - Función a ejecutar con retraso
 * @param {Number} wait - Milisegundos de espera (300ms en este caso)
 * @returns {Function} Función optimizada con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// BUSCADOR DE LOCALES EN TIEMPO REAL
// ============================================
/**
 * Sistema de búsqueda que filtra locales mientras escribes
 *
 * CÓMO FUNCIONA:
 * 1. Captura lo que escribes en el input de búsqueda
 * 2. Busca coincidencias en nombres y categorías de locales
 * 3. Muestra los resultados encontrados
 * 4. Resalta los locales encontrados en el mapa
 * 5. Permite hacer clic para ir directamente al local
 */

// Obtener elementos del HTML
const inputBuscar = document.getElementById('buscar-local');
const btnLimpiar = document.getElementById('btn-limpiar');
const resultadoBusqueda = document.getElementById('resultado-busqueda');

// Solo ejecutar si estamos en la página de locales (que tiene el input de búsqueda)
if (inputBuscar) {
    /**
     * Función de búsqueda optimizada con debounce
     * Se ejecuta 300ms después de que el usuario deja de escribir
     */
    const buscarOptimizado = debounce(function(e) {
        // Obtener el texto de búsqueda (en minúsculas y sin espacios extras)
        const termino = e.target.value.toLowerCase().trim();

        // Mostrar u ocultar botón de limpiar según si hay texto
        btnLimpiar.style.display = termino ? 'block' : 'none';

        // Si el texto es muy corto (menos de 2 caracteres), no buscar
        if (termino.length < 2) {
            resultadoBusqueda.innerHTML = '';
            limpiarDestacados();
            return;
        }

        // Buscar locales que contengan el término en su nombre o categoría
        const resultados = Object.entries(localesData).filter(([id, local]) =>
            local.nombre.toLowerCase().includes(termino) ||
            local.categoria.toLowerCase().includes(termino)
        );

        // Si se encontraron resultados
        if (resultados.length > 0) {
            // Crear HTML con la lista de resultados
            resultadoBusqueda.innerHTML =
                '<p><strong>Se encontraron ' + resultados.length + ' resultado(s):</strong></p>' +
                '<ul class="resultados-lista">' +
                resultados.map(([id, local]) =>
                    '<li><button class="resultado-item" data-local-id="' + id + '" ' +
                    'aria-label="Ir al local ' + local.nombre + '">' +
                    '<strong>' + local.nombre + '</strong> - ' + local.ubicacion +
                    '</button></li>'
                ).join('') +
                '</ul>';

            // Resaltar los locales encontrados en el mapa
            destacarLocales(resultados.map(([id]) => id));

            // Agregar evento click a cada resultado para ir al local
            document.querySelectorAll('.resultado-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    scrollToLocal(this.dataset.localId);
                });
            });
        } else {
            // Si no se encontraron resultados
            resultadoBusqueda.innerHTML = '<p class="no-resultados">No se encontraron locales con ese nombre.</p>';
            limpiarDestacados();
        }
    }, 300); // Esperar 300ms después de que el usuario deja de escribir

    // Activar búsqueda cuando el usuario escribe
    inputBuscar.addEventListener('input', buscarOptimizado);

    // Botón para limpiar la búsqueda
    btnLimpiar.addEventListener('click', function() {
        inputBuscar.value = '';
        resultadoBusqueda.innerHTML = '';
        btnLimpiar.style.display = 'none';
        limpiarDestacados();
        inputBuscar.focus();
    });
}

// ============================================
// FUNCIONES AUXILIARES DE BÚSQUEDA
// ============================================

/**
 * Resalta los locales encontrados en el mapa
 * @param {Array} ids - Array con los IDs de locales a resaltar
 */
function destacarLocales(ids) {
    // Primero limpiar cualquier local que estaba resaltado antes
    limpiarDestacados();

    // Resaltar cada local encontrado
    ids.forEach(id => {
        // Buscar el elemento en el HTML por su ID
        const elemento = document.getElementById(id);
        if (elemento) {
            // Agregar clase CSS para resaltarlo visualmente
            elemento.classList.add('destacado');
            // Agregar etiqueta para lectores de pantalla
            elemento.setAttribute('aria-label', 'Local encontrado en la búsqueda');
        }

        // También resaltar el botón del mapa correspondiente
        const botonMapa = document.querySelector('[data-local="' + id + '"]');
        if (botonMapa) botonMapa.classList.add('destacado');
    });
}

/**
 * Quita el resaltado de todos los locales
 */
function limpiarDestacados() {
    document.querySelectorAll('.destacado').forEach(el => {
        el.classList.remove('destacado');
        el.removeAttribute('aria-label');
    });
}

/**
 * Hace scroll suave hacia un local específico y lo resalta temporalmente
 * @param {String} id - ID del local al que navegar
 */
function scrollToLocal(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        // Scroll suave hacia el local
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Agregar animación de pulsación temporal
        elemento.classList.add('pulsando');
        setTimeout(() => elemento.classList.remove('pulsando'), 2000);

        // Mostrar mensaje de confirmación
        const nombre = localesData[id].nombre;
        resultadoBusqueda.innerHTML = '<p>Navegando a ' + nombre + '</p>';
        setTimeout(() => resultadoBusqueda.innerHTML = '', 3000);
    }
}

// ============================================
// MODAL CON INFORMACIÓN DE LOCALES
// ============================================
/**
 * Ventana emergente (modal) que muestra información detallada de un local
 * cuando haces clic en su botón en el mapa
 *
 * CONTIENE:
 * - Nombre del local
 * - Imagen
 * - Descripción detallada
 * - Ubicación (piso y número de local)
 */

// Obtener elementos del modal del HTML
const modal = document.getElementById('modal-local');
const modalTitulo = document.getElementById('modal-titulo');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalUbicacion = document.getElementById('modal-ubicacion');
const modalCerrar = document.querySelector('.modal-cerrar');
const modalLink = document.getElementById('modal-link')

// Agregar evento click a todos los botones del mapa de locales
document.querySelectorAll('.local-mapa').forEach(boton => {
    // Al hacer clic en un local del mapa
    boton.addEventListener('click', function() {
        // Obtener información del local desde la base de datos
        const localInfo = localesData[this.dataset.local];
        if (localInfo) {
            mostrarModal(localInfo);
            modal.focus();
        }
    });

    // Permitir abrir con teclado (Enter o Espacio)
    boton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

/**
 * Muestra el modal con la información de un local
 * @param {Object} local - Objeto con datos del local (nombre, imagen, descripcion, ubicacion)
 */
function mostrarModal(local) {
    // Llenar el modal con la información del local
    modalTitulo.textContent = local.nombre;
    modalImagen.src = local.imagen;
    modalImagen.alt = 'Vista del local ' + local.nombre;
    modalDescripcion.textContent = local.descripcion;
    modalUbicacion.innerHTML = '<strong>Ubicación:</strong> ' + local.ubicacion;

    if (local.url) {
        $(modalLink).attr('href', local.url);
        $(modalLink).css('cursor', 'pointer');
        $(modalLink).css('pointer-events', 'auto');
    } else {
        $(modalLink).removeAttr('href');
        $(modalLink).css('cursor', 'default'); // Cursor flecha normal
        $(modalLink).css('pointer-events', 'none');
    }

    // Mostrar el modal
    modal.hidden = false;
    modal.style.display = 'flex';

    // Enfocar el botón de cerrar (para accesibilidad)
    modalCerrar.focus();
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    modal.hidden = true;
    modal.style.display = 'none';
}

// Eventos para cerrar el modal de diferentes formas:
// 1. Click en el botón X
if (modalCerrar) modalCerrar.addEventListener('click', cerrarModal);

// 2. Click fuera del modal (en el fondo oscuro)
if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) cerrarModal();
});

// 3. Presionar tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.hidden) cerrarModal();
});

// ============================================
// MENÚ HAMBURGUESA PARA MÓVILES
// ============================================
/**
 * Maneja el menú de navegación en dispositivos móviles
 *
 * FUNCIONALIDAD:
 * - En móviles, el menú está oculto por defecto
 * - Al hacer clic en el botón hamburguesa (☰), el menú se despliega
 * - Al volver a hacer clic, el menú se cierra
 *
 * NOTA: Esta funcionalidad está en este archivo porque se carga en todas
 * las páginas, así el menú funciona en todo el sitio.
 */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', function() {
        // Obtener el estado actual (abierto o cerrado)
        const expanded = this.getAttribute('aria-expanded') === 'true';

        // Cambiar el estado al opuesto
        this.setAttribute('aria-expanded', !expanded);

        // Agregar/quitar la clase que muestra el menú
        siteNav.classList.toggle('nav-abierto');

        // Si se acaba de abrir, enfocar el primer enlace (accesibilidad)
        if (!expanded) {
            const primerEnlace = siteNav.querySelector('a');
            if (primerEnlace) primerEnlace.focus();
        }
    });
}

// ============================================
// SKIP LINK (ACCESIBILIDAD)
// ============================================
/**
 * Permite a usuarios de teclado/lectores de pantalla saltar directamente
 * al contenido principal sin tener que pasar por todo el menú
 *
 * FUNCIONALIDAD:
 * - Hay un enlace invisible al inicio de la página
 * - Al presionar Tab, se hace visible
 * - Al hacer clic/Enter, salta directamente al contenido principal
 */
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Hacer el contenido enfocable temporalmente
            mainContent.setAttribute('tabindex', '-1');
            // Enfocar el contenido principal
            mainContent.focus();
            // Hacer scroll suave hacia el contenido
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// MENSAJES DE CONSOLA INFORMATIVOS
// ============================================
/**
 * Mensajes en la consola del navegador (solo para desarrollo)
 * Puedes verlos presionando F12 > Consola
 */
// console.log('%c Urban Plaza Mall ', 'background: #0066CC; color: #FFFFFF; font-size: 20px; font-weight: bold; padding: 10px;');
// console.log('%c Sistema de búsqueda y mapa interactivo cargado correctamente ', 'color: #0066CC; font-size: 12px;');
// console.log('%c Todas las funcionalidades están operativas ', 'color: #28A745; font-size: 10px;');

// ============================================
// MONITOREO DE RENDIMIENTO (OPCIONAL)
// ============================================
/**
 * Mide cuánto tarda en cargar la página
 * Útil para optimización y debugging
 * Los resultados se muestran en la consola del navegador
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('%c Tiempo de carga: ' + pageLoadTime + 'ms', 'color: #28A745; font-weight: bold;');
        }, 0);
    });
}
