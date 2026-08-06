const baseURL = 'https://wedev-api.sky.pro/api/v2/irina-shevchenko'
const autHost = ' https://wedev-api.sky.pro/api/user/login'
export let token = ''
export const setToken = (newToken) => {
token = newToken
}
export let name = ''
export const setName = (newName) => {
name = newName
}
export function fetchCommentsList() {
  return fetch(`${baseURL}/comments`)
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

export function postComment(name, text) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return Promise.reject(new Error('Нет токена авторизации. Пожалуйста, войдите в систему.'));
  }

  return fetch(`${baseURL}/comments`, {
    method: "POST",
    headers: {
      Authorization:`bearer ${token}`,
    },
    body: JSON.stringify({ name, text }),
    text: text,
    name: name,
  })
 
  .then((response) => {
      if (response.ok) {
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
export const login = (login, password) => {
  return fetch (autHost, {
    method: 'POST',
    body:JSON.stringify({login: login, password: password}),
})
.then((response) => {
  if (!response.ok) {
  
    return response.json().then((err) => {
      throw new Error(err.message || 'Ошибка входа');
    });
  }
  
  return response.json(); 
});
}
export const registration = (name, login, password) => {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: 'POST',
    headers: {
      
    },
    body: JSON.stringify({
      name: name,
      login: login,
      password: password
    })
  })
  .then((response) => {
       if (!response.ok) {
      return response.json().then((errData) => {
        
        return { 
          success: false, 
          message: errData.message || errData.error || `Ошибка ${response.status}` 
        };
      });
    }
    return response.json();
  });
};
