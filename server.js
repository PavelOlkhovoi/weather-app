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

//TEST main
app.get('/', (req, res) => {
    res.send('Haaaaaa');
})

let store = [];
app.post('/add', (req, res) => {
    let arrayMy = req.body;
    console.log(req.body);
    store.push(arrayMy);
    res.json(store);
})


// Setup Server
app.listen(port, ()=>{
    console.log('Port works');
})
