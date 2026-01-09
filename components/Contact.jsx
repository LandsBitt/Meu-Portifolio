"use client";

import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const isSubmitDisabled =
    isSubmitting || !recaptchaToken || !recaptchaSiteKey;

  const fieldIds = useMemo(
    () => ({
      name: "contact-name",
      email: "contact-email",
      phone: "contact-phone",
      subject: "contact-subject",
      message: "contact-message",
    }),
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token || "");
    if (token) {
      setRecaptchaError("");
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken("");
    setRecaptchaError("reCAPTCHA expirou. Marque novamente.");
  };

  const handleRecaptchaErrored = () => {
    setRecaptchaToken("");
    setRecaptchaError("Nao foi possivel carregar o reCAPTCHA.");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Informe seu nome.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = "Informe um e-mail válido.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Escreva sua mensagem.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: "error",
        message: "Preencha os campos obrigatórios antes de enviar.",
      });
      return;
    }

    setErrors({});

    if (!recaptchaSiteKey) {
      setStatus({
        type: "error",
        message: "reCAPTCHA nao configurado. Tente novamente mais tarde.",
      });
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError("Confirme o reCAPTCHA.");
      setStatus({
        type: "error",
        message: "Confirme o reCAPTCHA para enviar.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        recaptchaToken,
      };

      const response = await fetch("/api/sendDiscord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 403) {
          setRecaptchaError(
            "Falha na verificacao do reCAPTCHA. Tente novamente."
          );
          setRecaptchaToken("");
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
        }
        throw new Error(result.message || result.error || "Erro ao enviar.");
      }

      setStatus({ type: "success", message: result.message });
      setFormData(initialFormData);
      setRecaptchaToken("");
      setRecaptchaError("");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Ocorreu um erro ao enviar sua mensagem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">
        Entre em <span>Contato</span>
      </h2>

      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="input-box">
          <div className="field">
            <label htmlFor={fieldIds.name} className="sr-only">
              Nome completo
            </label>
            <input
              id={fieldIds.name}
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <span id={`${fieldIds.name}-error`} className="error-message">
                {errors.name}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor={fieldIds.email} className="sr-only">
              E-mail
            </label>
            <input
              id={fieldIds.email}
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? `${fieldIds.email}-error` : undefined
              }
              autoComplete="email"
            />
            {errors.email && (
              <span id={`${fieldIds.email}-error`} className="error-message">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="input-box">
          <div className="field">
            <label htmlFor={fieldIds.phone} className="sr-only">
              Telefone
            </label>
            <input
              id={fieldIds.phone}
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>
          <div className="field">
            <label htmlFor={fieldIds.subject} className="sr-only">
              Assunto
            </label>
            <input
              id={fieldIds.subject}
              type="text"
              name="subject"
              placeholder="Assunto"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <label htmlFor={fieldIds.message} className="sr-only">
          Mensagem
        </label>
        <textarea
          id={fieldIds.message}
          name="message"
          cols="30"
          rows="8"
          placeholder="Mensagem"
          value={formData.message}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fieldIds.message}-error` : undefined}
        ></textarea>
        {errors.message && (
          <span id={`${fieldIds.message}-error`} className="error-message">
            {errors.message}
          </span>
        )}

        <div className="recaptcha" aria-live="polite">
          {recaptchaSiteKey ? (
            <>
              {/* Using react-google-recaptcha to render and load the v2 widget. */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
                onErrored={handleRecaptchaErrored}
              />
            </>
          ) : (
            <p className="error-message" role="alert">
              reCAPTCHA nao configurado.
            </p>
          )}
        </div>
        {recaptchaError && (
          <span className="error-message" role="alert">
            {recaptchaError}
          </span>
        )}

        <button type="submit" className="btn" disabled={isSubmitDisabled}>
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>

        {status.message && (
          <p
            className={`form-status ${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
}
