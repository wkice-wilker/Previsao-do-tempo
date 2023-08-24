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

   let cityName = citySearchInput.value
   let idCity = idSearchInput.value
   getCityWeather(cityName)
   getIdCity(idCity)

})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API key} // 896ed49c5ba70ed7875c3f89e7ef0128
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
})


function getCityWeather(cityName) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
     .then((response) => response.json())
     .then((data) => displayWeather(data))
     

}


function getIdCity(idCidade, lon, lat) {
  fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lon=${idCidade}&lat=${idCidade}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((alert) => displayAlert(alert))

}


function displayWeather(data) {
  console.log(data)
    let {
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },

        coord = [{lon, lat}],
        
      } = data
      idCidade = coord;

        console.log(idCidade);

      getIdCity(idCidade);
     cityName.textContent = name;
     weatherIcon.src = `/assets/${icon}.svg`
     weatherDescription.textContent = description;
     currentTemperature.textContent = `${Math.round(temp)}°C`;
     windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
     feelsLikeTemperature.textContent = feels_like;
     currentHumidity.textContent =`${humidity}%`;
     sunriseTime.textContent = formatTime(sunrise);
     sunsetTime.textContent = formatTime(sunset);
   
}

function displayAlert(alert){
console.log(alert);
let{
  list,
} = alert;

alertsPrevisao.textContent = list;
}

/*function getIdCity(idCity) {
  const options = {method: 'GET', headers: {accept: 'application/json', 'Accept-Encoding': 'gzip'}};

  fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${idCity}&apikey=${api_key1}`,options)
    .then(response => response.json())
    .then((dado) => displayAlerts(dado))
  
    fetch(`https://api.tomorrow.io/v4/alerts?apikey=${api_key1}`, options)
  .then(response => response.json())
  .then(alerta => displayAlerts(alerta))
}

function displayAlerts(dado) {
  console.log(dado);
  let{
    
    data: {time},
  } = dado;

  
  currentDate.textContent = time;
}

function displayAlerts(alerta) {
  console.log(alerta);
  let{
   alerts: [{length}],
   links,
  } = alerta;

  alertsPrevisao.textContent = `${links}`;
 
}

/*
function getIdCity(idCity) {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${idCity}&appid=${api_key}`)
  .then(response => response.json())
  .then((idDado) => IdCity(idDado))
}

 function  IdCity(idDado) {
  let {coord = [{lat, lon}]} = idDado;
  idCidade = coord;

  console.log(idCidade);

  getCityAlerts(idCidade);

 }

function getCityAlerts(idCidade) {
  
  fetch(`https://api.openweathermap.org/data/2.5/triggers/5852816a9aaacb00153134a3`)
    .then((response) => response.json())
    .then((alerts) => displayAlerts(alerts))

}
function displayAlerts(alerts) {
  console.log(alerts);
  let{
    conditions:[{name,expression}]

  } = alerts;
  alertsPrevisao.textContent = `${name,expression} ${conditions}`;

}*/

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
