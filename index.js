const sButton = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const notification = document.getElementById("notification");
const notifyText = document.getElementById("notify-text");
const NOTIFY = Object.freeze({
  ERROR: "ERROR",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
});

const notify = (message, type) => {
  if (type === NOTIFY.ERROR) {
    notification.classList.add("error");
    notifyText.textContent = message;
  }
  if (type === NOTIFY.INFO) {
    notification.classList.add("info");
    notifyText.textContent = message;
  }
  if (type === NOTIFY.SUCCESS) {
    notification.classList.add("success");
    notifyText.textContent = message;
  }
};

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
    setTimeout(() => {
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
