const YoutubeClient = require("youtube-node");

class Youtube {

    constructor() {
        this._youtubeClient = new YoutubeClient();
        this._youtubeClient.setKey(process.env.YOUTUBE_API_KEY);
    }

    async searchVideoUrls(textSearch, quantityVideosReturn = 1) {
        const results = await new Promise((resolve, reject) => {
            this._youtubeClient.search(textSearch, quantityVideosReturn, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });

        let videos  = results.items;
        videos = videos.map(video => `https://www.youtube.com/watch?v=${video.id.videoId}`);
        return videos.join(", ");
    }
}

module.exports = new Youtube();