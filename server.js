const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Configurar o middleware para servir arquivos estáticos
app.use(express.static('public'));

const db = new sqlite3.Database('clima.db');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/exibir', (req, res) => {
    const query = `SELECT * FROM clima`;

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows);
        }

        db.close();
    });
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});
