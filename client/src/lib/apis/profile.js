/* eslint-disable no-undef */
import { request, requestWithJWT } from './client';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.REACT_APP_HOST);
export const getAllProfile = () =>
    request('get', process.env.REACT_APP_HOST + '/profile');

export const searchProfile = ({ search }) =>
    request('get', process.env.REACT_APP_HOST + `/profile?search=${search}`);

export const getProfile = ({ uid }) =>
    request('get', process.env.REACT_APP_HOST + `/profile/${uid}`);

export const updateProfile = ({ uid, data }) =>
    requestWithJWT('put', process.env.REACT_APP_HOST + `/profile/${uid}`, data);
