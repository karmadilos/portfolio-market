import { request } from './client';

export const login = ({ email, password }) =>
    request('POST', '/auth/login', { email, password })

export const register = ({ email, password, fullname }) =>
    request('POST', '/auth/register', { email, password, fullname })

export const check = () => request('POST', '/auth/check')

export const logout = () => request('GET', '/auth/logout')
