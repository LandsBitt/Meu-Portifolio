document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        subject: e.target.subject.value,
        message: e.target.message.value
    };

    try {
        const response = await fetch('/.netlify/functions/sendDiscord', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            e.target.reset();
        } else {
            alert("Erro ao enviar mensagem: " + (result.message || result.error));
        }
    } catch (error) {
        alert("Ocorreu um erro ao enviar sua mensagem.");
        console.error(error);
    }
});