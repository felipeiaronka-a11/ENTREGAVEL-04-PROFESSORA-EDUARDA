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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ciclarCapaJogo = exports.resolverCapaJogo = exports.ciclarFotoConsole = exports.resolverFotoConsole = exports.ehUrlValida = exports.imagemFallback = void 0;
var RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY || "";
function imagemFallback(titulo) {
    var texto = encodeURIComponent((titulo || "GAMEVAULT").trim().toUpperCase());
    return "https://placehold.co/400x560/09090b/38bdf8?text=".concat(texto, "&font=montserrat");
}
exports.imagemFallback = imagemFallback;
function ehUrlValida(url) {
    if (!url || typeof url !== "string")
        return false;
    return /^https?:\/\/.+/i.test(url.trim());
}
exports.ehUrlValida = ehUrlValida;
function proximaImagem(urls, urlAtual) {
    var validas = Array.from(new Set(urls.filter(function (u) { return ehUrlValida(u); })));
    if (!validas.length)
        return null;
    var atual = (urlAtual === null || urlAtual === void 0 ? void 0 : urlAtual.trim()) || "";
    var idx = atual ? validas.indexOf(atual) : -1;
    if (idx >= 0 && validas.length > 1) {
        return validas[(idx + 1) % validas.length];
    }
    var diferente = validas.find(function (u) { return u !== atual; });
    return diferente || (validas.length > 1 ? validas[0] : null);
}
function buscarCapasRAWG(titulo, consoleNome) {
    if (consoleNome === void 0) { consoleNome = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var query, res, data, jogos, urls, _i, jogos_1, jogo, _a, _b, shot, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!RAWG_API_KEY || !titulo.trim())
                        return [2 /*return*/, []];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    query = encodeURIComponent("".concat(titulo, " ").concat(consoleNome).trim());
                    return [4 /*yield*/, fetch("https://api.rawg.io/api/games?key=".concat(RAWG_API_KEY, "&search=").concat(query, "&page_size=6"))];
                case 2:
                    res = _d.sent();
                    if (!res.ok)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _d.sent();
                    jogos = Array.isArray(data === null || data === void 0 ? void 0 : data.results) ? data.results : [];
                    urls = [];
                    for (_i = 0, jogos_1 = jogos; _i < jogos_1.length; _i++) {
                        jogo = jogos_1[_i];
                        if (ehUrlValida(jogo === null || jogo === void 0 ? void 0 : jogo.background_image)) {
                            urls.push(jogo.background_image.trim());
                        }
                        if (Array.isArray(jogo === null || jogo === void 0 ? void 0 : jogo.short_screenshots)) {
                            for (_a = 0, _b = jogo.short_screenshots; _a < _b.length; _a++) {
                                shot = _b[_a];
                                if (ehUrlValida(shot === null || shot === void 0 ? void 0 : shot.image)) {
                                    urls.push(shot.image.trim());
                                }
                            }
                        }
                    }
                    return [2 /*return*/, Array.from(new Set(urls))];
                case 4:
                    _c = _d.sent();
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function buscarImagensWikimedia(termo, limit) {
    var _a;
    if (limit === void 0) { limit = 8; }
    return __awaiter(this, void 0, void 0, function () {
        var params, res, data, pages, urls, _i, _b, page, info, url, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!termo.trim())
                        return [2 /*return*/, []];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    params = new URLSearchParams({
                        action: "query",
                        format: "json",
                        origin: "*",
                        generator: "search",
                        gsrsearch: "".concat(termo.trim(), " filetype:bitmap"),
                        gsrnamespace: "6",
                        gsrlimit: String(limit),
                        prop: "imageinfo",
                        iiprop: "url"
                    });
                    return [4 /*yield*/, fetch("https://commons.wikimedia.org/w/api.php?".concat(params.toString()))];
                case 2:
                    res = _d.sent();
                    if (!res.ok)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _d.sent();
                    pages = ((_a = data === null || data === void 0 ? void 0 : data.query) === null || _a === void 0 ? void 0 : _a.pages) ? Object.values(data.query.pages) : [];
                    urls = [];
                    for (_i = 0, _b = pages; _i < _b.length; _i++) {
                        page = _b[_i];
                        info = Array.isArray(page === null || page === void 0 ? void 0 : page.imageinfo) ? page.imageinfo[0] : null;
                        url = info === null || info === void 0 ? void 0 : info.url;
                        if (ehUrlValida(url) && !/\.(svg|tif|tiff)$/i.test(url)) {
                            urls.push(url.trim());
                        }
                    }
                    return [2 /*return*/, Array.from(new Set(urls))];
                case 4:
                    _c = _d.sent();
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function resolverFotoConsole(nome, fabricante) {
    if (fabricante === void 0) { fabricante = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var termo, urls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    termo = "".concat(nome, " ").concat(fabricante, " console").trim();
                    return [4 /*yield*/, buscarImagensWikimedia(termo, 8)];
                case 1:
                    urls = _a.sent();
                    return [2 /*return*/, urls[0] || imagemFallback(nome || "CONSOLE")];
            }
        });
    });
}
exports.resolverFotoConsole = resolverFotoConsole;
function ciclarFotoConsole(nome, fabricante, urlAtual) {
    if (fabricante === void 0) { fabricante = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var termo, urls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    termo = "".concat(nome, " ").concat(fabricante, " console").trim();
                    return [4 /*yield*/, buscarImagensWikimedia(termo, 8)];
                case 1:
                    urls = _a.sent();
                    return [2 /*return*/, proximaImagem(urls, urlAtual)];
            }
        });
    });
}
exports.ciclarFotoConsole = ciclarFotoConsole;
function resolverCapaJogo(titulo, consoleNome) {
    if (consoleNome === void 0) { consoleNome = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var rawgUrls, wikiUrls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, buscarCapasRAWG(titulo, consoleNome)];
                case 1:
                    rawgUrls = _a.sent();
                    if (rawgUrls.length)
                        return [2 /*return*/, rawgUrls[0]];
                    return [4 /*yield*/, buscarImagensWikimedia("".concat(titulo, " ").concat(consoleNome, " game"), 8)];
                case 2:
                    wikiUrls = _a.sent();
                    return [2 /*return*/, wikiUrls[0] || imagemFallback(titulo || "JOGO")];
            }
        });
    });
}
exports.resolverCapaJogo = resolverCapaJogo;
function ciclarCapaJogo(titulo, consoleNome, urlAtual) {
    if (consoleNome === void 0) { consoleNome = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var rawgUrls, wikiUrls, _a, combinadas;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, buscarCapasRAWG(titulo, consoleNome)];
                case 1:
                    rawgUrls = _b.sent();
                    if (!(rawgUrls.length <= 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, buscarImagensWikimedia("".concat(titulo, " ").concat(consoleNome, " game"), 8)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = [];
                    _b.label = 4;
                case 4:
                    wikiUrls = _a;
                    combinadas = Array.from(new Set(__spreadArray(__spreadArray([], rawgUrls, true), wikiUrls, true)));
                    return [2 /*return*/, proximaImagem(combinadas, urlAtual)];
            }
        });
    });
}
exports.ciclarCapaJogo = ciclarCapaJogo;
