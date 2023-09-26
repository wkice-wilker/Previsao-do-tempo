// Interação''
const citySearchInput = document.getElementById('city-search-input')
const idSearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//chamando campo background
const weatherIcon1 = document.getElementById("weather-icon1");
const weatherIconbg = document.getElementById("weather-iconbg");
const weatherIconefeito = document.getElementById("weather-iconefeito");
const fundoEfeito = document.getElementById("fundo-Efeito");
const lupa = document.getElementById('lupa');

//chamando recomendação
const recomendacaoIcon = document.getElementById("recomIcon");
const recomendacaoIcon1 = document.getElementById("recomIcon1");
const containerRecomendacao = document.getElementById("conteudo-recomendacao");

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

// para reitirar a informação do value do input e-mail --------------------------------------------------------------------------------------------------------

// Seleciona o elemento de entrada de email
const emailInput = document.getElementById('email');

// Armazena o valor padrão para posterior comparação
const valorPadrao = 'digite seu e-mail';

// Adiciona um evento de foco (quando o usuário clica no campo)
emailInput.addEventListener('focus', function () {
  // Verifica se o valor atual é igual ao valor padrão
  if (emailInput.value === valorPadrao) {
    // Limpa o valor
    emailInput.value = '';
  }
});

// Adiciona um evento de desfoco (quando o usuário clica fora do campo)
emailInput.addEventListener('blur', function () {
  // Se o campo estiver vazio, redefina o valor padrão
  if (emailInput.value === '') {
    emailInput.value = valorPadrao;
  }
});


// verificação da estação do ano -----------------------------------------------------------------------------------

function verificarEstacaoDoAno() {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1; // Obtenha o mês atual (0 a 11)

  let estacao;

  switch (mesAtual) {
    case 1:
    case 2:
    case 3:
      estacao = 'verao';
      break;
    case 4:
    case 5:
    case 6:
      estacao = 'outono';
      break;
    case 7:
    case 8:
    case 9:
      estacao = 'inverno';
      break;
    case 10:
    case 11:
    case 12:
      estacao = 'primavera';
      break;
    default:
      estacao = 'Mês desconhecido'; // apocalipse
  }

  return estacao;
}

const estacaoAtual = verificarEstacaoDoAno();
weatherIconbg.src = `./bg/${estacaoAtual}.png`;

