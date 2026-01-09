export const metadata = {
  title: "Politica de Privacidade e Termos",
  description:
    "Informacoes sobre privacidade, termos de uso e contato do portfolio.",
};

export default function PrivacyPage() {
  return (
    <section className="legal">
      <h1>Politica de Privacidade</h1>
      <p>
        Este portfolio coleta apenas os dados que voce envia no formulario de
        contato: nome, email, telefone (opcional), assunto e mensagem. Esses
        dados sao usados exclusivamente para responder seu contato.
      </p>
      <p>
        Os envios sao processados no servidor e encaminhados para um canal
        privado no Discord por meio de webhook. Nao armazenamos essas
        informacoes em banco de dados proprio.
      </p>
      <p>
        Usamos o reCAPTCHA v2 (Google) para proteger o formulario contra spam.
        O reCAPTCHA pode coletar informacoes tecnicas como IP e navegador. Saiba
        mais em{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy
        </a>
        .
      </p>

      <h2>Termos de Uso</h2>
      <p>
        Este site e apresentado para fins informativos e de contato
        profissional. Voce concorda em usar o formulario de forma legitima,
        sem enviar spam, conteudo ilegal ou ofensivo.
      </p>

      <h2>Contato</h2>
      <p>
        Se voce tiver duvidas sobre privacidade ou quiser solicitar a exclusao
        de uma mensagem enviada, entre em contato:
      </p>
      <ul>
        <li>Email: lands.bitt@gmail.com</li>
        <li>Telefone/WhatsApp: +55 12 99786-4956</li>
      </ul>
    </section>
  );
}
