import {escapeHtml} from "./escape.js";
import {commentsData}  from "./comments.js";
import {handleLikes} from "./handleLikes.js";
import {handleQuotes} from "./handleQuotes.js";
let isinit = false
export function renderComments() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) {
    console.error("Ошибка рендера: элемент .comments не найден в HTML");
    return;
  }

  if (!commentsData || commentsData.length === 0) {
    commentsList.innerHTML = "<li>Комментариев пока нет</li>";
    return;
  }

  commentsList.innerHTML = commentsData
    .map((comment) => {
      const likeButtonClass = comment.isLiked
        ? "like-button -active-like"
        : "like-button";
      return `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="${likeButtonClass}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li> `;
    })
    .join("");

  if (!isinit) {
      handleLikes();
    handleQuotes();
    isinit = true
  }
}
