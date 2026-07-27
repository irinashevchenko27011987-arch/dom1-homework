import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { fetchCommentsList, postComment } from "./api.js";

export function handleAddComment() {
  const addButton = document.querySelector(".add-form-button");
  const nameInput = document.querySelector(".add-form-name");
  const commentTextarea = document.querySelector(".add-form-text");

  if (!addButton || !nameInput || !commentTextarea) return;

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const text = commentTextarea.value.trim();

    if (!name || !text || name.length < 3 || text.length < 3) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return; 
    }

    const savedName = name;
    const savedText = text;

    addButton.disabled = true;
    addButton.textContent = "Отправка...";

    postComment(name, text)
      .then(() => fetchCommentsList())
      .then((freshComments) => {
        const normalized = freshComments.map((c) => ({
          id: c.id,
          name: c.author?.name || "Аноним",
          date: c.date,
          text: c.text,
          likesCount: c.likes,
          isLiked: c.isLiked,
        }));

        commentsData.length = 0;
        commentsData.push(...normalized);
        renderComments();

        nameInput.value = "";
        commentTextarea.value = "";
      })
      .catch((err) => {
        console.error("Ошибка:", err);

        let message = "";

        if (err.message === "500") {
          message = "Сервер сломался, попробуй позже";
        } else if (err.message === "400") {
          message = "Некорректные данные";
        } else if (err.name === "TypeError" && err.message.includes("fetch")) {
           message = "Кажется, у вас сломался интернет, попробуйте позже";
        } else {
          message = "Что-то пошло не так: " + err.message;
        }

        alert(message);

        nameInput.value = savedName;
        commentTextarea.value = savedText;
      })
      .finally(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
}