// ação quando efetuar o clique na busca da cidade
citySearchButton.addEventListener("click", () => {

  const cityName = citySearchInput.value
  const tempCityName = citySearchInput.value
  const requestCityName = cityName
  getCityWeather(cityName)
  requestAccuWeather(requestCityName)
  requestAr(cityName)
  getCityTemp(tempCityName)
  removeAllChildren(containerRecomendacao);
  requestsaude(requestCityName)


  //tornando a Div recomendacao visível
  const RecDiv = document.querySelector('.recomendacao');
  RecDiv.style.display = 'flex';

  //tornando a Divs visíveis
  const RecDivSaude = document.querySelector('.container-saude');
  const RecDivAlergia = document.querySelector('.container-alergia');
  const RecDivAtividade = document.querySelector('.container-atividade');
  RecDivSaude.style.display = 'flex';
  RecDivAlergia.style.display = 'flex';
  RecDivAtividade.style.display = 'flex';


  // resetando as imagens da Div recomendacao quando muda de cidade
  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API key} // 896ed49c5ba70ed7875c3f89e7ef0128
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


//adicionando os dados optidos da API nas DIVs ----------------------------------------------------------------------------------------------------

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

  // data e horas (ainda não decidir se irei usar)
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


  requestsaude(icon);

  // adicionando elemento no background de acordo com o clima -------------------------------------------------------------
  weatherIcon1.src = `./assets/${icon}.svg`



  /*
Legenda dos icones do tempo:

01d - sol
02d - sol com nuvem
03d - parcialmente nublado
04d - nublado
09d - chuva
10d - chuva com sol
01n - lua
02n - lua com nuvem
03n - parcialmente nublado
04n - nublado
09n - chuva
10n - chuva com lua
11d e 11n - chuva com trovoada
13d e 13n - neve
50d e 50n - ventania com nuvem

icones da estação do ano:

verao.png
primavera.png
outono.png
inverno.pbg

*/



  //efeito vidro escuro no fundo do tempo ---------------------------------------------------------------------------
  if (['01n', '02n', '03n', '04n', '09n', '10n', '11n', '50n'].includes(icon)) {

    document.body.style.color = 'white';

    const elementosParaAtualizar = [
      'vidro',
      'button-container',
      'header',
      'recomendacao',
      'alert-vidro',
      'container-saude',
      'container-alergia',
      'container-atividade',
      'container-popup-saude',
      'container-popup-alergia',
      'container-popup-atividade',
    ];

    elementosParaAtualizar.forEach(elementId => {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.backgroundColor = '#00000089';
      }
    });


    document.getElementById('weather-description').style.color = '#fff';
    document.getElementById('alert').style.color = '#fff';
    document.getElementById('city-search-button').style.background = '#5795dc';
    document.getElementById('current-temperature').style.color = '#5795dc';
    document.getElementById('botao-email').style.background = '#5795dc';



    const elementos = document.querySelectorAll('.temperature-details__value, .sunset-sunrise__value');
    const elementosLabel = document.querySelectorAll('.temperature-details__label');
    const elementosPraia = document.querySelector('.praia');
    const sunriseTimeElement = document.getElementById('iconsunrise');
    const sunsetTimeElement = document.getElementById('iconsunset');

    elementosPraia.src = `./bg/fundonoite.png`;
    sunriseTimeElement.src = `./assets/sunriseN.svg`;
    sunsetTimeElement.src = `./assets/sunsetN.svg`;


    elementos.forEach(elemento => {
      elemento.style.color = 'white';

    });
    elementosLabel.forEach(elementosLabel => {
      elementosLabel.style.color = '#aba9a9';

    });

  }





  //verificação do efeito que será utilizado de acordo com o clima -----------------------------------------------------

  if (['03d'].includes(icon)) {

    //nublado
    fundoEfeito.src = './efeito/nublado.png';
    weatherIconefeito.src = './efeito/nuvem.png';

  } else if (['01n'].includes(icon)) {

    //nublado noite
    fundoEfeito.src = './efeito/noite.png';


  } else if (['03n'].includes(icon)) {


    //nublado noite
    fundoEfeito.src = './efeito/nubladonoite.png';
    weatherIconefeito.src = './efeito/nuvem.png';


  } else if (['04d'].includes(icon)) {

    // Define a cor de fundo do corpo como branca
    document.getElementById('city-search-input').style.backgroundColor = '#5795dc';
    document.getElementById('email').style.backgroundColor = '#5795dc';
    document.querySelector('.header__input').style.color = '#fff';
    document.getElementById('email').style.color = '#fff';
    //carregado
    fundoEfeito.src = './efeito/carregado.png';

  } else if (['04n'].includes(icon)) {

    // Define a cor de fundo do corpo como branca
    document.getElementById('tempo').style.color = '#fff';
    document.getElementById('alert').style.color = '#fff';
    //carregado
    fundoEfeito.src = './efeito/carregadonoite.png';

  } else if (['02d'].includes(icon)) {

    document.getElementById('email').style.backgroundColor = '#5795dc';
    document.getElementById('city-search-input').style.backgroundColor = '#5795dc';

    //nuvem
    fundoEfeito.src = './efeito/solnuvem.png';

  } else if (['02n'].includes(icon)) {

    //nuvem noite
    fundoEfeito.src = './efeito/noitenuvem.png';


  } else if (['09d', '10d'].includes(icon)) {

    document.getElementById('city-search-input').style.backgroundColor = '#5795dc';
    document.getElementById('email').style.backgroundColor = '#5795dc';
    document.querySelector('.header__input').style.color = '#fff';
    document.getElementById('email').style.color = '#fff';


    //chuva com sol
    fundoEfeito.src = './efeito/chuva.png';
    weatherIconefeito.src = './efeito/chuvaT.png';

  } else if (['09n', '10n'].includes(icon)) {


    //chuva com lua
    fundoEfeito.src = './efeito/chuvanoite.png';
    weatherIconefeito.src = './efeito/chuvaT.png';


  } else if (['11d'].includes(icon)) {

    document.getElementById('city-search-input').style.backgroundColor = '#5795dc';
    document.getElementById('email').style.backgroundColor = '#5795dc';
    document.querySelector('.header__input').style.color = '#fff';
    document.getElementById('email').style.color = '#fff';

    //chuva com trovoada de dia
    fundoEfeito.src = './efeito/trovoada.png';
    weatherIconefeito.src = './efeito/chuvaT.png';


  } else if (['11n'].includes(icon)) {


    //chuva com trovoada de noite
    fundoEfeito.src = './efeito/trovoadanoite.png';
    weatherIconefeito.src = './efeito/chuvaT.png';


  } else if (['50d'].includes(icon)) {

    //ventania de dia
    fundoEfeito.src = './efeito/ensolarado.png';
    weatherIconefeito.src = './efeito/ventania.png';
  } else if (['50n'].includes(icon)) {

    document.body.style.color = 'white';
    document.getElementById('city-search-button').style.background = '#5795dc';
    document.getElementById('current-temperature').style.color = '#5795dc';
    document.getElementById('botao-email').style.background = '#5795dc';

    //ventania de noite
    fundoEfeito.src = './efeito/noite.png';
    weatherIconefeito.src = './efeito/ventania.png';
  } else {
    //ensolarado
    fundoEfeito.src = './efeito/ensolarado.png';
  }






  //recomendação que será apresentado de acordo com o clima --------------------------------------------------------------------------------------



  if (['01n', '04d'].includes(icon)) {

    // Array de fontes de imagens
    const imagensSrc = ["./recomendacao/04d.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      // Adiciona o elemento à 'containerRecomendacao'
      containerRecomendacao.appendChild(imgElement);
    }


  } else if (['09d', '09n', '10d', '10n'].includes(icon)) {
    // Array de fontes de imagens
    const imagensSrc = ["./recomendacao/09d.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      // Adiciona o elemento à 'containerRecomendacao'
      containerRecomendacao.appendChild(imgElement);
    }

  } else if (['01d', '02d'].includes(icon) && containerRecomendacao) {
    // Array de fontes de imagens
    const imagensSrc = ["./recomendacao/sol.gif", "./recomendacao/protetorsolar.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      // Verifica se a fonte da imagem contém "sol.gif"
      if (imagensSrc[i].includes("sol.gif")) {
        // Adiciona o atributo style para ajustar o tamanho
        imgElement.style.width = "50px";
      }

      // Adiciona o elemento à 'containerRecomendacao'
      containerRecomendacao.appendChild(imgElement);
    }
  } else {
    console.log("A imagem já existe em 'containerRecomendacao'.");
  }

  // adicionar um icone de alerta se a temperatura estiver acima de 37 graus
  if (temp > 35) {
    var imgElement = document.createElement("img");

    // Define a classe do elemento
    imgElement.className = "icone-recomendacao";

    // Define a fonte da imagem
    imgElement.src = "./recomendacao/perigo.gif";

    // Adiciona o elemento à 'containerRecomendacao'
    containerRecomendacao.appendChild(imgElement);

    console.log("Imagem 'perigo.gif' adicionada em 'containerRecomendacao'.");
  }

  if (temp > 26) {
    var imgElement = document.createElement("img");

    // Define a classe do elemento
    imgElement.className = "icone-recomendacao";

    // Define a fonte da imagem
    imgElement.src = "./recomendacao/agua.gif";

    // Adiciona o elemento à 'containerRecomendacao'
    containerRecomendacao.appendChild(imgElement);
  }


}




