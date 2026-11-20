import React, { useState } from "react";
import { supabase } from "../supabase";
import { imagemFallback } from "../services/mediaService";
import { traduzirErro } from "../utils/errorTranslator";
import { FaiscasAvatar } from "./FaiscasAvatar";

export function AvaliacoesSection({
  user,
  perfil,
  jogos,
  avaliacoes,
  onRecarregar,
  avisar,
  onEditarAvaliacao,
}: any) {
  const [nota, setNota] = useState<any>(10);
  const [comentario, setComentario] = useState("");
  const [jogoId, setJogoId] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editNota, setEditNota] = useState<number>(10);
  const [editComentario, setEditComentario] = useState<string>("");
  const [salvandoEdicao, setSalvandoEdicao] = useState<boolean>(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) {
      return avisar("Faça login para publicar uma avaliação.", "erro");
    }

    const autorFinal = (
      perfil?.nome_exibicao ||
      user?.user_metadata?.nome_exibicao ||
      user?.email?.split("@")[0] ||
      "JOGADOR"
    ).toUpperCase();

    const { error } = await supabase.from("avaliacoes").insert([
      {
        nota: Number(nota),
        comentario: comentario.trim(),
        jogo_id: jogoId,
        user_id: user.id,
        autor_nome: autorFinal,
        autor_foto: perfil?.foto_url || null,
      },
    ]);

    if (error) return avisar(traduzirErro(error.message), "erro");
    setComentario("");
    avisar("Review publicada!");
    onRecarregar?.();
  }

  function iniciarEdicao(a: any) {
    if (!user?.id || user.id !== a.user_id) {
      return avisar("Você só pode editar suas próprias avaliações.", "erro");
    }

    if (typeof onEditarAvaliacao === "function") {
      onEditarAvaliacao(a);
      return;
    }

    setEditandoId(a.id);
    setEditNota(Number(a.nota) || 10);
    setEditComentario(a.comentario || "");
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setEditNota(10);
    setEditComentario("");
  }

  async function confirmarEdicao(a: any) {
    if (!user?.id || user.id !== a.user_id) {
      return avisar("Você só pode editar suas próprias avaliações.", "erro");
    }

    const notaNumerica = Number(editNota);
    if (Number.isNaN(notaNumerica) || notaNumerica < 1 || notaNumerica > 10) {
      return avisar("A nota deve ser entre 1 e 10.", "erro");
    }

    if (!editComentario.trim()) {
      return avisar("O comentário não pode ficar vazio.", "erro");
    }

    setSalvandoEdicao(true);
    try {
      const { error } = await supabase
        .from("avaliacoes")
        .update({
          nota: notaNumerica,
          comentario: editComentario.trim(),
        })
        .eq("id", a.id)
        .eq("user_id", user.id);

      if (error) {
        avisar(traduzirErro(error.message), "erro");
        return;
      }

      cancelarEdicao();
      avisar("Review atualizada!");
      onRecarregar?.();
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function deletar(id: string, ownerId?: string) {
    if (!user?.id || (ownerId && user.id !== ownerId)) {
      return avisar("Você só pode remover suas próprias avaliações.", "erro");
    }

    const query = supabase.from("avaliacoes").delete().eq("id", id);
    const { error } = await (user?.id ? query.eq("user_id", user.id) : query);

    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar("Review removida.");
    onRecarregar?.();
  }

  return (
    <section className="space-y-4">
      <h2 className="text-base sm:text-lg font-black uppercase text-white border-b border-zinc-800 pb-2">
        🏆 AVALIAÇÕES ({avaliacoes.length})
      </h2>

      {user && (
        <form
          onSubmit={salvar}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl text-xs font-bold"
        >
          <select
            value={jogoId}
            onChange={(e) => setJogoId(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          >
            <option value="">ESCOLHA O JOGO</option>
            {jogos.map((j: any) => (
              <option key={j.id} value={j.id}>
                {j.titulo.toUpperCase()}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="10"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
            required
          />
          <input
            placeholder="COMENTÁRIO..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
            required
          />
          <button
            type="submit"
            className="bg-[#0D80BF] hover:bg-sky-500 text-white font-black py-2.5 sm:py-2 rounded-xl uppercase transition"
          >
            + PUBLICAR
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {avaliacoes.map((a: any) => {
          const nomeAutor = (a.autor_nome || "JOGADOR").toUpperCase();
          const fallbackAvatar = `https://placehold.co/150x150/0D80BF/FFFFFF?text=${nomeAutor.slice(
            0,
            2
          )}`;
          const avatar = a.autor_foto || fallbackAvatar;
          const ehDono = Boolean(user?.id && user.id === a.user_id);
          const estaEditando = ehDono && editandoId === a.id;

          return (
            <div
              key={a.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-[#0D80BF] p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-2.5 sm:gap-3 transition"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaiscasAvatar
                  src={avatar}
                  alt={nomeAutor}
                  fallback={fallbackAvatar}
                  sizeClass="w-11 h-11 sm:w-12 sm:h-12"
                />
                <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-black uppercase text-sky-300 truncate">
                      {nomeAutor}
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold text-amber-400 shrink-0">
                      ★ {a.nota}/10
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase text-zinc-400 truncate">
                    🎮 {a.jogos?.titulo}
                  </p>

                  {estaEditando ? (
                    <div className="pt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={editNota}
                          onChange={(e) => setEditNota(Number(e.target.value))}
                          className="w-16 bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2 py-1 rounded-lg text-xs text-white"
                        />
                        <input
                          type="text"
                          value={editComentario}
                          onChange={(e) => setEditComentario(e.target.value)}
                          className="flex-1 min-w-0 bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={salvandoEdicao}
                          onClick={() => confirmarEdicao(a)}
                          className="text-[10px] sm:text-[11px] font-extrabold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 px-2.5 py-1 rounded-lg disabled:opacity-50"
                        >
                          {salvandoEdicao ? "SALVANDO..." : "SALVAR"}
                        </button>
                        <button
                          type="button"
                          disabled={salvandoEdicao}
                          onClick={cancelarEdicao}
                          className="text-[10px] sm:text-[11px] font-extrabold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-lg disabled:opacity-50"
                        >
                          CANCELAR
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-zinc-100 text-xs italic line-clamp-2 break-words">
                      "{a.comentario}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <img
                  src={a.jogos?.imagem_url || imagemFallback(a.jogos?.titulo)}
                  alt=""
                  className="w-10 h-14 sm:w-12 sm:h-16 object-contain bg-black rounded-xl"
                />
                {ehDono && !estaEditando && (
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(a)}
                      className="text-[10px] sm:text-[11px] font-extrabold bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 px-2 py-1 rounded-lg"
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      onClick={() => deletar(a.id, a.user_id)}
                      className="text-[10px] sm:text-[11px] font-extrabold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 px-2 py-1 rounded-lg"
                    >
                      DEL
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}