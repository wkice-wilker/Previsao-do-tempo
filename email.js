const { initializeApp } = require("https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js");
const { getFirestore, collection, getDocs } = require("https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js");
const alertasDados = require("./app.js");
const express = require('express')
const nodemailer = require('nodemailer');
const app = express()

const port = 3000

const user = "afs2007144@gmail.com"
const pass = "afspi52023@"

// Configuração do Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyABceDMCup6Z1LmclNegasDGLMKAYmOk-0",
    authDomain: "clima-a12f5.firebaseapp.com",
    projectId: "clima-a12f5",
    storageBucket: "clima-a12f5.appspot.com",
    messagingSenderId: "234130570534",
    appId: "1:234130570534:web:b8851322d6e9a236b5d5e7"
  };

// Inicialize o aplicativo Firebase
const appFirebase = initializeApp(firebaseConfig);

// Obtenha uma referência para o Firestore
const db = getFirestore(appFirebase);

// Função para buscar e-mails do Firestore
async function buscarEmails() {
  try {
    const emailsRef = collection(db, 'email'); // 'emails' é o nome da coleção no Firestore
    const querySnapshot = await getDocs(emailsRef);

    querySnapshot.forEach((doc) => {
      const emailData = doc.data();
      console.log('E-mail:', emailData.email);
    });
  } catch (error) {
    console.error('Erro ao buscar e-mails:', error);
  }
}

// Chame a função para buscar os e-mails
const destinatarios = await buscarEmails();
const alertas = enviarEmail(alertasDados);
function enviarEmail(alertas) {

    
    const transporter = nodemailer.createTransport({
        host:"smtp-relay.gmail.com",
        port:"587",
        auth: {user,pass},
    })

    // Construir o conteúdo HTML do email
const emailHTML = `
<html>
  <head>
    <style>
      /* Estilos CSS aqui */
    </style>
  </head>
  <body>
    <h1>Seu Email HTML</h1>
    <p>Este é um exemplo de email com HTML incorporado.</p>
  </body>
</html>
`;

    const mailOptions = {
        from: user,
        to: destinatarios.join(', '),
        replyTo: "afs2007144@gmail.com",
        subject: "Seja bem vindo",
        html: emailHTML,

    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar o email:', error);
        } else {
          console.log('Email enviado com sucesso:', info.response);
        }
      });


app.listen(port, () => console.log (`runiing on port ${port}!`))

}