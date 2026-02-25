// INÍCIO — Imports
import fetch from "node-fetch";
import apis from "../config/apisources.json" assert { type: "json" };
// FIM

const base = apis.transparencia.base;
const key = apis.transparencia.key;

// INÍCIO — Função genérica
async function zeffaTranspFetch_unique(endpoint) {
  const req = await fetch(base + endpoint, {
    headers: {
      "chave-api-dados": key,
      Accept: "application/json"
    }
  });
  return await req.json();
}
// FIM

export async function zeffaRemuneracaoFederal_unique(cpf) {
  return await zeffaTranspFetch_unique(
    apis.transparencia.endpoints.servidores + `?cpf=${cpf}`
  );
}

export async function zeffaViagensOficiais_unique(cpf) {
  return await zeffaTranspFetch_unique(
    apis.transparencia.endpoints.viagens + `?cpf=${cpf}`
  );
}

export async function zeffaDiariasFederais_unique(cpf) {
  return await zeffaTranspFetch_unique(
    apis.transparencia.endpoints.diarias + `?cpf=${cpf}`
  );
}