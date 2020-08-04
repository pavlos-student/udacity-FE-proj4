let path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

//  import and initiate body-parser & cors
const bodyParser = require('body-parser');
const  cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });

// import and initiate the Aylien API SDK (for Sentiment Analysis)
const aylienTextAPI = require('aylien_textapi');
const textapi = new aylienTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// start up an instance of app using express for routing
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('app listening on port 8081!')
})

// wepback outputs to the 'dist' folder
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// empty object acting as an endpoint for all routes
projectData = {};

// post the url to be analysed by the sentiment analyser
app.post('/sentiment-analysis', (req, res) => {
    textapi.sentiment ({
            url: req.body.url,
            mode: 'document'
        },
       (error, response) => {
       if(error) {
           console.log('Error during Aylien POST request --> ' + error)
           res.send();
           return;
       }
       else {
           console.log('Aylien API succesfull with the following response' + response)
           res.send(response)
       }
   })
})

/**
 * @description POST route
 *
 * @description Add aylientext-data received from client-side to the projectData object
 * @returns data received from client-side POST
 *
 **/
app.post("/add", (req, res) => {

    projectData.text = req.body.text;
    projectData.subjectivity = req.body.subjectivity;
    projectData.polarity = req.body.polarity;
    projectData.polarity_confidence = (req.body.polarity_confidence * 100);

    res.send(projectData);
});

// TODO: remove to check if the app works without it
// module.exports = app;

//TODO: remove
console.log("Your API ID is" + textapi.application_id)
console.log(`Your API ID is ${process.env.API_ID}`)
console.log(`Your API Key is ${process.env.API_KEY}`)