// Buscando dados de vento e rajadas de vento -------------------------------------------------------------------------------------------

function getCityTemp(tempCityName) {

  let urlDado = '';

  //verificando a cidade em que selecionou
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

      //extraindo dados da div do site da API
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


//buscando dados Qualidade do Ar --------------------------------------------------------------------------------------------------
function requestAr(cityName) {

  let urlDado = '';

  //verificando a cidade em que selecionou
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


// buscando alertas do tempo da cidade -------------------------------------------------------------------------------------------------
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

      //extraindo dados da div do site da API
      if (alertsTextElements.length > 0) {
        const alertsText = document.getElementById('alertsPrevisao');
        alertsText.innerHTML = '';

        alertsTextElements.forEach(alertElement => {
          const text = alertElement.textContent;

          // Cria um novo elemento <p> para cada alerta
          const alertP = document.createElement('p');
          alertP.textContent = text;

          if (alertP) {
            const texto = alertP.textContent.toLowerCase(); // Obtém o texto e converte para letras minúsculas
            alertP.style.removeProperty('color');
            document.getElementById('alert-vidro').style.display = 'flex';

            if (texto.includes('laranja')) {
              alertP.style.background = '#FFA50097'; // Laranja
            } else if (texto.includes('vermelho')) {
              alertP.style.background = '#FF000097'; // Vermelho
            } else if (texto.includes('amarelo')) {
              alertP.style.background = '#ffff0097'; // Vermelho
            } else {
              console.log('Nenhuma correspondência encontrada');
            }
          } else {
            console.log("Elemento <p> não encontrado dentro de '#alertsPrevisao'");
          }

          // Adiciona o elemento <p> ao contêiner
          alertsText.appendChild(alertP);


          const divAlerts = document.querySelector('.info-alerts');
          if (alertsTextElements.length > 0) {

            divAlerts.textContent = 'Alerta(s):';

          }


        });

      }

      console.log(alertsPrevisao);
    })
    .catch(error => {
      console.log(error.message);
    });


}

