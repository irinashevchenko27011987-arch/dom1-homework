import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { fetchCommentsList, postComment } from "./api.js";


export function handleAddComment() {
  const addButton = document.querySelector(".add-form-button");
  const commentTextarea = document.querySelector(".add-form-text");
  const commentName = document.querySelector(".add-form-name");
  if (!addButton || !commentTextarea) return;

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const text = commentTextarea.value.trim();
    const name = commentName.value.trim();
    if (!text) {
      alert("Пожалуйста, заполните поле комментария");
      return;
    }

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
        handleAddComment();
        
        commentTextarea.value = "";
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        alert(err.message);
      })
      .finally(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
}
