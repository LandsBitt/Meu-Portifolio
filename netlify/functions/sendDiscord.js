const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
    // Só aceita POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    let data;
    // Tenta fazer o parse do JSON
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON body" })
        };
    }

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookURL) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Webhook não configurado." })
        };
    }

    const payload = {
        username: "Contato do Portfólio 🚀",
        embeds: [
            {
                title: "📨 Novo Contato Recebido!",
                color: 0x00bfff,
                fields: [
                    { name: "👤 Nome", value: data.name, inline: false },
                    { name: "📧 Email", value: data.email, inline: true },
                    { name: "📱 Telefone", value: data.phone || "Não informado", inline: true },
                    { name: "📝 Assunto", value: data.subject || "Não informado", inline: false },
                    { name: "💬 Mensagem", value: data.message, inline: false }
                ],
                footer: { text: "Enviado pelo formulário do site" },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Mensagem enviada com sucesso!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao enviar webhook." })
        };
    }
};