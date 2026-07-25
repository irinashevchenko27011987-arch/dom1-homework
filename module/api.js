export function fetchCommentsList() {
  return fetch("https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments")
    .then((response) => {
      return response.json();
})
    .then((data) => {
      const commentsArray = Array.isArray(data.comments) ? data.comments : [];
      return commentsArray;
})
    }

export function postComment(name, text) {
  return fetch("https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
    text: text,
    name: name,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
   }
