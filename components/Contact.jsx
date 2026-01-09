"use client";

import { useMemo, useState } from "react";

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
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        // Opcional: inclua aqui o token do reCAPTCHA quando ativar.
      };

      const response = await fetch("/api/sendDiscord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Erro ao enviar.");
      }

      setStatus({ type: "success", message: result.message });
      setFormData(initialFormData);
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

        <button type="submit" className="btn" disabled={isSubmitting}>
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
