import React, { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";
import { Navbar } from "./components/Navbar";
import { ConsolesSection } from "./components/ConsolesSection";
import { JogosSection } from "./components/JogosSection";
import { AvaliacoesSection } from "./components/AvaliacoesSection";
import {
  EditarItensModal,
  AvaliacaoItem,
  ConsoleItem,
  JogoItem,
} from "./components/EditarItensModal";
import { podeEditarItem } from "./services/editService";
import { resolverCapaJogo, resolverFotoConsole } from "./services/mediaService";
import { traduzirErro } from "./utils/errorTranslator";

type AlvoEdicao =
  | { tipo: "console"; dados: ConsoleItem }
  | { tipo: "jogo"; dados: JogoItem }
  | { tipo: "avaliacao"; dados: AvaliacaoItem }
  | null;

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);
  const [consoles, setConsoles] = useState<any[]>([]);
  const [jogos, setJogos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [alvoEdicao, setAlvoEdicao] = useState<AlvoEdicao>(null);

  const [nomeExibicao, setNomeExibicao] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    tipo: "ok" | "erro";
  } | null>(null);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function avisar(msg: string, tipo: "ok" | "erro" = "ok") {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ msg, tipo });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 4000);
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function validarNome(nome: string) {
    const limpo = nome.trim().toUpperCase();
    const letras = (limpo.match(/[A-ZÀ-Ú]/g) || []).length;
    const proibidos = [
      "ADMIN",
      "MODERADOR",
      "SUPORTE",
      "SISTEMA",
      "ROOT",
      "NULL",
    ];
    if (limpo.length < 3 || limpo.length > 35 || letras < 3) {
      return "O nome precisa de pelo menos 3 letras (máx. 35).";
    }
    if (!/^[A-ZÀ-Ú0-9_ ]+$/.test(limpo)) {
      return "Use apenas letras, números, espaço ou _.";
    }
    if (proibidos.includes(limpo)) {
      return "Este nome é reservado pelo sistema.";
    }
    return null;
  }

  async function nomeJaExiste(nome: string, meuId?: string) {
    let query = (supabase.from("perfis") as any)
      .select("id")
      .ilike("nome_exibicao", nome.trim());

    if (meuId) {
      query = query.neq("id", meuId);
    }

    const { data } = await query;
    return (data && data.length > 0) || false;
  }

  async function carregarPerfil(u: any) {
    if (!u) return setPerfil(null);

    const { data } = await (supabase.from("perfis") as any)
      .select("*")
      .eq("id", u.id)
      .maybeSingle();

    if (data) {
      setPerfil(data);
    } else {
      const nomeInicial = (
        u.user_metadata?.nome_exibicao ||
        u.email?.split("@")[0] ||
        "JOGADOR"
      )
        .toUpperCase()
        .slice(0, 35);

      const { data: criado } = await (supabase.from("perfis") as any)
        .upsert({ id: u.id, nome_exibicao: nomeInicial })
        .select()
        .single();

      if (criado) setPerfil(criado);
    }
  }

  async function salvarPerfil(novoNome: string, novaFoto: string) {
    if (!user) return false;
    const erroNome = validarNome(novoNome);
    if (erroNome) {
      avisar(erroNome, "erro");
      return false;
    }

    const nomeFormatado = novoNome.trim().toUpperCase();
    if (await nomeJaExiste(nomeFormatado, user.id)) {
      avisar(
        `O nome "${nomeFormatado}" já está em uso por outro jogador!`,
        "erro"
      );
      return false;
    }

    const fotoLimpa = novaFoto.trim() || null;

    const { error } = await (supabase.from("perfis") as any).upsert({
      id: user.id,
      nome_exibicao: nomeFormatado,
      foto_url: fotoLimpa,
    });

    if (error) {
      avisar(traduzirErro(error.message), "erro");
      return false;
    }

    await supabase.auth.updateUser({
      data: { nome_exibicao: nomeFormatado },
    });

    await (supabase.from("avaliacoes") as any)
      .update({ autor_nome: nomeFormatado, autor_foto: fotoLimpa })
      .eq("user_id", user.id);

    setPerfil({
      id: user.id,
      nome_exibicao: nomeFormatado,
      foto_url: fotoLimpa,
    });
    avisar("Perfil atualizado!");
    carregarDados();
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      carregarPerfil(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_ev, session) => {
        const u = session?.user ?? null;
        setUser(u);
        carregarPerfil(u);
      }
    );

    carregarDados();
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) return avisar(traduzirErro(error.message), "erro");
    avisar("Login realizado!");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    const erroNome = validarNome(nomeExibicao);
    if (erroNome) return avisar(erroNome, "erro");

    const emailLimpo = email.trim();
    if (!emailLimpo || !/\d/.test(emailLimpo)) {
      return avisar("O e-mail precisa conter pelo menos 1 número.", "erro");
    }
    if (password.length < 8 || !/\d/.test(password)) {
      return avisar(
        "A senha precisa de no mínimo 8 caracteres e 1 número.",
        "erro"
      );
    }

    const nomeFormatado = nomeExibicao.trim().toUpperCase();
    if (await nomeJaExiste(nomeFormatado)) {
      return avisar(`O nome "${nomeFormatado}" já está em uso!`, "erro");
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailLimpo,
      password,
      options: { data: { nome_exibicao: nomeFormatado } },
    });

    if (error) return avisar(traduzirErro(error.message), "erro");

    if (data.user && data.session) {
      const { error: perfilError } = await (supabase.from("perfis") as any).upsert({
        id: data.user.id,
        nome_exibicao: nomeFormatado,
      });
      if (perfilError) {
        return avisar(traduzirErro(perfilError.message), "erro");
      }
    }
    avisar("Conta criada! Verifique seu e-mail ou faça login.");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setPerfil(null);
    setAlvoEdicao(null);
    avisar("Você saiu da conta.");
  }

  function abrirEdicaoConsole(item: ConsoleItem) {
    if (!podeEditarItem(user?.id, item?.user_id)) {
      return avisar("Você só pode editar consoles criados por você.", "erro");
    }
    setAlvoEdicao({ tipo: "console", dados: item });
  }

  function abrirEdicaoJogo(item: JogoItem) {
    if (!podeEditarItem(user?.id, item?.user_id)) {
      return avisar("Você só pode editar jogos criados por você.", "erro");
    }
    setAlvoEdicao({ tipo: "jogo", dados: item });
  }

  function abrirEdicaoAvaliacao(item: AvaliacaoItem) {
    if (!podeEditarItem(user?.id, item?.user_id)) {
      return avisar("Você só pode editar suas próprias avaliações.", "erro");
    }
    setAlvoEdicao({ tipo: "avaliacao", dados: item });
  }

  async function sincronizarTudo() {
    if (!user?.id) {
      return avisar("Faça login para sincronizar seus itens.", "erro");
    }

    setLoading(true);
    avisar("Sincronizando suas mídias...");

    const meusConsoles = consoles.filter((c) => c.user_id === user.id);
    const meusJogos = jogos.filter((j) => j.user_id === user.id);

    for (const c of meusConsoles) {
      const url = await resolverFotoConsole(c.nome, c.fabricante);
      await (supabase.from("consoles") as any)
        .update({ imagem_url: url })
        .eq("id", c.id)
        .eq("user_id", user.id);
    }
    for (const j of meusJogos) {
      const url = await resolverCapaJogo(j.titulo, j.consoles?.nome || "");
      await (supabase.from("jogos") as any)
        .update({ imagem_url: url })
        .eq("id", j.id)
        .eq("user_id", user.id);
    }

    await carregarDados();
    setLoading(false);
    avisar("Suas mídias foram atualizadas!");
  }

