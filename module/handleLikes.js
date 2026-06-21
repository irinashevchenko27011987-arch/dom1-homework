export function handleLikes(commentsData, renderComments) {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) return;

  commentsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("like-button")) {
      e.stopPropagation();
      const button = e.target;
      const commentId = Number(button.getAttribute("data-id")); 
      const comment = commentsData.find((c) => c.id === commentId);

      if (comment) {
        comment.isLiked = !comment.isLiked;
        comment.likesCount += comment.isLiked ? 1 : -1;
        renderComments(commentsData);
      }
    }
  });
}
