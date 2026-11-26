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
exports.EditarItensModal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var editService_1 = require("../services/editService");
var mediaService_1 = require("../services/mediaService");
function EditarItensModal(_a) {
    var alvo = _a.alvo, userId = _a.userId, _b = _a.consoles, consoles = _b === void 0 ? [] : _b, onFechar = _a.onFechar, onConsoleAtualizado = _a.onConsoleAtualizado, onJogoAtualizado = _a.onJogoAtualizado, onAvaliacaoAtualizada = _a.onAvaliacaoAtualizada;
    var _c = (0, react_1.useState)(""), nomeConsole = _c[0], setNomeConsole = _c[1];
    var _d = (0, react_1.useState)(""), fabricante = _d[0], setFabricante = _d[1];
    var _e = (0, react_1.useState)(2020), anoConsole = _e[0], setAnoConsole = _e[1];
    var _f = (0, react_1.useState)(""), imagemConsole = _f[0], setImagemConsole = _f[1];
    var _g = (0, react_1.useState)(""), tituloJogo = _g[0], setTituloJogo = _g[1];
    var _h = (0, react_1.useState)(""), generoJogo = _h[0], setGeneroJogo = _h[1];
    var _j = (0, react_1.useState)(2020), anoJogo = _j[0], setAnoJogo = _j[1];
    var _k = (0, react_1.useState)(""), consoleIdJogo = _k[0], setConsoleIdJogo = _k[1];
    var _l = (0, react_1.useState)(""), imagemJogo = _l[0], setImagemJogo = _l[1];
    var _m = (0, react_1.useState)(10), nota = _m[0], setNota = _m[1];
    var _o = (0, react_1.useState)(""), comentario = _o[0], setComentario = _o[1];
    var _p = (0, react_1.useState)(false), buscandoImagem = _p[0], setBuscandoImagem = _p[1];
    var _q = (0, react_1.useState)(false), salvando = _q[0], setSalvando = _q[1];
    var _r = (0, react_1.useState)(null), erro = _r[0], setErro = _r[1];
    (0, react_1.useEffect)(function () {
        setErro(null);
        if (!alvo)
            return;
        if (alvo.tipo === "console") {
            setNomeConsole(alvo.dados.nome);
            setFabricante(alvo.dados.fabricante);
            setAnoConsole(alvo.dados.ano_lancamento);
            setImagemConsole(alvo.dados.imagem_url || "");
        }
        else if (alvo.tipo === "jogo") {
            setTituloJogo(alvo.dados.titulo);
            setGeneroJogo(alvo.dados.genero);
            setAnoJogo(alvo.dados.ano);
            setConsoleIdJogo(alvo.dados.console_id);
            setImagemJogo(alvo.dados.imagem_url || "");
        }
        else if (alvo.tipo === "avaliacao") {
            setNota(alvo.dados.nota);
            setComentario(alvo.dados.comentario);
        }
    }, [alvo]);
    if (!alvo)
        return null;
    var autorizado = (0, editService_1.podeEditarItem)(userId, alvo.dados.user_id);
    function handleTrocarImagem() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var proxima, consoleNome, proxima, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!alvo || alvo.tipo === "avaliacao")
                            return [2 /*return*/];
                        setErro(null);
                        setBuscandoImagem(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        if (!(alvo.tipo === "console")) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, mediaService_1.ciclarFotoConsole)(nomeConsole || alvo.dados.nome, fabricante || alvo.dados.fabricante, imagemConsole)];
                    case 2:
                        proxima = _c.sent();
                        if (!proxima) {
                            setErro("Não foram encontradas novas imagens para este console.");
                            return [2 /*return*/];
                        }
                        setImagemConsole(proxima);
                        return [3 /*break*/, 5];
                    case 3:
                        consoleNome = ((_a = consoles.find(function (c) { return c.id === consoleIdJogo; })) === null || _a === void 0 ? void 0 : _a.nome) || "";
                        return [4 /*yield*/, (0, mediaService_1.ciclarCapaJogo)(tituloJogo || alvo.dados.titulo, consoleNome, imagemJogo)];
                    case 4:
                        proxima = _c.sent();
                        if (!proxima) {
                            setErro("Não foram encontradas novas capas para este jogo.");
                            return [2 /*return*/];
                        }
                        setImagemJogo(proxima);
                        _c.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        _b = _c.sent();
                        setErro("Erro ao buscar nova imagem.");
                        return [3 /*break*/, 8];
                    case 7:
                        setBuscandoImagem(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function handleSalvar(e) {
        return __awaiter(this, void 0, void 0, function () {
            var atualizado, atualizado, atualizada, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!alvo || !userId)
                            return [2 /*return*/];
                        if (!autorizado) {
                            setErro("Você só pode editar itens criados por você.");
                            return [2 /*return*/];
                        }
                        setErro(null);
                        setSalvando(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        if (!(alvo.tipo === "console")) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, editService_1.atualizarConsoleNoBanco)({
                                id: alvo.dados.id,
                                userId: userId,
                                ownerId: alvo.dados.user_id,
                                nome: nomeConsole,
                                fabricante: fabricante,
                                ano_lancamento: anoConsole,
                                imagem_url: imagemConsole
                            })];
                    case 2:
                        atualizado = _a.sent();
                        onConsoleAtualizado === null || onConsoleAtualizado === void 0 ? void 0 : onConsoleAtualizado(atualizado);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(alvo.tipo === "jogo")) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, editService_1.atualizarJogoNoBanco)({
                                id: alvo.dados.id,
                                userId: userId,
                                ownerId: alvo.dados.user_id,
                                titulo: tituloJogo,
                                genero: generoJogo,
                                ano: anoJogo,
                                console_id: consoleIdJogo,
                                imagem_url: imagemJogo
                            })];
                    case 4:
                        atualizado = _a.sent();
                        onJogoAtualizado === null || onJogoAtualizado === void 0 ? void 0 : onJogoAtualizado(atualizado);
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(alvo.tipo === "avaliacao")) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, editService_1.atualizarAvaliacaoNoBanco)({
                                id: alvo.dados.id,
                                userId: userId,
                                ownerId: alvo.dados.user_id,
                                nota: nota,
                                comentario: comentario
                            })];
                    case 6:
                        atualizada = _a.sent();
                        onAvaliacaoAtualizada === null || onAvaliacaoAtualizada === void 0 ? void 0 : onAvaliacaoAtualizada(atualizada);
                        _a.label = 7;
                    case 7:
                        onFechar();
                        return [3 /*break*/, 10];
                    case 8:
                        err_1 = _a.sent();
                        setErro((err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || "Não foi possível salvar as alterações.");
                        return [3 /*break*/, 10];
                    case 9:
                        setSalvando(false);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 space-y-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-lg font-semibold" }, { children: [alvo.tipo === "console" && "Editar Console", alvo.tipo === "jogo" && "Editar Jogo", alvo.tipo === "avaliacao" && "Editar Avaliação"] })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onFechar, className: "text-sm text-zinc-400 hover:text-white" }, { children: "Fechar" }))] })), !autorizado && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300" }, { children: "Este item pertence a outro usu\u00E1rio e n\u00E3o pode ser editado por voc\u00EA." }))), erro && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "rounded border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300" }, { children: erro }))), (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: handleSalvar, className: "space-y-3" }, { children: [alvo.tipo === "console" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Nome" })), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: nomeConsole, onChange: function (e) { return setNomeConsole(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Fabricante" })), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: fabricante, onChange: function (e) { return setFabricante(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Ano de lan\u00E7amento" })), (0, jsx_runtime_1.jsx)("input", { type: "number", required: true, value: anoConsole, onChange: function (e) { return setAnoConsole(Number(e.target.value)); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "URL da imagem" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: imagemConsole, onChange: function (e) { return setImagemConsole(e.target.value); }, placeholder: "https://...", className: "flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: buscandoImagem || !autorizado, onClick: handleTrocarImagem, className: "rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs hover:bg-zinc-700 disabled:opacity-50" }, { children: buscandoImagem ? "Buscando..." : "Trocar foto" }))] })), (0, jsx_runtime_1.jsx)("img", { src: imagemConsole || (0, mediaService_1.imagemFallback)(nomeConsole || "CONSOLE"), alt: nomeConsole, className: "mt-2 h-28 w-28 rounded object-cover border border-zinc-800" })] })] })), alvo.tipo === "jogo" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "T\u00EDtulo" })), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: tituloJogo, onChange: function (e) { return setTituloJogo(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "G\u00EAnero" })), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: generoJogo, onChange: function (e) { return setGeneroJogo(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-2 gap-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Ano" })), (0, jsx_runtime_1.jsx)("input", { type: "number", required: true, value: anoJogo, onChange: function (e) { return setAnoJogo(Number(e.target.value)); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Console" })), (0, jsx_runtime_1.jsx)("select", __assign({ value: consoleIdJogo, onChange: function (e) { return setConsoleIdJogo(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" }, { children: consoles.map(function (c) { return ((0, jsx_runtime_1.jsx)("option", __assign({ value: c.id }, { children: c.nome }), c.id)); }) }))] })] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "URL da capa" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: imagemJogo, onChange: function (e) { return setImagemJogo(e.target.value); }, placeholder: "https://...", className: "flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", disabled: buscandoImagem || !autorizado, onClick: handleTrocarImagem, className: "rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs hover:bg-zinc-700 disabled:opacity-50" }, { children: buscandoImagem ? "Buscando..." : "Trocar capa" }))] })), (0, jsx_runtime_1.jsx)("img", { src: imagemJogo || (0, mediaService_1.imagemFallback)(tituloJogo || "JOGO"), alt: tituloJogo, className: "mt-2 h-32 w-24 rounded object-cover border border-zinc-800" })] })] })), alvo.tipo === "avaliacao" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Nota (1 a 10)" })), (0, jsx_runtime_1.jsx)("input", { type: "number", min: 1, max: 10, required: true, value: nota, onChange: function (e) { return setNota(Number(e.target.value)); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs text-zinc-400 mb-1" }, { children: "Coment\u00E1rio" })), (0, jsx_runtime_1.jsx)("textarea", { rows: 4, required: true, value: comentario, onChange: function (e) { return setComentario(e.target.value); }, className: "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" })] })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-end gap-2 pt-2" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onFechar, className: "rounded bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700" }, { children: "Cancelar" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: salvando || !autorizado, className: "rounded bg-sky-500 px-4 py-2 text-sm font-medium text-black hover:bg-sky-400 disabled:opacity-50" }, { children: salvando ? "Salvando..." : "Salvar alterações" }))] }))] }))] })) })));
}
exports.EditarItensModal = EditarItensModal;
