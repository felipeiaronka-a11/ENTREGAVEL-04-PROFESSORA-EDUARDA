export function setCookie(nome: string, valor: string, dias = 30): void {
  const expira = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${encodeURIComponent(nome)}=${encodeURIComponent(valor)};expires=${expira};path=/;SameSite=Lax`;
}

export function getCookie(nome: string): string | null {
  const chave = `${encodeURIComponent(nome)}=`;
  for (const item of document.cookie.split(";")) {
    const limpo = item.trim();
    if (limpo.startsWith(chave)) {
      return decodeURIComponent(limpo.slice(chave.length));
    }
  }
  return null;
}

export function deleteCookie(nome: string): void {
  document.cookie = `${encodeURIComponent(nome)}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}