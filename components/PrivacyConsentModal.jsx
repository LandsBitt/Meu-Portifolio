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

    return () => {
      document.body.style.overflow = previousOverflow;
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
    <div className="privacy-modal" role="dialog" aria-modal="true">
      <div className="privacy-modal__backdrop" />
      <div className="privacy-modal__content" role="document">
        <h2>Privacidade e Termos</h2>
        <p>
          Este site coleta apenas os dados enviados no formulario de contato
          para responder sua mensagem. Usamos reCAPTCHA para evitar spam.
        </p>
        <p>
          Ao continuar, voce concorda com a nossa{" "}
          <Link
            href="/privacidade"
            className="privacy-modal__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politica de Privacidade e Termos
          </Link>
          .
        </p>
        <button type="button" className="btn" onClick={handleAccept}>
          Aceito os termos
        </button>
      </div>
    </div>
  );
}
