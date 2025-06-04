const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

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
                timestamp: new Date()
            }
        ]
    };

    await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Mensagem enviada com sucesso!" })
    };
};
