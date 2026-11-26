import React from "react";
import { FaiscasAvatar } from "./FaiscasAvatar";

export type PaginaApp = "catalogo" | "login" | "perfil" | "comentar";

export function Navbar({
  user,
  perfil,
  paginaAtual,
  onNavegar,
  onLogout,
  onSync,
  loading,
}: any) {
  const nome = (
    perfil?.nome_exibicao ||
    user?.user_metadata?.nome_exibicao ||
    user?.email?.split("@")[0] ||
    "JOGADOR"
  ).toUpperCase();

  const fallback = `https://placehold.co/200x200/0D80BF/FFFFFF?text=${nome.slice(0, 2)}`;
  const foto = perfil?.foto_url || fallback;

  const btn = (ativa: boolean) =>
    `px-3.5 py-2 rounded-full text-xs font-bold uppercase border transition ${
      ativa
        ? "bg-[#0D80BF] border-[#0D80BF] text-white"
        : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur px-3.5 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavegar("catalogo")}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🎮</span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              GAME<span className="text-[#0D80BF]">VAULT</span>
            </h1>
          </button>

          <button
            type="button"
            onClick={user ? onLogout : () => onNavegar("login")}
            className={`lg:hidden px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase border transition ${
              user
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                : "bg-[#0D80BF] text-white border-[#0D80BF]"
            }`}
          >
            {user ? "SAIR" : "ENTRAR"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavegar("catalogo")}
            className={btn(paginaAtual === "catalogo")}
          >
            🏠 CATÁLOGO
          </button>
          <button
            type="button"
            onClick={() => onNavegar(user ? "comentar" : "login")}
            className={btn(paginaAtual === "comentar")}
          >
            💬 COMENTAR
          </button>

          {user ? (
            <>
              <button
                type="button"
                onClick={() => onNavegar("perfil")}
                className={`flex items-center gap-2 pr-3.5 pl-1.5 py-1 rounded-full text-xs font-bold border transition ${
                  paginaAtual === "perfil"
                    ? "bg-[#0D80BF]/25 border-[#0D80BF] text-white"
                    : "bg-zinc-950 hover:bg-zinc-900 border-white/25 text-sky-300"
                }`}
              >
                <FaiscasAvatar
                  src={foto}
                  alt={nome}
                  fallback={fallback}
                  sizeClass="w-8 h-8"
                />
                <span className="uppercase font-black truncate max-w-[130px]">
                  ⚙️ {nome}
                </span>
              </button>

              <button
                type="button"
                onClick={onSync}
                disabled={loading}
                className="bg-[#0D80BF]/20 hover:bg-[#0D80BF]/30 text-sky-300 border border-[#0D80BF]/50 px-3.5 py-2 rounded-full text-xs font-bold uppercase transition"
              >
                {loading ? "..." : "🔄 SYNC ALL"}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="hidden lg:inline-block bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 px-3.5 py-2 rounded-full text-xs font-bold uppercase transition"
              >
                SAIR
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onNavegar("login")}
              className="hidden lg:inline-block bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-extrabold uppercase transition"
            >
              ENTRAR / CADASTRAR
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}