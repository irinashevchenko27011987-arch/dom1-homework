export function fetchCommentsList() {
  return fetch("https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments")
    .then((response) => {
           if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Сервер упал"); 
        }
        if (response.status === 404) {
          throw new Error("Вы допустили ошибку");
        }
        throw new Error('Сервер сломался');
      }
      return response.json();
    })
    .then((data) => {
      const commentsArray = Array.isArray(data.comments) ? data.comments : [];
      return commentsArray;
    });
}

export function postComment(name, text, forceError = false) {
  return fetch("https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
    text: text,
    name: name,
  })
 
  .then((response) => {
      if (response.status === 201) {
           return response.json();
    }   
    if (response.status === 400) {
      throw new Error("400 - не корректные данные"); 
    }

    if (response.status === 500) {
      throw new Error("500 - сервер упал"); 
    }

    throw new Error('Ошибка сервера');
  });
}