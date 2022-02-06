// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
// BodyParser is responsible for parsing the incoming request 
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuring Cors as middle-ware
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Route for getting the last request 
app.get('/data', (req, res) => {
    if(!req.body){
        res.status(400).json({ error: 'bed request' });
    }else {
        res.json(projectData);
    }
});

// Post route to save the user's request 
app.post('/add', (req, res) => {
    if(!req.body){
        res.status(404).json({ error: 'not fond' });
    }else {
        projectData = req.body;
        console.log(req.body);
        res.status(200).json({ status: 'ok' });
    }

})


// Setup Server
app.listen(port, ()=>{
    // Callback to debug
    console.log('Port works');
})
