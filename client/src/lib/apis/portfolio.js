import { request } from './client';

//method, url, data

/*
****************
학력 정보 CRUD API
****************
*/
export const getAllEdu = (user_id) => request('get', `/education/${user_id}`);

export const postEdu = (user_id) => request('post', `/education/${user_id}`);

export const putEdu = (user_id, data) =>
    request('put', `/education/${user_id}`, data);

export const deleteEdu = (user_id, id) =>
    request('delete', `/education/${user_id}/${id}`);

/*
****************
수상 정보 CRUD API
****************
*/
export const getAwards = (user_id) => request('get', `/awards/${user_id}`);

export const postAwards = (user_id) => request('post', `/awards/${user_id}`);

export const putAwards = (user_id, data) =>
    request('put', `/awards/${user_id}`, data);

export const deleteAwards = (user_id, id) =>
    request('delete', `/awards/${user_id}/${id}`);

/*
*******************
프로젝트 정보 CRUD API
*******************
*/
export const getProjects = (user_id) => request('get', `/project/${user_id}`);

export const postProjects = (user_id) => request('post', `/project/${user_id}`);

export const putProject = (user_id, data) =>
    request('put', `/project/${user_id}`, data);

export const deleteProject = (user_id, id) =>
    request('delete', `/project/${user_id}/${id}`);

/*
******************
자격증 정보 CRUD API
******************
*/
export const getCertificate = (user_id) =>
    request('get', `/certificate/${user_id}`);

export const postCertificate = (user_id) =>
    request('post', `/certificate/${user_id}`);

export const putCertificate = (user_id, data) =>
    request('put', `/certificate/${user_id}`, data);

export const deleteCertificate = (user_id, id) =>
    request('delete', `/certificate/${user_id}/${id}`);
