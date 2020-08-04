let path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

//  import and initiate body-parser & cors
const bodyParser = require('body-parser');
const  cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });

// MeaningCloud API base URL
const baseURL='https://api.meaningcloud.com/sentiment-2.1?key=';

// MeaningCloud API query parameters
const queryParams = '&lang=en&url=';

// MeaningCloud API key (set in the environment variables' file)
const key = process.env.API_KEY;

// to be used to fetch data from the MeaningCloud API (for Sentiment Analysis)
const fetch = require('node-fetch');

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

// webpack outputs to the 'dist' folder
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
app.post('/analyseURL', sentimentAnalyser)

async function sentimentAnalyser (req, res) {

    // prepare MeaningCloud url to be fetched
    console.log("data back from API: " + req.body)
    const urlToBeAnalysed = req.body.url;
    console.log("URL To Be Analysed: ", urlToBeAnalysed)

    //get data from the external API
    const apiData =
        await fetch (baseURL + key + queryParams + urlToBeAnalysed)
            .then( apiData => apiData.json())
            .then( data => {
                res.send(data)
            })
            .catch((error) => {
                console.log("error in promise (server side): ", error);
            });
   }
