const request = require('request');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();

const url = 'https://www.cptec.inpe.br/previsao-tempo/sp/caraguatatuba';
const url1 ='https://www.accuweather.com/pt/br/caraguatatuba/45839/daily-weather-forecast/45839';

// Fazendo a requisição HTTP
request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);

        const location = $('h2[class="text-center"]').text();
        const temperatureMin = $('[class="text-primary font-weight-bold"]').text();
        const temperatureMax = $('[class="text-danger font-weight-bold"]').text();

        const db = new sqlite3.Database('clima.db');

        // Criar a tabela se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS clima (
            id INTEGER PRIMARY KEY,
            localizacao TEXT,
            temperaturaMin TEXT,
            temperaturaMax TEXT,
            condicao TEXT
        )`);

        // Inserir os dados na tabela
        const query = `INSERT INTO clima (localizacao, temperaturaMin, temperaturaMax) VALUES (?, ?, ?)`;
        db.run(query, [location, temperatureMin, temperatureMax], (err) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
            } else {
                console.log('Dados inseridos com sucesso!');
            }

            // Fechar o banco de dados após a inserção
            db.close();
            console.log(db);
        });
    } else {
        console.log('Falha ao recuperar a página');
    }
});

request(url1, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const condition = $('.daily-forecast-card.has-alert').text();

        const db = new sqlite3.Database('clima.db');

        const query = `INSERT INTO clima (condicao) VALUES (?)`;
        db.run(query, [condition], (err) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
            } else {
                console.log('Dados inseridos com sucesso!');
            }

            // Fechar o banco de dados após a inserção
            db.close();
        });
    } else {
        console.log('Falha ao recuperar a página');
    }
});
