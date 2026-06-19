export function handlerLikeButton(commentsList, commentsData, renderComments, nameInput, commentTextarea) {
  commentsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('like-button')) {
      e.stopPropagation();
      const button = e.target;
      const commentId = button.getAttribute('data-id');
      const comment = commentsData.find(c => c.id == commentId);

      if (comment) {
        comment.isLiked = !comment.isLiked;
        comment.likesCount += comment.isLiked ? 1 : -1;
        
        renderComments(commentsList, commentsData);
      }
      return;
    }

    const clickedComment = e.target.closest('.comment');
    if (!clickedComment) return;

    if (nameInput && commentTextarea) {
      const commentIdStr = clickedComment.getAttribute('data-id'); 
      const currentComment = commentsData.find(c => c.id == commentIdStr);

      if (currentComment) {
        const quotedText = `> \${currentComment.text}`;
        nameInput.value = currentComment.name;
        commentTextarea.value = quotedText;
        commentTextarea.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
 
