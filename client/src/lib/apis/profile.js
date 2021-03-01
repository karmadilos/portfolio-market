import { request } from './client';
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.REACT_APP_HOST+'/profile')
export const getAllProfile = (search) => (!search) ? request('get', process.env.REACT_APP_HOST+'/profile') : request('get', `/profile?search=${search}`);

export const getProfile = (user_id) => request('get', `/profile/${user_id}`);
