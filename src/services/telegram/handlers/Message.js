
const dialogFlowService = require("../../../services/DialogFlow");
const youtubeService = require("../../../services/Youtube");
const CacheUtils = require("../../../utils/Cache");

module.exports = async function(message) {
    const chatId = message.chat.id;
    this._bot.sendMessage(chatId, "Buscando...");

    let response = await CacheUtils.get(message.text);

    if (!response) {
        response = await dialogFlowService
            .createSessionClient()
            .createSessionPath(chatId)
            .detectIntent(message.text);

        await CacheUtils.set(message.text, JSON.stringify({
            queryText: response.queryText,
            intent: {
                displayName: response.intent.displayName
            }
        }));
    }


    const isNecesarySearchVideo = response.intent.displayName == 'train-in-house';
    if (isNecesarySearchVideo) {
        const keyCache = `video_${response.queryText}`;
        let videoLinks = await CacheUtils.get(keyCache);

        if (!videoLinks) {
            const quantityLinksReturn = 2;
            videoLinks = await youtubeService.searchVideoUrls(response.queryText, quantityLinksReturn);
            await CacheUtils.set(keyCache, videoLinks);
        }

        this._bot.sendMessage(chatId, videoLinks);
    } else {
        this._bot.sendMessage(chatId, `Não foi possível encontrar um de  ${message.text}`);
    }
};