async function excluirPerfilComSenha(senhaDigitada: string) {
    if (!user?.id || !user?.email) {
      avisar("Usuário não autenticado.", "erro");
      return false;
    }

    if (!senhaDigitada.trim()) {
      avisar("Digite sua senha para confirmar a exclusão.", "erro");
      return false;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: senhaDigitada,
    });

    if (authError) {
      avisar("Senha incorreta. O perfil não foi deletado.", "erro");
      return false;
    }

    // Remove primeiro os itens criados pelo usuário (ordem respeitando dependências)
    const { error: errAvaliacoes } = await (supabase.from("avaliacoes") as any)
      .delete()
      .eq("user_id", user.id);

    if (errAvaliacoes) {
      avisar(traduzirErro(errAvaliacoes.message), "erro");
      return false;
    }

    const { error: errJogos } = await (supabase.from("jogos") as any)
      .delete()
      .eq("user_id", user.id);

    if (errJogos) {
      avisar(traduzirErro(errJogos.message), "erro");
      return false;
    }

    const { error: errConsoles } = await (supabase.from("consoles") as any)
      .delete()
      .eq("user_id", user.id);

    if (errConsoles) {
      avisar(traduzirErro(errConsoles.message), "erro");
      return false;
    }

    const { error: deletePerfilError } = await (supabase.from("perfis") as any)
      .delete()
      .eq("id", user.id);

    if (deletePerfilError) {
      avisar(traduzirErro(deletePerfilError.message), "erro");
      return false;
    }

    setPerfil(null);
    setAlvoEdicao(null);
    await supabase.auth.signOut();
    avisar("Seu perfil e os itens criados por você foram removidos.");
    await carregarDados();
    return true;
  }

  const termo = busca.trim().toLowerCase();
  const consolesFiltrados = consoles.filter(
    (c) =>
      !termo ||
      c.nome?.toLowerCase().includes(termo) ||
      c.fabricante?.toLowerCase().includes(termo)
  );
  const jogosFiltrados = jogos.filter(
    (j) =>
      !termo ||
      j.titulo?.toLowerCase().includes(termo) ||
      j.genero?.toLowerCase().includes(termo) ||
      j.consoles?.nome?.toLowerCase().includes(termo)
  );
  const avaliacoesFiltradas = avaliacoes.filter(
    (a) =>
      !termo ||
      a.jogos?.titulo?.toLowerCase().includes(termo) ||
      a.comentario?.toLowerCase().includes(termo) ||
      a.autor_nome?.toLowerCase().includes(termo)
  );

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-black text-zinc-100 pb-16"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <Navbar
        user={user}
        perfil={perfil}
        onSalvarPerfil={salvarPerfil}
        onExcluirPerfil={excluirPerfilComSenha}
        nomeExibicao={nomeExibicao}
        setNomeExibicao={setNomeExibicao}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onLogout={handleLogout}
        onSync={sincronizarTudo}
        loading={loading}
      />

      {toast && (
        <div
          className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-50 px-4 py-3 rounded-2xl text-xs font-extrabold shadow-2xl border text-center sm:text-left ${
            toast.tipo === "erro"
              ? "bg-rose-950 border-rose-500 text-rose-200"
              : "bg-zinc-950 border-[#0D80BF] text-sky-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 pt-5 sm:pt-6 space-y-8 sm:space-y-10">
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
          consoles={consolesFiltrados}
          onRecarregar={carregarDados}
          avisar={avisar}
          onEditarConsole={abrirEdicaoConsole}
        />
        <JogosSection
          user={user}
          jogos={jogosFiltrados}
          consoles={consoles}
          onRecarregar={carregarDados}
          avisar={avisar}
          onEditarJogo={abrirEdicaoJogo}
        />
        <AvaliacoesSection
          user={user}
          perfil={perfil}
          jogos={jogos}
          avaliacoes={avaliacoesFiltradas}
          onRecarregar={carregarDados}
          avisar={avisar}
          onEditarAvaliacao={abrirEdicaoAvaliacao}
        />
      </main>

      <EditarItensModal
        alvo={alvoEdicao}
        userId={user?.id ?? null}
        consoles={consoles}
        onFechar={() => setAlvoEdicao(null)}
        onConsoleAtualizado={() => {
          avisar("Console atualizado!");
          carregarDados();
        }}
        onJogoAtualizado={() => {
          avisar("Jogo atualizado!");
          carregarDados();
        }}
        onAvaliacaoAtualizada={() => {
          avisar("Avaliação atualizada!");
          carregarDados();
        }}
      />
    </div>
  );
}