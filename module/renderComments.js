import { escapeHtml } from './escape.js';
import { commentsData } from './comments.js';
import { handleLikes } from './handleLikes.js';
import { handleQuotes } from './handleQuotes.js';
import { renderLogin } from './renderLogin.js';

function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = String(d.getFullYear()).slice(-2);
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function renderComments() {
  const container = document.querySelector('.container');
  if (!container) {
    console.error('❌ Не найден контейнер .container');
    return;
  }

  container.innerHTML = '';

  if (!commentsData || commentsData.length === 0) {
    container.innerHTML = '<p style="color: #aaa; text-align: center;">Комментариев пока нет</p>';
    handleLikes();
    handleQuotes();
    return;
  }

  const commentsHtml = commentsData
    .map((comment) => {
      const likeButtonClass = comment.isLiked
        ? 'like-button -active-like'
        : 'like-button';
      const formattedDate = formatDate(comment.date);

      return `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${escapeHtml(comment.name)}</div>
          <div>${formattedDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${escapeHtml(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="${likeButtonClass}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`;
    })
    .join('');

  const storedToken = localStorage.getItem('token');
  const hasValidToken = !!storedToken && storedToken.trim() !== '';
  const userName = localStorage.getItem('userName') || 'Пользователь';

  let bottomContent = '';

  if (hasValidToken) {
    bottomContent = `
    <div class="add-form">
      <input type="text" class="add-form-name" value="${escapeHtml(userName)}" readonly>
      <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>`;
  } else {
    bottomContent = `
    <p style="text-align: center; color: #aaa; margin-top: 20px; font-size: 14px;">
      Чтобы добавить комментарий, 
      <span class="link-login" style="color: #fff; cursor: pointer; text-decoration: underline; font-weight: bold;">
        авторизуйтесь
      </span>
    </p>`;
  }

  const finalHtml = `<ul class="comments">${commentsHtml}</ul>${bottomContent}`;
  container.innerHTML = finalHtml;

  if (hasValidToken) {
    handleLikes();
    handleQuotes();
  } else {
    const link = document.querySelector('.link-login');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔑 Клик по ссылке "Войти"');
        const container = document.querySelector('.container');
        if (container) {
          renderLogin(container);
        }
      });
    }
  }
}