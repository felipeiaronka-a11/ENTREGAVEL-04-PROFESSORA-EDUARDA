import React, { useEffect, useState } from "react";
import {
  atualizarAvaliacaoNoBanco,
  atualizarConsoleNoBanco,
  atualizarJogoNoBanco,
  podeEditarItem,
} from "../services/editService";
import {
  ciclarCapaJogo,
  ciclarFotoConsole,
  imagemFallback,
} from "../services/mediaService";

export type ConsoleItem = {
  id: string;
  nome: string;
  fabricante: string;
  ano_lancamento: number;
  user_id: string;
  imagem_url?: string | null;
};

export type JogoItem = {
  id: string;
  titulo: string;
  genero: string;
  ano: number;
  console_id: string;
  user_id: string;
  imagem_url?: string | null;
};

export type AvaliacaoItem = {
  id: string;
  nota: number;
  comentario: string;
  jogo_id: string;
  user_id: string;
  autor_nome?: string | null;
  autor_foto?: string | null;
};

type AlvoEdicao =
  | { tipo: "console"; dados: ConsoleItem }
  | { tipo: "jogo"; dados: JogoItem }
  | { tipo: "avaliacao"; dados: AvaliacaoItem }
  | null;

interface Props {
  alvo: AlvoEdicao;
  userId?: string | null;
  consoles?: ConsoleItem[];
  onFechar: () => void;
  onConsoleAtualizado?: (item: ConsoleItem) => void;
  onJogoAtualizado?: (item: JogoItem) => void;
  onAvaliacaoAtualizada?: (item: AvaliacaoItem) => void;
}

