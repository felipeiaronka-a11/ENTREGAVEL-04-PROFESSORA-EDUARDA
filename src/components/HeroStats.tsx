import React from "react";

export function HeroStats({
  totalConsoles,
  totalJogos,
  totalAvaliacoes,
  busca,
  setBusca,
}: any) {
  return (
    <div className="border-b border-zinc-900 bg-black px-6 py-6 flex flex-wrap justify-between items-center gap-4">
      <h2 className="text-2xl font-black uppercase text-white">
        CATÁLOGO DE <span className="text-[#0D80BF]">CONSOLES & JOGOS</span>
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="🔍 BUSCAR..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-2 rounded-full text-xs font-bold uppercase text-white"
        />
        <div className="flex gap-2 text-xs font-extrabold uppercase">
          <span className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-sky-400">
            🕹️ {totalConsoles} CONSOLES
          </span>
          <span className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-[#0D80BF]">
            💿 {totalJogos} JOGOS
          </span>
          <span className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-white">
            🏆 {totalAvaliacoes} REVIEWS
          </span>
        </div>
      </div>
    </div>
  );
}
