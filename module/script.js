"use strict";

const nameInput = document.querySelector(".add-form-name");
const commentTextarea = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const commentsList = document.querySelector(".comments");

const commentsData = [
  {
    id: 1,
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likesCount: 3,
    isLiked: false,
  },
  {
    id: 2,
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likesCount: 75,
    isLiked: true,
  },
];

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderComments() {
  commentsList.innerHTML = commentsData
    .map((comment) => {
      const likeButtonClass = comment.isLiked
        ? "like-button -active-like"
        : "like-button";
      return `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${escapeHtml(comment.name)}</div>
          <div>${comment.date}</div>
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
      </li> `;
    })
    .join("");
}

renderComments();

commentsList.addEventListener("click", function (e) {
  if (e.target.classList.contains("like-button")) {
    e.stopPropagation();

    const button = e.target;
    const commentId = button.getAttribute("data-id");
    const comment = commentsData.find((c) => c.id == commentId);

    if (comment) {
      comment.isLiked = !comment.isLiked;
      if (comment.isLiked) {
        comment.likesCount++;
      } else {
        comment.likesCount--;
      }
      renderComments();
    }
    return;
  }
});

const clickedComment = e.target.closest(".comment");
if (!clickedComment) return;

const commentIdStr = clickedComment.getAttribute("data-id");
const currentComment = commentsData.find((c) => c.id == commentIdStr);

if (!currentComment) return;

const quotedText = `> ${currentComment.text}`;
nameInput.value = currentComment.name;
commentTextarea.value = quotedText;

addButton.addEventListener("click", addComment);

function addComment(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const commentText = commentTextarea.value.trim();

  if (!name || !commentText) {
    alert("Пожалуйста, заполните поля «Имя» и «Комментарий»");
    return;
  }

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear()).slice(-2);
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  const cleanText = escapeHtml(commentText);
  const newComment = {
    id: Date.now(),
    name: name,
    date: formattedDate,
    text: cleanText,
    likesCount: 0,
    isLiked: false,
  };

  commentsData.push(newComment);
  renderComments();

  nameInput.value = "";
  commentTextarea.value = "";
}

console.log("It works!");
