const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const fs = require("fs");

exports.enviarEmail = onRequest(async (request, response) => {
  try {
    // Ler o conteúdo do arquivo email.js
    const emailJsConteudo = fs.readFileSync("public/email.js", "utf8");

    // Executar o código do email.js
    eval(emailJsConteudo);

    // Log e resposta de sucesso
    logger.info("Email enviado com sucesso!");
    response.send("Email enviado com sucesso!");
  } catch (error) {
    // Em caso de erro, log e responder com o erro
    logger.error("Erro ao enviar o email:", error);
    response.status(500).send("Erro ao enviar o email");
  }
});