import { request, requestWithJWT } from './client';
import dotenv from 'dotenv'

dotenv.config();

export const login = ({ email, password }) =>
    request('POST', process.env.REACT_APP_HOST+'/auth/login', { email, password });

export const register = ({ email, password, fullname }) =>
    request('POST', process.env.REACT_APP_HOST+'/auth/register', { email, password, fullname });

export const getUser = () => requestWithJWT('POST', process.env.REACT_APP_HOST+'/auth/user');

export const logout = () => requestWithJWT('POST',process.env.REACT_APP_HOST+'/auth/logout');
