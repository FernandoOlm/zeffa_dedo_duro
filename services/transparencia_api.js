// INÍCIO — Imports
import fetch from "node-fetch";
import apis from "../config/apisources.json" with { type: "json" };
import { zeffaModoOperacao_unique } from "../utils/mode_detector.js";
// FIM

// INÍCIO — Config
const base = apis.transparencia.base;
const key = apis.transparencia.key;
// FIM

// INÍCIO — Função interna
async function zeffaTranspFetch_unique(endpoint) {
  const req = await fetch(base + endpoint, {
    headers: {
      "chave-api-dados": key,
      Accept: "application/json",
    },
  });
  return await req.json();
}
// FIM

// INÍCIO — DEFINIÇÃO INICIAL (modo COM_API por padrão)
let zeffaRemuneracaoFederal_unique = async (cpf) =>
  zeffaTranspFetch_unique(apis.transparencia.endpoints.servidores + `?cpf=${cpf}`);

let zeffaViagensOficiais_unique = async (cpf) =>
  zeffaTranspFetch_unique(apis.transparencia.endpoints.viagens + `?cpf=${cpf}`);

let zeffaDiariasFederais_unique = async (cpf) =>
  zeffaTranspFetch_unique(apis.transparencia.endpoints.diarias + `?cpf=${cpf}`);

let zeffaDespesasOrgao_unique = async (orgaoCodigo) =>
  zeffaTranspFetch_unique(
    apis.transparencia.endpoints.despesas_orgao + `?orgao=${orgaoCodigo}`
  );

let zeffaCartaoCorpo_unique = async () =>
  zeffaTranspFetch_unique(apis.transparencia.endpoints.cartoes);
// FIM

// INÍCIO — Se não tem API, SOBREESCREVE AS FUNÇÕES
if (zeffaModoOperacao_unique() === "SEM_API") {
  console.log("🔵 Transparência DESATIVADA — modo SEM_API ativo.");

  zeffaRemuneracaoFederal_unique = async () => [];
  zeffaViagensOficiais_unique = async () => [];
  zeffaDiariasFederais_unique = async () => [];
  zeffaDespesasOrgao_unique = async () => [];
  zeffaCartaoCorpo_unique = async () => [];
}
// FIM

// INÍCIO — EXPORT FINAL (SEM IF, SEM ERRO)
export {
  zeffaRemuneracaoFederal_unique,
  zeffaViagensOficiais_unique,
  zeffaDiariasFederais_unique,
  zeffaDespesasOrgao_unique,
  zeffaCartaoCorpo_unique
};
// FIM