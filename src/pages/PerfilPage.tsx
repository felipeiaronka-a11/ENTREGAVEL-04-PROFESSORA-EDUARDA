import React, { useEffect, useState } from "react";
import { FaiscasAvatar } from "../components/FaiscasAvatar";

export function PerfilPage({
  user,
  perfil,
  onSalvarPerfil,
  onExcluirPerfil,
  onVoltar,
}: any) {
  const nomePadrao = (
    perfil?.nome_exibicao ||
    user?.user_metadata?.nome_exibicao ||
    user?.email?.split("@")[0] ||
    "JOGADOR"
  ).toUpperCase();

  const [novoNome, setNovoNome] = useState(nomePadrao);
  const [novaFoto, setNovaFoto] = useState(perfil?.foto_url || "");
  const [salvando, setSalvando] = useState(false);

  const [confirmar, setConfirmar] = useState(false);
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    setNovoNome(nomePadrao);
    setNovaFoto(perfil?.foto_url || "");
  }, [perfil, user]);

  const fallback = `https://placehold.co/200x200/0D80BF/FFFFFF?text=${(
    novoNome || "JG"
  ).slice(0, 2)}`;

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    try {
      await onSalvarPerfil(novoNome, novaFoto);
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(e: React.FormEvent) {
    e.preventDefault();
    if (!senha.trim()) return;
    setExcluindo(true);
    try {
      if (await onExcluirPerfil(senha)) {
        setSenha("");
        setConfirmar(false);
      }
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto pt-4 sm:pt-8 space-y-6">
      <button
        type="button"
        onClick={onVoltar}
        className="text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition"
      >
        ← VOLTAR AO CATÁLOGO
      </button>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">
          <FaiscasAvatar
            src={novaFoto.trim() || fallback}
            alt="Avatar"
            fallback={fallback}
            sizeClass="w-20 h-20"
          />
          <div className="min-w-0">
            <h2 className="text-xl font-black uppercase text-white">
              EDITAR <span className="text-[#0D80BF]">PERFIL</span>
            </h2>
            <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={salvar} className="space-y-4 text-xs font-bold">
          <input
            type="text"
            maxLength={35}
            placeholder="NOVO NOME DE EXIBIÇÃO"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value.toUpperCase())}
            className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl uppercase text-sm sm:text-xs text-white"
            required
          />
          <input
            type="url"
            placeholder="URL DA FOTO DE PERFIL (OPCIONAL)"
            value={novaFoto}
            onChange={(e) => setNovaFoto(e.target.value)}
            className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white"
          />
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition"
            >
              {salvando ? "SALVANDO..." : "SALVAR PERFIL"}
            </button>
            <button
              type="button"
              onClick={onVoltar}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-5 py-3 rounded-full uppercase transition"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>

      <div className="bg-rose-950/20 border border-rose-500/35 rounded-3xl p-6 space-y-4 text-xs font-bold">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black uppercase text-rose-400">
              ZONA DE PERIGO
            </h3>
            <p className="text-zinc-400 font-semibold">
              Apaga conta, perfil, consoles, jogos e avaliações.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmar((p) => !p);
              setSenha("");
              setVerSenha(false);
            }}
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-4 py-2.5 rounded-full uppercase transition shrink-0"
          >
            🗑️ DELETAR CONTA
          </button>
        </div>

        {confirmar && (
          <form
            onSubmit={excluir}
            className="pt-3 border-t border-rose-500/30 flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex items-center flex-1">
              <input
                type={verSenha ? "text" : "password"}
                placeholder="CONFIRME SUA SENHA"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-black border border-rose-500/40 focus:border-rose-400 outline-none pl-4 pr-10 py-2.5 rounded-full text-sm sm:text-xs text-white"
                required
              />
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                className="absolute right-3.5 text-zinc-400 hover:text-rose-300"
              >
                {verSenha ? "🙈" : "👁️"}
              </button>
            </div>
            <button
              type="submit"
              disabled={excluindo || !senha.trim()}
              className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-full font-black uppercase transition"
            >
              {excluindo ? "DELETANDO..." : "CONFIRMAR EXCLUSÃO"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}