const TOKEN_KEY = 'auth_token';

// 获取token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// 设置token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// 清除token
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}