import React, { useState } from "react";
import { FaiscasAvatar } from "./FaiscasAvatar";

export function Navbar({
  user,
  perfil,
  onSalvarPerfil,
  onExcluirPerfil,
  nomeExibicao,
  setNomeExibicao,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignUp,
  onLogout,
  onSync,
  loading,
}: any) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaExclusao, setMostrarSenhaExclusao] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novaFoto, setNovaFoto] = useState("");

  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [excluindoPerfil, setExcluindoPerfil] = useState(false);

  const nomeAtual = (
    perfil?.nome_exibicao ||
    user?.user_metadata?.nome_exibicao ||
    user?.email?.split("@")[0] ||
    "JOGADOR"
  ).toUpperCase();

  const fallbackAvatar = `https://placehold.co/200x200/0D80BF/FFFFFF?text=${nomeAtual.slice(
    0,
    2
  )}`;
  const fotoAtual = perfil?.foto_url || fallbackAvatar;

  function abrirEdicao() {
    setNovoNome(nomeAtual);
    setNovaFoto(perfil?.foto_url || "");
    setConfirmandoExclusao(false);
    setSenhaConfirmacao("");
    setMostrarSenhaExclusao(false);
    setEditandoPerfil(!editandoPerfil);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    const ok = await onSalvarPerfil(novoNome, novaFoto);
    if (ok) {
      setConfirmandoExclusao(false);
      setSenhaConfirmacao("");
      setMostrarSenhaExclusao(false);
      setEditandoPerfil(false);
    }
  }

  async function confirmarExclusaoPerfil(e: React.FormEvent) {
    e.preventDefault();
    if (!senhaConfirmacao.trim() || typeof onExcluirPerfil !== "function") {
      return;
    }
    setExcluindoPerfil(true);
    try {
      const ok = await onExcluirPerfil(senhaConfirmacao);
      if (ok) {
        setSenhaConfirmacao("");
        setMostrarSenhaExclusao(false);
        setConfirmandoExclusao(false);
        setEditandoPerfil(false);
      }
    } finally {
      setExcluindoPerfil(false);
    }
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur px-3.5 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              GAME<span className="text-[#0D80BF]">VAULT</span>
            </h1>
          </div>

          {user && (
            <button
              onClick={onLogout}
              className="lg:hidden bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase transition"
            >
              SAIR
            </button>
          )}
        </div>

        {user ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs font-bold w-full lg:w-auto">
            <div className="flex items-center gap-2.5 bg-zinc-950 border border-white/25 pr-3.5 pl-1.5 py-1 rounded-full min-w-0 max-w-full">
              <FaiscasAvatar
                src={fotoAtual}
                alt={nomeAtual}
                fallback={fallbackAvatar}
                sizeClass="w-10 h-10 sm:w-11 sm:h-11"
              />
              <span className="text-sky-300 uppercase font-black text-xs sm:text-sm truncate">
                {nomeAtual}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={abrirEdicao}
                className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-3.5 py-2 rounded-full uppercase transition text-center"
              >
                ⚙️ PERFIL
              </button>
              <button
                onClick={onSync}
                disabled={loading}
                className="bg-[#0D80BF]/20 hover:bg-[#0D80BF]/30 text-sky-300 border border-[#0D80BF]/50 px-3.5 py-2 rounded-full uppercase transition text-center"
              >
                {loading ? "..." : "🔄 SYNC ALL"}
              </button>
              <button
                onClick={onLogout}
                className="hidden lg:inline-block bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 px-3.5 py-2 rounded-full uppercase transition"
              >
                SAIR
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onLogin}
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 text-xs font-bold w-full lg:w-auto"
          >
            <input
              type="text"
              maxLength={35}
              placeholder="Nome de exibição (p/ cadastrar)"
              value={nomeExibicao}
              onChange={(e) => setNomeExibicao(e.target.value.toUpperCase())}
              className="w-full lg:w-48 bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2 rounded-full uppercase text-base sm:text-xs text-white"
            />
            <input
              type="email"
              placeholder="E-mail (com 1 número)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full lg:w-44 bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2 rounded-full text-base sm:text-xs text-white"
              required
            />
            <div className="relative flex items-center w-full lg:w-44">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha (8+ e 1 número)"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none pl-3.5 pr-9 py-2 rounded-full text-base sm:text-xs text-white"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 text-zinc-400 hover:text-sky-400 transition"
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full sm:col-span-2 lg:w-auto lg:flex">
              <button
                type="submit"
                className="bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2.5 sm:py-2 rounded-full font-extrabold uppercase transition"
              >
                ENTRAR
              </button>
              <button
                type="button"
                onClick={onSignUp}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 px-4 py-2.5 sm:py-2 rounded-full font-extrabold uppercase transition"
              >
                CADASTRAR
              </button>
            </div>
          </form>
        )}
      </div>

      {user && editandoPerfil && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-zinc-800 space-y-3 text-xs font-bold">
          <form
            onSubmit={salvar}
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-end gap-3"
          >
            <FaiscasAvatar
              src={novaFoto.trim() || fallbackAvatar}
              alt="Prévia"
              fallback={fallbackAvatar}
              sizeClass="w-16 h-16"
            />
            <input
              type="text"
              maxLength={35}
              placeholder="NOVO NOME DE EXIBIÇÃO"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value.toUpperCase())}
              className="w-full sm:w-56 bg-zinc-950 border border-zinc-700 focus:border-[#0D80BF] outline-none px-4 py-2.5 rounded-full uppercase text-base sm:text-xs text-white"
              required
            />
            <input
              type="url"
              placeholder="URL DA FOTO DE PERFIL (OPCIONAL)"
              value={novaFoto}
              onChange={(e) => setNovaFoto(e.target.value)}
              className="w-full sm:w-72 bg-zinc-950 border border-zinc-700 focus:border-[#0D80BF] outline-none px-4 py-2.5 rounded-full text-base sm:text-xs text-white"
            />
            <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2.5 rounded-full font-extrabold uppercase transition"
              >
                SALVAR PERFIL
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmandoExclusao(false);
                  setSenhaConfirmacao("");
                  setMostrarSenhaExclusao(false);
                  setEditandoPerfil(false);
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3.5 py-2.5 rounded-full uppercase transition"
              >
                CANCELAR
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmandoExclusao((prev) => !prev);
                  setSenhaConfirmacao("");
                  setMostrarSenhaExclusao(false);
                }}
                className="col-span-2 sm:col-span-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/40 px-3.5 py-2.5 rounded-full uppercase transition"
              >
                🗑️ DELETAR PERFIL
              </button>
            </div>
          </form>

          {confirmandoExclusao && (
            <form
              onSubmit={confirmarExclusaoPerfil}
              className="bg-rose-950/35 border border-rose-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-end gap-2.5"
            >
              <span className="text-rose-300 text-xs sm:mr-auto">
                Confirme sua senha para deletar seu perfil e seus itens:
              </span>
              <div className="relative flex items-center w-full sm:w-56">
                <input
                  type={mostrarSenhaExclusao ? "text" : "password"}
                  placeholder="DIGITE SUA SENHA"
                  value={senhaConfirmacao}
                  onChange={(e) => setSenhaConfirmacao(e.target.value)}
                  className="w-full bg-black border border-rose-500/40 focus:border-rose-400 outline-none pl-4 pr-9 py-2 rounded-full text-sm sm:text-xs text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaExclusao(!mostrarSenhaExclusao)}
                  className="absolute right-3 text-zinc-400 hover:text-rose-300 transition"
                >
                  {mostrarSenhaExclusao ? "🙈" : "👁️"}
                </button>
              </div>
              <button
                type="submit"
                disabled={excluindoPerfil || !senhaConfirmacao.trim()}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white px-4 py-2 rounded-full font-black uppercase transition"
              >
                {excluindoPerfil ? "DELETANDO..." : "CONFIRMAR EXCLUSÃO"}
              </button>
            </form>
          )}
        </div>
      )}
    </nav>
  );
}