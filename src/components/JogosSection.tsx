import React, { useState } from "react";
import { supabase } from "../supabase";
import {
  resolverCapaJogo,
  ciclarCapaJogo,
  imagemFallback,
} from "../services/mediaService";
import { traduzirErro } from "../utils/errorTranslator";

export function JogosSection({
  user,
  jogos,
  consoles,
  onRecarregar,
  avisar,
  onEditarJogo,
}: any) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [consoleId, setConsoleId] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [trocandoId, setTrocandoId] = useState<string | null>(null);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editGenero, setEditGenero] = useState("");
  const [editAno, setEditAno] = useState("");
  const [editConsoleId, setEditConsoleId] = useState("");
  const [editImagemUrl, setEditImagemUrl] = useState("");
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) {
      return avisar("Faça login para adicionar um jogo.", "erro");
    }

    const tituloLimpo = titulo.trim();
    const generoLimpo = genero.trim();
    const anoNum = Number(ano);

    if (tituloLimpo.length < 2) {
      return avisar(
        "Digite o título real do jogo (mínimo 2 caracteres).",
        "erro"
      );
    }
    if (generoLimpo.length < 3) {
      return avisar(
        "Informe o gênero do jogo (ex: Ação, RPG, Corrida).",
        "erro"
      );
    }
    if (anoNum < 1972 || anoNum > 2026) {
      return avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro");
    }

    const jaExiste = jogos.some(
      (j: any) => j.titulo.trim().toLowerCase() === tituloLimpo.toLowerCase()
    );
    if (jaExiste) {
      return avisar(
        `O jogo "${tituloLimpo.toUpperCase()}" já está cadastrado no catálogo!`,
        "erro"
      );
    }

    setSalvando(true);
    const consoleObj = consoles.find(
      (c: any) => String(c.id) === String(consoleId)
    );
    const capaFinal =
      imagemUrl.trim() ||
      (await resolverCapaJogo(tituloLimpo, consoleObj?.nome || ""));

    const { error } = await supabase.from("jogos").insert([
      {
        titulo: tituloLimpo,
        genero: generoLimpo,
        ano: anoNum,
        console_id: consoleId,
        imagem_url: capaFinal,
        user_id: user.id,
      },
    ]);
    setSalvando(false);

    if (error) return avisar(traduzirErro(error.message), "erro");
    setTitulo("");
    setGenero("");
    setAno("");
    setImagemUrl("");
    avisar("Jogo adicionado!");
    onRecarregar?.();
  }

  function iniciarEdicao(jogoItem: any) {
    if (!user?.id || user.id !== jogoItem.user_id) {
      return avisar("Você só pode editar jogos criados por você.", "erro");
    }

    if (typeof onEditarJogo === "function") {
      onEditarJogo(jogoItem);
      return;
    }

    setEditandoId(jogoItem.id);
    setEditTitulo(jogoItem.titulo || "");
    setEditGenero(jogoItem.genero || "");
    setEditAno(String(jogoItem.ano || ""));
    setEditConsoleId(jogoItem.console_id || "");
    setEditImagemUrl(jogoItem.imagem_url || "");
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setEditTitulo("");
    setEditGenero("");
    setEditAno("");
    setEditConsoleId("");
    setEditImagemUrl("");
  }

  async function confirmarEdicao(jogoItem: any) {
    if (!user?.id || user.id !== jogoItem.user_id) {
      return avisar("Você só pode editar jogos criados por você.", "erro");
    }

    const tituloLimpo = editTitulo.trim();
    const generoLimpo = editGenero.trim();
    const anoNum = Number(editAno);

    if (tituloLimpo.length < 2) {
      return avisar(
        "Digite o título real do jogo (mínimo 2 caracteres).",
        "erro"
      );
    }
    if (generoLimpo.length < 3) {
      return avisar(
        "Informe o gênero do jogo (ex: Ação, RPG, Corrida).",
        "erro"
      );
    }
    if (anoNum < 1972 || anoNum > 2026) {
      return avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro");
    }
    if (!editConsoleId) {
      return avisar("Selecione um console.", "erro");
    }

    const duplicado = jogos.some(
      (j: any) =>
        j.id !== jogoItem.id &&
        String(j.console_id) === String(editConsoleId) &&
        j.titulo?.trim().toLowerCase() === tituloLimpo.toLowerCase()
    );
    if (duplicado) {
      return avisar(
        `O jogo "${tituloLimpo.toUpperCase()}" já está cadastrado nesse console!`,
        "erro"
      );
    }

    setSalvandoEdicao(true);
    try {
      const { error } = await (supabase.from("jogos") as any)
        .update({
          titulo: tituloLimpo,
          genero: generoLimpo,
          ano: anoNum,
          console_id: editConsoleId,
          imagem_url: editImagemUrl.trim() || null,
        })
        .eq("id", jogoItem.id)
        .eq("user_id", user.id);

      if (error) {
        avisar(traduzirErro(error.message), "erro");
        return;
      }

      cancelarEdicao();
      avisar(`Jogo "${tituloLimpo.toUpperCase()}" atualizado!`);
      onRecarregar?.();
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function procurarNovaCapa(jogoItem: any) {
    if (!user?.id || user.id !== jogoItem.user_id) {
      return avisar(
        "Você só pode trocar a capa dos jogos que você criou.",
        "erro"
      );
    }

    setTrocandoId(jogoItem.id);
    const novaUrl = await ciclarCapaJogo(
      jogoItem.titulo,
      jogoItem.consoles?.nome || "",
      jogoItem.imagem_url
    );

    if (!novaUrl) {
      setTrocandoId(null);
      return avisar(
        `Não encontrei novas capas na internet para ${jogoItem.titulo.toUpperCase()}.`,
        "erro"
      );
    }

    const { error } = await (supabase.from("jogos") as any)
      .update({ imagem_url: novaUrl })
      .eq("id", jogoItem.id)
      .eq("user_id", user.id);

    setTrocandoId(null);
    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar(`Capa atualizada para ${jogoItem.titulo.toUpperCase()}!`);
    onRecarregar?.();
  }

  async function deletar(id: string, ownerId?: string) {
    if (!user?.id || (ownerId && user.id !== ownerId)) {
      return avisar("Você só pode remover jogos criados por você.", "erro");
    }

    const query = supabase.from("jogos").delete().eq("id", id);
    const { error } = await (user?.id ? query.eq("user_id", user.id) : query);

    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar("Jogo removido.");
    onRecarregar?.();
  }

  return (
    <section className="space-y-4">
      <h2 className="text-base sm:text-lg font-black uppercase text-white border-b border-zinc-800 pb-2">
        💿 JOGOS ({jogos.length})
      </h2>

      {user && (
        <form
          onSubmit={salvar}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl text-xs font-bold"
        >
          <input
            placeholder="TÍTULO"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          />
          <input
            placeholder="GÊNERO"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          />
          <input
            type="number"
            min="1972"
            max="2026"
            placeholder="ANO"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
            required
          />
          <select
            value={consoleId}
            onChange={(e) => setConsoleId(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white"
            required
          >
            <option value="">CONSOLE</option>
            {consoles.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.nome.toUpperCase()}
              </option>
            ))}
          </select>
          <input
            placeholder="URL CAPA (OPCIONAL)"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            className="bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white"
          />
          <button
            type="submit"
            disabled={salvando}
            className="bg-[#0D80BF] hover:bg-sky-500 text-white font-black py-2.5 sm:py-2 rounded-xl uppercase transition"
          >
            {salvando ? "..." : "+ JOGO"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {jogos.map((j: any) => {
          const ehDono = Boolean(user?.id && user.id === j.user_id);
          const estaEditando = ehDono && editandoId === j.id;

          return (
            <div
              key={j.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-[#0D80BF] rounded-2xl overflow-hidden flex flex-col transition"
            >
              <div className="relative h-44 sm:h-56 bg-black flex items-center justify-center p-2">
                <img
                  src={j.imagem_url || imagemFallback(j.titulo)}
                  alt={j.titulo}
                  onError={(e) => {
                    e.currentTarget.src = imagemFallback(j.titulo);
                  }}
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#0D80BF]/25 border border-[#0D80BF]/50 text-sky-300 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase max-w-[60%] truncate">
                  {j.consoles?.nome}
                </span>
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-zinc-900 text-zinc-300 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full">
                  {j.ano}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 border-t border-zinc-800 flex flex-col gap-2 mt-auto">
                {estaEditando ? (
                  <div className="space-y-2 text-xs">
                    <input
                      placeholder="TÍTULO"
                      value={editTitulo}
                      onChange={(e) => setEditTitulo(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white"
                    />
                    <input
                      placeholder="GÊNERO"
                      value={editGenero}
                      onChange={(e) => setEditGenero(e.target.value)}
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
                    <select
                      value={editConsoleId}
                      onChange={(e) => setEditConsoleId(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white"
                    >
                      {consoles.map((c: any) => (
                        <option key={c.id} value={c.id}>
                          {c.nome.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="URL CAPA"
                      value={editImagemUrl}
                      onChange={(e) => setEditImagemUrl(e.target.value)}
                      className="w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg text-xs text-white"
                    />
                    <div className="flex gap-1.5 pt-0.5">
                      <button
                        type="button"
                        disabled={salvandoEdicao}
                        onClick={() => confirmarEdicao(j)}
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
                          {j.titulo}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase text-sky-400 truncate">
                          {j.genero}
                        </p>
                      </div>
                      {ehDono && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(j)}
                            className="text-[10px] sm:text-[11px] font-extrabold bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 px-2 py-1 rounded-lg"
                          >
                            EDIT
                          </button>
                          <button
                            type="button"
                            onClick={() => deletar(j.id, j.user_id)}
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
                        disabled={trocandoId === j.id}
                        onClick={() => procurarNovaCapa(j)}
                        className="w-full text-[10px] font-black uppercase bg-zinc-900 hover:bg-[#0D80BF]/25 border border-zinc-700 hover:border-[#0D80BF] text-sky-300 py-1.5 rounded-lg transition"
                      >
                        {trocandoId === j.id ? "PROCURANDO..." : "🔄 NOVA CAPA"}
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