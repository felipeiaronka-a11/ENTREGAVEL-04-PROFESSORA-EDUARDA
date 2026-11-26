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
exports.PerfilPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var FaiscasAvatar_1 = require("../components/FaiscasAvatar");
function PerfilPage(_a) {
    var _b, _c;
    var user = _a.user, perfil = _a.perfil, onSalvarPerfil = _a.onSalvarPerfil, onExcluirPerfil = _a.onExcluirPerfil, onVoltar = _a.onVoltar;
    var nomePadrao = ((perfil === null || perfil === void 0 ? void 0 : perfil.nome_exibicao) ||
        ((_b = user === null || user === void 0 ? void 0 : user.user_metadata) === null || _b === void 0 ? void 0 : _b.nome_exibicao) ||
        ((_c = user === null || user === void 0 ? void 0 : user.email) === null || _c === void 0 ? void 0 : _c.split("@")[0]) ||
        "JOGADOR").toUpperCase();
    var _d = (0, react_1.useState)(nomePadrao), novoNome = _d[0], setNovoNome = _d[1];
    var _e = (0, react_1.useState)((perfil === null || perfil === void 0 ? void 0 : perfil.foto_url) || ""), novaFoto = _e[0], setNovaFoto = _e[1];
    var _f = (0, react_1.useState)(false), salvando = _f[0], setSalvando = _f[1];
    var _g = (0, react_1.useState)(false), confirmar = _g[0], setConfirmar = _g[1];
    var _h = (0, react_1.useState)(""), senha = _h[0], setSenha = _h[1];
    var _j = (0, react_1.useState)(false), verSenha = _j[0], setVerSenha = _j[1];
    var _k = (0, react_1.useState)(false), excluindo = _k[0], setExcluindo = _k[1];
    (0, react_1.useEffect)(function () {
        setNovoNome(nomePadrao);
        setNovaFoto((perfil === null || perfil === void 0 ? void 0 : perfil.foto_url) || "");
    }, [perfil, user]);
    var fallback = "https://placehold.co/200x200/0D80BF/FFFFFF?text=".concat((novoNome || "JG").slice(0, 2));
    function salvar(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setSalvando(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, onSalvarPerfil(novoNome, novaFoto)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        setSalvando(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function excluir(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!senha.trim())
                            return [2 /*return*/];
                        setExcluindo(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, onExcluirPerfil(senha)];
                    case 2:
                        if (_a.sent()) {
                            setSenha("");
                            setConfirmar(false);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        setExcluindo(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-w-xl mx-auto pt-4 sm:pt-8 space-y-6" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onVoltar, className: "text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition" }, { children: "\u2190 VOLTAR AO CAT\u00C1LOGO" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-4 border-b border-zinc-800 pb-5" }, { children: [(0, jsx_runtime_1.jsx)(FaiscasAvatar_1.FaiscasAvatar, { src: novaFoto.trim() || fallback, alt: "Avatar", fallback: fallback, sizeClass: "w-20 h-20" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "min-w-0" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-xl font-black uppercase text-white" }, { children: ["EDITAR ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "PERFIL" }))] })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-xs text-zinc-400 truncate" }, { children: user === null || user === void 0 ? void 0 : user.email }))] }))] })), (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: salvar, className: "space-y-4 text-xs font-bold" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", maxLength: 35, placeholder: "NOVO NOME DE EXIBI\u00C7\u00C3O", value: novoNome, onChange: function (e) { return setNovoNome(e.target.value.toUpperCase()); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl uppercase text-sm sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "url", placeholder: "URL DA FOTO DE PERFIL (OPCIONAL)", value: novaFoto, onChange: function (e) { return setNovaFoto(e.target.value); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col sm:flex-row gap-2.5 pt-2" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: salvando, className: "flex-1 bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition" }, { children: salvando ? "SALVANDO..." : "SALVAR PERFIL" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onVoltar, className: "bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-5 py-3 rounded-full uppercase transition" }, { children: "CANCELAR" }))] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-rose-950/20 border border-rose-500/35 rounded-3xl p-6 space-y-4 text-xs font-bold" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-black uppercase text-rose-400" }, { children: "ZONA DE PERIGO" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-zinc-400 font-semibold" }, { children: "Apaga conta, perfil, consoles, jogos e avalia\u00E7\u00F5es." }))] }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () {
                                    setConfirmar(function (p) { return !p; });
                                    setSenha("");
                                    setVerSenha(false);
                                }, className: "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-4 py-2.5 rounded-full uppercase transition shrink-0" }, { children: "\uD83D\uDDD1\uFE0F DELETAR CONTA" }))] })), confirmar && ((0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: excluir, className: "pt-3 border-t border-rose-500/30 flex flex-col sm:flex-row gap-2.5" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative flex items-center flex-1" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: verSenha ? "text" : "password", placeholder: "CONFIRME SUA SENHA", value: senha, onChange: function (e) { return setSenha(e.target.value); }, className: "w-full bg-black border border-rose-500/40 focus:border-rose-400 outline-none pl-4 pr-10 py-2.5 rounded-full text-sm sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return setVerSenha(!verSenha); }, className: "absolute right-3.5 text-zinc-400 hover:text-rose-300" }, { children: verSenha ? "🙈" : "👁️" }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: excluindo || !senha.trim(), className: "bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-full font-black uppercase transition" }, { children: excluindo ? "DELETANDO..." : "CONFIRMAR EXCLUSÃO" }))] })))] }))] })));
}
exports.PerfilPage = PerfilPage;
