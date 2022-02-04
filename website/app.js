/* Global Variables */
const apiKey = '7bf77c277d9236e7bafcb904e1453ce1&units=metric';
let btn = document.querySelector("#generate");


btn.addEventListener('click', function(e){
    e.preventDefault();
        // Accept data from the form
    const {zip, feelings} = getValueFromAllFilds('myInput');
        // Fetch data by zip code
    let cityZip = getWeather(zip, apiKey)
    .then(data => {
        console.log(data);
        // Return message with a error or save data in server
        return data.message ? 
        // console.log('Stop hier', data.message)
        document.getElementById('error').innerHTML = `${data.message}. Check you request ${zip}`
        : postData('/add', 
        {
            feelings: feelings, 
            city: data.name,
            temp: data.main.temp,
            date: newDate
        })
        // Receive the latest data from server side
        .then(data => {
            getData('/data')
            .then(res => console.log(res))
            .catch(err => console.log('Server Data Error', err));
        });
    }).catch(err => console.log('Server Error', err));
});

/**
* @description Get request to retrieve the latest data 
* @param {url} url - Specify addresses on internal server 
* @returns {object} - Object with the last successful requests
*/
const getData = async (url) => {
    try {
        const response = await fetch(url);
        let data = await response.json();
        document.getElementById('temp').innerHTML = Math.round(data.temp)+ ' degrees';
        document.getElementById('content').innerHTML = data.feelings;
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('city').innerHTML = data.city;
        return data;
    }catch(error){
        console.log(error);
    }
}

/**
* @description Post request to internal server 
* @param {string} url - Specify addresses on internal server 
* @param {object} data - Custom object that will send on server
*/
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log('server Data', newData)
      return newData;
    }catch(error) {
      console.log("error", error);
    }
};

/**
* @description Fetch the actual data from api.openweathermap.org
* @param {string} zip - Code for identifying certain city
* @param {string} apiKey - Unique API key to fetch weather
* @returns {object} - Object with data or error 
*/
async function getWeather(zip, apiKey){
    let path = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
    
    try{
        const response = await fetch(path);
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log("error", error);
      }
}

/**
* @description Get value from text fields with id attribute
* @param {string} commonClass - The common class of text fields (input or textarea)
* @returns {object} The object with id and value from the text field {id: value}
*/
function getValueFromAllFilds(commonClass){
    let inputs = document.querySelectorAll(`.${commonClass}`);
    let inputDataObj = {};
    for(let i = 0; i < inputs.length; i++){
        let inputData = inputs[i].value; 
        let inputId = inputs[i].id; 
        inputDataObj[inputId] = inputData;
    }

    return inputDataObj;
}



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
