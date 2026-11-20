import { supabase } from "../supabase";

export function podeEditarItem(
  userId?: string | null,
  ownerId?: string | null
): boolean {
  return Boolean(userId && ownerId && userId === ownerId);
}

export async function atualizarConsoleNoBanco(params: {
  id: string;
  userId: string;
  ownerId: string;
  nome: string;
  fabricante: string;
  ano_lancamento: number;
  imagem_url?: string | null;
}) {
  if (!podeEditarItem(params.userId, params.ownerId)) {
    throw new Error("Você só pode editar consoles criados por você.");
  }

  const { data, error } = await (supabase.from("consoles") as any)
    .update({
      nome: params.nome.trim(),
      fabricante: params.fabricante.trim(),
      ano_lancamento: Number(params.ano_lancamento),
      imagem_url: params.imagem_url?.trim() || null,
    })
    .eq("id", params.id)
    .eq("user_id", params.userId)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Já existe um console cadastrado com esse nome.");
    }
    throw error;
  }

  return data;
}

export async function atualizarJogoNoBanco(params: {
  id: string;
  userId: string;
  ownerId: string;
  titulo: string;
  genero: string;
  ano: number;
  console_id: string;
  imagem_url?: string | null;
}) {
  if (!podeEditarItem(params.userId, params.ownerId)) {
    throw new Error("Você só pode editar jogos criados por você.");
  }

  const { data, error } = await (supabase.from("jogos") as any)
    .update({
      titulo: params.titulo.trim(),
      genero: params.genero.trim(),
      ano: Number(params.ano),
      console_id: params.console_id,
      imagem_url: params.imagem_url?.trim() || null,
    })
    .eq("id", params.id)
    .eq("user_id", params.userId)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Já existe um jogo com esse título nesse console.");
    }
    throw error;
  }

  return data;
}

export async function atualizarAvaliacaoNoBanco(params: {
  id: string;
  userId: string;
  ownerId: string;
  nota: number;
  comentario: string;
}) {
  if (!podeEditarItem(params.userId, params.ownerId)) {
    throw new Error("Você só pode editar suas próprias avaliações.");
  }

  const notaValida = Number(params.nota);
  if (Number.isNaN(notaValida) || notaValida < 1 || notaValida > 10) {
    throw new Error("A nota deve estar entre 1 e 10.");
  }

  if (!params.comentario.trim()) {
    throw new Error("O comentário não pode ficar vazio.");
  }

  const { data, error } = await (supabase.from("avaliacoes") as any)
    .update({
      nota: notaValida,
      comentario: params.comentario.trim(),
    })
    .eq("id", params.id)
    .eq("user_id", params.userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}