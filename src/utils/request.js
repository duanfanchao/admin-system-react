import axios from 'axios';
import { message } from 'antd'; // 使用antd的message，或者换成你喜欢的UI库
import { getToken, clearToken } from './auth'; // 假设有这些工具函数
import { getSystemId } from './config';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // 从环境变量获取API地址
    timeout: 60000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    }
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 设置系统ID
        config.headers['systemId'] = getSystemId();

        // 如果存在token，则添加到请求头
        const token = getToken();
        if (token) {
            config.headers['token'] = `Bearer ${token}`;;
        }

        // 非GET请求且存在data时，处理数据
        if (config.method?.toLowerCase() !== 'get' && config.data) {
            if (Object.prototype.toString.call(config.data) === '[object FormData]') {
                config.headers['Content-Type'] = 'multipart/form-data';
            } else {
                config.data = JSON.stringify(config.data);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        // 处理登录过期
        if (res.resultMsg === '登录已过期') {
            handleLoginTimeout();
            return Promise.reject(new Error(res.resultMsg || '登录已过期'));
        }

        // 成功状态码（根据你的后端规范调整）
        if (res.code === 0 || res.code === 200 || res.code === 1) {
            return res;
        }

        // 特殊错误码处理
        const code = res.code || res.status;
        if (code === 401 || code === 402) {
            handleLoginTimeout();
            message.error(res.resultMsg || '会话过期');
            return;
        }

        // 其他错误
        return res;
    },
    (error) => {
        // 网络或服务器错误处理
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                handleLoginTimeout();
                return Promise.reject(new Error(error.response.data.resultMsg));
            } else if (status === 500) {
                return Promise.reject(new Error(error.response.data.resultMsg)); 
            } else if (status === 504) {
                return Promise.reject(new Error('服务端异常'));
            }
        } else {
            message.error('网络连接异常');
        }
    }
);

// 登录超时处理
function handleLoginTimeout() {
    clearToken();
    // 使用setTimeout避免阻塞当前请求
    setTimeout(() => {
        if (window.location.pathname !== '/login') {
            window.location.replace(`/login?from=${encodeURIComponent(window.location.pathname)}`);
        }
    }, 0);
}

/**
 * 封装get方法
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export function get(url, params = {}) {
    return service.get(url, { params });
}

/**
 * 封装post方法
 * @param {string} url 
 * @param {object} data 
 * @param {object} config 
 * @returns 
 */
export function post(url, data = {}, config = {}) {
    return service.post(url, data, config);
}

/**
 * 封装put方法
 * @param {string} url 
 * @param {object} data 
 * @returns 
 */
export function put(url, data = {}) {
    return service.put(url, data);
}

/**
 * 封装delete方法
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export function del(url, params = {}) {
    return service.delete(url, { params });
}

export default service;