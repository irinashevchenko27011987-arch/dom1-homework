export function getComments(callback) {
  fetch(`https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Сетевой ответ не в порядке: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const commentsArray = Array.isArray(data.comments) ? data.comments : [];
      console.log(" Данные получены с сервера:", commentsArray);
      callback(commentsArray);
    })
    .catch(error => {
      console.error("Возникла проблема с операцией fetch:", error);
      callback([]); 
    });
}

export function postComment(name, text, successCallback, errorCallback) {
   fetch(`https://wedev-api.sky.pro/api/v1/irina-shevchenko/comments`, {
    method: 'POST',
    body: JSON.stringify({
      name:name,
      text:text,
    }), 
   
    
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errData => {
                  throw new Error(errData.error || `Ошибка HTTP: ${response.status}`);
        });
      }
       return response.json();
    })
    .then(data => {
      console.log('комментарий успешно добавлен:', data);
      if (successCallback) successCallback(data);
    })
    .catch(error => {
      console.error('Возникла проблема:', error);
      if (errorCallback) errorCallback(error);
    });
}