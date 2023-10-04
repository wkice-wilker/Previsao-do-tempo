const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Importe o body-parser
const app = express();
const port = 3000; // Porta do servidor

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'bdemail',
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configurar o body-parser para analisar solicitações JSON e formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber o e-mail do cliente e armazená-lo no banco de dados
app.post('/salvar-email', (req, res) => {
  const email = req.body.email; // Supondo que você esteja enviando o e-mail como um campo POST

  // Inserir o e-mail no banco de dados
  db.query('INSERT INTO emails (email) VALUES (?)', [email], (err, result) => {
    if (err) {
      console.error('Erro ao inserir o e-mail no banco de dados:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
      return;
    }
    console.log('E-mail armazenado com sucesso no banco de dados');
    res.status(200).json({ message: 'E-mail armazenado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