// buscando dados de saude -------------------------------------------------------------------------------------------------

function requestsaude(requestCityName) {
  let url = '';

  if (requestCityName === 'caraguatatuba') {
    url = 'https://www.accuweather.com/pt/br/caraguatatuba/45839/health-activities/45839';
  } else if (requestCityName === 'sao sebastiao') {
    url = 'https://www.accuweather.com/pt/br/s%C3%A3o-sebasti%C3%A3o/41642/health-activities/41642';
  } else if (requestCityName === 'ilhabela') {
    url = 'https://www.accuweather.com/pt/br/ilhabela/41748/health-activities/41748';
  } else if (requestCityName === 'ubatuba') {
    url = 'https://www.accuweather.com/pt/br/ubatuba/41645/health-activities/41645';
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

      // Selecione a div principal com a classe desejada
      const mainDivAlergia = doc.querySelector('.page-content ');
      const mainDiv = doc.querySelector('.lifestyle-index-list.unrendered.content-module.lifestyle-hub__list');
      const mainDivAtividade = doc.querySelector('.page-content');
      console.log("atividade main:", mainDivAtividade);
      console.log('Saude:', mainDiv);
      console.log('Alergia:', mainDivAlergia);



      if (mainDiv) {
        const saudeText = document.getElementById('saude');
        saudeText.innerHTML = '';

        // Selecione todas as divs com a classe "index-list-card" dentro da div principal
        const divsIndexListCard = mainDiv.querySelectorAll('.index-list-card');

        // Itere sobre as divs com a classe "index-list-card"
        divsIndexListCard.forEach(indexListCard => {
          // Crie um novo div pai
          const divPai = document.createElement('div');
          divPai.className = 'conteudo-saude'; // Adicione a classe desejada ao div pai

          // Selecione todas as divs filhas dentro da div "index-list-card"
          const divsFilhas = indexListCard.querySelectorAll('div:not(.index-name)');

          // Itere sobre as divs filhas e adicione cada uma ao div pai
          divsFilhas.forEach(divFilha => {
            divPai.appendChild(divFilha.cloneNode(true)); // Use cloneNode para copiar a div filha
          });

          // Adicione o div pai à div com o ID "saude"
          saudeText.appendChild(divPai);
        });
      }


      // configuração da Div Saude ---------------------------------------------------------------------------

      // Verifique se há conteúdo na div com a classe "saude"
      const saudeDiv = document.querySelector('.saude');
      if (saudeDiv && saudeDiv.innerHTML.trim() !== '') {
        // Crie a div do título
        const tituloSaudeDiv = document.createElement('div');
        tituloSaudeDiv.className = 'titulo-saude';
        tituloSaudeDiv.id = 'titulo-saude';
        tituloSaudeDiv.textContent = 'Saúde';

        // Insira a div do título no início da div "saude"
        saudeDiv.insertBefore(tituloSaudeDiv, saudeDiv.firstChild);



      }
      const popDivSaude = document.querySelector('.container-popup-saude');
      if (popDivSaude) {

        const tituloSaude = document.querySelector('.titulo-saude');
        const popupSaude = document.querySelector('.container-popup-saude');

        // Adicione um ouvinte de evento ao elemento do título para mostrar o popup
        tituloSaude.addEventListener('mouseover', function () {
          popupSaude.style.display = 'block';
        });

        // Adicione um ouvinte de evento para esconder o popup quando o mouse sai
        tituloSaude.addEventListener('mouseout', function () {
          popupSaude.style.display = 'none';
        });


      }





      const conteudoDivs = document.querySelectorAll('.conteudo-saude');


      conteudoDivs.forEach(conteudoSaudeDiv => {
        const indexStatusColorDiv = conteudoSaudeDiv.querySelector('.index-status-color');

        if (indexStatusColorDiv) {
          // Obtenha a cor de fundo da div "index-status-color"
          const backgroundColor = window.getComputedStyle(indexStatusColorDiv).backgroundColor;

          // Adicione transparência à cor de fundo
          const rgbaBackgroundColor = `rgba(${backgroundColor.match(/\d+/g).join(', ')}, 0.6)`; // 0.5 é o valor de opacidade

          // Aplique a cor de fundo à div "conteudo-saude"
          conteudoSaudeDiv.style.backgroundColor = rgbaBackgroundColor;
        }

      });

      // Selecione todas as divs com a classe "conteudo-saude"
      const conteudoSaudeDivs = document.querySelectorAll('.conteudo-saude');

      // Encontre a altura máxima das divs filhas
      let maxHeight = 0;
      conteudoSaudeDivs.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          const divHeight = divFilha.offsetHeight;
          maxHeight = Math.max(maxHeight, divHeight);
        });
      });

      // Defina a altura máxima em todas as divs filhas
      conteudoSaudeDivs.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          divFilha.style.height = maxHeight + 'px';
        });
      });


      //buscando dados da Alergia ---------------------------------------------------------------------------------------------------------------------



      if (mainDivAlergia) {
        const alergiaText = document.getElementById('alergia');
        alergiaText.innerHTML = '';

        // Selecione todas as divs com a classe "[data-index-slug="dust-dander"]" dentro da div principal
        const divsIndexListCard = mainDivAlergia.querySelectorAll('[data-index-slug="dust-dander"]');

        // Itere sobre as divs com a classe "[data-index-slug="dust-dander"]"
        divsIndexListCard.forEach(indexListCard => {
          // Crie um novo div pai
          const divPai = document.createElement('div');
          divPai.className = 'conteudo-alergia'; // Adicione a classe desejada ao div pai

          const divsFilhas = indexListCard.querySelectorAll('div:not(.index-name)');

          // Itere sobre as divs filhas e adicione cada uma ao div pai
          divsFilhas.forEach(divFilha => {
            divPai.appendChild(divFilha.cloneNode(true)); // Use cloneNode para copiar a div filha
          });

          // Adicione o div pai à div com o ID "alergia"
          alergiaText.appendChild(divPai);
        });
      }

      const alergiaDiv = document.querySelector('.alergia');
      if (alergiaDiv && alergiaDiv.innerHTML.trim() !== '') {

        // Criando a div do título
        const tituloAlergiaDiv = document.createElement('div');
        tituloAlergiaDiv.className = 'titulo-alergia';
        tituloAlergiaDiv.id = 'titulo-alergia';
        tituloAlergiaDiv.textContent = 'Alergia';


        // Inseri a div do título depois da div "conteudo-alergia"
        alergiaDiv.insertBefore(tituloAlergiaDiv, alergiaDiv.firstChild);

      }
      const popDivAlergia = document.querySelector('.container-popup-alergia');
      if (popDivAlergia) {

        const tituloAlergia = document.querySelector('.titulo-alergia');
        const SelecionepopUpAlergia = document.querySelector('.container-popup-alergia');

        // Adicione um ouvinte de evento ao elemento do título para mostrar o popup
        tituloAlergia.addEventListener('mouseover', function () {
          SelecionepopUpAlergia.style.display = 'block';
        });

        // Adicione um ouvinte de evento para esconder o popup quando o mouse sai
        tituloAlergia.addEventListener('mouseout', function () {
          SelecionepopUpAlergia.style.display = 'none';
        });


      }

      const conteudoDivsAlergia = document.querySelectorAll('.conteudo-alergia');


      conteudoDivsAlergia.forEach(conteudoSaudeDiv => {
        const indexStatusColorDiv = conteudoSaudeDiv.querySelector('.index-status-color');

        if (indexStatusColorDiv) {
          // Obtenha a cor de fundo da div "index-status-color"
          const backgroundColor = window.getComputedStyle(indexStatusColorDiv).backgroundColor;

          // Adicione transparência à cor de fundo
          const rgbaBackgroundColor = `rgba(${backgroundColor.match(/\d+/g).join(', ')}, 0.6)`; // 0.5 é o valor de opacidade

          // Aplique a cor de fundo à div "conteudo-alergia"
          conteudoSaudeDiv.style.backgroundColor = rgbaBackgroundColor;
        }

      });

      // Selecione todas as divs com a classe "conteudo-alergia"
      const conteudoSaudeDivsAlergia = document.querySelectorAll('.conteudo-alergia');

      // Encontre a altura máxima das divs filhas
      let maxHeightAlergia = 0;
      conteudoSaudeDivsAlergia.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          const divHeight = divFilha.offsetHeight;
          maxHeightAlergia = Math.max(maxHeightAlergia, divHeight);
        });
      });

      // Defina a altura máxima em todas as divs filhas
      conteudoSaudeDivsAlergia.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          divFilha.style.height = maxHeightAlergia + 'px';
        });
      });


      //buscando dados de atividades físicas -------------------------------------------------------------------------------------------------------




      if (mainDivAtividade) {
        const atividadeText = document.getElementById('atividade');
        atividadeText.innerHTML = '';

        // Seleciona todas as divs com a classe "lifestyle-index-list__cards" dentro da div principal
        const divsIndexListCardContainer = mainDivAtividade.querySelectorAll('.lifestyle-index-list__cards');

        console.log('atividade', divsIndexListCardContainer);

        // Verifica se há pelo menos duas divs encontradas
        if (divsIndexListCardContainer.length >= 2) {


          const segundaDiv = divsIndexListCardContainer[1];

          const divsIndexListCard = segundaDiv.querySelectorAll('.index-list-card');


          divsIndexListCard.forEach(indexListCard => {

            const divPai = document.createElement('div');
            divPai.className = 'conteudo-atividade';

            // Seleciona todas as filhas da classe "index-list-card" e adicione cada uma ao div pai
            const filhasDaIndexListCard = indexListCard.querySelectorAll('.index-list-card > *');
            filhasDaIndexListCard.forEach(filha => {
              divPai.appendChild(filha.cloneNode(true));
            });

            // Adicione o div pai à div com o ID "atividade"
            atividadeText.appendChild(divPai);
          });
        }
      }




      const atividadeDiv = document.querySelector('.atividade');
      if (atividadeDiv && atividadeDiv.innerHTML.trim() !== '') {

        // Criando a div do título
        const tituloAtividadeDiv = document.createElement('div');
        tituloAtividadeDiv.className = 'titulo-atividade';
        tituloAtividadeDiv.id = 'titulo-atividade';
        tituloAtividadeDiv.textContent = 'Atividades ao ar livre';


        // Inseri a div do título depois da div "conteudo-atividade"
        atividadeDiv.insertBefore(tituloAtividadeDiv, atividadeDiv.firstChild);


      }


      const popDivAtividade = document.querySelector('.container-popup-atividade');
      if (popDivAtividade) {

        const tituloAlergia = document.querySelector('.titulo-atividade');
        const SelecionepopUpAtividade = document.querySelector('.container-popup-atividade');

        // Adicione um ouvinte de evento ao elemento do título para mostrar o popup
        tituloAlergia.addEventListener('mouseover', function () {
          SelecionepopUpAtividade.style.display = 'block';
        });

        // Adicione um ouvinte de evento para esconder o popup quando o mouse sai
        tituloAlergia.addEventListener('mouseout', function () {
          SelecionepopUpAtividade.style.display = 'none';
        });


      }


      const conteudoDivsAtividade = document.querySelectorAll('.conteudo-atividade');


      conteudoDivsAtividade.forEach(conteudoAtividade => {
        const indexStatusColorDiv = conteudoAtividade.querySelector('.index-status-color');

        if (indexStatusColorDiv) {
          // Obtenha a cor de fundo da div "index-status-color"
          const backgroundColor = window.getComputedStyle(indexStatusColorDiv).backgroundColor;

          // Adicione transparência à cor de fundo
          const rgbaBackgroundColor = `rgba(${backgroundColor.match(/\d+/g).join(', ')}, 0.6)`; // 0.5 é o valor de opacidade

          // Aplique a cor de fundo à div "conteudo-atividade"
          conteudoAtividade.style.backgroundColor = rgbaBackgroundColor;
        }

      });

      // Selecione todas as divs com a classe "conteudo-atividade"
      const conteudoAtividadeDivs = document.querySelectorAll('.conteudo-atividade');

      // Encontre a altura máxima das divs filhas
      let maxHeightAtividade = 0;
      conteudoAtividadeDivs.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          const divHeight = divFilha.offsetHeight;
          maxHeightAtividade = Math.max(maxHeightAtividade, divHeight);
        });
      });

      // Defina a altura máxima em todas as divs filhas
      conteudoAtividadeDivs.forEach(divPai => {
        const divFilhas = divPai.querySelectorAll('div');
        divFilhas.forEach(divFilha => {
          divFilha.style.height = maxHeightAtividade + 'px';
        });
      });

    })

    .catch(error => {
      console.error(error);
    });

}

