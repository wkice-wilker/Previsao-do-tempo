// Interação''
const citySearchInput = document.getElementById('city-search-input')
const idSearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//chamando campo background
const weatherIcon1 = document.getElementById("weather-icon1");
const weatherIconbg = document.getElementById("weather-iconbg");
const weatherIconefeito = document.getElementById("weather-iconefeito");

//chamando recomendação
const recomendacaoIcon = document.getElementById("recomIcon");
const recomendacaoIcon1 = document.getElementById("recomIcon1");

//exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const windGust = document.getElementById("wind-gust");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const alertsPrevisao = document.getElementById("alertsPrevisao");
const qualidadeAr = document.getElementById("qualidadeAr");

const api_key = "9dd573acf23af2fb1e2b79726072d201";
const api_key1 = "t616H4VQSxC4C0dHNzBqf1e5OlVfWDJZ";



citySearchButton.addEventListener("click", () => {

  const cityName = citySearchInput.value
  const tempCityName = citySearchInput.value
  const requestCityName = cityName
  getCityWeather(cityName)
  requestAccuWeather(requestCityName)
  requestAr(cityName)
  getCityTemp(tempCityName)


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
    main: { temp, feels_like, humidity },
    sys: { sunrise, sunset },

  } = data

  //adicionando os dados optidos da API nas DIVs
  cityName.textContent = name;
  weatherIcon.src = `./assets/${icon}.svg`
  weatherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)} °C`;
  feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
  currentHumidity.textContent = `${humidity}%`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);

  // adicionando elemento no background de acordo com o clima
  weatherIcon1.src = `./assets/${icon}.svg`

  weatherIconefeito.src = `./efeito/${icon}.png`

  /*
id de cada icone do tempo:

01d - sol
02d - sol com nuvem
03d - nublado
04d - tempo carregado
09d - chuva
10d - chuva com sol
01n - lua
02n - lua com nuvem
03n - nublado
04n - tempo carregado
09n - chuva
10n - chuva com lua
11d e 11n - chuva com trovoada
13d e 13n - neve
50d e 50n - ventania com nuvem

id dos icones da estação do ano:

verao.png
primavera.png
outono.png
inverno.pbg

*/

// verificação da estação do ano

function verificarEstacaoDoAno() {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1; // Obtenha o mês atual (0 a 11)

  let estacao;

  switch (mesAtual) {
    case 1:
    case 2:
    case 3:
      estacao = 'Verao';
      break;
    case 4:
    case 5:
    case 6:
      estacao = 'Outono';
      break;
    case 7:
    case 8:
    case 9:
      estacao = 'Inverno';
      break;
    case 10:
    case 11:
    case 12:
      estacao = 'Primavera';
      break;
    default:
      estacao = 'Mês desconhecido'; // apocalipse
  }

  return estacao;
}

const estacaoAtual = verificarEstacaoDoAno();
weatherIconbg.src = `./bg/${estacaoAtual}.png`;



//verificação do efeito que será utilizado de acordo com o clima

  if (['03d', '03n', '04d', '04n', '09d', '09n', '13d', '13n'].includes(icon)) {

    //nublado
    weatherIconefeito.src = './efeito/nublado.png';

} else if (['02d', '02n'].includes(icon)) { 

  //nuvem
    weatherIconefeito.src = './efeito/nuvem.png';

} else if (['10d', '10n', '11d', '11n'].includes(icon)) {

  //chuva com sol ou lua e chuva com trovoada
    weatherIconefeito.src = './efeito/chuva.png';

} else if (['50d', '50n'].includes(icon)) { 

  //ventania
    weatherIconefeito.src = './efeito/ventania.png';

} else {
    weatherIconefeito.src = './efeito/00d.png';
}


  //recomendação que será apresentado de acordo com o clima

  if ({ icon } = ['04n,04d']) {

    recomendacaoIcon.src = './recomendacao/04d.gif';
    recomendacaoIcon1.src = './recomendacao/00d.png';

  } else if ({ icon } = ['09d,09n']) {

    recomendacaoIcon.src = './recomendacao/09d.gif';
    recomendacaoIcon1.src = './recomendacao/09d1.gif';

  } else if ({ icon } = ['01d']) {

    recomendacaoIcon.src = './recomendacao/01d.gif';
    recomendacaoIcon1.src = './recomendacao/01ds.gif';

  } console.log(recomendacaoIcon.src);


}

function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
  return `Hoje, ${formattedDate}`
}


// Buscando dados vento e rajadas de vento

function getCityTemp(tempCityName) {

  let urlDado = '';

  if (tempCityName === 'caraguatatuba') {
    urlDado = 'https://www.accuweather.com/pt/br/caraguatatuba/45839/current-weather/45839';
  } else if (tempCityName === 'sao sebastiao') {
    urlDado = 'https://www.accuweather.com/pt/br/s%C3%A3o-sebasti%C3%A3o/41642/current-weather/41642';
  } else if (tempCityName === 'ilhabela') {
    urlDado = 'https://www.accuweather.com/pt/br/ilhabela/41748/current-weather/41748';
  } else if (tempCityName === 'ubatuba') {
    urlDado = 'https://www.accuweather.com/pt/br/ubatuba/41645/current-weather/41645';
  } else {
    console.log('Dados não encontrado');
    return;
  }

  fetch(urlDado)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Falha ao recuperar a página');
      }
    })

    .then(html => {
      const parserDado = new DOMParser();
      const doc = parserDado.parseFromString(html, 'text/html');

      const windTextElements = doc.querySelectorAll('[class="detail-item spaced-content"]');
      console.log(windTextElements);
      encontrarDadosVento(windTextElements);


      function encontrarDadosVento(windTextElements) {
        let dadoRajada = "";
        let dadoVento = "";

        for (let i = 0; i < windTextElements.length; i++) {
          const element = windTextElements[i];
          const labelText = element.querySelector('div:nth-child(1)').textContent.trim();

          if (labelText === "Rajadas de vento") {
            dadoRajada = element.querySelector('div:nth-child(2)').textContent.trim();
          } else if (labelText === "Vento") {
            dadoVento = element.querySelector('div:nth-child(2)').textContent.trim();
          }
        }
        windSpeed.textContent = dadoVento;
        windGust.textContent = dadoRajada;
      }
    });
}


//buscando dados Qualidade do Ar
function requestAr(cityName) {

  let urlDado = '';

  if (cityName === 'caraguatatuba') {
    urlDado = 'https://www.accuweather.com/pt/br/caraguatatuba/45839/weather-forecast/45839';
  } else if (cityName === 'sao sebastiao') {
    urlDado = 'https://www.accuweather.com/pt/br/s%C3%A3o-sebasti%C3%A3o/41642/weather-forecast/41642';
  } else if (cityName === 'ilhabela') {
    urlDado = 'https://www.accuweather.com/pt/br/ilhabela/41748/weather-forecast/41748';
  } else if (cityName === 'ubatuba') {
    urlDado = 'https://www.accuweather.com/pt/br/ubatuba/41645/weather-forecast/41645';
  } else {
    console.log('Cidade não suportada para alertas de previsão');
    return;
  }

  fetch(urlDado)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Falha ao recuperar a página');
      }
    })

    .then(html => {
      const parserDado = new DOMParser();
      const doc = parserDado.parseFromString(html, 'text/html');

      const qualiArTextElements = doc.querySelectorAll('.category-text');
      console.log(qualiArTextElements);
      qualidadeDoAr(qualiArTextElements);

      function qualidadeDoAr(qualiArTextElements) {

        let {
          0: { outerText },
        } = qualiArTextElements
        dadoAr = outerText;
        qualidadeAr.textContent = dadoAr;

      }
    });
}


// buscando alertas do tempo da cidade
function requestAccuWeather(requestCityName) {
  let url = '';

  if (requestCityName === 'caraguatatuba') {
    url = 'https://www.accuweather.com/pt/br/caraguatatuba/45839/weather-warnings/45839';
  } else if (requestCityName === 'sao sebastiao') {
    url = 'https://www.accuweather.com/pt/br/s%C3%A3o-sebasti%C3%A3o/41642/weather-warnings/41642';
  } else if (requestCityName === 'ilhabela') {
    url = 'https://www.accuweather.com/pt/br/ilhabela/41748/weather-warnings/41748';
  } else if (requestCityName === 'ubatuba') {
    url = 'https://www.accuweather.com/pt/br/ubatuba/41645/weather-warnings/41645';
  } else {
    console.log('Cidade não suportada para alertas de previsão');
    return;
  }

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

      const alertsTextElements = doc.querySelectorAll('.alert-item__header__summary');
      console.log(alertsTextElements);

      if (alertsTextElements.length > 0) {
        const alertsText = document.getElementById('alertsPrevisao');
        alertsText.innerHTML = '';

        alertsTextElements.forEach(alertElement => {
          const text = alertElement.textContent;

          // Cria um novo elemento <p> para cada alerta
          const alertP = document.createElement('p');
          alertP.textContent = text;

          // Adiciona o elemento <p> ao contêiner
          alertsText.appendChild(alertP);


        });

      } else {
        alertsPrevisao.textContent = 'Nenhum alerta';
      }
      console.log(alertsPrevisao);
    })
    .catch(error => {
      console.log(error.message);
    });
}

