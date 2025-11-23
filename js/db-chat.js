const chatData = {
    "inicio": {
        "msg": "👋 ¡Hola! Soy Urbano, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
        "options": [
            { "text": "🛍️ Servicios", "next": "servicios" },
            { "text": "📍 Ver Locales", "next": "locales" },
            { "text": "🕒 Horarios y Ubicación", "next": "horarios" },
            { "text": "🔥 Ofertas", "next": "ofertas" },
            { "text": "✉️ Contacto", "next": "contacto" }
        ]
    },
    "horarios": {
        "msg": "📅 Estamos abiertos de Lunes a Domingo de 10:00 a 22:00.<br>📍 <b>Dirección:</b> Av. Principal 1234, CABA",
        "options": [
            { "text": "⬅️ Volver al inicio", "next": "inicio" }
        ]
    },
    "servicios": {
        "msg": "<b>¡En Urban Plaza tenés todo para pasarla bien!</b> 🎬🎳<br>Disfrutá de nuestro cine o bowling, o relajate en las terrazas con jardines y WiFi gratis. 🍔 Y si pinta el hambre, nuestra gastronomía te va a encantar.<br>👇 Elegí qué querés ver hoy:",
        "options": [
            { "text": "🏧 Servicios", "url": "servicios.html" },
            { "text": "🎳 Entretenimiento", "url": "entretenimiento.html" },
            { "text": "🍔 Gastronomía", "url": "gastronomia.html" },
            { "text": "🏬 Ver todos los Locales", "url": "locales-mejorado.html" },
            { "text": "⬅️ Volver al inicio", "next": "inicio" }
        ]
    },
    "locales": {
        "msg": "🏢 <b>Nuestros locales destacados:</b><br>Hacé clic para ver más info:",
        "options": [
            { "text": "Gamer Pro: Venta y armado de PCs de alto rendimiento", "url": "https://axellito24.github.io/2da-entrega/" },
            { "text": "ConceptBa: Objetos de diseño y decoración moderna ", "url": "https://jupuiguade.github.io/ConceptBA_TP_Individual/index.html" },
            { "text": "Pastelería Belle Epoque: Pastelería artesanal de lujo", "url": "https://euge-90.github.io/belle-epoque-pasteleria/" },
            { "text": "Hermes Gear: Lo ultimo en conectividad", "url": "https://jhonem.github.io/ladingHermes/" },
            { "text": "🏬 Ver todos los Locales", "url": "locales-mejorado.html" },
            { "text": "⬅️ Volver al inicio", "next": "inicio" }
        ]
    },
    "ofertas": {
        "msg": "🌟 <b>¡Beneficios exclusivos!</b><br>🏷️ 20% OFF presentando tu Urban Pass.<br>💳 3 y 6 cuotas sin interés.<br>🚗 Parking gratis por 2 horas.",
        "options": [
            { "text": "Ver todas las ofertas", "url": "ofertas.html" },
            { "text": "⬅️ Volver al inicio", "next": "inicio" }
        ]
    },
    "contacto": {
        "msg": "Escríbenos a info@urbanplazamall.com o llámanos al +54 11 1234-5678.",
        "options": [
            { "text": "✉️ Ir a formulario de contacto", "url": "contacto.html" },
            { "text": "⬅️ Volver al inicio", "next": "inicio" }
        ]
    }
};