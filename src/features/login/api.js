import { post } from '@/utils/request';

// 登录
export function loginF(data) {
    return post('/api/v1/auth/login', data);
}