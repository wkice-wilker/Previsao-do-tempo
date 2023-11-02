const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const nodemailer = require('nodemailer');

const user = "tempocerto2023@gmail.com";
const pass = "ikbv kxfh fshb reso";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABceDMCup6Z1LmclNegasDGLMKAYmOk-0",
  authDomain: "clima-a12f5.firebaseapp.com",
  databaseURL: "https://clima-a12f5-default-rtdb.firebaseio.com",
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
    const emailsRef = collection(db, 'email');
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
// Função para buscar alertas do Firestore
async function buscarAlertas() {
  try {
    const alertasRef = collection(db, 'alerta');
    const querySnapshot = await getDocs(alertasRef);
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const dataFormatada = `${dia}-${mes}-${ano}`;
    const cidadeAlerta = [];

    querySnapshot.forEach((doc) => {
      const alertaData = doc.data();
      const data = alertaData.data;

      if (data === dataFormatada) {
        // Processa todos os campos "alerta1", "alerta2", etc.
        for (let i = 1; alertaData[`alerta${i}`]; i++) {
          const alerta = alertaData[`alerta${i}`];
          const cidade = alertaData.cidade;
          cidadeAlerta.push({ cidade, alerta, data });
        }
      }
    });

    return cidadeAlerta;
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return [];
  }
}


async function enviarEmail(destinatarios) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp-relay.gmail.com',
      secure: true,
      port: 465,
      auth: { user, pass },
    });
  
  const cidadeAlerta = await buscarAlertas();
  const emailHTML = `
  <html>
  <head>
  <title>Tempo Certo</title>
    <style>
    .titulo{
      margin-top: 100px;
      text-align: center;
      align-items: center;
      font-family: "Ubuntu", sans-serif;
      font-size: 30px;
      color: #000000;
      font-weight: bold;
    }
    .alerta-vidro{
      margin: 5px 0 0 210px;
    padding-top: 4px;
    width: 600px;
    min-height: 800px;
    background: url('https://docs.google.com/uc?id=1ryurHfD1ArPVtqskVOZDG2RxrK1442XV');
    background-repeat: no-repeat;
    background-size: 600px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 15px 15px 0 0;
    z-index: -1;
 
    }
    .cidade{
      background-color: #70a7ff;
      background: linear-gradient(to bottom, #70a7ff, #bedeff);
      padding-bottom: 15px;
    }
    .cidade p{
      text-align: center;
      background-color: #ffffffaf;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    font-size: 17px;
    font-family: "Ubuntu", sans-serif;
    }
    .footer{
      margin-left: 210px;
      display: flex;
      width: 600px;
      height: 200px;
      background: url('https://docs.google.com/uc?id=1wFavpaqSPcOPKMc5jfsloK1ALmrUDc-P');
      background-repeat: no-repeat;
      background-size: 600px;
      border-radius: 0 0 15px 15px;
      
    }
    .botao {
      width: 200px;
      height: 40px;
      border-radius: 10px;
      background-color: #0597e5;
      border: 0;
      text-align: center;
      padding: 15px 0 0 0;
      text-decoration: none;
      font-size: 20px;
      font-family: 'ubuntu', sans-serif;
      color: #f1b100;
      margin: 80px 0px 100px 200px;
    }
    a:visited {
      color: currentColor;
  }
    </style>
  </head>
  <body>  
    <div class="alerta-vidro">
    <p class="titulo">Alertas Meteorológicos</p><br>
      <div class="cidade" id="cidade-info">
      ${cidadeAlerta.map(({ cidade, alerta, data }) => `
        <p>Cidade: ${cidade}<br><br>${alerta}<br> Data: ${data}</p>
      `).join('')}
      </div>
      
    </div> 
    <div class="footer">
      <a class="botao" href="https://tempocerto.web.app/"><font color=#f1b100>Saiba mais</font></a>
    </div> 
  </body>
</html>
`;

  const mailOptions = {
    from: user,
    to: destinatarios.join(', '),
    subject: "Alertas Meteorológicos",
    html: emailHTML,
  };

  const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', info.response);
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}

async function enviarEmailSeNecessario() {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const dataFormatada = `${dia}-${mes}-${ano}`;

  // Busca os alertas do Firestore
  const alertas = await buscarAlertas();
  const alertasDoDia = alertas.filter(alerta => alerta.data === dataFormatada);
  const destinatarios = await buscarEmails();

  if (alertasDoDia.length > 0) {
    // Se houver alertas na data atual, envie o e-mail com os alertas
    enviarEmail(destinatarios, alertasDoDia);
  }
}

enviarEmailSeNecessario();

// verificar e enviar e-mails a cada 12 hora
setInterval(enviarEmailSeNecessario, 43200000); // 43.200.000 milissegundos = 12 hora