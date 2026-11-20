const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY || "";

export function imagemFallback(titulo: string): string {
  const texto = encodeURIComponent((titulo || "GAMEVAULT").trim().toUpperCase());
  return `https://placehold.co/400x560/09090b/38bdf8?text=${texto}&font=montserrat`;
}

export function ehUrlValida(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  return /^https?:\/\/.+/i.test(url.trim());
}

function proximaImagem(urls: string[], urlAtual?: string | null): string | null {
  const validas = Array.from(new Set(urls.filter((u) => ehUrlValida(u))));
  if (!validas.length) return null;

  const atual = urlAtual?.trim() || "";
  const idx = atual ? validas.indexOf(atual) : -1;

  if (idx >= 0 && validas.length > 1) {
    return validas[(idx + 1) % validas.length];
  }

  const diferente = validas.find((u) => u !== atual);
  return diferente || (validas.length > 1 ? validas[0] : null);
}

async function buscarCapasRAWG(titulo: string, consoleNome = ""): Promise<string[]> {
  if (!RAWG_API_KEY || !titulo.trim()) return [];

  try {
    const query = encodeURIComponent(`${titulo} ${consoleNome}`.trim());
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}&page_size=6`
    );
    if (!res.ok) return [];

    const data = await res.json();
    const jogos: any[] = Array.isArray(data?.results) ? data.results : [];
    const urls: string[] = [];

    for (const jogo of jogos) {
      if (ehUrlValida(jogo?.background_image)) {
        urls.push(jogo.background_image.trim());
      }
      if (Array.isArray(jogo?.short_screenshots)) {
        for (const shot of jogo.short_screenshots) {
          if (ehUrlValida(shot?.image)) {
            urls.push(shot.image.trim());
          }
        }
      }
    }

    return Array.from(new Set(urls));
  } catch {
    return [];
  }
}

async function buscarImagensWikimedia(termo: string, limit = 8): Promise<string[]> {
  if (!termo.trim()) return [];

  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrsearch: `${termo.trim()} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: String(limit),
      prop: "imageinfo",
      iiprop: "url",
    });

    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params.toString()}`
    );
    if (!res.ok) return [];

    const data = await res.json();
    const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
    const urls: string[] = [];

    for (const page of pages as any[]) {
      const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
      const url = info?.url;
      if (ehUrlValida(url) && !/\.(svg|tif|tiff)$/i.test(url)) {
        urls.push(url.trim());
      }
    }

    return Array.from(new Set(urls));
  } catch {
    return [];
  }
}

export async function resolverFotoConsole(
  nome: string,
  fabricante = ""
): Promise<string> {
  const termo = `${nome} ${fabricante} console`.trim();
  const urls = await buscarImagensWikimedia(termo, 8);
  return urls[0] || imagemFallback(nome || "CONSOLE");
}

export async function ciclarFotoConsole(
  nome: string,
  fabricante = "",
  urlAtual?: string | null
): Promise<string | null> {
  const termo = `${nome} ${fabricante} console`.trim();
  const urls = await buscarImagensWikimedia(termo, 8);
  return proximaImagem(urls, urlAtual);
}

export async function resolverCapaJogo(
  titulo: string,
  consoleNome = ""
): Promise<string> {
  const rawgUrls = await buscarCapasRAWG(titulo, consoleNome);
  if (rawgUrls.length) return rawgUrls[0];

  const wikiUrls = await buscarImagensWikimedia(`${titulo} ${consoleNome} game`, 8);
  return wikiUrls[0] || imagemFallback(titulo || "JOGO");
}

export async function ciclarCapaJogo(
  titulo: string,
  consoleNome = "",
  urlAtual?: string | null
): Promise<string | null> {
  const rawgUrls = await buscarCapasRAWG(titulo, consoleNome);
  const wikiUrls =
    rawgUrls.length <= 1
      ? await buscarImagensWikimedia(`${titulo} ${consoleNome} game`, 8)
      : [];

  const combinadas = Array.from(new Set([...rawgUrls, ...wikiUrls]));
  return proximaImagem(combinadas, urlAtual);
}