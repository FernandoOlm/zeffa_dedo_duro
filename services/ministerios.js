import fetch from "node-fetch";
import apis from "../config/apisources.json" with { type: "json" };
const base = apis.transparencia.base;
const key = apis.transparencia.key;

async function transpReq(endpoint) {
  const req = await fetch(base + endpoint, {
    headers: { "chave-api-dados": key }
  });
  return await req.json();
}

export async function zeffaGastosMinisterio_unique(sigla) {
  return await transpReq(
    apis.transparencia.endpoints.despesas_orgao + `?orgao=${sigla}`
  );
}

export async function zeffaViagensMinisterio_unique(sigla) {
  return await transpReq(
    apis.transparencia.endpoints.viagens + `?orgao=${sigla}`
  );
}