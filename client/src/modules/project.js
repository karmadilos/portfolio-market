import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as API from '../lib/apis/portfolio';
import * as asyncUtils from '../lib/asyncUtils';

// get
const [
    READ_PROJECT,
    READ_PROJECT_SUCCESS,
    READ_PROJECT_FAILURE,
] = asyncUtils.getAction('project', 'READ_PROJECT');

// post
const [
    CREATE_PROJECT,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
] = asyncUtils.getAction('project', 'CREATE_PROJECT');

// put
const [
    UPDATE_PROJECT,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
] = asyncUtils.getAction('project', 'UPDATE_PROJECT');

// delete
const [
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
] = asyncUtils.getAction('project', 'DELETE_PROJECT');

// 초기화
const RESET_PROJECT = 'project/RESET_PROJECT';

// cache 변경
const SET_CACHE = 'project/SET_CACHE';

// mode 변경
const CHANGE_MODE = 'project/CHANGE_MODE';

export const readAllProject = asyncUtils.createPromiseThunk(
    READ_PROJECT,
    API.getAllPj,
);
export const createProject = asyncUtils.createPromiseThunk(
    CREATE_PROJECT,
    API.postPj,
);
export const updateProject = asyncUtils.createPromiseThunk(
    UPDATE_PROJECT,
    API.putPj,
);
export const deleteProject = asyncUtils.createPromiseThunk(
    DELETE_PROJECT,
    API.deletePj,
);

export const resetProject = createAction(RESET_PROJECT);

export const setCache = createAction(SET_CACHE, ({ pid, key, value }) => ({
    pid,
    key,
    value,
}));
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// [mode] 0(일반 사용자 접근), 1(해당 사용자 접근), 2(해당 사용자 업데이트)
const initialState = {
    projects: [],
    cache: [],
    mode: 0,
    currentPage: 0,
    error: null,
};

const project = handleActions(
    {
        [READ_PROJECT]: (state, action) => ({
            ...state,
            currentPage: action.param.uid,
        }),
        [READ_PROJECT_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            projects: data.data.projects,
            cache: data.data.projects,
        }),
        [READ_PROJECT_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [CREATE_PROJECT_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            projects: [...(state.projects || []), data.data.result],
            cache: [...(state.projects || []), data.data.result],
            error: null,
        }),
        [CREATE_PROJECT_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [UPDATE_PROJECT_SUCCESS]: (state) => ({
            ...state,
            projects: state.cache,
            error: null,
        }),
        [UPDATE_PROJECT_FAILURE]: (state, action) => ({
            ...state,
            cache: state.projects,
            error: action.payload.message,
        }),
        [DELETE_PROJECT]: (state, action) => ({
            ...state,
            cache: state.projects.filter((v) => v.id !== action.param.id),
        }),
        [DELETE_PROJECT_SUCCESS]: (state) => ({
            ...state,
            projects: state.cache,
            error: null,
        }),
        [DELETE_PROJECT_FAILURE]: (state, action) => ({
            ...state,
            cache: state.projects,
            error: action.payload.message,
        }),
        [RESET_PROJECT]: () => initialState,
        [SET_CACHE]: (state, { payload: { pid, key, value } }) =>
            produce(state, (draft) => {
                const project = draft.cache.find((pj) => pj.id === pid);
                project[key] = value;
            }),
        [CHANGE_MODE]: (state, { payload: mode }) => ({
            ...state,
            mode,
        }),
    },
    initialState, // default return value
);

export default project;
