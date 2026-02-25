// INÍCIO — Imports
import fetch from "node-fetch";
import { zeffaNormalizar_unique } from "./normalizar.js";
// FIM

// INÍCIO — Deputados
async function zeffaBuscarDeputado_unique(nome) {
  const alvo = zeffaNormalizar_unique(nome);
  const url = "https://dadosabertos.camara.leg.br/api/v2/deputados?itens=1000";

  const req = await fetch(url);
  const json = await req.json();

  for (const dep of json.dados) {
    if (zeffaNormalizar_unique(dep.nome).includes(alvo)) {
      return { id: dep.id, nome: dep.nome, tipo: "deputado" };
    }
  }
  return null;
}
// FIM

// INÍCIO — Placeholder futuro: Senado, STF, etc
async function zeffaBuscarSenador_unique() { return null; }
async function zeffaBuscarSupremo_unique() { return null; }
async function zeffaBuscarPresidencia_unique() { return null; }
// FIM

// INÍCIO — Master Search
export async function zeffaBuscarPolitico_unique(nomeBruto) {
  const nome = zeffaNormalizar_unique(nomeBruto);

  const dep = await zeffaBuscarDeputado_unique(nome);
  if (dep) return dep;

  return null;
}
// FIM