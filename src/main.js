//Chaining Promises
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
}
function displayWeatherDescription(description) {
  $('.weather-description').text(`The weather is ${description}!`);
}

function displayGif(response) {
  const url = response.data[0].images.downsized.url;
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
      .then(function(weatherResponse) {
        if (weatherResponse instanceof Error) {
          throw Error(`OpenWeather API error: ${weatherResponse.message}`);
        }
        const weatherDescription = weatherResponse.weather[0].description;
        displayWeatherDescription(weatherDescription);
        return GiphyService.getGif(weatherDescription);
      })
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      })
      .catch(function(error) {
        displayErrors(error.message);
      })
  });
});

// with async function

// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
// import WeatherService from './services/weather-service.js';

// function clearFields() {
//   $('#location').val("");
//   $('.showErrors').text("");
//   $('.showHumidity').text("");
//   $('.showTemp').text("");
// }
// function getElements(response) {
//   if (response.main) {
//     $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
//     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//   } else {
//     $('.showErrors').text(`There was an error: ${response}`);
//   }
// }

// async function makeApiCall(city) {
//   const response = await WeatherService.getWeather(city);
//   getElements(response);
// }

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     clearFields();
//     makeApiCall(city);
//   });
// });

// fetch
// function getElements(response) {
//   if (response.main) {
//     $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
//     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//   } else {
//     $('.showErrors').text(`There was an error: ${response.message}`);
//   }
// }


//Promise
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");

//     let promise = new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(request.response);
//         }
//       }
//       request.open("GET", url, true);
//       request.send();
//     });

//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
//       $('.showErrors').text("");
//     }, function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error}`);
//       $('.showHumidity').text("");
//       $('.showTemp').text("");
//     });
//   });
// });

//Promise
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     clearFields();
//     WeatherService.getWeather(city)
//       .then(function(response) {
//         getElements(response);
//       });
//   });
// });


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