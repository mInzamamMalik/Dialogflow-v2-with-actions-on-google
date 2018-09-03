import * as functions from 'firebase-functions';
import { dialogflow, SimpleResponse, Suggestions, DialogflowConversation, DialogflowApp } from 'actions-on-google'
import { raw } from './core'

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


app.intent('Book Hotel', (conv, params) => {

    console.log("params.numberOfPeople: ", params.numberOfPeople)
    console.log("params.geoCity: ", params.geoCity)
    console.log("params: ", params)

    if (!params.geoCity) {
        conv.ask("in which city?")
    } else if (!params.numberOfPeople) {
        conv.ask("how many people are you?")
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

// 