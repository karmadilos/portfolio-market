import { request } from './client';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.REACT_APP_HOST);
export const getAllProfile = (search) =>
    !search
        ? request('get', process.env.REACT_APP_HOST + '/profile')
        : request(
              'get',
              process.env.REACT_APP_HOST + `/profile?search=${search}`,
          );

export const getProfile = (user_id) =>
    request('get', process.env.REACT_APP_HOST + `/profile/${user_id}`);
