import { registration } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = (container) => {
  container.innerHTML = `
    <div class="login-page modal-content">
      <button class="close-modal" id="closeReg">&times;</button>
      <h2>Регистрация</h2>
      <form id="reg-form">
        <div class="form-field">
          <label for="reg-name" class="auth-label">Имя</label>
          <input type="text" id="reg-name" name="name" placeholder="Введите имя" required class="auth-input">
        </div>
        <div class="form-field">
          <label for="reg-login" class="auth-label">Логин</label>
          <input type="text" id="reg-login" name="login" placeholder="Придумайте логин" required class="auth-input">
        </div>
        <div class="form-field">
          <label for="reg-password" class="auth-label">Пароль</label>
          <input type="password" id="reg-password" name="password" placeholder="Придумайте пароль" required class="auth-input">
        </div>
        <button type="submit" class="auth-submit-btn">Зарегистрироваться</button>
        <button type="button" class="btn-login" style="background:none; border:none; color:#bcec30; margin-top:10px; cursor:pointer; font-size:14px;">Войти</button>
        <p id="reg-error" class="error-message" style="display: none; color: #ff4d4d; margin-top: 10px; text-align: center;"></p>
      </form>
    </div>`;

  const form = container.querySelector("#reg-form");
  const nameInput = container.querySelector("#reg-name");
  const loginInput = container.querySelector("#reg-login");
  const passwordInput = container.querySelector("#reg-password");
  const errorEl = container.querySelector("#reg-error");
  const closeBtn = container.querySelector("#closeReg");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => (container.innerHTML = ""));
  }

  container.querySelector(".btn-login").addEventListener("click", () => {
    renderLogin(container);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.style.display = "none";

    const name = nameInput.value.trim();
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !login || !password) {
      errorEl.textContent = "Заполните все поля";
      errorEl.style.display = "block";
      return;
    }

    registration(name, login, password)
    .then((data) => {
      let token = data.token; 
     
      if (!token && data.user && data.user.token) {
        token = data.user.token;
      }
    
      if (token) {
        localStorage.setItem('token', token);        
        
        const userName = (data.user && data.user.name) || name;
        localStorage.setItem('userName', userName);
     
        
        form.reset();
        renderLogin(container); 
        return;
      }
      
    })
    .catch((err) => {
      console.error('Ошибка регистрации:', err);
          });
  })
}
