import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

function getElements(response) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
      .then(function(response) {
        getElements(response);
      });
  });
});


//   let request = new XMLHttpRequest();
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

//   request.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//       const response = JSON.parse(this.responseText);
//       getElements(response);
//     }
//   };

//   request.open("GET", url, true);
//   request.send();

//   try {
//     if (request.status !== 200) {
//       console.log(request);
//       throw Error;
//     }
//   } catch(error) {
//     console.error('bad input');
//   }



//   function getElements(response) {

//     $('.showWeather').text(`The cloud cover in ${city} is ${response.weather[0].description}`);
//     $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees. The temperature in Fahrenheit is ${parseInt(((response.main.temp - 273.15) * 1.8) + 32)} degrees`);
//     // $('.showResponse').text(JSON.stringify(response));
//   }
// });

// $('#forecast').click(function() {

//   // const city = 'Portland, Oregon';
//   const city = $('#location').val();
//   let request2 = new XMLHttpRequest();
//   const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;

//   request2.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//       const response2 = JSON.parse(this.responseText);
//       getElements2(response2);
//     }
//   };

//   request2.open('GET', url2, true);
//   request2.send();

//   function getElements2(response2) {
//     $('.forecast').text(`test ${JSON.stringify(response2)}`);
//   }

// });