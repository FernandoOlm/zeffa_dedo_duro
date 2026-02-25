// INÍCIO — Imports
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import { zeffaCommandHandler_unique } from "./bot/baileys_handler.js";
// FIM

// INÍCIO — Função principal
async function startZeffaBot_unique() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false // DESATIVADO, mas vamos tratar manualmente
  });

  // INÍCIO — Listener do QR
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n======================================");
      console.log("        🔥 QR CODE DO ZEFFA 🔥        ");
      console.log("======================================\n");
      console.log(qr); // <- QR literal (para bot de CLI)
      console.log("\nEscaneie esse QR no seu WhatsApp!");
      console.log("======================================\n");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("📡 Conexão fechada:", lastDisconnect?.error, "Reconectar?", shouldReconnect);

      if (shouldReconnect) {
        startZeffaBot_unique();
      }
    } else if (connection === "open") {
      console.log("🔥 Zeffa conectado com sucesso!");
    }
  });
  // FIM

  // INÍCIO — Atualizar credenciais
  sock.ev.on("creds.update", saveCreds);
  // FIM

  // INÍCIO — Receber mensagens
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;
    await zeffaCommandHandler_unique(sock, msg);
  });
  // FIM
}

startZeffaBot_unique();
// FIM