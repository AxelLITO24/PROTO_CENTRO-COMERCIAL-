/**
 * =====================================================
 * SISTEMA DE VALIDACIÓN DE FORMULARIO DE CONTACTO
 * Urban Plaza Mall
 * =====================================================
 *
 * PROPÓSITO:
 * Este archivo valida el formulario de contacto en tiempo real,
 * mostrando mensajes de error inmediatos cuando el usuario comete
 * un error, mejorando así la experiencia de usuario.
 *
 * BENEFICIOS:
 * - El usuario sabe INMEDIATAMENTE si cometió un error (no tiene que esperar a enviar)
 * - Los mensajes de error son claros y específicos
 * - Incluye un contador de caracteres para el mensaje
 * - Es accesible para lectores de pantalla (aria-invalid)
 * - Previene envíos de formularios incompletos
 *
 * FUNCIONALIDADES PRINCIPALES:
 * 1. Validación en tiempo real mientras el usuario escribe
 * 2. Validación de nombre (mínimo 3 caracteres)
 * 3. Validación de email (formato correcto)
 * 4. Validación de asunto (debe seleccionar una opción)
 * 5. Validación de mensaje (mínimo 10 caracteres)
 * 6. Contador de caracteres para el mensaje
 * 7. Mensajes de error claros y específicos
 * 8. Enfoque automático en el primer campo con error
 * 9. Accesibilidad total (aria-invalid para lectores de pantalla)
 * =====================================================
 */

