"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "privacy_consent_v1";

export default function PrivacyConsentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.pathname === "/privacidade") {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "accepted") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
    };
  }, [isOpen]);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay modal-overlay--privacy">
      <div
        className="modal modal--compact"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <div className="modal__body">
          <div className="modal__scroll">
            <span className="modal__eyebrow">Privacidade</span>
            <h2 id="privacy-modal-title" className="modal__title">
              Sua privacidade importa
            </h2>
            <p className="modal__text">
              Este site coleta apenas os dados enviados no formulário de contato
              para responder sua mensagem. Usamos reCAPTCHA para evitar spam.
            </p>
            <p className="modal__text">
              Ao continuar, você concorda com a nossa{" "}
              <Link
                href="/privacidade"
                className="modal__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade e Termos
              </Link>
              .
            </p>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="modal__action modal__action--primary"
              onClick={handleAccept}
              autoFocus
            >
              Aceitar e continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
