import { escapeHtml } from "./escape.js";
import { commentsData } from "./comments.js";
import { handleLikes } from "./handleLikes.js";
import { handleQuotes } from "./handleQuotes.js";

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = String(d.getFullYear()).slice(-2);
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) {
    console.error("Ошибка рендера: элемент .comments не найден в HTML");
    return;
  }

  if (!commentsData || commentsData.length === 0) {
    commentsList.innerHTML = "<li>Комментариев пока нет</li>";
    handleLikes();
    handleQuotes();
    return;
  }

  commentsList.innerHTML = commentsData
    .map((comment) => {
      const likeButtonClass = comment.isLiked
        ? "like-button -active-like"
        : "like-button";
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
    .join("");

  handleLikes();
  handleQuotes();
}