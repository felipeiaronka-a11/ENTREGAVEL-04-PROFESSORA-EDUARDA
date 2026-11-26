"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.HeroStats = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function HeroStats(_a) {
    var totalConsoles = _a.totalConsoles, totalJogos = _a.totalJogos, totalAvaliacoes = _a.totalAvaliacoes, busca = _a.busca, setBusca = _a.setBusca;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "border-b border-zinc-900 bg-black px-6 py-6 flex flex-wrap justify-between items-center gap-4" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-2xl font-black uppercase text-white" }, { children: ["CAT\u00C1LOGO DE ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "CONSOLES & JOGOS" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-wrap items-center gap-3" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD83D\uDD0D BUSCAR...", value: busca, onChange: function (e) { return setBusca(e.target.value); }, className: "bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-2 rounded-full text-xs font-bold uppercase text-white" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2 text-xs font-extrabold uppercase" }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-sky-400" }, { children: ["\uD83D\uDD79\uFE0F ", totalConsoles, " CONSOLES"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-[#0D80BF]" }, { children: ["\uD83D\uDCBF ", totalJogos, " JOGOS"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-full text-white" }, { children: ["\uD83C\uDFC6 ", totalAvaliacoes, " REVIEWS"] }))] }))] }))] })));
}
exports.HeroStats = HeroStats;
