const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
  try {
    // Ler o conteúdo do arquivo email.js
    const emailJsConteudo = fs.readFileSync('email.js', 'utf8');

    // Executar o código do email.js
    eval(emailJsConteudo);

    res.send('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
    res.status(500).send('Erro ao enviar o email');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
