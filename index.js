const sButton = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const connectdb = document.getElementById("connect-db");
const notification = document.getElementById("notification");
const notifyText = document.getElementById("notify-text");
const registerBtn = document.getElementById("register");
const backToLoginBtn = document.getElementById("back-to-login-btn");
const registerForm = document.getElementById("register-form");

let timeIntervalID;

const NOTIFY = Object.freeze({
  ERROR: "ERROR",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
});
// Função para mostrar uma notificação
function showNotification(message) {
  document.getElementById("notify-text").textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000); // Esconder após 3 segundos
}

const notify = (message, type) => {
  // Limpa o timeout anterior, se existir
  clearTimeout(timeIntervalID);
  let classContainer;
  if (type === NOTIFY.ERROR) {
    notification.classList.add("error");
    showNotification(message);
  }
  if (type === NOTIFY.INFO) {
    notification.classList.add("info");
    showNotification(message);
  }
  if (type === NOTIFY.SUCCESS) {
    notification.classList.add("success");
    showNotification(message);
  }
};

// Event listener para mostrar o formulário de registro
registerBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

// Event listener para mostrar o formulário de login
backToLoginBtn.addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});
function authenticateUser(username, password) {
  // Aqui você faria a requisição para sua API
  // Exemplo simulado:

  // Usuários de exemplo (em produção, isso viria de um banco de dados)
  const validUsers = [
    { username: "admin", password: "123456" },
    { username: "usuario", password: "senha123" },
  ];

  const user = validUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    notify(`Seja bem-vindo ${username}`, "SUCCESS");

    // Redirecionar após login bem-sucedido
    timeIntervalID = setTimeout(() => {
      window.location.href = "https://www.google.com"; // Altere para sua página
    }, 1000);
  } else {
    notify("Usuário ou senha incorretos.", "ERROR");
  }
}

sButton.addEventListener("click", () => {
  if (!username.value || !password.value) {
    notify(
      "Não foi possível fazer login. O usuário ou senha estão incorretos!",
      "ERROR"
    );
    return;
  }

  if (username.value.length < 3) {
    notify("Usuário deve ter pelo menos 3 caracteres.", "ERROR");
    return;
  }

  if (password.value.length < 6) {
    notify("Senha deve ter pelo menos 6 caracteres.", "ERROR");
    return;
  }

  authenticateUser(username.value, password.value);
});

// Validação em tempo real
document.getElementById("username").addEventListener("input", function () {
  if (this.value.length > 0 && this.value.length < 3) {
    this.setCustomValidity("Usuário muito curto");
  } else {
    this.setCustomValidity("");
  }
});

document.getElementById("password").addEventListener("input", function () {
  if (this.value.length > 0 && this.value.length < 6) {
    this.setCustomValidity("Senha muito curta");
  } else {
    this.setCustomValidity("");
  }
});

async function buscarDados() {
  try {
    const resposta = await fetch("https://r5s6zt.csb.app/dados");
    const dados = await resposta.json();
    const lista = document.getElementById("lista-dados");

    dados.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = JSON.stringify(item);
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

async function buscarDadosSample() {
  try {
    const resposta = await fetch("https://vl7xl9-3000.csb.app");
    const dados = await resposta.json();

    // Manipular os dados recebidos
    console.log(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}
buscarDadosSample();
// buscarDados();
