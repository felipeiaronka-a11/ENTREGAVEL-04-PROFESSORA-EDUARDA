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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ComentarPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("../supabase");
var errorTranslator_1 = require("../utils/errorTranslator");
function ComentarPage(_a) {
    var _b, _c;
    var user = _a.user, perfil = _a.perfil, jogos = _a.jogos, onRecarregar = _a.onRecarregar, avisar = _a.avisar, onIrParaLogin = _a.onIrParaLogin, onVoltar = _a.onVoltar;
    var _d = (0, react_1.useState)(""), jogoId = _d[0], setJogoId = _d[1];
    var _e = (0, react_1.useState)(5), nota = _e[0], setNota = _e[1];
    var _f = (0, react_1.useState)(""), comentario = _f[0], setComentario = _f[1];
    var _g = (0, react_1.useState)(false), enviando = _g[0], setEnviando = _g[1];
    var autor = ((perfil === null || perfil === void 0 ? void 0 : perfil.nome_exibicao) ||
        ((_b = user === null || user === void 0 ? void 0 : user.user_metadata) === null || _b === void 0 ? void 0 : _b.nome_exibicao) ||
        ((_c = user === null || user === void 0 ? void 0 : user.email) === null || _c === void 0 ? void 0 : _c.split("@")[0]) ||
        "JOGADOR").toUpperCase();
    function publicar(e) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!(user === null || user === void 0 ? void 0 : user.id))
                            return [2 /*return*/, avisar("Faça login para comentar.", "erro")];
                        if (!jogoId || !comentario.trim()) {
                            return [2 /*return*/, avisar("Escolha um jogo e escreva o comentário.", "erro")];
                        }
                        setEnviando(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 5]);
                        return [4 /*yield*/, supabase_1.supabase.from("avaliacoes").insert({
                                jogo_id: Number(jogoId) || jogoId,
                                user_id: user.id,
                                autor_nome: autor,
                                autor_foto: (perfil === null || perfil === void 0 ? void 0 : perfil.foto_url) || null,
                                nota: nota,
                                comentario: comentario.trim()
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error)
                            return [2 /*return*/, avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro")];
                        setComentario("");
                        setJogoId("");
                        setNota(5);
                        avisar("Comentário publicado!");
                        return [4 /*yield*/, onRecarregar()];
                    case 3:
                        _a.sent();
                        onVoltar();
                        return [3 /*break*/, 5];
                    case 4:
                        setEnviando(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-w-xl mx-auto pt-4 sm:pt-8" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onVoltar, className: "mb-4 text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition" }, { children: "\u2190 VOLTAR AO CAT\u00C1LOGO" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-xl sm:text-2xl font-black uppercase text-white" }, { children: ["NOVO ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "COMENT\u00C1RIO" }))] })), !user ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-black border border-zinc-800 rounded-2xl p-5 text-center space-y-3" }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "text-xs text-zinc-300 font-bold" }, { children: "Fa\u00E7a login para publicar um coment\u00E1rio." })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onIrParaLogin, className: "bg-[#0D80BF] hover:bg-sky-500 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase transition" }, { children: "IR PARA LOGIN" }))] }))) : ((0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: publicar, className: "space-y-4 text-xs font-bold" }, { children: [(0, jsx_runtime_1.jsxs)("select", __assign({ value: jogoId, onChange: function (e) { return setJogoId(e.target.value); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white", required: true }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: "" }, { children: "-- SELECIONE UM JOGO --" })), jogos.map(function (j) {
                                        var _a;
                                        return ((0, jsx_runtime_1.jsxs)("option", __assign({ value: j.id }, { children: [j.titulo, ((_a = j.consoles) === null || _a === void 0 ? void 0 : _a.nome) ? " (".concat(j.consoles.nome, ")") : ""] }), j.id));
                                    })] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "grid grid-cols-5 gap-2" }, { children: [1, 2, 3, 4, 5].map(function (v) { return ((0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", onClick: function () { return setNota(v); }, className: "py-2.5 rounded-2xl border font-black transition ".concat(nota >= v
                                        ? "bg-amber-500/20 border-amber-400 text-amber-300"
                                        : "bg-black border-zinc-800 text-zinc-500") }, { children: ["\u2B50 ", v] }), v)); }) })), (0, jsx_runtime_1.jsx)("textarea", { rows: 4, maxLength: 500, placeholder: "Escreva sua avalia\u00E7\u00E3o...", value: comentario, onChange: function (e) { return setComentario(e.target.value); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none p-4 rounded-2xl text-sm sm:text-xs text-white resize-none", required: true }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col sm:flex-row gap-2.5 pt-2" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: enviando, className: "flex-1 bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition" }, { children: enviando ? "PUBLICANDO..." : "PUBLICAR" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onVoltar, className: "bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-5 py-3 rounded-full uppercase transition" }, { children: "CANCELAR" }))] }))] })))] }))] })));
}
exports.ComentarPage = ComentarPage;
