// INÍCIO — Imports
import fetch from "node-fetch";
import apis from "../config/apisources.json" with { type: "json" };
import { zeffaLogEntrada_unique, zeffaLogSaida_unique } from "../utils/logger.js";
// FIM

// INÍCIO — Despesas
export async function zeffaDespesasDeputado_unique(id) {
  const url = apis.camara.base + apis.camara.endpoints.despesas.replace("{id}", id);

  zeffaLogEntrada_unique("Câmara — Despesas", { id, url });

  const req = await fetch(url);
  const json = await req.json();

  zeffaLogSaida_unique("Pesquisa Câmara");

  return json.dados || [];
}
// FIM