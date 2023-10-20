const express = require('express');
const app = express();
const enviarEmail = require('./email.js'); // Importe o código do email.js

// Rota para enviar e-mail
app.get('/enviar-email', (req, res) => {
  enviarEmail(); // Chame a função do email.js aqui
  res.send('Email enviado com sucesso!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
