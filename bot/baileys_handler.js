// INÍCIO — Imports
import { zeffaBuscarPolitico_unique } from "../utils/buscar_politico.js";
import { zeffaBuscarCapivara_unique } from "../services/zeffa_resumidor.js";
import { zeffaLogEntrada_unique, zeffaLogSaida_unique } from "../utils/logger.js";
// FIM

// INÍCIO — Handler Zeffa
export async function zeffaCommandHandler_unique(sock, msg) {
  try {
    const jid = msg.key.remoteJid;
    const texto =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (!texto) return;

    zeffaLogEntrada_unique("Mensagem WhatsApp", { jid, textoCompleto: texto });

    if (texto.startsWith("!zeffa")) {
      const nome = texto.replace("!zeffa", "").trim();

      if (!nome) {
        zeffaLogSaida_unique("Erro: Nome não informado");
        return sock.sendMessage(jid, { text: "Manda o nome aí 😘" });
      }

      zeffaLogEntrada_unique("Buscar político", { nome });

      const politico = await zeffaBuscarPolitico_unique(nome);
      if (!politico) {
        zeffaLogSaida_unique("Pesquisa falhou");
        return sock.sendMessage(jid, { text: "Não achei esse cidadão 🤣" });
      }

      zeffaLogSaida_unique(`Politico identificado (${politico.tipo})`);

      const capivara = await zeffaBuscarCapivara_unique(politico);

      zeffaLogSaida_unique("Resumo enviado");

      return sock.sendMessage(jid, { text: capivara.resposta });
    }
  } catch (err) {
    zeffaLogSaida_unique("Erro geral");
    console.error("🔥 ERRO NO ZEFFA:", err);
  }
}
// FIM