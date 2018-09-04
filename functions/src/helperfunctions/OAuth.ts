
const { google } = require('googleapis');


export let getToken = async () => {

    const serviceAccountAuth = new google.auth.JWT({
        email: "dialogflow-opimvo@upworkbot-65288.iam.gserviceaccount.com",
        keyFile: "./../../../service-account.json",
        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/cloud-platform']
    })
    return await serviceAccountAuth.authorize()
}
