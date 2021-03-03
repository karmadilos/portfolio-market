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
export const getAllEdu = (user_id) =>
    request('get', process.env.REACT_APP_HOST + `/education/${user_id}`);

export const postEdu = (user_id) =>
    requestWithJWT(
        'post',
        process.env.REACT_APP_HOST + `/education/${user_id}`,
    );

export const putEdu = (user_id, data) =>
    requestWithJWT(
        'put',
        process.env.REACT_APP_HOST + `/education/${user_id}`,
        data,
    );

export const deleteEdu = (user_id, id) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/education/${user_id}/${id}`,
    );

/*
****************
수상 정보 CRUD API
****************
*/
export const getAwards = (user_id) =>
    request('get', process.env.REACT_APP_HOST + `/awards/${user_id}`);

export const postAwards = (user_id) =>
    requestWithJWT('post', process.env.REACT_APP_HOST + `/awards/${user_id}`);

export const putAwards = (user_id, data) =>
    requestWithJWT(
        'put',
        process.env.REACT_APP_HOST + `/awards/${user_id}`,
        data,
    );

export const deleteAwards = (user_id, id) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/awards/${user_id}/${id}`,
    );

/*
*******************
프로젝트 정보 CRUD API
*******************
*/
export const getProjects = (user_id) =>
    request('get', process.env.REACT_APP_HOST + `/project/${user_id}`);

export const postProjects = (user_id) =>
    requestWithJWT('post', process.env.REACT_APP_HOST + `/project/${user_id}`);

export const putProject = (user_id, data) =>
    requestWithJWT(
        'put',
        process.env.REACT_APP_HOST + `/project/${user_id}`,
        data,
    );

export const deleteProject = (user_id, id) =>
    requestWithJWT(
        'delete',
        process.env.REACT_APP_HOST + `/project/${user_id}/${id}`,
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
