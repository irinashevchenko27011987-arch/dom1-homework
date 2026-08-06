
import { login, setToken } from './api.js';
import { renderRegistration } from './renderRegistration.js';
import { renderComments } from './renderComments.js'; 
import { fetchCommentsList } from './api.js';
import  { updateComments} from './index.js'
import { handleAddComment } from './handleAddComment.js';
export const renderLogin = (container) => {
  const loginHtml = `
    <div class="login-page">
      <h2>Вход в аккаунт</h2>
      <form id="login-form">
        <div class="form-field">
          <label for="login-input">Логин</label>
          <input type="text" id="login-input" name="login" placeholder="Введите логин" required>
        </div>
        <div class="form-field">
          <label for="password-input">Пароль</label>
          <input type="password" id="password-input" name="password" placeholder="Введите пароль" required>
        </div>
        <button type="submit" id="btn-submit" class="btn-submit">Войти</button>
        <button type="button" class="btn-registr">Зарегистрироваться</button>
        <p id="login-error" class="error-message" style="display: none;"></p>
      </form>
    </div>`;

  container.innerHTML = loginHtml;

  const loginEl = document.querySelector('#login-input');
  const passwordEl = document.querySelector('#password-input');
  const form = document.querySelector('#login-form');
  const errorEl = document.querySelector('#login-error');

  document.querySelector('.btn-registr').addEventListener('click', () => {
    renderRegistration(container);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';
    const loginVal = loginEl.value.trim();
    const passwordVal = passwordEl.value.trim();

    if (!loginVal || !passwordVal) {
      errorEl.textContent = 'Заполните все поля';
      errorEl.style.display = 'block';
      return;
    }

    login(loginVal, passwordVal)
      .then((data) => {
        const user = data.user;
        if (!user || !user.token || !user.name) {
          throw new Error('Сервер вернул некорректные данные');
        }

        setToken(user.token);
        localStorage.setItem('token', user.token);
        localStorage.setItem('userName', user.name);
       return fetchCommentsList()
        .then((data) => {
          updateComments(data);
          renderComments();
         
          handleAddComment();
          
        }) 
             })
      .catch((err) => {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      });
  });
};