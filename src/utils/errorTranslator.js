"use strict";
exports.__esModule = true;
exports.traduzirErro = void 0;
var ERROS = {
    "invalid login": "E-mail ou senha incorretos.",
    "already registered": "Este e-mail já está cadastrado.",
    "at least": "A senha precisa de 8+ caracteres e 1 número.",
    "rate limit": "Muitas tentativas. Aguarde um pouco.",
    "schema cache": "Atualize as tabelas no SQL Editor do Supabase.",
    "row-level security": "Você não tem permissão para alterar este item.",
    "foreign key": "Selecione um item válido na lista.",
    "violates check": "A nota deve ser entre 1 e 10.",
    "duplicate key": "Este item já está cadastrado no sistema!"
};
function traduzirErro(msg) {
    var texto = msg.toLowerCase();
    var chave = Object.keys(ERROS).find(function (k) { return texto.includes(k); });
    return chave ? ERROS[chave] : "Erro: " + msg;
}
exports.traduzirErro = traduzirErro;
