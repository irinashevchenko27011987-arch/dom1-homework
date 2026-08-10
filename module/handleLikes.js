import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { toggleLike } from "./api.js"; 

export function handleLikes() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    button.addEventListener("click", onLikeClick, { once: false });
  });
}

function onLikeClick(e) {
  const button = e.target.closest(".like-button");
  if (!button) return;

  if (button.disabled) return;
  button.disabled = true;

  const id = button.dataset.id;
  const comment = commentsData.find((c) => c.id === id);
  if (!comment) {
    button.disabled = false;
    return;
  }

  toggleLike(id)
    .then((result) => {
     
      comment.likesCount = result.likes;
      comment.isLiked = result.isLiked;
      renderComments(); 
    })
    .catch((err) => {
      console.error(err);
      alert('Не удалось поставить лайк: ' + err.message);
    })
    .finally(() => {
      button.disabled = false;
    });
}
