import { request } from './client';

export const getAllProfile = (search) => (!search) ? request('get', '/profile') : request('get', `/profile?search=${search}`);

export const getProfile = (user_id) => request('get', `/profile/${user_id}`);