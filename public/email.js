const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { EventEmitter } = require('events');
const nodemailer = require('nodemailer');

const user = "tempocerto2023@gmail.com";
const pass = "uxvz xgvw shjb fiqo";

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
    const emailsRef = collection(db, 'email'); // 'email' é o nome da coleção no Firestore
    const querySnapshot = await getDocs(emailsRef);
    const destinatarios = [];

    querySnapshot.forEach((doc) => {
      const emailData = doc.data();
      destinatarios.push(emailData.email);
    });

    return destinatarios;
  } catch (error) {
    console.error('Erro ao buscar e-mails:', error);
    return [];
  }
}

async function enviarEmail(destinatarios) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp-relay.gmail.com",
    secure: true,
    port: 465,
    auth: { user, pass },
  });

  // Construir o conteúdo HTML do email
  const emailHTML = `
  <html>
    <head>
      <style>
        /* CSS aqui */
      </style>
    </head>
    <body>
      <h1>Texto de email</h1>
      <p>Este é um exemplo de email com HTML.</p>
    </body>
  </html>
  `;

  const mailOptions = {
    from: user,
    to: destinatarios.join(', '),
    subject: "Seja bem vindo",
    html: emailHTML,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o email:', error);
    } else {
      console.log('Email enviado com sucesso:', info.response);
    }
  });
}

const eventEmitter = new EventEmitter();

// Esta função emite o evento 'alertaRecuperado'
function emitAlertaRecuperado() {
  eventEmitter.emit('alertaRecuperado');
}

// Chame a função para buscar destinatários
async function processarAlertas() {
  const destinatarios = await buscarEmails();
  // Chame a função para enviar emails, passando os destinatários
  enviarEmail(destinatarios);
}

// Chame a função para processar alertas e enviar emails
processarAlertas();

// Exemplo de chamada da função emitAlertaRecuperado
emitAlertaRecuperado();
