require("./config/BootstrapApp");
const botTelegram = require("./services/telegram/BotTelegram");
const handlerMessage = require("./services/telegram/handlers/Message");

botTelegram
    .addHandler("message", handlerMessage)
    .listen();
