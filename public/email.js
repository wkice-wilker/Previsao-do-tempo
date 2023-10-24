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
    const alertasRef = collection(db, 'alerta');
    const querySnapshot = await getDocs(emailsRef);
    const destinatarios = [];

    querySnapshot.forEach((doc) => {
      const emailData = doc.data();
      destinatarios.push(emailData.email);
    });

    const querySnapshotAlerta = await getDocs(alertasRef);
    const alertas = [];

    querySnapshotAlerta.forEach((doc) => {
      const alertaData = doc.data();
      alertas.push(alertaData.alerta);
    });

    return destinatarios;
  } catch (error) {
    console.error('Erro ao buscar e-mails:', error);
    return [];
  }
}
// Função para buscar alertas do Firestore
async function buscarAlertas() {
  try {
    const alertasRef = collection(db, 'alerta'); // 'alertas' é o nome da coleção no Firestore
    const querySnapshot = await getDocs(alertasRef);
    const alertas = [];
    let cidade = '';

    querySnapshot.forEach((doc) => {
      const alertaData = doc.data();
      alertas.push(alertaData.alerta);
      cidade = alertaData.cidade;

    });

    // Exiba a cidade no elemento HTML
    const cidadeElement = document.getElementById('cidade-info');
    cidadeElement.textContent = `Cidade: ${cidade}`;

    return alertas;
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return [];
  }
}

async function enviarEmail(destinatarios, alertas) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp-relay.gmail.com",
    secure: true,
    port: 465,
    auth: { user, pass },
  });

  const cidadeElement = [
    { cidade: 'Cidade 1', alerta: 'Alerta 1' },
    { cidade: 'Cidade 2', alerta: 'Alerta 2' },
    // ... outros pares cidade-alerta
  ];
  
  const cidadeInfoDiv = document.getElementById('cidade-info');
  
  // Para cada par cidade-alerta, crie um elemento <p> e adicione-o à div cidade-info
  cidadeAlertas.forEach((cidadeAlerta) => {
    const cidadeParaExibir = cidadeAlerta.cidade;
    const alertaParaExibir = cidadeAlerta.alerta;
  
    // Crie um elemento <p> e defina o texto com a cidade e o alerta
    const paragrafo = document.createElement('p');
    paragrafo.textContent = `Cidade: ${cidadeParaExibir}, Alerta: ${alertaParaExibir}`;
  
    // Adicione o elemento <p> à div cidade-info
    cidadeInfoDiv.appendChild(paragrafo);
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
    <h1>Alertas Meteorológicos</h1>
    <div id="cidade-info"></div>
    <p>${alertas.join('<br>')}</p>
    </body>
  </html>
  `;

  const mailOptions = {
    from: user,
    to: destinatarios.join(', '),
    subject: "Alertas Meteorológicos",
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

async function enviarEmailSeNecessario() {
  // Busca os alertas do Firestore
  const alertas = await buscarAlertas();
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const dataFormatada = `${dia}-${mes}-${ano}`;

  // Verifique se há um alerta na data atual
  if (alertas.includes(dataFormatada)) {
    // Busque os e-mails dos destinatários
    const destinatarios = await buscarEmails();

    // Envie o e-mail com os alertas
    enviarEmail(destinatarios, alertas);
  }
}

// Configure um intervalo para verificar e enviar e-mails, por exemplo, a cada 1 hora
setInterval(enviarEmailSeNecessario, 3600000); // 3600000 milissegundos = 1 hora
