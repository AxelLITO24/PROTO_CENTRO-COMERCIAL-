$(document).ready(function() {

    const widgetHTML = `
        <div id="chat-widget-box">
            <div class="chat-header-area">
                <span>🤖 Urbano</span>
                <span id="chat-close-icon" style="cursor:pointer;">✖</span>
            </div>
            <div class="chat-logs-area" id="chat-logs">
                </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Escribe algo...">
                <button id="chat-send-btn">➤</button>
            </div>
        </div>
        <button id="chat-trigger-btn">💬</button>
    `;

    $('body').append(widgetHTML);

    function renderStep(stepKey) {
        if (typeof chatData === 'undefined') {
            $('#chat-logs').append('<div class="msg-bot msg-error">Error: No se encontró el archivo de datos.</div>');
            return;
        }

        const step = chatData[stepKey];
        if (!step) return;

        $('#chat-logs').append(`<div class="msg-bot">${step.msg}</div>`);

        if (step.options) {
            let opsHtml = '<div class="chat-options">';
            step.options.forEach(opt => {
                let dataAttr = opt.url ? `data-url="${opt.url}"` : `data-next="${opt.next}"`;
                opsHtml += `<button class="chat-option-btn" ${dataAttr}>${opt.text}</button>`;
            });
            opsHtml += '</div>';
            $('#chat-logs').append(opsHtml);
        }

        scrollToBottom();
    }

    function scrollToBottom() {
        const logs = $('#chat-logs');
        logs.animate({ scrollTop: logs[0].scrollHeight }, 200);
    }

    $('#chat-trigger-btn, #chat-close-icon').click(function() {
        const box = $('#chat-widget-box');
        box.toggleClass('open');

        if (box.hasClass('open') && $('#chat-logs').children().length === 0) {
            renderStep("inicio");
        }
    });

    $(document).on('click', '.chat-option-btn', function() {
        const next = $(this).data('next');
        const url = $(this).data('url');
        const txt = $(this).text();

        $('#chat-logs').append(`<div class="msg-user">${txt}</div>`);

        if (url) {
            $('#chat-logs').append(`<div class="msg-bot">Te estoy redirigiendo... 🚀</div>`);
            scrollToBottom();
            setTimeout(() => window.open(url, '_blank'), 1000);
        } else if (next) {
            setTimeout(() => renderStep(next), 500);
        }
    });

    $('#chat-send-btn').click(processInput);
    $('#chat-input').keypress(function(e) { if(e.which == 13) processInput(); });

    function processInput() {
        const rawText = $('#chat-input').val().trim();
        if (rawText === "") return;

        $('#chat-logs').append(`<div class="msg-user">${rawText}</div>`);
        $('#chat-input').val('');
        scrollToBottom();

        setTimeout(() => {
            const text = rawText.toLowerCase();
            let found = false;

            for (const key in chatData) {
                if (text.includes(key)) {
                    renderStep(key);
                    found = true;
                    break;
                }
            }

            if (!found) {
                if (text.includes("hora") || text.includes("abierto") || text.includes("cierra")) {
                    renderStep("horarios");
                    found = true;
                } else if (text.includes("ubicacion") || text.includes("donde") || text.includes("llegar") || text.includes("calle")) {
                    renderStep("horarios");
                    found = true;
                } else if (text.includes("comprar") || text.includes("tienda") || text.includes("negocio")) {
                    renderStep("locales");
                    found = true;
                } else if (text.includes("hola") || text.includes("inicio") || text.includes("ayuda")) {
                    renderStep("inicio");
                    found = true;
                }
            }

            if (!found) {
                $('#chat-logs').append(`<div class="msg-bot msg-error">🤔 Mmm, no estoy seguro de qué significa "${rawText}". Por favor intentá elegir una opción del menú. 👇</div>`);
                scrollToBottom();
            }

        }, 600);
    }
});