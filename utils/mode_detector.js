// INÍCIO — Imports
import apis from "../config/apisources.json" assert { type: "json" };
// FIM

// INÍCIO — Detectar se chave existe
export function zeffaHasTransparencyKey_unique() {
  return apis.transparencia.key && apis.transparencia.key.trim() !== "";
}
// FIM

// INÍCIO — Modo atual do Zeffa
export function zeffaModoOperacao_unique() {
  if (zeffaHasTransparencyKey_unique()) {
    return "COM_API"; // usa tudo
  }
  return "SEM_API"; // usa só Câmara/Senado
}
// FIM