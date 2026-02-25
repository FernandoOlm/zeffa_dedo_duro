// INÍCIO — Imports
import fetch from "node-fetch";
import apis from "../config/apisources.json" assert { type: "json" };
// FIM

export async function zeffaDespesasSenador_unique(id) {
  const url =
    apis.senado.base +
    apis.senado.endpoints.despesas.replace("{id}", id);

  const req = await fetch(url);
  return await req.text();
}

export async function zeffaInfoSenador_unique(id) {
  const url =
    apis.senado.base +
    apis.senado.endpoints.info.replace("{id}", id);

  const req = await fetch(url);
  return await req.text();
}