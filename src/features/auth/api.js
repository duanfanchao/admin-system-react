import { post, get } from '@/utils/request';

// 登录
export function loginF(data) {
    return post('/api/v1/auth/login', data);
}

// 注册
export function registerF(data) {
    return post('/api/v1/auth/register', data);
}

// 获取用户信息
export function getUserInfoF(data) {
    return get('/api/v1/auth/userInfo', data);
}