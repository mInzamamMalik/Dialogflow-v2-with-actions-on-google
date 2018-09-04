
const { google } = require('googleapis');


const serviceAccountAuth = new google.auth.JWT({
    email: "dialogflow-opimvo@upworkbot-65288.iam.gserviceaccount.com",
    keyFile: "./../service-account.json",
    scopes: ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/cloud-platform']
})
// .then(data => {

//     console.log("data: ", data)
// })

console.log("serviceAccountAuth: ", serviceAccountAuth)

serviceAccountAuth.authorize().then((data) => {
    console.log("data: ", data)

}).catch(e => {

    console.log("e: ", e)
})

