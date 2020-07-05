const TelegramBot = require("node-telegram-bot-api");

class BotTelegram {

    constructor() {
        this._bot = new TelegramBot(process.env.TELEGRAM_BOT, { polling: true });
        this._events = { };
    }

    addHandler(event, handlerCallback) {
        this._events[event] = handlerCallback;
        return this;
    }

    listen() {
        const events = Object.keys(this._events);
        events.forEach(event => {
            const handler = this._events[event];
            this._bot.on(event, handler.bind(this));
        });
    }
};


module.exports = new BotTelegram();