import commentsData from "./comments.js"; // Без скобок, так как export default
import { handlerLikeButton } from "./handlerLikeButton.js";
import { renderComments } from "./renderComments.js";

const commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const commentTextarea = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

renderComments(commentsList, commentsData);

handlerLikeButton(
  commentsList,
  commentsData,
  renderComments,
  nameInput,
  commentTextarea
);

if (addButton) {
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = commentTextarea.value.trim();

    if (!name || !text) {
      alert("Заполните поля!");
      return;
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDate = `${day}.${month}.${year} ${hours}:\${minutes}`;

    const newComment = {
      id: Date.now(),
      name: name,
      date: formattedDate,
      text: text,
      likesCount: 0,
      isLiked: false,
    };

    commentsData.push(newComment);

    renderComments(commentsList, commentsData);

    nameInput.value = "";
    commentTextarea.value = "";
  });
}
