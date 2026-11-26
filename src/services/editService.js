"use strict";
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
exports.atualizarAvaliacaoNoBanco = exports.atualizarJogoNoBanco = exports.atualizarConsoleNoBanco = exports.podeEditarItem = void 0;
var supabase_1 = require("../supabase");
function podeEditarItem(userId, ownerId) {
    return Boolean(userId && ownerId && userId === ownerId);
}
exports.podeEditarItem = podeEditarItem;
function atualizarConsoleNoBanco(params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, data, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!podeEditarItem(params.userId, params.ownerId)) {
                        throw new Error("Você só pode editar consoles criados por você.");
                    }
                    return [4 /*yield*/, supabase_1.supabase.from("consoles")
                            .update({
                            nome: params.nome.trim(),
                            fabricante: params.fabricante.trim(),
                            ano_lancamento: Number(params.ano_lancamento),
                            imagem_url: ((_a = params.imagem_url) === null || _a === void 0 ? void 0 : _a.trim()) || null
                        })
                            .eq("id", params.id)
                            .eq("user_id", params.userId)
                            .select()
                            .single()];
                case 1:
                    _b = _c.sent(), data = _b.data, error = _b.error;
                    if (error) {
                        if (error.code === "23505") {
                            throw new Error("Já existe um console cadastrado com esse nome.");
                        }
                        throw error;
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.atualizarConsoleNoBanco = atualizarConsoleNoBanco;
function atualizarJogoNoBanco(params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, data, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!podeEditarItem(params.userId, params.ownerId)) {
                        throw new Error("Você só pode editar jogos criados por você.");
                    }
                    return [4 /*yield*/, supabase_1.supabase.from("jogos")
                            .update({
                            titulo: params.titulo.trim(),
                            genero: params.genero.trim(),
                            ano: Number(params.ano),
                            console_id: params.console_id,
                            imagem_url: ((_a = params.imagem_url) === null || _a === void 0 ? void 0 : _a.trim()) || null
                        })
                            .eq("id", params.id)
                            .eq("user_id", params.userId)
                            .select()
                            .single()];
                case 1:
                    _b = _c.sent(), data = _b.data, error = _b.error;
                    if (error) {
                        if (error.code === "23505") {
                            throw new Error("Já existe um jogo com esse título nesse console.");
                        }
                        throw error;
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.atualizarJogoNoBanco = atualizarJogoNoBanco;
function atualizarAvaliacaoNoBanco(params) {
    return __awaiter(this, void 0, void 0, function () {
        var notaValida, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!podeEditarItem(params.userId, params.ownerId)) {
                        throw new Error("Você só pode editar suas próprias avaliações.");
                    }
                    notaValida = Number(params.nota);
                    if (Number.isNaN(notaValida) || notaValida < 1 || notaValida > 10) {
                        throw new Error("A nota deve estar entre 1 e 10.");
                    }
                    if (!params.comentario.trim()) {
                        throw new Error("O comentário não pode ficar vazio.");
                    }
                    return [4 /*yield*/, supabase_1.supabase.from("avaliacoes")
                            .update({
                            nota: notaValida,
                            comentario: params.comentario.trim()
                        })
                            .eq("id", params.id)
                            .eq("user_id", params.userId)
                            .select()
                            .single()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.atualizarAvaliacaoNoBanco = atualizarAvaliacaoNoBanco;
