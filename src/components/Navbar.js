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
exports.Navbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var FaiscasAvatar_1 = require("./FaiscasAvatar");
function Navbar(_a) {
    var _b, _c;
    var user = _a.user, perfil = _a.perfil, paginaAtual = _a.paginaAtual, onNavegar = _a.onNavegar, onLogout = _a.onLogout, onSync = _a.onSync, loading = _a.loading;
    var nome = ((perfil === null || perfil === void 0 ? void 0 : perfil.nome_exibicao) ||
        ((_b = user === null || user === void 0 ? void 0 : user.user_metadata) === null || _b === void 0 ? void 0 : _b.nome_exibicao) ||
        ((_c = user === null || user === void 0 ? void 0 : user.email) === null || _c === void 0 ? void 0 : _c.split("@")[0]) ||
        "JOGADOR").toUpperCase();
    var fallback = "https://placehold.co/200x200/0D80BF/FFFFFF?text=".concat(nome.slice(0, 2));
    var foto = (perfil === null || perfil === void 0 ? void 0 : perfil.foto_url) || fallback;
    var btn = function (ativa) {
        return "px-3.5 py-2 rounded-full text-xs font-bold uppercase border transition ".concat(ativa
            ? "bg-[#0D80BF] border-[#0D80BF] text-white"
            : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200");
    };
    return ((0, jsx_runtime_1.jsx)("nav", __assign({ className: "sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur px-3.5 sm:px-6 py-3" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", onClick: function () { return onNavegar("catalogo"); }, className: "flex items-center gap-2" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "text-2xl" }, { children: "\uD83C\uDFAE" })), (0, jsx_runtime_1.jsxs)("h1", __assign({ className: "text-xl sm:text-2xl font-black uppercase tracking-wider text-white" }, { children: ["GAME", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "VAULT" }))] }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: user ? onLogout : function () { return onNavegar("login"); }, className: "lg:hidden px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase border transition ".concat(user
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                                : "bg-[#0D80BF] text-white border-[#0D80BF]") }, { children: user ? "SAIR" : "ENTRAR" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-wrap items-center gap-2" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return onNavegar("catalogo"); }, className: btn(paginaAtual === "catalogo") }, { children: "\uD83C\uDFE0 CAT\u00C1LOGO" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return onNavegar(user ? "comentar" : "login"); }, className: btn(paginaAtual === "comentar") }, { children: "\uD83D\uDCAC COMENTAR" })), user ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", onClick: function () { return onNavegar("perfil"); }, className: "flex items-center gap-2 pr-3.5 pl-1.5 py-1 rounded-full text-xs font-bold border transition ".concat(paginaAtual === "perfil"
                                        ? "bg-[#0D80BF]/25 border-[#0D80BF] text-white"
                                        : "bg-zinc-950 hover:bg-zinc-900 border-white/25 text-sky-300") }, { children: [(0, jsx_runtime_1.jsx)(FaiscasAvatar_1.FaiscasAvatar, { src: foto, alt: nome, fallback: fallback, sizeClass: "w-8 h-8" }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "uppercase font-black truncate max-w-[130px]" }, { children: ["\u2699\uFE0F ", nome] }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onSync, disabled: loading, className: "bg-[#0D80BF]/20 hover:bg-[#0D80BF]/30 text-sky-300 border border-[#0D80BF]/50 px-3.5 py-2 rounded-full text-xs font-bold uppercase transition" }, { children: loading ? "..." : "🔄 SYNC ALL" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onLogout, className: "hidden lg:inline-block bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 px-3.5 py-2 rounded-full text-xs font-bold uppercase transition" }, { children: "SAIR" }))] })) : ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return onNavegar("login"); }, className: "hidden lg:inline-block bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-extrabold uppercase transition" }, { children: "ENTRAR / CADASTRAR" })))] }))] })) })));
}
exports.Navbar = Navbar;
