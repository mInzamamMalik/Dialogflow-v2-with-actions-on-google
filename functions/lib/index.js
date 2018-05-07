"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const actions_on_google_1 = require("actions-on-google");
const intentSuggestions = [
    'Basic Card',
    'Browse Carousel',
    'Carousel',
    'List',
    'Media',
    'Suggestions',
];
const app = actions_on_google_1.dialogflow({ debug: true });
app.middleware((conv) => {
    conv["hasScreen"] =
        conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    conv["hasAudioPlayback"] =
        conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
});
// Welcome
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new actions_on_google_1.SimpleResponse({
        speech: `Hi there!, conv.hasScreen ${conv["hasScreen"]} conv.hasAudioPlayback ${conv["hasAudioPlayback"]}`,
        text: 'Hello there!',
    }));
    conv.ask(new actions_on_google_1.SimpleResponse({
        speech: 'I can show you basic cards, lists and carousels ' +
            'as well as suggestions on your phone.',
        text: 'I can show you basic cards, lists and carousels as ' +
            'well as suggestions.',
    }));
    conv.ask(new actions_on_google_1.Suggestions(intentSuggestions));
});
app.intent('Book Hotel', (conv, params) => {
    console.log("params.numberOfPeople: ", params.numberOfPeople);
    console.log("params.geoCity: ", params.geoCity);
    console.log("params: ", params);
    if (!params.geoCity) {
        conv.ask("in which city?");
    }
    else if (!params.numberOfPeople) {
        conv.ask("how many people are you?");
    }
    else {
        conv.close(`your hotel is booked for ${params.numberOfPeople} person in ${params.geoCity} city`);
    }
});
app.intent('Default Fallback Intent', (conv) => {
    conv.ask('Default fallback intent triggered');
});
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.webhook = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map