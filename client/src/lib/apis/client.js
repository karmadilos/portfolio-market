// axios 인스턴스 객체 만들기
import axios from 'axios';

const client = axios.create();
//client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
client.defaults.withCredentials = true;
export const request = (method, url, data) => {
    console.log(url);
    return client({
        method,
        url,
        data,
    });
};

export const requestWithJWT = (method, url, data) => {
    return client({
        method,
        url,
        data,
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Access-Control-Allow-Credentials': true,
        },
    });
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default client;