export function EditarItensModal({
  alvo,
  userId,
  consoles = [],
  onFechar,
  onConsoleAtualizado,
  onJogoAtualizado,
  onAvaliacaoAtualizada,
}: Props) {
  const [nomeConsole, setNomeConsole] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [anoConsole, setAnoConsole] = useState(2020);
  const [imagemConsole, setImagemConsole] = useState("");

  const [tituloJogo, setTituloJogo] = useState("");
  const [generoJogo, setGeneroJogo] = useState("");
  const [anoJogo, setAnoJogo] = useState(2020);
  const [consoleIdJogo, setConsoleIdJogo] = useState("");
  const [imagemJogo, setImagemJogo] = useState("");

  const [nota, setNota] = useState(10);
  const [comentario, setComentario] = useState("");

  const [buscandoImagem, setBuscandoImagem] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setErro(null);
    if (!alvo) return;

    if (alvo.tipo === "console") {
      setNomeConsole(alvo.dados.nome);
      setFabricante(alvo.dados.fabricante);
      setAnoConsole(alvo.dados.ano_lancamento);
      setImagemConsole(alvo.dados.imagem_url || "");
    } else if (alvo.tipo === "jogo") {
      setTituloJogo(alvo.dados.titulo);
      setGeneroJogo(alvo.dados.genero);
      setAnoJogo(alvo.dados.ano);
      setConsoleIdJogo(alvo.dados.console_id);
      setImagemJogo(alvo.dados.imagem_url || "");
    } else if (alvo.tipo === "avaliacao") {
      setNota(alvo.dados.nota);
      setComentario(alvo.dados.comentario);
    }
  }, [alvo]);

  if (!alvo) return null;

  const autorizado = podeEditarItem(userId, alvo.dados.user_id);

  async function handleTrocarImagem() {
    if (!alvo || alvo.tipo === "avaliacao") return;
    setErro(null);
    setBuscandoImagem(true);

    try {
      if (alvo.tipo === "console") {
        const proxima = await ciclarFotoConsole(
          nomeConsole || alvo.dados.nome,
          fabricante || alvo.dados.fabricante,
          imagemConsole
        );
        if (!proxima) {
          setErro("Não foram encontradas novas imagens para este console.");
          return;
        }
        setImagemConsole(proxima);
      } else {
        const consoleNome =
          consoles.find((c) => c.id === consoleIdJogo)?.nome || "";
        const proxima = await ciclarCapaJogo(
          tituloJogo || alvo.dados.titulo,
          consoleNome,
          imagemJogo
        );
        if (!proxima) {
          setErro("Não foram encontradas novas capas para este jogo.");
          return;
        }
        setImagemJogo(proxima);
      }
    } catch {
      setErro("Erro ao buscar nova imagem.");
    } finally {
      setBuscandoImagem(false);
    }
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!alvo || !userId) return;

    if (!autorizado) {
      setErro("Você só pode editar itens criados por você.");
      return;
    }

    setErro(null);
    setSalvando(true);

    try {
      if (alvo.tipo === "console") {
        const atualizado = await atualizarConsoleNoBanco({
          id: alvo.dados.id,
          userId,
          ownerId: alvo.dados.user_id,
          nome: nomeConsole,
          fabricante,
          ano_lancamento: anoConsole,
          imagem_url: imagemConsole,
        });
        onConsoleAtualizado?.(atualizado);
      } else if (alvo.tipo === "jogo") {
        const atualizado = await atualizarJogoNoBanco({
          id: alvo.dados.id,
          userId,
          ownerId: alvo.dados.user_id,
          titulo: tituloJogo,
          genero: generoJogo,
          ano: anoJogo,
          console_id: consoleIdJogo,
          imagem_url: imagemJogo,
        });
        onJogoAtualizado?.(atualizado);
      } else if (alvo.tipo === "avaliacao") {
        const atualizada = await atualizarAvaliacaoNoBanco({
          id: alvo.dados.id,
          userId,
          ownerId: alvo.dados.user_id,
          nota,
          comentario,
        });
        onAvaliacaoAtualizada?.(atualizada);
      }

      onFechar();
    } catch (err: any) {
      setErro(err?.message || "Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {alvo.tipo === "console" && "Editar Console"}
            {alvo.tipo === "jogo" && "Editar Jogo"}
            {alvo.tipo === "avaliacao" && "Editar Avaliação"}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            className="text-sm text-zinc-400 hover:text-white"
          >
            Fechar
          </button>
        </div>

        {!autorizado && (
          <div className="rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
            Este item pertence a outro usuário e não pode ser editado por você.
          </div>
        )}

        {erro && (
          <div className="rounded border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
            {erro}
          </div>
        )}

        <form onSubmit={handleSalvar} className="space-y-3">
          {alvo.tipo === "console" && (
            <>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={nomeConsole}
                  onChange={(e) => setNomeConsole(e.target.value)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Fabricante
                </label>
                <input
                  type="text"
                  required
                  value={fabricante}
                  onChange={(e) => setFabricante(e.target.value)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Ano de lançamento
                </label>
                <input
                  type="number"
                  required
                  value={anoConsole}
                  onChange={(e) => setAnoConsole(Number(e.target.value))}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  URL da imagem
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imagemConsole}
                    onChange={(e) => setImagemConsole(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    disabled={buscandoImagem || !autorizado}
                    onClick={handleTrocarImagem}
                    className="rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs hover:bg-zinc-700 disabled:opacity-50"
                  >
                    {buscandoImagem ? "Buscando..." : "Trocar foto"}
                  </button>
                </div>
                <img
                  src={imagemConsole || imagemFallback(nomeConsole || "CONSOLE")}
                  alt={nomeConsole}
                  className="mt-2 h-28 w-28 rounded object-cover border border-zinc-800"
                />
              </div>
            </>
          )}

          {alvo.tipo === "jogo" && (
            <>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={tituloJogo}
                  onChange={(e) => setTituloJogo(e.target.value)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Gênero</label>
                <input
                  type="text"
                  required
                  value={generoJogo}
                  onChange={(e) => setGeneroJogo(e.target.value)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Ano</label>
                  <input
                    type="number"
                    required
                    value={anoJogo}
                    onChange={(e) => setAnoJogo(Number(e.target.value))}
                    className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Console
                  </label>
                  <select
                    value={consoleIdJogo}
                    onChange={(e) => setConsoleIdJogo(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                  >
                    {consoles.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  URL da capa
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imagemJogo}
                    onChange={(e) => setImagemJogo(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    disabled={buscandoImagem || !autorizado}
                    onClick={handleTrocarImagem}
                    className="rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs hover:bg-zinc-700 disabled:opacity-50"
                  >
                    {buscandoImagem ? "Buscando..." : "Trocar capa"}
                  </button>
                </div>
                <img
                  src={imagemJogo || imagemFallback(tituloJogo || "JOGO")}
                  alt={tituloJogo}
                  className="mt-2 h-32 w-24 rounded object-cover border border-zinc-800"
                />
              </div>
            </>
          )}

          {alvo.tipo === "avaliacao" && (
            <>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Nota (1 a 10)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  value={nota}
                  onChange={(e) => setNota(Number(e.target.value))}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Comentário
                </label>
                <textarea
                  rows={4}
                  required
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onFechar}
              className="rounded bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando || !autorizado}
              className="rounded bg-sky-500 px-4 py-2 text-sm font-medium text-black hover:bg-sky-400 disabled:opacity-50"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}