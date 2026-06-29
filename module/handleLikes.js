import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";

export function handleLikes() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    button.removeEventListener("click", onLikeClick);
    button.addEventListener("click", onLikeClick);
  });
}

function onLikeClick(e) {
  const button = e.target.closest(".like-button");
  if (!button) return;

  const id = button.dataset.id;

  const comment = commentsData.find((c) => c.id === Number(id));
  if (!comment) return;

  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;

  renderComments();
}
