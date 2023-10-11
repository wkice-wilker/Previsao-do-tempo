// Interação''
const citySearchInput = document.getElementById('city-search-input')
const idSearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//chamando campo background
const iconBg = document.getElementById("iconebg");
const weatherIconbg = document.getElementById("weather-iconbg");
const weatherIconefeito = document.getElementById("weather-iconefeito");
const fundoEfeito = document.getElementById("fundo-Efeito");
const lupa = document.getElementById('lupa');
const efeitoRelampago = document.getElementById('relampago');

//chamando recomendação
const recomendacaoIcon = document.getElementById("recomIcon");
const recomendacaoIcon1 = document.getElementById("recomIcon1");
const containerRecomendacao = document.getElementById("conteudo-recomendacao");

//exibição
const semana = document.getElementById("conteudo-semana");
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const windGust = document.getElementById("wind-gust");
const windUv = document.getElementById("wind-uv");
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
const emailInput = document.getElementById('input-email');

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



// Selecionar todos os botões da cidade ----------------------------------------------------------------------------------------------

const cityButtons = document.querySelectorAll('.city-button');

function highlightCityButton(clickedButton) {
  cityButtons.forEach((button) => {
    if (button === clickedButton) {
      button.classList.add('active'); // Adicionar a classe ao botão clicado
    } else {
      button.classList.remove('active'); // Remover a classe dos outros botões
    }
  });
}

// Adicionar um evento de clique para cada botão da cidade
cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cityName = button.value; // Obter o nome da cidade a partir do valor do botão
    const tempCityName = button.value;
    const requestCityName = cityName;



    //tornando a Divs visíveis --------------------------------------------------------------------------------------------------------

    const RecDiv = document.querySelector('.container-recomendacao');
    const RecDivSaude = document.querySelector('.container-saude');
    const RecDivAlergia = document.querySelector('.container-alergia');
    const RecDivAtividade = document.querySelector('.container-atividade');
    const linkApis = document.querySelector('.link-api');

    linkApis.style.display = 'flex';
    RecDiv.style.display = 'flex';
    RecDivSaude.style.display = 'flex';
    RecDivAlergia.style.display = 'flex';
    RecDivAtividade.style.display = 'flex';


    // Chamar as funções com o nome da cidade -------------------------------------------------------------------------------------
    getCityWeather(cityName);
    requestAccuWeather(requestCityName);
    requestAr(cityName);
    requestSemana(cityName);
    getCityTemp(tempCityName);
    removeAllChildren(containerRecomendacao);
    requestsaude(requestCityName);


    highlightCityButton(button);
  });



  // resetando as imagens da Div recomendacao quando muda de cidade ----------------------------------------------------------------------------------------
  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

})



