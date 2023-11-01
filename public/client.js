console.log("Iniciando o aplicativo Firebase...");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

console.log("Módulos Firebase importados com sucesso!");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABceDMCup6Z1LmclNegasDGLMKAYmOk-0",
  authDomain: "clima-a12f5.firebaseapp.com",
  projectId: "clima-a12f5",
  storageBucket: "clima-a12f5.appspot.com",
  messagingSenderId: "234130570534",
  appId: "1:234130570534:web:b8851322d6e9a236b5d5e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase inicializado com sucesso!");

const db = getFirestore(app);

// Selecionar o botão de e-mail e o campo de entrada de e-mail
const botaoEmail = document.getElementById('botao-email');
const emailInput = document.getElementById('input-email');
const resultado = document.getElementById('resultado');

// selecionar o alerta climática
const botaoCidade = document.querySelectorAll('.city-button');

botaoEmail.addEventListener('click', async function () {
  // Obter o valor do campo de entrada de e-mail
  const email = emailInput.value;

  function verificarEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // Verificar se o e-mail não está vazio
  if (email.trim() !== '') {
    if (verificarEmail(email)) {
    try {
      // Adicionar o e-mail ao Firestore
      const docRef = await addDoc(collection(db, 'email'), {
        email: email,
      });

      // Trocar a imagem do botão para o ícone de sucesso
      const botaoEmailIcon = document.querySelector('#botao-icon');
      botaoEmailIcon.src = './assets/sucesso.svg';
      const backBotao = document.querySelector('#botao-email');
      backBotao.style.backgroundColor = '#008000';

      console.log('E-mail adicionado com sucesso com ID: ', docRef.id);

      // Limpar o campo de entrada após a adição do e-mail
      emailInput.value = '';
      
      // Aguarda por alguns segundos antes de restaurar a imagem original do botão
      setTimeout(function () {
        botaoEmailIcon.src = './assets/botao-enviar.png';
        backBotao.style.backgroundColor = '#393939';

        const valorPadrao = 'digite seu e-mail';
        
          // Se o campo estiver vazio, redefina o valor padrão
          if (emailInput.value === '') {
            emailInput.value = valorPadrao;
          }
      }, 3000); // 3000 milissegundos (3 segundos)



    } catch (error) {
      console.error('Erro ao adicionar o e-mail: ', error);
    }
  } else {
    resultado.style.display ='flex';
    resultado.innerHTML = 'E-mail inválido. Por favor, insira um e-mail válido.';
    setTimeout(function () {
      resultado.style.display = 'none';
    }, 3000);
  }
  }else {
    console.log('Campo de e-mail vazio. Nenhum e-mail adicionado.');
  }
});

async function verificarEAdicionarAlerta() {
  const alerta = document.getElementById('alertsPrevisao');
  const cidade = document.getElementById('city-name');
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const dataFormatada = `${dia}-${mes}-${ano}`;
  const data = dataFormatada;
  const alertaTexto = alerta.textContent.trim();
  const cidadeTexto = cidade.textContent.trim();


  if (alertaTexto !== '') {
    try {
      // Recuperar alertas existentes do Firestore
      const alertasCollection = collection(db, 'alerta');
      const querySnapshot = await getDocs(alertasCollection);

      let alertaJaExistente = false;

      querySnapshot.forEach((doc) => {
        const dadosDoAlerta = doc.data();
        if (dadosDoAlerta.data === data && dadosDoAlerta.cidade === cidadeTexto) {
          alertaJaExistente = true;
        }
      });

      // Se não houver um alerta com a mesma cidade, data e descrição
      if (!alertaJaExistente) {
        
      // Divide os alertas com base na palavra "alerta"
  const alertaParts = alertaTexto.split("Alerta");
  
  // Remove espaços em branco vazios e adiciona a palavra Alerta no começo da descrição
  const alertaPartsLimpos = alertaParts.filter(part => part.trim() !== "").map(part => "Alerta " + part.trim());

  
  // Adicione alertas individuais aos campos correspondentes
  const docData = { cidade: cidadeTexto, data: data };
  for (let i = 0; i < alertaPartsLimpos.length; i++) {
    docData[`alerta${i + 1}`] = alertaPartsLimpos[i].trim();
  }

// Adicione o documento ao Firestore
  const docAlerta = await addDoc(alertasCollection, docData);
        console.log('Alerta adicionado com sucesso com ID: ', docAlerta.id);
      } else {
        console.log('Alerta com a mesma cidade, data e descrição já existe, não adicionado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o Alerta: ', error);
    }
  }
}
// Configura um observador de mutações para o elemento com o ID 'city-name'
const cidadeVerificado = document.getElementById('city-name');
const observer = new MutationObserver(verificarEAdicionarAlerta);
const config = { childList: true, subtree: true };
observer.observe(cidadeVerificado, config);
