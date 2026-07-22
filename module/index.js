import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { handleAddComment } from "./handleAddComment.js";
import { getComments } from "./api.js";

function initApp() {
   getComments((serverComments) => {
      const normalized = serverComments.map(c => ({
      id: c.id,
      name: c.author?.name || "Аноним",
      date: c.date,
      text: c.text,
      likesCount: c.likes,
      isLiked: c.isLiked
    }));

   
    commentsData.length = 0;
    commentsData.push(...normalized);

    console.log(` Загружено комментариев: ${commentsData.length}`);

    renderComments();
    handleAddComment();
  });
}

initApp();