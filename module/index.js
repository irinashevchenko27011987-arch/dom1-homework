import { commentsData } from './comments.js';
import { renderComments } from './renderComments.js';
import { renderLogin } from './renderLogin.js';
import { handleAddComment } from './handleAddComment.js';
import { fetchCommentsList } from './api.js'; 
import { handleLikes } from './handleLikes.js';

export function updateComments(data) {
  const normalized = data.map((c) => ({
    id: c.id,
    name: c.author?.name || 'Аноним',
    date: c.date,
    text: c.text,
    likesCount: c.likes,
    isLiked: c.isLiked,
  }));

  commentsData.length = 0;
  commentsData.push(...normalized);
}

function initApp() {
  const container = document.querySelector('.container');
  const token = localStorage.getItem('token');

  if (!token) {
    renderLogin(container);
    return;
  }
 
  fetchCommentsList()
    .then((data) => {
      updateComments(data);
      renderComments(); 
           
      handleAddComment();      
    })
    .catch((err) => {
      console.error('Ошибка загрузки комментариев:', err);
      renderLogin();
    });
  
}

initApp();
