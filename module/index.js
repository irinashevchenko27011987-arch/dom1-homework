import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { handleAddComment } from "./handleAddComment.js";
import { fetchCommentsList } from "./api.js"; 

function initApp() {
  const commentsList = document.querySelector(".comments");
      return;
  }

  fetchCommentsList()
    .then((serverComments) => {
      const normalized = serverComments.map((c) => ({
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
    })
    

initApp();