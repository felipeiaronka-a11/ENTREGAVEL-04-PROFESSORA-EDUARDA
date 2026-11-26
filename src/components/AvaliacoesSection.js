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
exports.AvaliacoesSection = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("../supabase");
var editService_1 = require("../services/editService");
var errorTranslator_1 = require("../utils/errorTranslator");
var FaiscasAvatar_1 = require("./FaiscasAvatar");
function AvaliacoesSection(_a) {
    var user = _a.user, avaliacoes = _a.avaliacoes, onRecarregar = _a.onRecarregar, avisar = _a.avisar, onEditarAvaliacao = _a.onEditarAvaliacao, onIrParaComentar = _a.onIrParaComentar;
    var _b = (0, react_1.useState)(null), excluindoId = _b[0], setExcluindoId = _b[1];
    function apagar(item) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, editService_1.podeEditarItem)(user === null || user === void 0 ? void 0 : user.id, item === null || item === void 0 ? void 0 : item.user_id)) {
                            return [2 /*return*/, avisar("Você só pode apagar seus próprios comentários.", "erro")];
                        }
                        setExcluindoId(item.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 5]);
                        return [4 /*yield*/, supabase_1.supabase.from("avaliacoes")["delete"]()
                                .eq("id", item.id)
                                .eq("user_id", user.id)];
                    case 2:
                        error = (_a.sent()).error;
                        if (error)
                            return [2 /*return*/, avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro")];
                        avisar("Comentário apagado!");
                        return [4 /*yield*/, onRecarregar()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        setExcluindoId(null);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("section", __assign({ className: "space-y-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-wrap items-center justify-between gap-2" }, { children: [(0, jsx_runtime_1.jsxs)("h3", __assign({ className: "text-base sm:text-xl font-black uppercase text-white tracking-wide" }, { children: ["AVALIA\u00C7\u00D5ES & ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "COMENT\u00C1RIOS" }))] })), typeof onIrParaComentar === "function" && ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onIrParaComentar, className: "bg-[#0D80BF] hover:bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase transition" }, { children: "\uD83D\uDCAC NOVO COMENT\u00C1RIO" })))] })), !(avaliacoes === null || avaliacoes === void 0 ? void 0 : avaliacoes.length) ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-zinc-400" }, { children: "Nenhum coment\u00E1rio encontrado." }))) : ((0, jsx_runtime_1.jsx)("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, { children: avaliacoes.map(function (a) {
                    var _a;
                    var dono = (0, editService_1.podeEditarItem)(user === null || user === void 0 ? void 0 : user.id, a === null || a === void 0 ? void 0 : a.user_id);
                    var autor = (a.autor_nome || "JOGADOR").toUpperCase();
                    var fallback = "https://placehold.co/100x100/0D80BF/FFFFFF?text=".concat(autor.slice(0, 2));
                    return ((0, jsx_runtime_1.jsxs)("article", __assign({ className: "bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-3" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2.5" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between gap-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-2 min-w-0" }, { children: [(0, jsx_runtime_1.jsx)(FaiscasAvatar_1.FaiscasAvatar, { src: a.autor_foto || fallback, alt: autor, fallback: fallback, sizeClass: "w-8 h-8" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-xs font-black uppercase text-sky-300 truncate" }, { children: autor }))] })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "text-xs font-black text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full shrink-0" }, { children: ["\u2B50 ", a.nota, "/5"] }))] })), (0, jsx_runtime_1.jsxs)("p", __assign({ className: "text-xs font-extrabold uppercase text-white truncate" }, { children: ["\uD83D\uDCBF ", ((_a = a.jogos) === null || _a === void 0 ? void 0 : _a.titulo) || "JOGO"] })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-xs text-zinc-300 leading-relaxed break-words" }, { children: a.comentario }))] })), dono && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80 text-[11px] font-extrabold uppercase" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return onEditarAvaliacao(a); }, className: "bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-sky-300 px-3 py-1 rounded-full transition" }, { children: "\u270F\uFE0F EDITAR" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: excluindoId === a.id, onClick: function () { return apagar(a); }, className: "bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 disabled:opacity-50 px-3 py-1 rounded-full transition" }, { children: excluindoId === a.id ? "..." : "🗑️ APAGAR" }))] })))] }), a.id));
                }) })))] })));
}
exports.AvaliacoesSection = AvaliacoesSection;
