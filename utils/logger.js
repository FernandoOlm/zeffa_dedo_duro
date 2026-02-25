// INÍCIO — Imports
import chalk from "chalk";
// FIM

// INÍCIO — Log entrada
export function zeffaLogEntrada_unique(contexto, dados) {
  console.log(
    chalk.green("🟢 [ENTRADA]"),
    chalk.white(`(${contexto})`),
    "\n→ ",
    chalk.gray(JSON.stringify(dados, null, 2))
  );
}
// FIM

// INÍCIO — Log saída
export function zeffaLogSaida_unique(msgCurta) {
  console.log(chalk.blue("🔵 [SAÍDA]"), chalk.yellow(msgCurta));
}
// FIM