// ============================================
// INICIALIZACIÓN DEL SISTEMA DE VALIDACIÓN
// ============================================
/**
 * Este evento espera a que la página termine de cargar antes de ejecutar
 * el código de validación. Esto asegura que todos los elementos HTML
 * existan antes de intentar acceder a ellos.
 */
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // OBTENER REFERENCIAS A LOS ELEMENTOS DEL FORMULARIO
    // ============================================
    /**
     * Aquí obtenemos referencias a todos los elementos del formulario
     * que necesitamos validar. Si el formulario no existe (por ejemplo,
     * si este script se carga en una página sin formulario), salimos
     * del código para evitar errores.
     */
    const formulario = document.querySelector('form');

    // Si no hay formulario en la página, no hacer nada
    if (!formulario) return;

    // Obtener referencias a cada campo del formulario
    const campoNombre = document.getElementById('nombre');
    const campoEmail = document.getElementById('email');
    const campoAsunto = document.getElementById('asunto');
    const campoMensaje = document.getElementById('mensaje');

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL - NOMBRE
    // ============================================
    /**
     * El evento 'blur' se dispara cuando el usuario SALE del campo
     * (hace clic fuera del campo o presiona Tab).
     *
     * VENTAJA: No molesta al usuario mientras escribe, solo valida
     * cuando termina de escribir y pasa al siguiente campo.
     */
    if (campoNombre) {
        campoNombre.addEventListener('blur', function() {
            validarNombre();
        });
    }

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL - EMAIL
    // ============================================
    /**
     * Igual que el nombre, valida cuando el usuario sale del campo
     */
    if (campoEmail) {
        campoEmail.addEventListener('blur', function() {
            validarEmail();
        });
    }

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL - ASUNTO
    // ============================================
    /**
     * El evento 'change' se dispara cuando el usuario selecciona
     * una opción diferente en el <select>.
     *
     * VENTAJA: Valida inmediatamente cuando el usuario elige una opción
     */
    if (campoAsunto) {
        campoAsunto.addEventListener('change', function() {
            validarAsunto();
        });
    }

    // ============================================
    // VALIDACIÓN Y CONTADOR - MENSAJE
    // ============================================
    /**
     * Para el mensaje tenemos DOS eventos:
     * 1. 'blur' → valida cuando el usuario sale del campo
     * 2. 'input' → actualiza el contador MIENTRAS escribe
     */
    if (campoMensaje) {
        // Validar cuando sale del campo
        campoMensaje.addEventListener('blur', function() {
            validarMensaje();
        });

        // ============================================
        // CONTADOR DE CARACTERES
        // ============================================
        /**
         * Este contador muestra en tiempo real cuántos caracteres
         * ha escrito el usuario.
         *
         * FUNCIONAMIENTO:
         * - Se actualiza mientras el usuario escribe (evento 'input')
         * - Muestra el total de caracteres
         * - Cambia a verde cuando alcanza el mínimo (10 caracteres)
         * - Ayuda al usuario a saber si ya puede enviar el mensaje
         */
        campoMensaje.addEventListener('input', function() {
            const contador = document.getElementById('mensaje-contador');
            const longitud = this.value.length;
            if (contador) {
                // Actualizar el texto del contador
                contador.textContent = 'Caracteres: ' + longitud + ' (mínimo 10)';

                // Cambiar color a verde si alcanzó el mínimo
                if (longitud >= 10) {
                    contador.style.color = 'green';
                } else {
                    contador.style.color = '';
                }
            }
        });
    }

    // ============================================
    // VALIDACIÓN FINAL AL ENVIAR EL FORMULARIO
    // ============================================
    /**
     * Este es el último control antes de enviar el formulario.
     *
     * FUNCIONAMIENTO:
     * 1. Previene el envío por defecto con preventDefault()
     * 2. Valida TODOS los campos
     * 3. Si todos son válidos → muestra mensaje de éxito
     * 4. Si hay errores → enfoca el primer campo con error
     *
     * VENTAJA: Doble validación para asegurar que no se envíen
     * datos incorrectos
     */
    formulario.addEventListener('submit', function(evento) {
        // Prevenir el envío por defecto del formulario
        evento.preventDefault();

        // Validar todos los campos
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const asuntoValido = validarAsunto();
        const mensajeValido = validarMensaje();

        // Si todos los campos son válidos
        if (nombreValido && emailValido && asuntoValido && mensajeValido) {
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
        } else {
            // ============================================
            // ENFOQUE AUTOMÁTICO EN PRIMER ERROR
            // ============================================
            /**
             * Si hay errores, busca el primer campo que tenga
             * un mensaje de error visible y lo enfoca automáticamente.
             *
             * VENTAJA: El usuario no tiene que buscar dónde está el error,
             * el cursor va automáticamente al primer problema.
             */
            const primerError = formulario.querySelector('.campo .error-mensaje:not(:empty)');
            if (primerError) {
                const campoError = primerError.parentElement.querySelector('input, select, textarea');
                if (campoError) {
                    campoError.focus();
                }
            }
        }
    });

    // ============================================
    // FUNCIÓN: VALIDAR NOMBRE
    // ============================================
    /**
     * Valida que el campo nombre:
     * 1. No esté vacío
     * 2. Tenga al menos 3 caracteres
     *
     * RETORNA:
     * - true si es válido
     * - false si tiene errores
     *
     * ACCESIBILIDAD:
     * Usa aria-invalid para que lectores de pantalla informen
     * si el campo tiene un error
     */
    function validarNombre() {
        const valor = campoNombre.value.trim();
        const errorSpan = document.getElementById('nombre-error');

        if (valor === '') {
            mostrarError(errorSpan, 'El nombre es obligatorio.');
            campoNombre.setAttribute('aria-invalid', 'true');
            return false;
        } else if (valor.length < 3) {
            mostrarError(errorSpan, 'El nombre debe tener al menos 3 caracteres.');
            campoNombre.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            ocultarError(errorSpan);
            campoNombre.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    // ============================================
    // FUNCIÓN: VALIDAR EMAIL
    // ============================================
    /**
     * Valida que el email:
     * 1. No esté vacío
     * 2. Tenga un formato válido (ejemplo@dominio.com)
     *
     * CÓMO FUNCIONA:
     * Usa una expresión regular (patronEmail) para verificar
     * que el texto tenga el formato de un email válido.
     *
     * PATRÓN EXPLICADO:
     * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     * - ^           → inicio del texto
     * - [^\s@]+     → uno o más caracteres que NO sean espacio ni @
     * - @           → debe tener un @
     * - [^\s@]+     → uno o más caracteres que NO sean espacio ni @
     * - \.          → debe tener un punto
     * - [^\s@]+     → uno o más caracteres que NO sean espacio ni @
     * - $           → fin del texto
     *
     * EJEMPLOS VÁLIDOS: juan@gmail.com, maria.lopez@empresa.com.ar
     * EJEMPLOS INVÁLIDOS: juan@, @gmail.com, juan gmail.com
     */
    function validarEmail() {
        const valor = campoEmail.value.trim();
        const errorSpan = document.getElementById('email-error');
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === '') {
            mostrarError(errorSpan, 'El correo electrónico es obligatorio.');
            campoEmail.setAttribute('aria-invalid', 'true');
            return false;
        } else if (!patronEmail.test(valor)) {
            mostrarError(errorSpan, 'Por favor ingresa un correo electrónico válido.');
            campoEmail.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            ocultarError(errorSpan);
            campoEmail.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    // ============================================
    // FUNCIÓN: VALIDAR ASUNTO
    // ============================================
    /**
     * Valida que se haya seleccionado un asunto del menú desplegable.
     *
     * NOTA: El valor '' (vacío) es la opción por defecto
     * "Selecciona un asunto", que no es válida.
     */
    function validarAsunto() {
        const valor = campoAsunto.value;
        const errorSpan = document.getElementById('asunto-error');

        if (valor === '') {
            mostrarError(errorSpan, 'Por favor selecciona un asunto.');
            campoAsunto.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            ocultarError(errorSpan);
            campoAsunto.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    // ============================================
    // FUNCIÓN: VALIDAR MENSAJE
    // ============================================
    /**
     * Valida que el mensaje:
     * 1. No esté vacío
     * 2. Tenga al menos 10 caracteres
     *
     * RAZÓN DEL MÍNIMO:
     * 10 caracteres es un mínimo razonable para asegurar
     * que el mensaje tenga contenido significativo.
     * Evita mensajes como "hola" o "ok".
     */
    function validarMensaje() {
        const valor = campoMensaje.value.trim();
        const errorSpan = document.getElementById('mensaje-error');

        if (valor === '') {
            mostrarError(errorSpan, 'El mensaje es obligatorio.');
            campoMensaje.setAttribute('aria-invalid', 'true');
            return false;
        } else if (valor.length < 10) {
            mostrarError(errorSpan, 'El mensaje debe tener al menos 10 caracteres.');
            campoMensaje.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            ocultarError(errorSpan);
            campoMensaje.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    // ============================================
    // FUNCIÓN: MOSTRAR ERROR
    // ============================================
    /**
     * Muestra un mensaje de error debajo del campo correspondiente.
     *
     * PARÁMETROS:
     * - elemento: el <span> donde se mostrará el error
     * - mensaje: el texto del error a mostrar
     *
     * FUNCIONAMIENTO:
     * 1. Pone el texto del error en el <span>
     * 2. Hace visible el <span> cambiando display a 'block'
     */
    function mostrarError(elemento, mensaje) {
        if (elemento) {
            elemento.textContent = mensaje;
            elemento.style.display = 'block';
        }
    }

    // ============================================
    // FUNCIÓN: OCULTAR ERROR
    // ============================================
    /**
     * Oculta un mensaje de error cuando el campo se corrige.
     *
     * FUNCIONAMIENTO:
     * 1. Borra el texto del error
     * 2. Oculta el <span> cambiando display a 'none'
     */
    function ocultarError(elemento) {
        if (elemento) {
            elemento.textContent = '';
            elemento.style.display = 'none';
        }
    }

    // ============================================
    // FUNCIÓN: MOSTRAR MENSAJE DE ÉXITO
    // ============================================
    /**
     * Reemplaza todo el formulario con un mensaje de éxito.
     *
     * CUÁNDO SE LLAMA:
     * Solo cuando todos los campos son válidos y el usuario
     * envía el formulario.
     *
     * FUNCIONAMIENTO:
     * 1. Encuentra el contenedor del formulario
     * 2. Reemplaza todo su contenido con un mensaje de éxito
     * 3. Incluye un enlace para volver al inicio
     *
     * ACCESIBILIDAD:
     * Usa role="alert" para que los lectores de pantalla
     * anuncien inmediatamente el mensaje de éxito
     */
    function mostrarMensajeExito() {
        const contenedor = document.querySelector('.contenedor-formulario');
        if (contenedor) {
            contenedor.innerHTML = '<div class="mensaje-exito" role="alert"><h3>¡Mensaje enviado con éxito!</h3><p>Gracias por contactarnos. Te responderemos a la brevedad.</p><p><a href="index.html">Volver al inicio</a></p></div>';
        }
    }
});
