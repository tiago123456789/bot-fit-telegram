const dialogFlowSdk = require("dialogflow");
const dialogFlowCredentials = require("../../credentials/BOT FIT TIAGO-39f743d567e0");

class DialogFlow {

    constructor() {
        this._sessionClient = null;
        this._sessionPath = null;
    }

    createSessionClient() {
        this._sessionClient = new dialogFlowSdk.SessionsClient({
            projectId: dialogFlowCredentials.project_id,
            credentials: { 
                private_key: dialogFlowCredentials.private_key,
                client_email: dialogFlowCredentials.client_email
            }
        });
        return this;
    }

    createSessionPath(sessionId) {
        if (this._sessionClient == null) {
            throw new Error('Is necessary call createSessionClient before.')
        }

        this._sessionPath = this._sessionClient.sessionPath(
            dialogFlowCredentials.project_id, sessionId.toString()
        );
        return this;
    }

    async detectIntent(text) {
        if (this._sessionPath == null) {
            throw new Error('Is necessary call createSessionPath before.')
        }

        const request = {
            session: this._sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: process.env.DIALOG_FLOW_LANGUAGE,
                },
            },
        };

        const response = await this._sessionClient.detectIntent(request);
        return response[0].queryResult;
    }

}

module.exports = new DialogFlow();