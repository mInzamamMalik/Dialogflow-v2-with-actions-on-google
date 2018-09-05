
const { google } = require('googleapis');


export let getToken = async () => {

    const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
        email: "dialogflow-opimvo@upworkbot-65288.iam.gserviceaccount.com",
        key: "-----BEGIN PRIVATE KEY-----\ndfddfdf\n-----END PRIVATE KEY-----\n",
        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/cloud-platform']
    })
    return await serviceAccountAuth.authorize()
}
