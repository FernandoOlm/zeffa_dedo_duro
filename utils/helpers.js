// INÍCIO — Imports
import { zeffaNormalizar_unique } from "./normalizar.js";
// FIM

// INÍCIO — Ordenação
export function zeffaOrdenarPorValorDesc_unique(lista, campo = "valor") {
  return [...lista].sort((a, b) => (b[campo] || 0) - (a[campo] || 0));
}
// FIM

// INÍCIO — Format moeda
export function zeffaFormatoMoeda_unique(valor) {
  return (valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
// FIM

// INÍCIO — Filtro texto
export function zeffaFiltrarPorTexto_unique(lista, campo, termo) {
  const alvo = zeffaNormalizar_unique(termo);
  return lista.filter((item) =>
    zeffaNormalizar_unique(item[campo] || "").includes(alvo)
  );
}
// FIM

// INÍCIO — Safe value
export function zeffaSafe_unique(valor, fallback = "—") {
  return valor || fallback;
}
// FIM