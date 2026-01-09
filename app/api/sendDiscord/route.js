import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { getRemoteIp, verifyRecaptchaToken } from "../../../lib/recaptcha";

export const runtime = "nodejs";

// Garante que as variáveis do .env.local estejam disponíveis no servidor.
dotenv.config();

const MAX_LENGTHS = {
  name: 120,
  email: 160,
  phone: 40,
  subject: 120,
  message: 2000,
};

const sanitizeText = (value, maxLength, { preserveNewlines = false } = {}) => {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();
  const withoutTags = trimmed.replace(/[<>]/g, "");
  const normalized = preserveNewlines
    ? withoutTags.replace(/\r\n/g, "\n")
    : withoutTags.replace(/\s+/g, " ");

  return normalized.slice(0, maxLength);
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request) {
  let data;

  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = sanitizeText(data.name, MAX_LENGTHS.name);
  const email = sanitizeText(data.email, MAX_LENGTHS.email);
  const phone = sanitizeText(data.phone || "", MAX_LENGTHS.phone);
  const subject = sanitizeText(data.subject || "", MAX_LENGTHS.subject);
  const message = sanitizeText(data.message, MAX_LENGTHS.message, {
    preserveNewlines: true,
  });
  const recaptchaToken =
    typeof data.recaptchaToken === "string" ? data.recaptchaToken : "";

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { message: "Preencha nome, e-mail válido e mensagem." },
      { status: 400 }
    );
  }

  const recaptchaResult = await verifyRecaptchaToken({
    token: recaptchaToken,
    remoteIp: getRemoteIp(request),
  });

  if (!recaptchaResult.success) {
    if (Array.isArray(recaptchaResult.errorCodes)) {
      console.warn("reCAPTCHA verification failed:", recaptchaResult.errorCodes);
    }
    return NextResponse.json(
      {
        message: recaptchaResult.message,
        errorCodes: recaptchaResult.errorCodes || [],
      },
      { status: recaptchaResult.status || 403 }
    );
  }

  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 500 }
    );
  }

  const payload = {
    username: "Contato do Portfólio",
    embeds: [
      {
        title: "Novo Contato Recebido!",
        color: 0x00bfff,
        fields: [
          { name: "Nome", value: name, inline: false },
          { name: "Email", value: email, inline: true },
          { name: "Telefone", value: phone || "Não informado", inline: true },
          { name: "Assunto", value: subject || "Não informado", inline: false },
          { name: "Mensagem", value: message, inline: false },
        ],
        footer: { text: "Enviado pelo formulário do site" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao enviar webhook." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao enviar webhook." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed" },
    { status: 405 }
  );
}
