import React, { useState } from "react";
import { supabase } from "../supabase";
import { podeEditarItem } from "../services/editService";
import { traduzirErro } from "../utils/errorTranslator";
import { FaiscasAvatar } from "./FaiscasAvatar";

export function AvaliacoesSection({
  user,
  avaliacoes,
  onRecarregar,
  avisar,
  onEditarAvaliacao,
  onIrParaComentar,
}: any) {
  const [excluindoId, setExcluindoId] = useState<string | number | null>(null);

  async function apagar(item: any) {
    if (!podeEditarItem(user?.id, item?.user_id)) {
      return avisar("Você só pode apagar seus próprios comentários.", "erro");
    }
    setExcluindoId(item.id);
    try {
      const { error } = await (supabase.from("avaliacoes") as any)
        .delete()
        .eq("id", item.id)
        .eq("user_id", user.id);

      if (error) return avisar(traduzirErro(error.message), "erro");
      avisar("Comentário apagado!");
      await onRecarregar();
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base sm:text-xl font-black uppercase text-white tracking-wide">
          AVALIAÇÕES & <span className="text-[#0D80BF]">COMENTÁRIOS</span>
        </h3>
        {typeof onIrParaComentar === "function" && (
          <button
            type="button"
            onClick={onIrParaComentar}
            className="bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase transition"
          >
            💬 NOVO COMENTÁRIO
          </button>
        )}
      </div>

      {!avaliacoes?.length ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-zinc-400">
          Nenhum comentário encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {avaliacoes.map((a: any) => {
            const dono = podeEditarItem(user?.id, a?.user_id);
            const autor = (a.autor_nome || "JOGADOR").toUpperCase();
            const fallback = `https://placehold.co/100x100/0D80BF/FFFFFF?text=${autor.slice(
              0,
              2
            )}`;

            return (
              <article
                key={a.id}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FaiscasAvatar
                        src={a.autor_foto || fallback}
                        alt={autor}
                        fallback={fallback}
                        sizeClass="w-8 h-8"
                      />
                      <span className="text-xs font-black uppercase text-sky-300 truncate">
                        {autor}
                      </span>
                    </div>
                    <span className="text-xs font-black text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full shrink-0">
                      ⭐ {a.nota}/5
                    </span>
                  </div>

                  <p className="text-xs font-extrabold uppercase text-white truncate">
                    💿 {a.jogos?.titulo || "JOGO"}
                  </p>

                  <p className="text-xs text-zinc-300 leading-relaxed break-words">
                    {a.comentario}
                  </p>
                </div>

                {dono && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80 text-[11px] font-extrabold uppercase">
                    <button
                      type="button"
                      onClick={() => onEditarAvaliacao(a)}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-sky-300 px-3 py-1 rounded-full transition"
                    >
                      ✏️ EDITAR
                    </button>
                    <button
                      type="button"
                      disabled={excluindoId === a.id}
                      onClick={() => apagar(a)}
                      className="bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 disabled:opacity-50 px-3 py-1 rounded-full transition"
                    >
                      {excluindoId === a.id ? "..." : "🗑️ APAGAR"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}