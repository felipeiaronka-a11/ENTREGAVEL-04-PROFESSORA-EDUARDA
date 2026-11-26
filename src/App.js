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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("./supabase");
var Navbar_1 = require("./components/Navbar");
var ConsolesSection_1 = require("./components/ConsolesSection");
var JogosSection_1 = require("./components/JogosSection");
var AvaliacoesSection_1 = require("./components/AvaliacoesSection");
var EditarItensModal_1 = require("./components/EditarItensModal");
var LoginPage_1 = require("./pages/LoginPage");
var PerfilPage_1 = require("./pages/PerfilPage");
var ComentarPage_1 = require("./pages/ComentarPage");
var editService_1 = require("./services/editService");
var mediaService_1 = require("./services/mediaService");
var errorTranslator_1 = require("./utils/errorTranslator");
var RESERVADOS = ["ADMIN", "MODERADOR", "SUPORTE", "SISTEMA", "ROOT", "NULL"];
function lerHash() {
    var h = window.location.hash.replace("#", "");
    return h === "login" || h === "perfil" || h === "comentar" ? h : "catalogo";
}
function App() {
    var _a;
    var _b = (0, react_1.useState)(lerHash), pagina = _b[0], setPagina = _b[1];
    var _c = (0, react_1.useState)(null), user = _c[0], setUser = _c[1];
    var _d = (0, react_1.useState)(null), perfil = _d[0], setPerfil = _d[1];
    var _f = (0, react_1.useState)([]), consoles = _f[0], setConsoles = _f[1];
    var _g = (0, react_1.useState)([]), jogos = _g[0], setJogos = _g[1];
    var _h = (0, react_1.useState)([]), avaliacoes = _h[0], setAvaliacoes = _h[1];
    var _j = (0, react_1.useState)(""), busca = _j[0], setBusca = _j[1];
    var _k = (0, react_1.useState)(null), alvoEdicao = _k[0], setAlvoEdicao = _k[1];
    var _l = (0, react_1.useState)(""), nomeExibicao = _l[0], setNomeExibicao = _l[1];
    var _m = (0, react_1.useState)(""), email = _m[0], setEmail = _m[1];
    var _o = (0, react_1.useState)(""), password = _o[0], setPassword = _o[1];
    var _p = (0, react_1.useState)(false), loading = _p[0], setLoading = _p[1];
    var _q = (0, react_1.useState)(null), toast = _q[0], setToast = _q[1];
    var timerRef = (0, react_1.useRef)(null);
    function navegar(p) {
        setPagina(p);
        window.location.hash = p === "catalogo" ? "" : p;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function avisar(msg, tipo) {
        if (tipo === void 0) { tipo = "ok"; }
        if (timerRef.current)
            clearTimeout(timerRef.current);
        setToast({ msg: msg, tipo: tipo });
        timerRef.current = setTimeout(function () { return setToast(null); }, 4000);
    }
    (0, react_1.useEffect)(function () {
        var onHash = function () { return setPagina(lerHash()); };
        window.addEventListener("hashchange", onHash);
        supabase_1.supabase.auth.getUser().then(function (_a) {
            var data = _a.data;
            setUser(data.user);
            carregarPerfil(data.user);
        });
        var sub = supabase_1.supabase.auth.onAuthStateChange(function (_e, s) {
            var _a;
            var u = (_a = s === null || s === void 0 ? void 0 : s.user) !== null && _a !== void 0 ? _a : null;
            setUser(u);
            carregarPerfil(u);
        }).data;
        carregarDados();
        return function () {
            window.removeEventListener("hashchange", onHash);
            sub.subscription.unsubscribe();
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, []);
    function validarNome(nome) {
        var limpo = nome.trim().toUpperCase();
        var letras = (limpo.match(/[A-ZÀ-Ú]/g) || []).length;
        if (limpo.length < 3 || limpo.length > 35 || letras < 3) {
            return "O nome precisa de pelo menos 3 letras (máx. 35).";
        }
        if (!/^[A-ZÀ-Ú0-9_ ]+$/.test(limpo))
            return "Use apenas letras, números, espaço ou _.";
        if (RESERVADOS.includes(limpo))
            return "Este nome é reservado pelo sistema.";
        return null;
    }
    function nomeJaExiste(nome, meuId) {
        return __awaiter(this, void 0, void 0, function () {
            var q, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = supabase_1.supabase.from("perfis").select("id").ilike("nome_exibicao", nome.trim());
                        if (meuId)
                            q = q.neq("id", meuId);
                        return [4 /*yield*/, q];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, Boolean(data === null || data === void 0 ? void 0 : data.length)];
                }
            });
        });
    }
    function carregarPerfil(u) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, inicial, criado;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!u)
                            return [2 /*return*/, setPerfil(null)];
                        return [4 /*yield*/, supabase_1.supabase.from("perfis").select("*").eq("id", u.id).maybeSingle()];
                    case 1:
                        data = (_c.sent()).data;
                        if (data)
                            return [2 /*return*/, setPerfil(data)];
                        inicial = (((_a = u.user_metadata) === null || _a === void 0 ? void 0 : _a.nome_exibicao) || ((_b = u.email) === null || _b === void 0 ? void 0 : _b.split("@")[0]) || "JOGADOR")
                            .toUpperCase()
                            .slice(0, 35);
                        return [4 /*yield*/, supabase_1.supabase.from("perfis")
                                .upsert({ id: u.id, nome_exibicao: inicial })
                                .select()
                                .single()];
                    case 2:
                        criado = (_c.sent()).data;
                        if (criado)
                            setPerfil(criado);
                        return [2 /*return*/];
                }
            });
        });
    }
    function salvarPerfil(novoNome, novaFoto) {
        return __awaiter(this, void 0, void 0, function () {
            var erro, formatado, foto, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user)
                            return [2 /*return*/, false];
                        erro = validarNome(novoNome);
                        if (erro)
                            return [2 /*return*/, (avisar(erro, "erro"), false)];
                        formatado = novoNome.trim().toUpperCase();
                        return [4 /*yield*/, nomeJaExiste(formatado, user.id)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, (avisar("O nome \"".concat(formatado, "\" j\u00E1 est\u00E1 em uso!"), "erro"), false)];
                        }
                        foto = novaFoto.trim() || null;
                        return [4 /*yield*/, supabase_1.supabase.from("perfis").upsert({
                                id: user.id,
                                nome_exibicao: formatado,
                                foto_url: foto
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error)
                            return [2 /*return*/, (avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro"), false)];
                        return [4 /*yield*/, supabase_1.supabase.auth.updateUser({ data: { nome_exibicao: formatado } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, supabase_1.supabase.from("avaliacoes")
                                .update({ autor_nome: formatado, autor_foto: foto })
                                .eq("user_id", user.id)];
                    case 4:
                        _a.sent();
                        setPerfil({ id: user.id, nome_exibicao: formatado, foto_url: foto });
                        avisar("Perfil atualizado!");
                        carregarDados();
                        navegar("catalogo");
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function carregarDados() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, c, j, a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            supabase_1.supabase.from("consoles").select("*").order("nome"),
                            supabase_1.supabase.from("jogos").select("*, consoles(nome)").order("titulo"),
                            supabase_1.supabase.from("avaliacoes")
                                .select("*, jogos(titulo, imagem_url)")
                                .order("created_at", { ascending: false }),
                        ])];
                    case 1:
                        _a = _b.sent(), c = _a[0], j = _a[1], a = _a[2];
                        if (c.data)
                            setConsoles(c.data);
                        if (j.data)
                            setJogos(j.data);
                        if (a.data)
                            setAvaliacoes(a.data);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleLogin(e) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, supabase_1.supabase.auth.signInWithPassword({ email: email.trim(), password: password })];
                    case 1:
                        error = (_a.sent()).error;
                        if (error)
                            return [2 /*return*/, (avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro"), false)];
                        avisar("Login realizado!");
                        navegar("catalogo");
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function handleSignUp(e) {
        return __awaiter(this, void 0, void 0, function () {
            var erro, emailLimpo, formatado, _a, data, error, pErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        erro = validarNome(nomeExibicao);
                        if (erro)
                            return [2 /*return*/, (avisar(erro, "erro"), false)];
                        emailLimpo = email.trim();
                        if (!/\d/.test(emailLimpo))
                            return [2 /*return*/, (avisar("O e-mail precisa conter pelo menos 1 número.", "erro"), false)];
                        if (password.length < 8 || !/\d/.test(password)) {
                            return [2 /*return*/, (avisar("A senha precisa de no mínimo 8 caracteres e 1 número.", "erro"), false)];
                        }
                        formatado = nomeExibicao.trim().toUpperCase();
                        return [4 /*yield*/, nomeJaExiste(formatado)];
                    case 1:
                        if (_b.sent())
                            return [2 /*return*/, (avisar("O nome \"".concat(formatado, "\" j\u00E1 est\u00E1 em uso!"), "erro"), false)];
                        return [4 /*yield*/, supabase_1.supabase.auth.signUp({
                                email: emailLimpo,
                                password: password,
                                options: { data: { nome_exibicao: formatado } }
                            })];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error)
                            return [2 /*return*/, (avisar((0, errorTranslator_1.traduzirErro)(error.message), "erro"), false)];
                        if (!(data.user && data.session)) return [3 /*break*/, 4];
                        return [4 /*yield*/, supabase_1.supabase.from("perfis").upsert({
                                id: data.user.id,
                                nome_exibicao: formatado
                            })];
                    case 3:
                        pErr = (_b.sent()).error;
                        if (pErr)
                            return [2 /*return*/, (avisar((0, errorTranslator_1.traduzirErro)(pErr.message), "erro"), false)];
                        avisar("Conta criada com sucesso!");
                        navegar("catalogo");
                        return [2 /*return*/, true];
                    case 4:
                        avisar("Conta criada! Verifique seu e-mail ou faça login.");
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function handleLogout() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase.auth.signOut()];
                    case 1:
                        _a.sent();
                        setPerfil(null);
                        setAlvoEdicao(null);
                        avisar("Você saiu da conta.");
                        navegar("catalogo");
                        return [2 /*return*/];
                }
            });
        });
    }
    function abrirEdicao(tipo, dados, msg) {
        if (!(0, editService_1.podeEditarItem)(user === null || user === void 0 ? void 0 : user.id, dados === null || dados === void 0 ? void 0 : dados.user_id))
            return avisar(msg, "erro");
        setAlvoEdicao({ tipo: tipo, dados: dados });
    }
    function sincronizarTudo() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _b, c, url, _c, _d, j, url;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id))
                            return [2 /*return*/, avisar("Faça login para sincronizar seus itens.", "erro")];
                        setLoading(true);
                        avisar("Sincronizando suas mídias...");
                        _i = 0, _b = consoles.filter(function (x) { return x.user_id === user.id; });
                        _f.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        c = _b[_i];
                        return [4 /*yield*/, (0, mediaService_1.resolverFotoConsole)(c.nome, c.fabricante)];
                    case 2:
                        url = _f.sent();
                        return [4 /*yield*/, supabase_1.supabase.from("consoles").update({ imagem_url: url }).eq("id", c.id).eq("user_id", user.id)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        _c = 0, _d = jogos.filter(function (x) { return x.user_id === user.id; });
                        _f.label = 6;
                    case 6:
                        if (!(_c < _d.length)) return [3 /*break*/, 10];
                        j = _d[_c];
                        return [4 /*yield*/, (0, mediaService_1.resolverCapaJogo)(j.titulo, ((_a = j.consoles) === null || _a === void 0 ? void 0 : _a.nome) || "")];
                    case 7:
                        url = _f.sent();
                        return [4 /*yield*/, supabase_1.supabase.from("jogos").update({ imagem_url: url }).eq("id", j.id).eq("user_id", user.id)];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 6];
                    case 10: return [4 /*yield*/, carregarDados()];
                    case 11:
                        _f.sent();
                        setLoading(false);
                        avisar("Suas mídias foram atualizadas!");
                        return [2 /*return*/];
                }
            });
        });
    }
    function excluirPerfilComSenha(senhaDigitada) {
        return __awaiter(this, void 0, void 0, function () {
            var authErr, rpcErr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id) || !(user === null || user === void 0 ? void 0 : user.email))
                            return [2 /*return*/, (avisar("Usuário não autenticado.", "erro"), false)];
                        if (!senhaDigitada.trim())
                            return [2 /*return*/, (avisar("Digite sua senha para confirmar a exclusão.", "erro"), false)];
                        return [4 /*yield*/, supabase_1.supabase.auth.signInWithPassword({
                                email: user.email,
                                password: senhaDigitada
                            })];
                    case 1:
                        authErr = (_a.sent()).error;
                        if (authErr)
                            return [2 /*return*/, (avisar("Senha incorreta. O perfil não foi deletado.", "erro"), false)];
                        return [4 /*yield*/, supabase_1.supabase.rpc("deletar_minha_conta")];
                    case 2:
                        rpcErr = (_a.sent()).error;
                        if (rpcErr)
                            return [2 /*return*/, (avisar((0, errorTranslator_1.traduzirErro)(rpcErr.message), "erro"), false)];
                        setPerfil(null);
                        setAlvoEdicao(null);
                        setUser(null);
                        return [4 /*yield*/, supabase_1.supabase.auth.signOut({ scope: "local" })];
                    case 3:
                        _a.sent();
                        avisar("Conta, perfil e itens removidos com sucesso!");
                        return [4 /*yield*/, carregarDados()];
                    case 4:
                        _a.sent();
                        navegar("catalogo");
                        return [2 /*return*/, true];
                }
            });
        });
    }
    var q = busca.trim().toLowerCase();
    var filtrar = function (lista, campos) {
        return lista.filter(function (x) { return !q || campos(x).some(function (v) { return v === null || v === void 0 ? void 0 : v.toLowerCase().includes(q); }); });
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "min-h-screen w-full overflow-x-hidden bg-black text-zinc-100 pb-16", style: { fontFamily: "'Nunito', sans-serif" } }, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.Navbar, { user: user, perfil: perfil, paginaAtual: pagina, onNavegar: navegar, onLogout: handleLogout, onSync: sincronizarTudo, loading: loading }), toast && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-50 px-4 py-3 rounded-2xl text-xs font-extrabold shadow-2xl border ".concat(toast.tipo === "erro"
                    ? "bg-rose-950 border-rose-500 text-rose-200"
                    : "bg-zinc-950 border-[#0D80BF] text-sky-200") }, { children: toast.msg }))), (0, jsx_runtime_1.jsxs)("main", __assign({ className: "max-w-7xl mx-auto px-3.5 sm:px-6 pt-5 sm:pt-6" }, { children: [pagina === "login" && ((0, jsx_runtime_1.jsx)(LoginPage_1.LoginPage, { nomeExibicao: nomeExibicao, setNomeExibicao: setNomeExibicao, email: email, setEmail: setEmail, password: password, setPassword: setPassword, onLogin: handleLogin, onSignUp: handleSignUp, onVoltar: function () { return navegar("catalogo"); } })), pagina === "perfil" && user && ((0, jsx_runtime_1.jsx)(PerfilPage_1.PerfilPage, { user: user, perfil: perfil, onSalvarPerfil: salvarPerfil, onExcluirPerfil: excluirPerfilComSenha, onVoltar: function () { return navegar("catalogo"); } })), pagina === "comentar" && ((0, jsx_runtime_1.jsx)(ComentarPage_1.ComentarPage, { user: user, perfil: perfil, jogos: jogos, onRecarregar: carregarDados, avisar: avisar, onIrParaLogin: function () { return navegar("login"); }, onVoltar: function () { return navegar("catalogo"); } })), (pagina === "catalogo" || (pagina === "perfil" && !user)) && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-8 sm:space-y-10" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3.5" }, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "text-lg sm:text-2xl font-black uppercase text-white tracking-wide" }, { children: ["CAT\u00C1LOGO DE ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-[#0D80BF]" }, { children: "CONSOLES & JOGOS" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs font-bold w-full lg:w-auto" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD83D\uDD0D BUSCAR...", value: busca, onChange: function (e) { return setBusca(e.target.value); }, className: "w-full sm:w-56 bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-2.5 sm:py-2 rounded-full text-sm sm:text-xs text-white" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-center" }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate" }, { children: ["\uD83D\uDD79\uFE0F ", consoles.length, " CONSOLES"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate" }, { children: ["\uD83D\uDCBF ", jogos.length, " JOGOS"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate" }, { children: ["\uD83C\uDFC6 ", avaliacoes.length, " REVIEWS"] }))] }))] }))] })), (0, jsx_runtime_1.jsx)(ConsolesSection_1.ConsolesSection, { user: user, consoles: filtrar(consoles, function (c) { return [c.nome, c.fabricante]; }), onRecarregar: carregarDados, avisar: avisar, onEditarConsole: function (d) {
                                    return abrirEdicao("console", d, "Você só pode editar consoles criados por você.");
                                } }), (0, jsx_runtime_1.jsx)(JogosSection_1.JogosSection, { user: user, jogos: filtrar(jogos, function (j) { var _a; return [j.titulo, j.genero, (_a = j.consoles) === null || _a === void 0 ? void 0 : _a.nome]; }), consoles: consoles, onRecarregar: carregarDados, avisar: avisar, onEditarJogo: function (d) {
                                    return abrirEdicao("jogo", d, "Você só pode editar jogos criados por você.");
                                } }), (0, jsx_runtime_1.jsx)(AvaliacoesSection_1.AvaliacoesSection, { user: user, avaliacoes: filtrar(avaliacoes, function (a) { var _a; return [(_a = a.jogos) === null || _a === void 0 ? void 0 : _a.titulo, a.comentario, a.autor_nome]; }), onRecarregar: carregarDados, avisar: avisar, onEditarAvaliacao: function (d) {
                                    return abrirEdicao("avaliacao", d, "Você só pode editar suas próprias avaliações.");
                                }, onIrParaComentar: function () { return navegar(user ? "comentar" : "login"); } })] })))] })), (0, jsx_runtime_1.jsx)(EditarItensModal_1.EditarItensModal, { alvo: alvoEdicao, userId: (_a = user === null || user === void 0 ? void 0 : user.id) !== null && _a !== void 0 ? _a : null, consoles: consoles, onFechar: function () { return setAlvoEdicao(null); }, onConsoleAtualizado: function () { return (avisar("Console atualizado!"), carregarDados()); }, onJogoAtualizado: function () { return (avisar("Jogo atualizado!"), carregarDados()); }, onAvaliacaoAtualizada: function () { return (avisar("Avaliação atualizada!"), carregarDados()); } })] })));
}
exports["default"] = App;
