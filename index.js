// INÍCIO — Imports do Baileys
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { zeffaCommandHandler_unique } from "./bot/baileys_handler.js";
// FIM

// INÍCIO — Start bot
async function startZeffaBot_unique() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;
    await zeffaCommandHandler_unique(sock, msg);
  });
}

startZeffaBot_unique();
// FIM