// axios 인스턴스 객체 만들기
import axios from 'axios';

const client = axios.create();

const apiURL = 'http://localhost:5000';
// client.defaults.baseURL = "http://localhost:5000"
//client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
client.defaults.withCredentials = true;
export const request = (method, url, data) => {
    return axios({
        method,
        url: apiURL + url,
        data,
    })
};

export default client;