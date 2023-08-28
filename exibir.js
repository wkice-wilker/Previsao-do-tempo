
const sqlite3 = require('sqlite3').verbose();

// Abrir o banco de dados
const db = new sqlite3.Database('clima.db');

//selecionando o botão da escolha da cidade
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

// Selecionando elementos do DOM
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

// Consulta para selecionar os últimos dados inseridos na tabela
const query = `SELECT * FROM clima ORDER BY id DESC LIMIT 1`;


// Executar a consulta
db.get(query, (err, row) => {
    if (err) {
        console.error('Erro ao consultar dados:', err);
    } else {
        // Atualizar os elementos do DOM com os valores do banco de dados
        cityName.textContent = row.localizacao;
        weatherDescription.textContent = row.condicao;
        currentTemperature.textContent = row.temperaturaMax + '°C';
        // Atualize os outros elementos do DOM da mesma forma
        
        // Se você quiser exibir ícones ou imagens de acordo com a condição climática, 
        // você pode fazer algo como:
        // weatherIcon.src = getIconUrl(row.condicao);
    }
    
    // Fechar o banco de dados após a consulta
    db.close();
});
console.log(db)