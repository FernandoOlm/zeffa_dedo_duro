// INÍCIO — Imports
const chalk = require("chalk");
// FIM

// INÍCIO — Função para enviar mensagens SEM FALHAR
async function responderUnique(sock, jid, texto) {
  try {
    await sock.sendMessage(
      jid,
      { text: texto },
      { statusJidList: [] } // ← impede erro “phash”, garante entrega real
    );
    console.log("📤 Enviado →", texto);
  } catch (e) {
    console.log("🔥 ERRO ao enviar:", e);
  }
}
// FIM

// INÍCIO — Handler principal
module.exports.zeffaCommandHandler_unique = async (sock, msg) => {
  try {
    const from = msg.key.remoteJid;
    const texto =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      "";

    if (!texto) return;

    const comando = texto.trim().toLowerCase();

    console.log("📥 Recebido:", comando);

    // ===============================
    // 🔥 COMANDOS DE TESTE (OBRIGATÓRIO)
    // ===============================

    if (comando === "!ping") {
      await responderUnique(sock, from, "pong 🏓");
      return;
    }

    if (comando === "!status") {
      await responderUnique(sock, from, "🔥 Zeffa Online e operante!");
      return;
    }

    if (comando === "!hora") {
      const hora = new Date().toLocaleString("pt-BR");
      await responderUnique(sock, from, "⏰ " + hora);
      return;
    }

    // ===============================
    // 🔥 COMANDO PRINCIPAL: !zeffa <nome>
    // ===============================

    if (comando.startsWith("!zeffa ")) {
      const nome = comando.replace("!zeffa ", "").trim();

      await responderUnique(
        sock,
        from,
        "🔍 *Zeffa analisando*: " + nome + "\nAguarde..."
      );

      // Aqui entra seu motor de busca real:
      // buscarPoliticoUnique(nome)
      // coletarDadosUnique()
      // resumo final

      // TESTE temporário (enquanto ajustamos tudo)
      await responderUnique(
        sock,
        from,
        `🕵️ *Zeffa Dedo Duro ONLINE*\n\nCapivara de *${nome.toUpperCase()}* (modo teste)\n\n💰 Gastos: R$ 4.320,70\n📄 Nota mais cara: R$ 346,70\n\nZeffa trouxe o resumão 😘`
      );

      return;
    }

    // ===============================
    // 🔥 DEFAULT
    // ===============================

    if (comando.startsWith("!")) {
      await responderUnique(sock, from, "❓ Comando não reconhecido.");
    }
  } catch (err) {
    console.log("⚠️ Erro no handler:", err);
  }
};
// FIM