import {commentsData} from "./comments.js"
export function handleQuotes() {
  const commentsList = document.querySelector(".comments");
  const commentTextarea = document.querySelector(".add-form-text");

  if (!commentsList || !commentTextarea) return;

  commentsList.addEventListener("click", function (e) {
    const clickedComment = e.target.closest(".comment");
    if (e.target.classList.contains("like-button") || !clickedComment) return;

    const commentIdStr = clickedComment.getAttribute("data-id");
    const currentComment = commentsData.find((c) => c.id == commentIdStr);

    if (currentComment) {
      const fullQuotedText = `>${currentComment.text}
  > — ${currentComment.name}`;

      commentTextarea.value = fullQuotedText;

      commentTextarea.scrollIntoView({ behavior: "smooth" });
    }
  });
}
