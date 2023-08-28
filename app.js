


// Interação''

const citySearchInput = document.getElementById('city-search-input')
const idSearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time"); 
const alertsPrevisao = document.getElementById("alertsPrevisao");

const api_key = "9dd573acf23af2fb1e2b79726072d201";
const api_key1 = "t616H4VQSxC4C0dHNzBqf1e5OlVfWDJZ";



citySearchButton.addEventListener("click", () => {

   const cityName = citySearchInput.value
   const requestCityName = cityName

   getCityWeather(cityName)
   requestAccuWeather(requestCityName)
  

})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API key} // 896ed49c5ba70ed7875c3f89e7ef0128
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}




function getCityWeather(cityName) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
     .then((response) => response.json())
     .then((data) => displayWeather(data))
    
    
}


function displayWeather(data) {
  console.log(data)
    let {
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity, temp_min },
        wind: { speed },
        sys: { sunrise, sunset },
        
      } = data

     cityName.textContent = name;
     weatherIcon.src = `/assets/${icon}.svg`
     weatherDescription.textContent = description;
     currentTemperature.textContent = `${Math.round(temp)} °C`;
     windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
     feelsLikeTemperature.textContent = `${feels_like}°C`;
     currentHumidity.textContent =`${humidity}%`;
     sunriseTime.textContent = formatTime(sunrise);
     sunsetTime.textContent = formatTime(sunset);
   
}




function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', {month: "long", day: 'numeric' })
  return `Hoje, ${formattedDate}`
}


function requestAccuWeather(requestCityName) {
  let url = '';

  if (requestCityName === 'caraguatatuba') {
    url = 'https://www.accuweather.com/pt/br/caraguatatuba/45839/weather-warnings/45839';
  } else if (requestCityName === 'sao sebastiao') {
    url = 'https://www.accuweather.com/pt/br/s%C3%A3o-sebasti%C3%A3o/41642/weather-warnings/41642';
  } else if (requestCityName === 'ilhabela') {
    url = 'https://www.accuweather.com/pt/br/ilhabela/41748/weather-warnings/41748';
  } else {
    console.log('Cidade não suportada para alertas de previsão');
    return;
  }

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Falha ao recuperar a página');
      }
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const alertsTextElements = doc.querySelectorAll('.alert-group__alerts');
  if (alertsTextElements.length > 0) {
    let alertsText = '';
    alertsTextElements.forEach(alertElement => {
      alertsText += alertElement.textContent + '\n\n'; // Adicionando duas quebras de linha entre cada alerta
    });
    alertsPrevisao.textContent = alertsText;
  } else {
    alertsPrevisao.textContent = 'Nenhum alerta encontrado';
  }
      console.log(alertsTextElement);
    })
    .catch(error => {
      console.log(error.message);
    });
}
  /*request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const alertsText = $('.daily-forecast-card.has-alert').text();

      // Agora você pode usar o alertsText conforme necessário
      alertsPrevisao.textContent = alertsText;
    } else {
      console.log('Falha ao recuperar a página');
    }
  });
}*/