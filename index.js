const sButton = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const connectdb = document.getElementById("connect-db");
const notification = document.getElementById("notification");
const notifyText = document.getElementById("notify-text");
const registerBtn = document.getElementById("register");
const backToLoginBtn = document.getElementById("back-to-login-btn");
const registerForm = document.getElementById("register-form");
const notifyInformation = document.getElementById("notify-info");

let timeIntervalID;

const NOTIFY = Object.freeze({
  ERROR: "ERROR",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
});
// Função para mostrar uma notificação
function showNotification(message) {
  document.getElementById("notify-info").textContent = message;
  notifyInformation.style.display = "block";

  setTimeout(() => {
    notifyInformation.style.display = "none";
  }, 3000); // Esconder após 3 segundos
}

const notify = (message, type) => {
  // Limpa o timeout anterior, se existir
  clearTimeout(timeIntervalID);
  let classContainer;

  if (type === NOTIFY.ERROR) {
    notifyInformation.classList.add("err");
    applyShake(password);
    applyShake(username);

    showNotification(message);
  }
  if (type === NOTIFY.INFO) {
    notifyInformation.classList.add("info");
    showNotification(message);
  }
  if (type === NOTIFY.SUCCESS) {
    notifyInformation.classList.add("success");
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
      // window.location.href = "https://www.google.com"; // Altere para sua página

      alert("Você será redirecionado para outra página!");
    }, 1000);
  } else {
    notify("Usuário ou senha incorretos.", "ERROR");
  }
}

// Função para aplicar o shake
const applyShake = (input) => {
  input.classList.add("shake");
  input.classList.add("error");
  input.addEventListener(
    "animationend",
    () => {
      input.classList.remove("shake");
      input.classList.remove("error");
    },
    { once: true }
  );
};

sButton.addEventListener("click", () => {
  if (!username.value || !password.value) {
    // Se o input estiver vazio, ative o shake

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
