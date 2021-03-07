// 자격증 정보 crud 처리를 위한 Redux action, action function, reducer
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as API from '../lib/apis/portfolio';
import * as asyncUtils from '../lib/asyncUtils';

// get
const [
    READ_CERTIFICATE,
    READ_CERTIFICATE_SUCCESS,
    READ_CERTIFICATE_FAILURE,
] = asyncUtils.getAction('certificate', 'READ_CERTIFICATE');

// post
const [
    CREATE_CERTIFICATE,
    CREATE_CERTIFICATE_SUCCESS,
    CREATE_CERTIFICATE_FAILURE,
] = asyncUtils.getAction('certificate', 'CREATE_CERTIFICATE');

// put
const [
    UPDATE_CERTIFICATE,
    UPDATE_CERTIFICATE_SUCCESS,
    UPDATE_CERTIFICATE_FAILURE,
] = asyncUtils.getAction('certificate', 'UPDATE_CERTIFICATE');

// delete
const [
    DELETE_CERTIFICATE,
    DELETE_CERTIFICATE_SUCCESS,
    DELETE_CERTIFICATE_FAILURE,
] = asyncUtils.getAction('certificate', 'DELETE_CERTIFICATE');

// 초기화
const RESET_CERTIFICATE = 'certificate/RESET_CERTIFICATE';

// cache 변경
const SET_CACHE = 'certificate/SET_CACHE';

// mode 변경
const CHANGE_MODE = 'certificate/CHANGE_MODE';

const SET_ERROR = 'certificate/SET_ERROR';

export const readAllCertificate = asyncUtils.createPromiseThunk(
    READ_CERTIFICATE,
    API.getAllCert,
);
export const createCertificate = asyncUtils.createPromiseThunk(
    CREATE_CERTIFICATE,
    API.postCert,
);
export const updateCertificate = asyncUtils.createPromiseThunk(
    UPDATE_CERTIFICATE,
    API.putCert,
);
export const deleteCertificate = asyncUtils.createPromiseThunk(
    DELETE_CERTIFICATE,
    API.deleteCert,
);

export const resetCertificate = createAction(RESET_CERTIFICATE);

export const setCache = createAction(SET_CACHE, ({ cid, key, value }) => ({
    cid,
    key,
    value,
}));
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

export const setError = createAction(SET_ERROR, (error) => error);
// 초기 State
// [mode] 0(일반 사용자 접근), 1(해당 사용자 접근), 2(해당 사용자 업데이트)
const initialState = {
    certificates: [],
    cache: [],
    mode: 0,
    currentPage: 0,
    error: null,
};

// 각 action에 대한 State 변경 reducer
const certificate = handleActions(
    {
        [READ_CERTIFICATE]: (state, action) => ({
            ...state,
            currentPage: action.param.pid,
        }),
        [READ_CERTIFICATE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            certificates: data.data.certificates,
            cache: data.data.certificates,
        }),
        [READ_CERTIFICATE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [CREATE_CERTIFICATE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            certificates: [...(state.certificates || []), data.data.result],
            cache: [...(state.certificates || []), data.data.result],
            error: null,
        }),
        [CREATE_CERTIFICATE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [UPDATE_CERTIFICATE_SUCCESS]: (state) => ({
            ...state,
            certificates: state.cache,
            error: null,
        }),
        [UPDATE_CERTIFICATE_FAILURE]: (state, action) => ({
            ...state,
            cache: state.certificates,
            error: action.payload.message,
        }),
        [DELETE_CERTIFICATE]: (state, action) => ({
            ...state,
            cache: state.certificates.filter((v) => v.id !== action.param.id),
        }),
        [DELETE_CERTIFICATE_SUCCESS]: (state) => ({
            ...state,
            certificates: state.cache,
            error: null,
        }),
        [DELETE_CERTIFICATE_FAILURE]: (state, action) => ({
            ...state,
            cache: state.certificates,
            error: action.payload.message,
        }),
        [RESET_CERTIFICATE]: () => initialState,
        [SET_CACHE]: (state, { payload: { cid, key, value } }) =>
            produce(state, (draft) => {
                const certificate = draft.cache.find((cert) => cert.id === cid);
                certificate[key] = value;
            }),
        [CHANGE_MODE]: (state, { payload: mode }) => ({
            ...state,
            mode,
        }),
        [SET_ERROR]: (state, { payload: error }) => ({
            ...state,
            error: error,
        }),
    },
    initialState, // default return value
);

export default certificate;
