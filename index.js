// INÍCIO — Imports (CommonJS)
const baileys = require("@whiskeysockets/baileys");
const makeWASocket = baileys.default;
const { useMultiFileAuthState, DisconnectReason } = baileys;

const { Boom } = require("@hapi/boom");
const chalk = require("chalk");
const { zeffaCommandHandler_unique } = require("./bot/baileys_handler.js");
const qrcode = require("qrcode-terminal");
// FIM

// INÍCIO — Função principal
async function iniciarZeffa_unique() {
  console.log(chalk.blueBright("🚀 Iniciando Zeffa Dedo Duro..."));

  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const motivo = new Boom(lastDisconnect.error)?.output?.statusCode;
      console.log(chalk.red(`❌ Conexão fechada. Motivo: ${motivo}`));

      if (motivo !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow("🔄 Reconectando Zeffa..."));
        iniciarZeffa_unique();
      } else {
        console.log(chalk.red("⛔ Sessão expirada. Delete a pasta /auth e logue de novo."));
      }
    }

    if (connection === "open") {
      console.log(chalk.green("🔥 Zeffa conectado com sucesso!"));
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages?.[0];
    if (!msg?.message) return;

    try {
      await zeffaCommandHandler_unique(sock, msg);
    } catch (err) {
      console.log(chalk.red("⚠️ Erro ao processar mensagem:"), err);
    }
  });
}

iniciarZeffa_unique();