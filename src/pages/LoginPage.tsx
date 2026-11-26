import React, { useState } from "react";

export function LoginPage({
  nomeExibicao,
  setNomeExibicao,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignUp,
  onVoltar,
}: any) {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [verSenha, setVerSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      await (modo === "login" ? onLogin(e) : onSignUp(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-md mx-auto pt-4 sm:pt-8">
      <button
        type="button"
        onClick={onVoltar}
        className="mb-4 text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition"
      >
        ← VOLTAR AO CATÁLOGO
      </button>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-3xl">🎮</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white">
            {modo === "login" ? "ENTRAR NO " : "CRIAR CONTA "}
            <span className="text-[#0D80BF]">GAMEVAULT</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 bg-black p-1 rounded-full border border-zinc-800 text-xs font-black">
          {(["login", "cadastro"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModo(m)}
              className={`py-2 rounded-full uppercase transition ${
                modo === m ? "bg-[#0D80BF] text-white" : "text-zinc-400"
              }`}
            >
              {m === "login" ? "ENTRAR" : "CADASTRAR"}
            </button>
          ))}
        </div>

        <form onSubmit={enviar} className="space-y-4 text-xs font-bold">
          {modo === "cadastro" && (
            <input
              type="text"
              maxLength={35}
              placeholder="NOME DE EXIBIÇÃO"
              value={nomeExibicao}
              onChange={(e) => setNomeExibicao(e.target.value.toUpperCase())}
              className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl uppercase text-sm sm:text-xs text-white"
              required
            />
          )}

          <input
            type="email"
            placeholder="E-mail (com 1 número)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white"
            required
          />

          <div className="relative flex items-center">
            <input
              type={verSenha ? "text" : "password"}
              placeholder="Senha (8+ e 1 número)"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none pl-4 pr-10 py-3 rounded-2xl text-sm sm:text-xs text-white"
              required
            />
            <button
              type="button"
              onClick={() => setVerSenha(!verSenha)}
              className="absolute right-3.5 text-zinc-400 hover:text-sky-400"
            >
              {verSenha ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition"
          >
            {enviando ? "AGUARDE..." : modo === "login" ? "ENTRAR" : "CADASTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}