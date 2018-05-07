import * as functions from 'firebase-functions';
import { dialogflow, SimpleResponse, Suggestions, DialogflowConversation, DialogflowApp } from 'actions-on-google'


const intentSuggestions = [
    'Basic Card',
    'Browse Carousel',
    'Carousel',
    'List',
    'Media',
    'Suggestions',
];

const app = dialogflow({ debug: true })


app.middleware((conv) => {
    conv["hasScreen"] =
        conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    conv["hasAudioPlayback"] =
        conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
});

// Welcome
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SimpleResponse({
        speech: `Hi there!, conv.hasScreen ${conv["hasScreen"]} conv.hasAudioPlayback ${conv["hasAudioPlayback"]}`,
        text: 'Hello there!',
    }));
    conv.ask(new SimpleResponse({
        speech: 'I can show you basic cards, lists and carousels ' +
            'as well as suggestions on your phone.',
        text: 'I can show you basic cards, lists and carousels as ' +
            'well as suggestions.',
    }));
    conv.ask(new Suggestions(intentSuggestions));
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


exports.webhook = functions.https.onRequest(app);

