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

// 新增用户
export function newAddUserF(data) {
    return post('/api/v1/auth/addUser', data);
}

// 编辑用户
export function editUserF(data) {
    return post('/api/v1/auth/editUser', data);
}

// 删除用户
export function delUserF(data) {
    return post('/api/v1/auth/deleteUser', data);
}