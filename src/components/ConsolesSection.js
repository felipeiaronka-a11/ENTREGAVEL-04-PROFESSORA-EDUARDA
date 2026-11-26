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
exports.ConsolesSection = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("../supabase");
var mediaService_1 = require("../services/mediaService");
var errorTranslator_1 = require("../utils/errorTranslator");
function ConsolesSection(_a) {
    var user = _a.user, consoles = _a.consoles, onRecarregar = _a.onRecarregar, avisar = _a.avisar, onEditarConsole = _a.onEditarConsole;
    var _b = (0, react_1.useState)(""), nome = _b[0], setNome = _b[1];
    var _c = (0, react_1.useState)(""), fabricante = _c[0], setFabricante = _c[1];
    var _d = (0, react_1.useState)(""), anoLancamento = _d[0], setAnoLancamento = _d[1];
    var _e = (0, react_1.useState)(""), imagemUrl = _e[0], setImagemUrl = _e[1];
    var _f = (0, react_1.useState)(false), salvando = _f[0], setSalvando = _f[1];
    var _g = (0, react_1.useState)(null), trocandoId = _g[0], setTrocandoId = _g[1];
    var _h = (0, react_1.useState)(null), editandoId = _h[0], setEditandoId = _h[1];
    var _j = (0, react_1.useState)(""), editNome = _j[0], setEditNome = _j[1];
    var _k = (0, react_1.useState)(""), editFabricante = _k[0], setEditFabricante = _k[1];
    var _l = (0, react_1.useState)(""), editAno = _l[0], setEditAno = _l[1];
    var _m = (0, react_1.useState)(""), editImagemUrl = _m[0], setEditImagemUrl = _m[1];
    var _o = (0, react_1.useState)(false), salvandoEdicao = _o[0], setSalvandoEdicao = _o[1];
    function salvar(e) {
        return __awaiter(this, void 0, void 0, function () {
            var nomeLimpo, fabLimpo, anoNum, jaExiste, fotoFinal, _a, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        if (!(user === null || user === void 0 ? void 0 : user.id)) {
                            return [2 /*return*/, avisar("Faça login para adicionar um console.", "erro")];
                        }
                        nomeLimpo = nome.trim();
                        fabLimpo = fabricante.trim();
                        anoNum = Number(anoLancamento);
                        if (nomeLimpo.length < 2) {
                            return [2 /*return*/, avisar("Digite o nome do console (mínimo 2 caracteres).", "erro")];
                        }
                        if (fabLimpo.length < 2) {
                            return [2 /*return*/, avisar("Informe o fabricante do console.", "erro")];
                        }
                        if (anoNum < 1972 || anoNum > 2026) {
                            return [2 /*return*/, avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro")];
                        }
                        jaExiste = consoles.some(function (c) { var _a; return ((_a = c.nome) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) === nomeLimpo.toLowerCase(); });
                        if (jaExiste) {
                            return [2 /*return*/, avisar("O console \"".concat(nomeLimpo.toUpperCase(), "\" j\u00E1 est\u00E1 cadastrado!"), "erro")];
                        }
                        setSalvando(true);
                        _a = imagemUrl.trim();
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, mediaService_1.resolverFotoConsole)(nomeLimpo, fabLimpo)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        fotoFinal = _a;
                        return [4 /*yield*/, supabase_1.supabase.from("consoles").insert([
                                {
                                    nome: nomeLimpo,
                                    fabricante: fabLimpo,
                                    ano_lancamento: anoNum,
                                    imagem_url: fotoFinal,
                                    user_id: user.id
                                },
                            ])];
                    case 3:
                        error = (_b.sent()).error;
                        setSalvando(false);
                        if (error)
                            return [2 /*return*/, avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro")];
                        setNome("");
                        setFabricante("");
                        setAnoLancamento("");
                        setImagemUrl("");
                        avisar("Console adicionado!");
                        onRecarregar === null || onRecarregar === void 0 ? void 0 : onRecarregar();
                        return [2 /*return*/];
                }
            });
        });
    }
    function iniciarEdicao(consoleItem) {
        if (!(user === null || user === void 0 ? void 0 : user.id) || user.id !== consoleItem.user_id) {
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
    function confirmarEdicao(consoleItem) {
        return __awaiter(this, void 0, void 0, function () {
            var nomeLimpo, fabLimpo, anoNum, duplicado, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id) || user.id !== consoleItem.user_id) {
                            return [2 /*return*/, avisar("Você só pode editar consoles criados por você.", "erro")];
                        }
                        nomeLimpo = editNome.trim();
                        fabLimpo = editFabricante.trim();
                        anoNum = Number(editAno);
                        if (nomeLimpo.length < 2) {
                            return [2 /*return*/, avisar("Digite o nome do console (mínimo 2 caracteres).", "erro")];
                        }
                        if (fabLimpo.length < 2) {
                            return [2 /*return*/, avisar("Informe o fabricante do console.", "erro")];
                        }
                        if (anoNum < 1972 || anoNum > 2026) {
                            return [2 /*return*/, avisar("Ano inválido. Informe um ano entre 1972 e 2026.", "erro")];
                        }
                        duplicado = consoles.some(function (c) {
                            var _a;
                            return c.id !== consoleItem.id &&
                                ((_a = c.nome) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) === nomeLimpo.toLowerCase();
                        });
                        if (duplicado) {
                            return [2 /*return*/, avisar("O console \"".concat(nomeLimpo.toUpperCase(), "\" j\u00E1 est\u00E1 cadastrado!"), "erro")];
                        }
                        setSalvandoEdicao(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, supabase_1.supabase.from("consoles")
                                .update({
                                nome: nomeLimpo,
                                fabricante: fabLimpo,
                                ano_lancamento: anoNum,
                                imagem_url: editImagemUrl.trim() || null
                            })
                                .eq("id", consoleItem.id)
                                .eq("user_id", user.id)];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro");
                            return [2 /*return*/];
                        }
                        cancelarEdicao();
                        avisar("Console \"".concat(nomeLimpo.toUpperCase(), "\" atualizado!"));
                        onRecarregar === null || onRecarregar === void 0 ? void 0 : onRecarregar();
                        return [3 /*break*/, 4];
                    case 3:
                        setSalvandoEdicao(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function procurarNovaImagem(consoleItem) {
        return __awaiter(this, void 0, void 0, function () {
            var novaUrl, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id) || user.id !== consoleItem.user_id) {
                            return [2 /*return*/, avisar("Você só pode trocar a imagem dos consoles que você criou.", "erro")];
                        }
                        setTrocandoId(consoleItem.id);
                        return [4 /*yield*/, (0, mediaService_1.ciclarFotoConsole)(consoleItem.nome, consoleItem.fabricante, consoleItem.imagem_url)];
                    case 1:
                        novaUrl = _a.sent();
                        if (!novaUrl) {
                            setTrocandoId(null);
                            return [2 /*return*/, avisar("N\u00E3o encontrei novas fotos na internet para ".concat(consoleItem.nome.toUpperCase(), "."), "erro")];
                        }
                        return [4 /*yield*/, supabase_1.supabase.from("consoles")
                                .update({ imagem_url: novaUrl })
                                .eq("id", consoleItem.id)
                                .eq("user_id", user.id)];
                    case 2:
                        error = (_a.sent()).error;
                        setTrocandoId(null);
                        if (error)
                            return [2 /*return*/, avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro")];
                        avisar("Imagem atualizada para ".concat(consoleItem.nome.toUpperCase(), "!"));
                        onRecarregar === null || onRecarregar === void 0 ? void 0 : onRecarregar();
                        return [2 /*return*/];
                }
            });
        });
    }
    function deletar(id, ownerId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id) || (ownerId && user.id !== ownerId)) {
                            return [2 /*return*/, avisar("Você só pode remover consoles criados por você.", "erro")];
                        }
                        query = supabase_1.supabase.from("consoles")["delete"]().eq("id", id);
                        return [4 /*yield*/, ((user === null || user === void 0 ? void 0 : user.id) ? query.eq("user_id", user.id) : query)];
                    case 1:
                        error = (_a.sent()).error;
                        if (error)
                            return [2 /*return*/, avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro")];
                        avisar("Console removido.");
                        onRecarregar === null || onRecarregar === void 0 ? void 0 : onRecarregar();
                        return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("section", __assign({ className: "space-y-4" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-base sm:text-lg font-black uppercase text-white border-b border-zinc-800 pb-2" }, { children: ["\uD83D\uDD79\uFE0F CONSOLES (", consoles.length, ")"] })), user && ((0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: salvar, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl text-xs font-bold" }, { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "NOME DO CONSOLE", value: nome, onChange: function (e) { return setNome(e.target.value); }, className: "bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("input", { placeholder: "FABRICANTE", value: fabricante, onChange: function (e) { return setFabricante(e.target.value); }, className: "bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl uppercase text-base sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: "1972", max: "2026", placeholder: "ANO", value: anoLancamento, onChange: function (e) { return setAnoLancamento(e.target.value); }, className: "bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("input", { placeholder: "URL FOTO (OPCIONAL)", value: imagemUrl, onChange: function (e) { return setImagemUrl(e.target.value); }, className: "bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-3.5 py-2.5 sm:py-2 rounded-xl text-base sm:text-xs text-white" }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: salvando, className: "bg-[#0D80BF] hover:bg-sky-500 text-white font-black py-2.5 sm:py-2 rounded-xl uppercase transition" }, { children: salvando ? "..." : "+ CONSOLE" }))] }))), (0, jsx_runtime_1.jsx)("div", __assign({ className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4" }, { children: consoles.map(function (c) {
                    var ehDono = Boolean((user === null || user === void 0 ? void 0 : user.id) && user.id === c.user_id);
                    var estaEditando = ehDono && editandoId === c.id;
                    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-zinc-950 border border-zinc-800 hover:border-[#0D80BF] rounded-2xl overflow-hidden flex flex-col transition" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative h-40 sm:h-48 bg-black flex items-center justify-center p-2" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: c.imagem_url || (0, mediaService_1.imagemFallback)(c.nome), alt: c.nome, onError: function (e) {
                                            e.currentTarget.src = (0, mediaService_1.imagemFallback)(c.nome);
                                        }, className: "max-h-full max-w-full object-contain" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-zinc-900 text-zinc-300 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full" }, { children: c.ano_lancamento }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-2.5 sm:p-3 border-t border-zinc-800 flex flex-col gap-2 mt-auto" }, { children: estaEditando ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2 text-xs" }, { children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "NOME", value: editNome, onChange: function (e) { return setEditNome(e.target.value); }, className: "w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white" }), (0, jsx_runtime_1.jsx)("input", { placeholder: "FABRICANTE", value: editFabricante, onChange: function (e) { return setEditFabricante(e.target.value); }, className: "w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg uppercase text-xs text-white" }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: "1972", max: "2026", placeholder: "ANO", value: editAno, onChange: function (e) { return setEditAno(e.target.value); }, className: "w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg text-xs text-white" }), (0, jsx_runtime_1.jsx)("input", { placeholder: "URL FOTO", value: editImagemUrl, onChange: function (e) { return setEditImagemUrl(e.target.value); }, className: "w-full bg-black border border-zinc-700 focus:border-[#0D80BF] outline-none px-2.5 py-1.5 rounded-lg text-xs text-white" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-1.5 pt-0.5" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: salvandoEdicao, onClick: function () { return confirmarEdicao(c); }, className: "flex-1 text-[10px] font-black uppercase bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 py-1.5 rounded-lg disabled:opacity-50" }, { children: salvandoEdicao ? "..." : "SALVAR" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: salvandoEdicao, onClick: cancelarEdicao, className: "text-[10px] font-black uppercase bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded-lg disabled:opacity-50" }, { children: "CANCELAR" }))] }))] }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-start justify-between gap-1.5" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "min-w-0" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "font-black text-xs sm:text-sm uppercase text-white truncate" }, { children: c.nome })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-[10px] sm:text-[11px] font-bold uppercase text-sky-400 truncate" }, { children: c.fabricante }))] })), ehDono && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-1 shrink-0" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return iniciarEdicao(c); }, className: "text-[10px] sm:text-[11px] font-extrabold bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 px-2 py-1 rounded-lg" }, { children: "EDIT" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return deletar(c.id, c.user_id); }, className: "text-[10px] sm:text-[11px] font-extrabold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 px-2 py-1 rounded-lg" }, { children: "DEL" }))] })))] })), ehDono && ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: trocandoId === c.id, onClick: function () { return procurarNovaImagem(c); }, className: "w-full text-[10px] font-black uppercase bg-zinc-900 hover:bg-[#0D80BF]/25 border border-zinc-700 hover:border-[#0D80BF] text-sky-300 py-1.5 rounded-lg transition" }, { children: trocandoId === c.id ? "PROCURANDO..." : "🔄 NOVA FOTO" })))] })) }))] }), c.id));
                }) }))] })));
}
exports.ConsolesSection = ConsolesSection;
