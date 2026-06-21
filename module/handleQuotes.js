export function handleQuotes(commentsData) {
  const commentsList = document.querySelector(".comments");
  const nameInput = document.querySelector(".add-form-name");
  const commentTextarea = document.querySelector(".add-form-text");

  if (!commentsList || !nameInput || !commentTextarea) return;

  commentsList.addEventListener("click", function (e) {
    const clickedComment = e.target.closest(".comment");

    if (e.target.classList.contains("like-button") || !clickedComment) return;

    const commentIdStr = clickedComment.getAttribute("data-id");
    const currentComment = commentsData.find((c) => c.id == commentIdStr);

    if (currentComment) {
      const quotedText = `>${currentComment.text}`;
      commentTextarea.value = quotedText;
      commentTextarea.scrollIntoView({ behavior: "smooth" });
    }
  });
}
