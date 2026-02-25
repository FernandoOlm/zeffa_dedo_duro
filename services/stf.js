import fetch from "node-fetch";
import apis from "../config/apisources.json" assert { type: "json" };

const base = apis.transparencia.base;
const key = apis.transparencia.key;
const org = apis.transparencia.orgaos.stf;

async function reqT(endpoint) {
  const req = await fetch(base + endpoint, {
    headers: { "chave-api-dados": key }
  });
  return await req.json();
}

export async function zeffaGastosSTF_unique() {
  return await reqT(
    apis.transparencia.endpoints.despesas_orgao + `?orgao=${org}`
  );
}

export async function zeffaRemuneracaoSTF_unique(cpf) {
  return await reqT(
    apis.transparencia.endpoints.servidores + `?cpf=${cpf}`
  );
}