//adicionando os dados optidos da API nas DIVs ----------------------------------------------------------------------------------------------------

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
    main: { temp, humidity },
    sys: { sunrise, sunset },

  } = data


  //adicionando os dados optidos da API nas DIVs
  cityName.textContent = name;
  weatherIcon.src = `./assets/${icon}.svg`
  weatherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)} °C`;
  currentHumidity.textContent = `${humidity}%`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);

  // data e horas
  function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let formattedMinutes = String(minutes).padStart(2, '0');
    return `${hours}:${formattedMinutes}`
  }
  icon = "01d";
  console.log(icon);
  requestsaude(icon);
  verificarClima(icon);


  // adicionando elemento no background de acordo com o clima -------------------------------------------------------------




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


  //verificação do efeito que será utilizado de acordo com o clima -----------------------------------------------------




  function verificarClima(icon) {
    const climaMapeamento = {
      '01d': {
        fundoEfeito: './efeito/ensolarado.png',
        iconBg: "url('./efeito/sol.png')",
      },
      '01n': {
        fundoEfeito: './efeito/noite.png',
        iconBg: "url('./efeito/lua.png')",
        praiaN:'./bg/fundonoite.png',
      },
      '03d': {
        fundoEfeito: './efeito/nublado.png',
        weatherIconefeito: './efeito/nuvem.jpg',
      },
      '03n': {
        fundoEfeito: './efeito/nubladonoite.png',
        weatherIconefeito: './efeito/nuvem.png',
        praiaN:'./bg/fundonoite.png',
      },
      '04d': {
        fundoEfeito: './efeito/carregado.png',
      },
      '04n': {
        fundoEfeito: './efeito/carregadonoite.png',
        praiaN:'./bg/fundonoite.png',
      },
      '02d': {
        fundoEfeito: './efeito/solnuvem.png',
      },
      '02n': {
        fundoEfeito: './efeito/noitenuvem.png',
        praiaN:'./bg/fundonoite.png',
      },
      '09d': {
        fundoEfeito: './efeito/chuva.png',
        weatherIconefeito: './efeito/chuvas.png',
      },
      '09n': {
        fundoEfeito: './efeito/chuva.png',
        weatherIconefeito: './efeito/chuvas.png',
        praiaN:'./bg/fundonoite.png',
      },
      '10d': {
        fundoEfeito: './efeito/chuvasol.png',
        weatherIconefeito: './efeito/chuvas.png',
      },
      '10n': {
        fundoEfeito: './efeito/chuvalua.png',
        weatherIconefeito: './efeito/chuvas.png',
        praiaN:'./bg/fundonoite.png',
      },
      '11d': {
        fundoEfeito: './efeito/trovoada.png',
        weatherIconefeito: './efeito/chuvas.png',
        relampago: 'block',
      },
      '11n': {
        fundoEfeito: './efeito/trovoadanoite.png',
        weatherIconefeito: './efeito/chuvas.png',
        relampago: 'block',
        praiaN:'./bg/fundonoite.png',
      },
      '50d': {
        fundoEfeito: './efeito/ensolarado.png',
        weatherIconefeito: './efeito/ventania.png',
      },
      '50n': {
        fundoEfeito: './efeito/noite.png',
        weatherIconefeito: './efeito/ventania.png',
        praiaN:'./bg/fundonoite.png',
      },
    };

    if (climaMapeamento.hasOwnProperty(icon)) {
      const clima = climaMapeamento[icon];
      fundoEfeito.src = clima.fundoEfeito;
      
      if (clima.weatherIconefeito) {
        weatherIconefeito.src = clima.weatherIconefeito;
      } else {
        weatherIconefeito.src = './efeito/00d.png';
      }

      if (clima.relampago) {
        efeitoRelampago.style.display = clima.relampago;
      } else {
        efeitoRelampago.style.display = 'none';
      }

      if (clima.iconBg) {
        iconBg.style.backgroundImage = clima.iconBg;
      } else {
        iconBg.style.backgroundImage = "url('./efeito/00d.png')";
      }

      if (clima.praiaN) {
        document.getElementById('praia-noite').src = clima.praiaN;     
      }
    } else {
      // Se o ícone não for encontrado, use o clima padrão.
      fundoEfeito.src = './efeito/ensolarado.png';

    }

  }

  /*
    if (['03d'].includes(icon)) {
  
      //nublado
      fundoEfeito.src = './efeito/nublado.png';
      weatherIconefeito.src = './efeito/nuvem.jpg';
      
  
    } else if (['01n'].includes(icon)) {
  
      //céu limpo noite
      fundoEfeito.src = './efeito/noite.png';
  
    } else if (['03n'].includes(icon)) {
  
      //nublado noite
      fundoEfeito.src = './efeito/nubladonoite.png';
      weatherIconefeito.src = './efeito/nuvem.png';
  
    } else if (['04d'].includes(icon)) {
  
      //tempo carregado
      fundoEfeito.src = './efeito/carregado.png';
  
    } else if (['04n'].includes(icon)) {
  
      //tempo carregado
      fundoEfeito.src = './efeito/carregadonoite.png';
  
    } else if (['02d'].includes(icon)) {
  
      //nuvem
      fundoEfeito.src = './efeito/solnuvem.png';
  
    } else if (['02n'].includes(icon)) {
  
      //nuvem noite
      fundoEfeito.src = './efeito/noitenuvem.png';
  
    } else if (['09d'].includes(icon)) {
  
      //chuva
      fundoEfeito.src = './efeito/chuva.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
  
    }else if (['09n'].includes(icon)) {
  
      //chuva a noite
      fundoEfeito.src = './efeito/chuva.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
  
    }else if (['10d'].includes(icon)) {
  
      //chuva com sol
      fundoEfeito.src = './efeito/chuvasol.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
  
    } else if (['10n'].includes(icon)) {
  
      //chuva com lua
      fundoEfeito.src = './efeito/chuvalua.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
  
    } else if (['11d'].includes(icon)) {
  
      //chuva com trovoada de dia
      fundoEfeito.src = './efeito/trovoada.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
      document.getElementById('relampago').style.display = 'fixed';
  
    } else if (['11n'].includes(icon)) {
  
      //chuva com trovoada de noite
      fundoEfeito.src = './efeito/trovoadanoite.png';
      weatherIconefeito.src = './efeito/chuvaT.png';
      document.getElementById('relampago').style.display = 'fixed';
  
    } else if (['50d'].includes(icon)) {
  
      //ventania de dia
      fundoEfeito.src = './efeito/ensolarado.png';
      weatherIconefeito.src = './efeito/ventania.png';
  
    } else if (['50n'].includes(icon)) {
  
      //ventania de noite
      fundoEfeito.src = './efeito/noite.png';
      weatherIconefeito.src = './efeito/ventania.png';
  
    } else {
  
      //ensolarado
      fundoEfeito.src = './efeito/ensolarado.png';
    }
  
  */




  //recomendação que será apresentado de acordo com o clima --------------------------------------------------------------------------------------



  if (['04n', '04d'].includes(icon)) {

    const imagensSrc = ["./recomendacao/04d.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      containerRecomendacao.appendChild(imgElement);
    }


  } else if (['09d', '09n', '10d', '10n'].includes(icon)) {

    const imagensSrc = ["./recomendacao/09d.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      containerRecomendacao.appendChild(imgElement);
    }

  } else if (['11d', '11n'].includes(icon) && containerRecomendacao) {

    const imagensSrc = ["./recomendacao/arvore.gif", "./recomendacao/naorecomendado.svg"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      if (imagensSrc[i].includes("naorecomendado.svg")) {
        // Adiciona o atributo style para ajustar o tamanho
        imgElement.style.width = "80px";
        imgElement.style.position = "relative";
        imgElement.style.top = "-60px";
      }

      containerRecomendacao.appendChild(imgElement);
    }
  } else if (['50d', '50n'].includes(icon) && containerRecomendacao) {

    const imagensSrc = ["./recomendacao/ventania.gif", "./recomendacao/naorecomendado.svg"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      if (imagensSrc[i].includes("naorecomendado.svg")) {
        // Adiciona o atributo style para ajustar o tamanho
        imgElement.style.width = "80px";
        imgElement.style.position = "relative";
        imgElement.style.top = "-60px";
      }

      containerRecomendacao.appendChild(imgElement);
    }
  } else if (['01d', '02d'].includes(icon) && containerRecomendacao) {

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
        imgElement.style.width = "30px";
      }

      containerRecomendacao.appendChild(imgElement);
    }
  } else {
    console.log("A imagem já existe em 'containerRecomendacao'.");
  }



  // adicionar um icones de acordo com a temperatura ----------------------------------------------------------------
  if (temp > 35) {

    var imgElement = document.createElement("img");

    // Define a classe do elemento
    imgElement.className = "icone-recomendacao";

    // Define a fonte da imagem
    imgElement.src = "./recomendacao/perigo.gif";

    containerRecomendacao.appendChild(imgElement);

    console.log("Imagem 'perigo.gif' adicionada em 'containerRecomendacao'.");

  } else if (temp > 25 && containerRecomendacao) {
    // Array de fontes de imagens
    const imagensSrc = ["./recomendacao/roupaleve.gif"];

    for (var i = 0; i < imagensSrc.length; i++) {
      var imgElement = document.createElement("img");

      // Define a classe do elemento
      imgElement.className = "icone-recomendacao";

      // Define a fonte da imagem
      imgElement.src = imagensSrc[i];

      // Verifica se a fonte da imagem contém "sol.gif"
      if (imagensSrc[i].includes("sol.gif")) {

        // Adiciona o atributo style para ajustar o tamanho
        imgElement.style.width = "30px";
      }

      // Adiciona o elemento à 'containerRecomendacao'
      containerRecomendacao.appendChild(imgElement);
    }

  }






}
//buscando dados da semana --------------------------------------------------------------------------------------------------


function requestSemana(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao buscar os dados da semana');
      }
    })
    .then((dadoSemana) => {

      console.log("semana", dadoSemana);
      displaySemana(dadoSemana);

      function displaySemana(dadoSemana) {
        const semanaContainer = document.getElementById('conteudo-semana');
        semanaContainer.innerHTML = '';

        const previsaoDiaria = dadoSemana.list;

        const previsoes09 = previsaoDiaria.filter((previsaoDia) => {

          // Filtrar a lista apenas as previsões com o horário (09:00:00)
          return previsaoDia.dt_txt.endsWith('09:00:00');
        });

        previsoes09.forEach((previsaoDia) => {

          // Cria uma div para representar cada dia
          const divDia = document.createElement('div');
          divDia.classList.add('dia'); // Adicione uma classe para estilização
          divDia.id = 'dia';


          const datapadrao = previsaoDia.dt; // Data no formato dos EUA
          const data = formatarData(datapadrao); // Chama a função para formatar a data


          // adicionando os dados retirado da API nas Divs 
          const icon = previsaoDia.weather[0].icon;
          const temperatura = previsaoDia.main.temp;
          const descricao = previsaoDia.weather[0].description;

          if (['01n', '02n', '03n', '04n', '09n', '10n', '11n', '50n'].includes(icon)) {
            novoIcon = icon.replace('n', 'd');


            divDia.innerHTML = `
            <p class="data-semana">${data}</p>
            <p><img class="icone-semana" id="weather-icon" src="./assets/${novoIcon}.svg"></p>
            <pclass="temperatura-semana">${Math.round(temperatura)}°C</p>
            <p>${descricao}</p>
          `;
          } else {
            divDia.innerHTML = `
              <p class="data-semana">${data}</p>
              <p><img class="icone-semana" id="weather-icon" src="./assets/${icon}.svg"></p>
              <p class="temperatura-semana">${Math.round(temperatura)}°C</p>
              <p>${descricao}</p>
            `;
          }

          // Anexe a div ao contêiner
          semanaContainer.appendChild(divDia);
        });

        //convertendo a data para padrão Brasileira
        function formatarData(datapadrao) {
          let date = new Date(datapadrao * 1000)
          let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
          return `${formattedDate}`
        }
      }

    })
    .catch((error) => {
      console.error('Erro na solicitação da semana:', error);
    });
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
      console.log("dados do tempo", windTextElements);
      encontrarDadosVento(windTextElements);

      //extraindo dados da div do site da API
      function encontrarDadosVento(windTextElements) {
        let dadoRajada = "";
        let dadoVento = "";
        let dadoUv = "";

        for (let i = 0; i < windTextElements.length; i++) {
          const element = windTextElements[i];
          const labelText = element.querySelector('div:nth-child(1)').textContent.trim();
          console.log("dados do label", labelText);
          if (labelText === "Rajadas de vento") {
            dadoRajada = element.querySelector('div:nth-child(2)').textContent.trim();
          } else if (labelText === "Vento") {
            dadoVento = element.querySelector('div:nth-child(2)').textContent.trim();
          } else if (labelText === "Índice máximo de raios UV") {
            dadoUv = element.querySelector('div:nth-child(2)').textContent.trim();
          } else if (labelText === "RealFeel®") {
            dadosensacao = element.querySelector('div:nth-child(2)').textContent.trim();
          }
        }
        windSpeed.textContent = dadoVento;
        windGust.textContent = dadoRajada;
        windUv.textContent = dadoUv;
        feelsLikeTemperature.textContent = dadosensacao + 'C';
        console.log("dados do UV", dadoUv);

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


  const alertsText = document.getElementById('alertsPrevisao');
  alertsText.innerHTML = '';
  document.getElementById('alert-vidro').style.display = 'none'; // Oculta o container de alertas
  const divAlerts = document.querySelector('.info-alerts');
  divAlerts.textContent = ''; // Limpa o texto de alerta
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
          divPai.className = 'conteudo-saude'; // Adicione a classe ao div pai

          // Selecione todas as divs filhas dentro da div "index-list-card"
          const divsFilhas = indexListCard.querySelectorAll('div:not(.index-name)');

          // Itere sobre as divs filhas e adicione cada uma ao div pai
          divsFilhas.forEach(divFilha => {
            divPai.appendChild(divFilha.cloneNode(true)); // Usando cloneNode para copiar a div filha
          });

          // Adicione o div pai à div com o ID "saude"
          saudeText.appendChild(divPai);
        });
      }


      // configuração da Div Saude 

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
          // Cria um novo div pai
          const divPai = document.createElement('div');
          divPai.className = 'conteudo-alergia'; // Adicione a classe desejada ao div pai

          const divsFilhas = indexListCard.querySelectorAll('div:not(.index-name)');

          // Itere sobre as divs filhas e adicione cada uma ao div pai
          divsFilhas.forEach(divFilha => {
            divPai.appendChild(divFilha.cloneNode(true)); // Use cloneNode para copiar a div filha
          });

          // Adiciona o div pai à div com o ID "alergia"
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

//----------------------------------------------------------------