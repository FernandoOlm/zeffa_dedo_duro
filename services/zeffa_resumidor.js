// INÍCIO — Imports
import { zeffaDespesasDeputado_unique } from "./camara_api.js";
import { zeffaFormatoMoeda_unique } from "../utils/helpers.js";
import { zeffaLogSaida_unique } from "../utils/logger.js";
// FIM

// INÍCIO — Capivara
export async function zeffaBuscarCapivara_unique(politico) {
  let despesas = [];

  if (politico.tipo === "deputado") {
    despesas = await zeffaDespesasDeputado_unique(politico.id);
  }

  const total = despesas.reduce((acc, d) => acc + d.valorLiquido, 0);

  const maior = despesas.sort(
    (a, b) => b.valorLiquido - a.valorLiquido
  )[0];

  zeffaLogSaida_unique("Resumo final gerado");

  return {
    nome: politico.nome,
    resposta: `
🕵️ *Zeffa Dedo Duro ONLINE*

Capivara de *${politico.nome}*:

💰 Total gasto: ${zeffaFormatoMoeda_unique(total)}
🧾 Nota mais cara: ${
      maior
        ? `${zeffaFormatoMoeda_unique(maior.valorLiquido)} — ${maior.tipoDespesa}`
        : "nenhuma encontrada"
    }

Zeffa analisou e trouxe o resumão 😘
`
  };
}
// FIM