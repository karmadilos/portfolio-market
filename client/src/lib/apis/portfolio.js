/* eslint-disable no-undef */
import { request, requestWithJWT } from './client';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.REACT_APP_HOST);
//method, url, data

/*
****************
학력 정보 CRUD API
****************
*/
export const getAllEdu = ({ uid }) =>
    request('get', process.env.REACT_APP_HOST + `/education/${uid}`);

export const postEdu = ({ uid }) =>
    requestWithJWT('post', process.env.REACT_APP_HOST + `/education/${uid}`);

export const putEdu = ({ uid, data }) =>
    requestWithJWT(
        'put',
        process.env.REACT_APP_HOST + `/education/${uid}`,
        data,
    );

export const deleteEdu = ({ uid, id }) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/education/${uid}/${id}`,
    );

/*
****************
수상 정보 CRUD API
****************
*/
export const getAllAwd = ({ uid }) =>
    request('get', process.env.REACT_APP_HOST + `/awards/${uid}`);

export const postAwd = ({ uid }) =>
    requestWithJWT('post', process.env.REACT_APP_HOST + `/awards/${uid}`);

export const putAwd = ({ uid, data }) =>
    requestWithJWT('put', process.env.REACT_APP_HOST + `/awards/${uid}`, data);

export const deleteAwd = ({ uid, id }) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/awards/${uid}/${id}`,
    );

/*
*******************
프로젝트 정보 CRUD API
*******************
*/
export const getAllPj = ({ uid }) =>
    request('get', process.env.REACT_APP_HOST + `/project/${uid}`);

export const postPj = ({ uid }) =>
    requestWithJWT('post', process.env.REACT_APP_HOST + `/project/${uid}`);

export const putPj = ({ uid, data }) =>
    requestWithJWT('put', process.env.REACT_APP_HOST + `/project/${uid}`, data);

export const deletePj = ({ uid, id }) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/project/${uid}/${id}`,
    );

/*
******************
자격증 정보 CRUD API
******************
*/
export const getCertificate = (user_id) =>
    request('get', process.env.REACT_APP_HOST + `/certificate/${user_id}`);

export const postCertificate = (user_id) =>
    requestWithJWT(
        'post',
        process.env.REACT_APP_HOST + `/certificate/${user_id}`,
    );

export const putCertificate = (user_id, data) =>
    requestWithJWT(
        'put',
        process.env.REACT_APP_HOST + `/certificate/${user_id}`,
        data,
    );

export const deleteCertificate = (user_id, id) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/certificate/${user_id}/${id}`,
    );
