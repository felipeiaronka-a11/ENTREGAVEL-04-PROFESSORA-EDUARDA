import React, { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";
import { Navbar, PaginaApp } from "./components/Navbar";
import { ConsolesSection } from "./components/ConsolesSection";
import { JogosSection } from "./components/JogosSection";
import { AvaliacoesSection } from "./components/AvaliacoesSection";
import { EditarItensModal } from "./components/EditarItensModal";
import { LoginPage } from "./pages/LoginPage";
import { PerfilPage } from "./pages/PerfilPage";
import { ComentarPage } from "./pages/ComentarPage";
import { podeEditarItem } from "./services/editService";
import { resolverCapaJogo, resolverFotoConsole } from "./services/mediaService";
import { traduzirErro } from "./utils/errorTranslator";

const RESERVADOS = ["ADMIN", "MODERADOR", "SUPORTE", "SISTEMA", "ROOT", "NULL"];

function lerHash(): PaginaApp {
  const h = window.location.hash.replace("#", "");
  return h === "login" || h === "perfil" || h === "comentar" ? h : "catalogo";
}

export default function App() {
  const [pagina, setPagina] = useState<PaginaApp>(lerHash);
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);
  const [consoles, setConsoles] = useState<any[]>([]);
  const [jogos, setJogos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [alvoEdicao, setAlvoEdicao] = useState<any>(null);

  const [nomeExibicao, setNomeExibicao] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; tipo: "ok" | "erro" } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function navegar(p: PaginaApp) {
    setPagina(p);
    window.location.hash = p === "catalogo" ? "" : p;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function avisar(msg: string, tipo: "ok" | "erro" = "ok") {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, tipo });
    timerRef.current = setTimeout(() => setToast(null), 4000);
  }

  useEffect(() => {
    const onHash = () => setPagina(lerHash());
    window.addEventListener("hashchange", onHash);
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      carregarPerfil(data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null;
      setUser(u);
      carregarPerfil(u);
    });
    carregarDados();
    return () => {
      window.removeEventListener("hashchange", onHash);
      sub.subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function validarNome(nome: string) {
    const limpo = nome.trim().toUpperCase();
    const letras = (limpo.match(/[A-ZÀ-Ú]/g) || []).length;
    if (limpo.length < 3 || limpo.length > 35 || letras < 3) {
      return "O nome precisa de pelo menos 3 letras (máx. 35).";
    }
    if (!/^[A-ZÀ-Ú0-9_ ]+$/.test(limpo)) return "Use apenas letras, números, espaço ou _.";
    if (RESERVADOS.includes(limpo)) return "Este nome é reservado pelo sistema.";
    return null;
  }

  async function nomeJaExiste(nome: string, meuId?: string) {
    let q = (supabase.from("perfis") as any).select("id").ilike("nome_exibicao", nome.trim());
    if (meuId) q = q.neq("id", meuId);
    const { data } = await q;
    return Boolean(data?.length);
  }

  async function carregarPerfil(u: any) {
    if (!u) return setPerfil(null);
    const { data } = await (supabase.from("perfis") as any).select("*").eq("id", u.id).maybeSingle();
    if (data) return setPerfil(data);
    const inicial = (u.user_metadata?.nome_exibicao || u.email?.split("@")[0] || "JOGADOR")
      .toUpperCase()
      .slice(0, 35);
    const { data: criado } = await (supabase.from("perfis") as any)
      .upsert({ id: u.id, nome_exibicao: inicial })
      .select()
      .single();
    if (criado) setPerfil(criado);
  }

  async function salvarPerfil(novoNome: string, novaFoto: string) {
    if (!user) return false;
    const erro = validarNome(novoNome);
    if (erro) return avisar(erro, "erro"), false;
    const formatado = novoNome.trim().toUpperCase();
    if (await nomeJaExiste(formatado, user.id)) {
      return avisar(`O nome "${formatado}" já está em uso!`, "erro"), false;
    }
    const foto = novaFoto.trim() || null;
    const { error } = await (supabase.from("perfis") as any).upsert({
      id: user.id,
      nome_exibicao: formatado,
      foto_url: foto,
    });
    if (error) return avisar(traduzirErro(error.message), "erro"), false;

    await supabase.auth.updateUser({ data: { nome_exibicao: formatado } });
    await (supabase.from("avaliacoes") as any)
      .update({ autor_nome: formatado, autor_foto: foto })
      .eq("user_id", user.id);

    setPerfil({ id: user.id, nome_exibicao: formatado, foto_url: foto });
    avisar("Perfil atualizado!");
    carregarDados();
    navegar("catalogo");
    return true;
  }

  async function carregarDados() {
    const [c, j, a]: any[] = await Promise.all([
      (supabase.from("consoles") as any).select("*").order("nome"),
      (supabase.from("jogos") as any).select("*, consoles(nome)").order("titulo"),
      (supabase.from("avaliacoes") as any)
        .select("*, jogos(titulo, imagem_url)")
        .order("created_at", { ascending: false }),
    ]);
    if (c.data) setConsoles(c.data);
    if (j.data) setJogos(j.data);
    if (a.data) setAvaliacoes(a.data);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return avisar(traduzirErro(error.message), "erro"), false;
    avisar("Login realizado!");
    navegar("catalogo");
    return true;
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    const erro = validarNome(nomeExibicao);
    if (erro) return avisar(erro, "erro"), false;
    const emailLimpo = email.trim();
    if (!/\d/.test(emailLimpo)) return avisar("O e-mail precisa conter pelo menos 1 número.", "erro"), false;
    if (password.length < 8 || !/\d/.test(password)) {
      return avisar("A senha precisa de no mínimo 8 caracteres e 1 número.", "erro"), false;
    }
    const formatado = nomeExibicao.trim().toUpperCase();
    if (await nomeJaExiste(formatado)) return avisar(`O nome "${formatado}" já está em uso!`, "erro"), false;

    const { data, error } = await supabase.auth.signUp({
      email: emailLimpo,
      password,
      options: { data: { nome_exibicao: formatado } },
    });
    if (error) return avisar(traduzirErro(error.message), "erro"), false;

    if (data.user && data.session) {
      const { error: pErr } = await (supabase.from("perfis") as any).upsert({
        id: data.user.id,
        nome_exibicao: formatado,
      });
      if (pErr) return avisar(traduzirErro(pErr.message), "erro"), false;
      avisar("Conta criada com sucesso!");
      navegar("catalogo");
      return true;
    }
    avisar("Conta criada! Verifique seu e-mail ou faça login.");
    return true;
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setPerfil(null);
    setAlvoEdicao(null);
    avisar("Você saiu da conta.");
    navegar("catalogo");
  }

  function abrirEdicao(tipo: "console" | "jogo" | "avaliacao", dados: any, msg: string) {
    if (!podeEditarItem(user?.id, dados?.user_id)) return avisar(msg, "erro");
    setAlvoEdicao({ tipo, dados });
  }

  async function sincronizarTudo() {
    if (!user?.id) return avisar("Faça login para sincronizar seus itens.", "erro");
    setLoading(true);
    avisar("Sincronizando suas mídias...");
    for (const c of consoles.filter((x) => x.user_id === user.id)) {
      const url = await resolverFotoConsole(c.nome, c.fabricante);
      await (supabase.from("consoles") as any).update({ imagem_url: url }).eq("id", c.id).eq("user_id", user.id);
    }
    for (const j of jogos.filter((x) => x.user_id === user.id)) {
      const url = await resolverCapaJogo(j.titulo, j.consoles?.nome || "");
      await (supabase.from("jogos") as any).update({ imagem_url: url }).eq("id", j.id).eq("user_id", user.id);
    }
    await carregarDados();
    setLoading(false);
    avisar("Suas mídias foram atualizadas!");
  }

  async function excluirPerfilComSenha(senhaDigitada: string) {
    if (!user?.id || !user?.email) return avisar("Usuário não autenticado.", "erro"), false;
    if (!senhaDigitada.trim()) return avisar("Digite sua senha para confirmar a exclusão.", "erro"), false;

    const { error: authErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: senhaDigitada,
    });
    if (authErr) return avisar("Senha incorreta. O perfil não foi deletado.", "erro"), false;

    const { error: rpcErr } = await (supabase as any).rpc("deletar_minha_conta");
    if (rpcErr) return avisar(traduzirErro(rpcErr.message), "erro"), false;

    setPerfil(null);
    setAlvoEdicao(null);
    setUser(null);
    await supabase.auth.signOut({ scope: "local" });
    avisar("Conta, perfil e itens removidos com sucesso!");
    await carregarDados();
    navegar("catalogo");
    return true;
  }

  const q = busca.trim().toLowerCase();
  const filtrar = (lista: any[], campos: (x: any) => (string | undefined)[]) =>
    lista.filter((x) => !q || campos(x).some((v) => v?.toLowerCase().includes(q)));

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-black text-zinc-100 pb-16"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <Navbar
        user={user}
        perfil={perfil}
        paginaAtual={pagina}
        onNavegar={navegar}
        onLogout={handleLogout}
        onSync={sincronizarTudo}
        loading={loading}
      />

      {toast && (
        <div
          className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-50 px-4 py-3 rounded-2xl text-xs font-extrabold shadow-2xl border ${
            toast.tipo === "erro"
              ? "bg-rose-950 border-rose-500 text-rose-200"
              : "bg-zinc-950 border-[#0D80BF] text-sky-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 pt-5 sm:pt-6">
        {pagina === "login" && (
          <LoginPage
            nomeExibicao={nomeExibicao}
            setNomeExibicao={setNomeExibicao}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            onVoltar={() => navegar("catalogo")}
          />
        )}

        {pagina === "perfil" && user && (
          <PerfilPage
            user={user}
            perfil={perfil}
            onSalvarPerfil={salvarPerfil}
            onExcluirPerfil={excluirPerfilComSenha}
            onVoltar={() => navegar("catalogo")}
          />
        )}

        {pagina === "comentar" && (
          <ComentarPage
            user={user}
            perfil={perfil}
            jogos={jogos}
            onRecarregar={carregarDados}
            avisar={avisar}
            onIrParaLogin={() => navegar("login")}
            onVoltar={() => navegar("catalogo")}
          />
        )}

        {(pagina === "catalogo" || (pagina === "perfil" && !user)) && (
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3.5">
              <h2 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wide">
                CATÁLOGO DE <span className="text-[#0D80BF]">CONSOLES & JOGOS</span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs font-bold w-full lg:w-auto">
                <input
                  type="text"
                  placeholder="🔍 BUSCAR..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full sm:w-56 bg-zinc-950 border border-zinc-800 focus:border-[#0D80BF] outline-none px-4 py-2.5 sm:py-2 rounded-full text-sm sm:text-xs text-white"
                />
                <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-center">
                  <span className="bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate">
                    🕹️ {consoles.length} CONSOLES
                  </span>
                  <span className="bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate">
                    💿 {jogos.length} JOGOS
                  </span>
                  <span className="bg-zinc-950 border border-zinc-800 px-2 sm:px-3.5 py-2 rounded-full text-sky-400 truncate">
                    🏆 {avaliacoes.length} REVIEWS
                  </span>
                </div>
              </div>
            </div>

            <ConsolesSection
              user={user}
              consoles={filtrar(consoles, (c) => [c.nome, c.fabricante])}
              onRecarregar={carregarDados}
              avisar={avisar}
              onEditarConsole={(d: any) =>
                abrirEdicao("console", d, "Você só pode editar consoles criados por você.")
              }
            />
            <JogosSection
              user={user}
              jogos={filtrar(jogos, (j) => [j.titulo, j.genero, j.consoles?.nome])}
              consoles={consoles}
              onRecarregar={carregarDados}
              avisar={avisar}
              onEditarJogo={(d: any) =>
                abrirEdicao("jogo", d, "Você só pode editar jogos criados por você.")
              }
            />
            <AvaliacoesSection
              user={user}
              avaliacoes={filtrar(avaliacoes, (a) => [a.jogos?.titulo, a.comentario, a.autor_nome])}
              onRecarregar={carregarDados}
              avisar={avisar}
              onEditarAvaliacao={(d: any) =>
                abrirEdicao("avaliacao", d, "Você só pode editar suas próprias avaliações.")
              }
              onIrParaComentar={() => navegar(user ? "comentar" : "login")}
            />
          </div>
        )}
      </main>

      <EditarItensModal
        alvo={alvoEdicao}
        userId={user?.id ?? null}
        consoles={consoles}
        onFechar={() => setAlvoEdicao(null)}
        onConsoleAtualizado={() => (avisar("Console atualizado!"), carregarDados())}
        onJogoAtualizado={() => (avisar("Jogo atualizado!"), carregarDados())}
        onAvaliacaoAtualizada={() => (avisar("Avaliação atualizada!"), carregarDados())}
      />
    </div>
  );
}