const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

//here in apikey you have to place your apikey from openweatherMap.org or ther apikey which you have 
const apiKey = '********************************';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  

   request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
// app.post('/',function(req, res){
//    console.log(req.body.city);
//    res.render('index');
// })

app.listen(3000, function () {
  console.log('Weather forcast listening on port 3000!')
})