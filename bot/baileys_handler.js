// INÍCIO — Imports
const chalk = require("chalk");
// FIM

// INÍCIO — Função de resposta segura
async function responderUnique(sock, jid, texto) {
  try {
    await sock.sendMessage(
      jid,
      { text: texto },
      { statusJidList: [] } // ← impede erro “phash” e evita reenvio
    );
    console.log("📤 Enviado →", texto.replace(/\n/g, " "));
  } catch (e) {
    console.log("🔥 ERRO AO ENVIAR:", e);
  }
}
// FIM

// INÍCIO — Handler principal
module.exports.zeffaCommandHandler_unique = async (sock, msg) => {
  try {
    // ❗ IGNORA MENSAGENS DO PRÓPRIO BOT (o bug principal!)
    if (msg?.key?.fromMe) return;

    const from = msg.key.remoteJid;

    const texto =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      "";

    if (!texto) return;

    const comando = texto.trim().toLowerCase();

    console.log("📥 Recebido:", comando);

    // ===============================
    // 🔥 COMANDOS DE TESTE
    // ===============================

    if (comando === "!ping") {
      await responderUnique(sock, from, "pong 🏓");
      return;
    }

    if (comando === "!status") {
      await responderUnique(sock, from, "🔥 Zeffa Online, pai 😘");
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
        `🔍 *Zeffa analisando*: ${nome}\nAguarde...`
      );

      // Enquanto não conectamos tudo, devolve teste:
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
      await responderUnique(sock, from, "❓ Comando não reconhecido, chefe.");
    }
  } catch (err) {
    console.log("⚠️ Erro no handler:", err);
  }
};
// FIM