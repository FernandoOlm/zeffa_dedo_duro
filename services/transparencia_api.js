// INÍCIO — Imports
import fetch from "node-fetch";
import apis from "../config/apisources.json" assert { type: "json" };
import { zeffaModoOperacao_unique } from "../utils/mode_detector.js";
// FIM

// INÍCIO — Detectar modo
if (zeffaModoOperacao_unique() === "SEM_API") {
  console.log("🔵 Transparência DESATIVADA — modo SEM_API ativo.");

  export const zeffaRemuneracaoFederal_unique = async () => [];
  export const zeffaViagensOficiais_unique = async () => [];
  export const zeffaDiariasFederais_unique = async () => [];
  export const zeffaDespesasOrgao_unique = async () => [];
  export const zeffaCartaoCorpo_unique = async () => [];

  // Sai do arquivo sem erro
  return;
}
// FIM

// INÍCIO — Código normal quando tem chave
const base = apis.transparencia.base;
const key = apis.transparencia.key;

async function zeffaTranspFetch_unique(endpoint) {
  const req = await fetch(base + endpoint, {
    headers: {
      "chave-api-dados": key,
      Accept: "application/json"
    }
  });
  return await req.json();
}

export async function zeffaRemuneracaoFederal_unique(cpf) {
  return await zeffaTranspFetch_unique(
    apis.transparencia.endpoints.servidores + `?cpf=${cpf}`
  );
}

// ... e assim por diante
// FIM