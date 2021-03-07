import { request, requestWithJWT } from './client';

export const login = ({ email, password }) =>
    request('POST', '/auth/login', { email, password });

export const register = ({ email, password, fullname }) =>
    request('POST', '/auth/register', { email, password, fullname });

export const getUser = () => requestWithJWT('POST', '/auth/user');

export const logout = () => requestWithJWT('POST', '/auth/logout');
