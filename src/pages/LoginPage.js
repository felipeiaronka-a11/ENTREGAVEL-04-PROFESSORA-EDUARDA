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
exports.LoginPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function LoginPage(_a) {
    var nomeExibicao = _a.nomeExibicao, setNomeExibicao = _a.setNomeExibicao, email = _a.email, setEmail = _a.setEmail, password = _a.password, setPassword = _a.setPassword, onLogin = _a.onLogin, onSignUp = _a.onSignUp, onVoltar = _a.onVoltar;
    var _b = (0, react_1.useState)("login"), modo = _b[0], setModo = _b[1];
    var _c = (0, react_1.useState)(false), verSenha = _c[0], setVerSenha = _c[1];
    var _d = (0, react_1.useState)(false), enviando = _d[0], setEnviando = _d[1];
    function enviar(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setEnviando(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, (modo === "login" ? onLogin(e) : onSignUp(e))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        setEnviando(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-w-md mx-auto pt-4 sm:pt-8" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: onVoltar, className: "mb-4 text-xs font-extrabold uppercase text-zinc-400 hover:text-sky-400 transition" }, { children: "\u2190 VOLTAR AO CAT\u00C1LOGO" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center space-y-1" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "text-3xl" }, { children: "\uD83C\uDFAE" })), (0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-xl sm:text-2xl font-black uppercase text-white" }, { children: [modo === "login" ? "ENTRAR NO " : "CRIAR CONTA ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "GAMEVAULT" }))] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "grid grid-cols-2 bg-black p-1 rounded-full border border-zinc-800 text-xs font-black" }, { children: ["login", "cadastro"].map(function (m) { return ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return setModo(m); }, className: "py-2 rounded-full uppercase transition ".concat(modo === m ? "bg-[#0D80BF] text-white" : "text-zinc-400") }, { children: m === "login" ? "ENTRAR" : "CADASTRAR" }), m)); }) })), (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: enviar, className: "space-y-4 text-xs font-bold" }, { children: [modo === "cadastro" && ((0, jsx_runtime_1.jsx)("input", { type: "text", maxLength: 35, placeholder: "NOME DE EXIBI\u00C7\u00C3O", value: nomeExibicao, onChange: function (e) { return setNomeExibicao(e.target.value.toUpperCase()); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl uppercase text-sm sm:text-xs text-white", required: true })), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "E-mail (com 1 n\u00FAmero)", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-3 rounded-2xl text-sm sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: verSenha ? "text" : "password", placeholder: "Senha (8+ e 1 n\u00FAmero)", minLength: 8, value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "w-full bg-black border border-zinc-800 focus:border-[#0D80BF] outline-none pl-4 pr-10 py-3 rounded-2xl text-sm sm:text-xs text-white", required: true }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", onClick: function () { return setVerSenha(!verSenha); }, className: "absolute right-3.5 text-zinc-400 hover:text-sky-400" }, { children: verSenha ? "🙈" : "👁️" }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", disabled: enviando, className: "w-full bg-[#0D80BF] hover:bg-sky-500 disabled:opacity-50 text-white py-3 rounded-full font-black uppercase transition" }, { children: enviando ? "AGUARDE..." : modo === "login" ? "ENTRAR" : "CADASTRAR" }))] }))] }))] })));
}
exports.LoginPage = LoginPage;
