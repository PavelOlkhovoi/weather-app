// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Get data about the last request
app.get('/data', (req, res) => {
    if(!req.body){
        res.status(400).json({ error: 'bed request' });
    }else {
        res.json(projectData);
    }
});

// Save the user's request
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
    console.log('Port works');
})
