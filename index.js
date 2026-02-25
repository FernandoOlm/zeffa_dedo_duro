// INÍCIO — Imports universais compatíveis com ESM
import * as baileys from "@whiskeysockets/baileys";
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState
} = baileys;

import { Boom } from "@hapi/boom";
import chalk from "chalk";
import { zeffaCommandHandler_unique } from "./bot/baileys_handler.js";
// FIM

// INÍCIO — Função principal
async function iniciarZeffa_unique() {
  console.log(chalk.blueBright("🚀 Iniciando Zeffa Dedo Duro..."));

  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  // INÍCIO — Evento de conexão
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const motivo = new Boom(lastDisconnect.error)?.output?.statusCode;

      console.log(chalk.red(`❌ Conexão fechada. Motivo: ${motivo}`));

      if (motivo !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow("🔄 Reconectando Zeffa..."));
        iniciarZeffa_unique();
      } else {
        console.log(chalk.red("⛔ Sessão expirada. Apague a pasta /auth e logue novamente."));
      }
    }

    if (connection === "open") {
      console.log(chalk.green("🔥 Zeffa conectado com sucesso!"));
    }
  });
  // FIM

  // INÍCIO — Atualizar credenciais
  sock.ev.on("creds.update", saveCreds);
  // FIM

  // INÍCIO — Receber mensagens
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages?.[0];
    if (!msg?.message) return;

    try {
      await zeffaCommandHandler_unique(sock, msg);
    } catch (err) {
      console.log(chalk.red("⚠️ Erro ao processar mensagem:"), err);
    }
  });
  // FIM
}

// INÍCIO — Start
iniciarZeffa_unique();
// FIM