import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookies";

const COOKIE_CONSENT_KEY = "site_cookie_consent";

export const CookieBanner: React.FC = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const consentimento = getCookie(COOKIE_CONSENT_KEY);
    if (!consentimento) {
      setVisivel(true);
    }
  }, []);

  function responder(status: "aceito" | "recusado") {
    setCookie(COOKIE_CONSENT_KEY, status, 30);
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto z-50 bg-zinc-950 border border-[#0D80BF] text-zinc-100 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <p className="text-xs sm:text-sm text-zinc-300 text-center sm:text-left">
        Utilizamos <span className="text-sky-400 font-bold">cookies</span> para salvar suas preferências de busca e facilitar seu acesso no catálogo.
      </p>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => responder("recusado")}
          className="px-3.5 py-2 rounded-full text-xs font-bold border border-zinc-700 text-zinc-300 hover:bg-zinc-900 transition cursor-pointer"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => responder("aceito")}
          className="px-4 py-2 rounded-full text-xs font-extrabold bg-[#0D80BF] hover:bg-sky-500 text-white transition cursor-pointer"
        >
          Aceitar cookies
        </button>
      </div>
    </div>
  );
};