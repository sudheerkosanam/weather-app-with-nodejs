let request = require('request');
const argv = require('yargs').argv;


//here in apikey you have to place your apikey from openweatherMap.org or ther apikey which you have
let apiKey = '********************************';
//let city = 'new delhi';

app.post('/',function(req, res){
//let city = argv.c || 'new delhi'; 
let city = req.body.city;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    res.render('index',{weather:null ,error : 'error,please try again'});
    //console.log('error:', error);
  } else {

    //console.log('body:', body);
    let weather = JSON.parse(body)
    if (weather.main == undefined){
    	res.render('index',{weather:null ,error : 'error,please try again'});
    } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }

//let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//console.log(message);
  }
});
})

