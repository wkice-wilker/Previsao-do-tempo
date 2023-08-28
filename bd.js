import sqlite3 from 'sqlite3';
import request from 'request';
import cheerio from 'cheerio';
import {
  cityName,
  currentTemperature,
  weatherIcon,
  weatherDescription,
  windSpeed,
  feelsLikeTemperature,
  currentHumidity,
  sunriseTime,
  sunsetTime,
} from './app.js';

requestAccuWeather(cityName);

const db = new sqlite3.Database('clima.db');

// Criar a tabela se ela não existir
db.run(`CREATE TABLE IF NOT EXISTS clima (
  id INTEGER PRIMARY KEY,
  localizacao TEXT,
  temperatura TEXT,
  icone TEXT,
  descrição TEXT,
  vento TEXT,
  sensacao TEXT,
  umidade TEXT,
  nascer-sol TEXT,
  por-sol TEXT
)`);

const name = cityName; 
const temp = currentTemperature; 
const icon = weatherIcon;
const description = weatherDescription; 
const speed = windSpeed; 
const feels_like = feelsLikeTemperature; 
const humidity = currentHumidity; 
const sunriseTime = sunriseTime;
const sunsetTime = sunsetTime;

// Inserir os dados na tabela
const query = `INSERT INTO clima (localizacao, temperatura, icone, descricao, vento, sensacao, umidade, nascer-sol, por-sol ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
db.run(query, [name, temp, icon, description, speed, feels_like, humidity, sunriseTime, sunsetTime], (err) => {
  if (err) {
      console.error('Erro ao inserir dados:', err);
  } else {
      console.log('Dados inseridos com sucesso!');
  }

  // Fechar o banco de dados após a inserção
  db.close();
  console.log(db);
});

function requestAccuWeather(cityName) {
    const url = `https://www.accuweather.com/pt/br/${cityName}/45839/daily-weather-forecast/45839`;
  
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const alertsText = $('.daily-forecast-card.has-alert').text();
            
            // Agora você pode usar o alertsText conforme necessário
            alertsPrevisao.textContent = alertsText;
        } else {
            console.log('Falha ao recuperar a página');
        }
    });
  }