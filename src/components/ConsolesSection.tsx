import React, { useState } from "react";
import { supabase } from "../supabase";
import {
  resolverFotoConsole,
  ciclarFotoConsole,
  imagemFallback,
} from "../services/mediaService";
import { traduzirErro } from "../utils/errorTranslator";

export function ConsolesSection({
  user,
  consoles,
  onRecarregar,
  avisar,
  onEditarConsole,
}: any) {
  const [nome, setNome] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [trocandoId, setTrocandoId] = useState<string | null>(null);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editFabricante, setEditFabricante] = useState("");
  const [editAno, setEditAno] = useState("");
  const [editImagemUrl, setEditImagemUrl] = useState("");
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) {
      return avisar("Faça login para adicionar um console.", "erro");
    }

    const nomeLimpo = nome.trim();
    const fabLimpo = fabricante.trim();
    const anoNum = Number(anoLancamento);

    if (nomeLimpo.length < 2) {
      return avisar("Digite o nome do console (mínimo 2 caracteres).", "erro");
    }
    if (fabLimpo.length < 2) {
      return avisar("Informe o fabricante do console.", "erro");
    }
    if (anoNum < 1972 || anoNum > 2026) {
      return avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro");
    }

    const jaExiste = consoles.some(
      (c: any) => c.nome?.trim().toLowerCase() === nomeLimpo.toLowerCase()
    );
    if (jaExiste) {
      return avisar(
        `O console "${nomeLimpo.toUpperCase()}" já está cadastrado!`,
        "erro"
      );
    }

    setSalvando(true);
    const fotoFinal =
      imagemUrl.trim() || (await resolverFotoConsole(nomeLimpo, fabLimpo));

    const { error } = await supabase.from("consoles").insert([
      {
        nome: nomeLimpo,
        fabricante: fabLimpo,
        ano_lancamento: anoNum,
        imagem_url: fotoFinal,
        user_id: user.id,
      },
    ]);
    setSalvando(false);

    if (error) return avisar(traduzirErro(error.message), "erro");
    setNome("");
    setFabricante("");
    setAnoLancamento("");
    setImagemUrl("");
    avisar("Console adicionado!");
    onRecarregar?.();
  }

  function iniciarEdicao(consoleItem: any) {
    if (!user?.id || user.id !== consoleItem.user_id) {
      return avisar("Você só pode editar consoles criados por você.", "erro");
    }

    if (typeof onEditarConsole === "function") {
      onEditarConsole(consoleItem);
      return;
    }

    setEditandoId(consoleItem.id);
    setEditNome(consoleItem.nome || "");
    setEditFabricante(consoleItem.fabricante || "");
    setEditAno(String(consoleItem.ano_lancamento || ""));
    setEditImagemUrl(consoleItem.imagem_url || "");
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setEditNome("");
    setEditFabricante("");
    setEditAno("");
    setEditImagemUrl("");
  }

  async function confirmarEdicao(consoleItem: any) {
    if (!user?.id || user.id !== consoleItem.user_id) {
      return avisar("Você só pode editar consoles criados por você.", "erro");
    }

    const nomeLimpo = editNome.trim();
    const fabLimpo = editFabricante.trim();
    const anoNum = Number(editAno);

    if (nomeLimpo.length < 2) {
      return avisar("Digite o nome do console (mínimo 2 caracteres).", "erro");
    }
    if (fabLimpo.length < 2) {
      return avisar("Informe o fabricante do console.", "erro");
    }
    if (anoNum < 1972 || anoNum > 2026) {
      return avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro");
    }

    const duplicado = consoles.some(
      (c: any) =>
        c.id !== consoleItem.id &&
        c.nome?.trim().toLowerCase() === nomeLimpo.toLowerCase()
    );
    if (duplicado) {
      return avisar(
        `O console "${nomeLimpo.toUpperCase()}" já está cadastrado!`,
        "erro"
      );
    }

    setSalvandoEdicao(true);
    try {
      const { error } = await (supabase.from("consoles") as any)
        .update({
          nome: nomeLimpo,
          fabricante: fabLimpo,
          ano_lancamento: anoNum,
          imagem_url: editImagemUrl.trim() || null,
        })
        .eq("id", consoleItem.id)
        .eq("user_id", user.id);

      if (error) {
        avisar(traduzirErro(error.message), "erro");
        return;
      }

      cancelarEdicao();
      avisar(`Console "${nomeLimpo.toUpperCase()}" atualizado!`);
      onRecarregar?.();
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function procurarNovaImagem(consoleItem: any) {
    if (!user?.id || user.id !== consoleItem.user_id) {
      return avisar(
        "Você só pode trocar a imagem dos consoles que você criou.",
        "erro"
      );
    }

    setTrocandoId(consoleItem.id);
    const novaUrl = await ciclarFotoConsole(
      consoleItem.nome,
      consoleItem.fabricante,
      consoleItem.imagem_url
    );

    if (!novaUrl) {
      setTrocandoId(null);
      return avisar(
        `Não encontrei novas fotos na internet para ${consoleItem.nome.toUpperCase()}.`,
        "erro"
      );
    }

    const { error } = await (supabase.from("consoles") as any)
      .update({ imagem_url: novaUrl })
      .eq("id", consoleItem.id)
      .eq("user_id", user.id);

    setTrocandoId(null);
    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar(`Imagem atualizada para ${consoleItem.nome.toUpperCase()}!`);
    onRecarregar?.();
  }

  async function deletar(id: string, ownerId?: string) {
    if (!user?.id || (ownerId && user.id !== ownerId)) {
      return avisar("Você só pode remover consoles criados por você.", "erro");
    }

    const query = supabase.from("consoles").delete().eq("id", id);
    const { error } = await (user?.id ? query.eq("user_id", user.id) : query);

    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar("Console removido.");
    onRecarregar?.();
  }

  return (
    <section className="space-y-4">
      <h2 className="text-base sm:text-lg font-black uppercase text-white border-b border-zinc-800 pb-2">
        🕹️ CONSOLES ({consoles.length})
      </h2>

      {user && (
        <form
          onSubmit={salvar}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl text-xs font-bold"
        >
          <input
            placeholder="NOME DO CONSOLE"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          />
          <input
            placeholder="FABRICANTE"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          />
          <input
            type="number"
            min="1972"
            max="2026"
            placeholder="ANO"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
            required
          />
          <input
            placeholder="URL FOTO (OPCIONAL)"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
          />
          <button
            type="submit"
            disabled={salvando}
            className="bg-[#0D80BF] hover:bg-sky-500 text-white font-black py-2.5 sm:py-2 rounded-xl uppercase transition"
          >
            {salvando ? "..." : "+ CONSOLE"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {consoles.map((c: any) => {
          const ehDono = Boolean(user?.id && user.id === c.user_id);
          const estaEditando = ehDono && editandoId === c.id;

          return (
            <div
              key={c.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-[#0D80BF] rounded-2xl overflow-hidden flex flex-col transition"
            >
              <div className="relative h-40 sm:h-48 bg-black flex items-center justify-center p-2">
                <img
                  src={c.imagem_url || imagemFallback(c.nome)}
                  alt={c.nome}
                  onError={(e) => {
                    e.currentTarget.src = imagemFallback(c.nome);
                  }}
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-zinc-900 text-zinc-300 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full">
                  {c.ano_lancamento}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 border-t border-zinc-800 flex flex-col gap-2 mt-auto">
                {estaEditando ? (
                  <div className="space-y-2 text-xs">
                    <input
                      placeholder="NOME"
                      value={editNome}
                      onChange={(e) => setEditNome(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white"
                    />
                    <input
                      placeholder="FABRICANTE"
                      value={editFabricante}
                      onChange={(e) => setEditFabricante(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white"
                    />
                    <input
                      type="number"
                      min="1972"
                      max="2026"
                      placeholder="ANO"
                      value={editAno}
                      onChange={(e) => setEditAno(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg text-xs text-white"
                    />
                    <input
                      placeholder="URL FOTO"
                      value={editImagemUrl}
                      onChange={(e) => setEditImagemUrl(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg text-xs text-white"
                    />
                    <div className="flex gap-1.5 pt-0.5">
                      <button
                        type="button"
                        disabled={salvandoEdicao}
                        onClick={() => confirmarEdicao(c)}
                        className="flex-1 text-[10px] font-black uppercase bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 py-1.5 rounded-lg disabled:opacity-50"
                      >
                        {salvandoEdicao ? "..." : "SALVAR"}
                      </button>
                      <button
                        type="button"
                        disabled={salvandoEdicao}
                        onClick={cancelarEdicao}
                        className="text-[10px] font-black uppercase bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded-lg disabled:opacity-50"
                      >
                        CANCELAR
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="min-w-0">
                        <h3 className="font-black text-xs sm:text-sm uppercase text-white truncate">
                          {c.nome}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase text-sky-400 truncate">
                          {c.fabricante}
                        </p>
                      </div>
                      {ehDono && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(c)}
                            className="text-[10px] sm:text-[11px] font-extrabold bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 px-2 py-1 rounded-lg"
                          >
                            EDIT
                          </button>
                          <button
                            type="button"
                            onClick={() => deletar(c.id, c.user_id)}
                            className="text-[10px] sm:text-[11px] font-extrabold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 px-2 py-1 rounded-lg"
                          >
                            DEL
                          </button>
                        </div>
                      )}
                    </div>

                    {ehDono && (
                      <button
                        type="button"
                        disabled={trocandoId === c.id}
                        onClick={() => procurarNovaImagem(c)}
                        className="w-full text-[10px] font-black uppercase bg-zinc-900 hover:bg-[#0D80BF]/25 border border-zinc-700 hover:border-[#0D80BF] text-sky-300 py-1.5 rounded-lg transition"
                      >
                        {trocandoId === c.id ? "PROCURANDO..." : "🔄 NOVA FOTO"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}