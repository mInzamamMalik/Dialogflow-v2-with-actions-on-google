import * as functions from 'firebase-functions';
import { dialogflow, SimpleResponse, Suggestions, DialogflowConversation, DialogflowApp } from 'actions-on-google'
import { raw } from './core'
import { userEntity } from "./helperfunctions"

const app = dialogflow({ debug: false })


app.middleware((conv) => {
    conv["hasScreen"] =
        conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    conv["hasAudioPlayback"] =
        conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
});

// Welcome
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `Hi & welcome to TITITY™! The place for personalized gifts for any occasion!`,
        text: 'Hi & welcome to TITITY™! The place for personalized gifts for any occasion!',
    }));
    conv.ask(new Suggestions([
        "gift a personalized song",
        "gift anything else"
    ]));
});


app.intent('Book Hotel', (conv, params:any) => {

    console.log("params.name: ", params.name)
    console.log("params.recipientsname: ", params.recipientsname)
    console.log("params.characteristics: ", params.characteristics)

    console.log("params: ", params)

    if (!params.name) {
        conv.ask("what is your name?")
    } else if (!params.recipientsname) {
        conv.ask("what is your partner name?")
    } else if (params.characteristics.length == 0) {

        userEntity.makeUserEntityWithArray(raw.request.body.session, "characteristics", ["bold", "clever"]).then(() => {
            conv.ask("what is your partner characteristics?")
        }).catch((e) => {
            console.log("error making user entity")
        })

    } else {
        conv.close(`your hotel is booked for ${params.numberOfPeople} person in ${params.geoCity} city`)
    }
});
app.intent('Default Fallback Intent', (conv) => {
    conv.ask('Default fallback intent triggered');

});


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const webhook = functions.https.onRequest((request, response) => {

    raw.request = request; // saving original request
    raw.response = response; // saving original response

    console.log("request.body: ", request.body)
    console.log("response: ", response)

    app(request, response) // handing over request to dialogflow app
});



// var a = {
//     responseId: 'bea5b994-4361-4a27-84a7-3b1f13cb4e96',
//     queryResult: {
//         queryText: 'GOOGLE_ASSISTANT_WELCOME',
//         action: 'input.welcome',
//         parameters: {},
//         allRequiredParamsPresent: true,
//         fulfillmentMessages: [[Object], [Object]],
//         outputContexts: [[Object], [Object], [Object], [Object], [Object], [Object]],
//         intent:
//         {
//             name: 'projects/upworkbot-65288/agent/intents/1267b3da-1e10-41b0-9ba5-4ca46698efbf',
//             displayName: 'Default Welcome Intent'
//         },
//         intentDetectionConfidence: 1,
//         languageCode: 'en-us'
//     },
//     originalDetectIntentRequest: {
//         source: 'google',
//         version: '2',
//         payload:
//         {
//             isInSandbox: true,
//             surface: [Object],
//             requestType: 'SIMULATOR',
//             inputs: [Object],
//             user: [Object],
//             conversation: [Object]
//         }
//     },
//     session: 'projects/upworkbot-65288/agent/sessions/ABwppHHk6DQXdjNVdCmsxxdHkp3WaslqbaYmu2zAVOdS-Xr_C12fWWZubVOnJGbT5wMYcoThPSXA7mVjWwCk'
// }