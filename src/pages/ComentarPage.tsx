import React, { useState } from "react";
import { supabase } from "../supabase";
import { traduzirErro } from "../utils/errorTranslator";

export function ComentarPage({
  user,
  perfil,
  jogos,
  onRecarregar,
  avisar,
  onIrParaLogin,
  onVoltar,
}: any) {
  const [jogoId, setJogoId] = useState("");
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  const autor = (
    perfil?.nome_exibicao ||
    user?.user_metadata?.nome_exibicao ||
    user?.email?.split("@")[0] ||
    "JOGADOR"
  ).toUpperCase();

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return avisar("Faça login para comentar.", "erro");
    if (!jogoId || !comentario.trim()) {
      return avisar("Escolha um jogo e escreva o comentário.", "erro");
    }

    setEnviando(true);
    try {
      const { error } = await (supabase.from("avaliacoes") as any).insert({
        jogo_id: Number(jogoId) || jogoId,
        user_id: user.id,
        autor_nome: autor,
        autor_foto: perfil?.foto_url || null,
        nota,
        comentario: comentario.trim(),
      });

      if (error) return avisar(traduzirErro(error.message), "erro");
      setComentario("");
      setJogoId("");
      setNota(5);
      avisar("Comentário publicado!");
      await onRecarregar();
      onVoltar();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto pt-4 sm:pt-8">
      <button
        type="button"
        onClick={onVoltar}
        className="mb-4 text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition"
      >
        ← VOLTAR AO CATÁLOGO
      </button>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white">
          NOVO <span className="text-[#0D80BF]">COMENTÁRIO</span>
        </h2>

        {!user ? (
          <div className="bg-black border border-zinc-800 rounded-2xl p-5 text-center space-y-3">
            <p className="text-xs text-zinc-300 font-bold">
              Faça login para publicar um comentário.
            </p>
            <button
              type="button"
              onClick={onIrParaLogin}
              className="bg-[#0D80BF] hover:bg-sky-500 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase transition"
            >
              IR PARA LOGIN
            </button>
          </div>
        ) : (
          <form onSubmit={publicar} className="space-y-4 text-xs font-bold">
            <select
              value={jogoId}
              onChange={(e) => setJogoId(e.target.value)}
              className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white"
              required
            >
              <option value="">-- SELECIONE UM JOGO --</option>
              {jogos.map((j: any) => (
                <option key={j.id} value={j.id}>
                  {j.titulo}
                  {j.consoles?.nome ? ` (${j.consoles.nome})` : ""}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setNota(v)}
                  className={`py-2.5 rounded-2xl border font-black transition ${
                    nota >= v
                      ? "bg-amber-500/20 border-amber-400 text-amber-300"
                      : "bg-black border-zinc-800 text-zinc-500"
                  }`}
                >
                  ⭐ {v}
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              maxLength={500}
              placeholder="Escreva sua avaliação..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none p-4 rounded-2xl text-sm sm:text-xs text-white resize-none"
              required
            />

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="submit"
                disabled={enviando}
                className="flex-1 bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition"
              >
                {enviando ? "PUBLICANDO..." : "PUBLICAR"}
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
        )}
      </div>
    </div>
  );
}