// 수상 정보 crud 처리를 위한 Redux action, action function, reducer
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as API from '../lib/apis/portfolio';
import * as asyncUtils from '../lib/asyncUtils';

// get
const [
    READ_AWARDS,
    READ_AWARDS_SUCCESS,
    READ_AWARDS_FAILURE,
] = asyncUtils.getAction('awards', 'READ_AWARDS');

// post
const [
    CREATE_AWARDS,
    CREATE_AWARDS_SUCCESS,
    CREATE_AWARDS_FAILURE,
] = asyncUtils.getAction('awards', 'CREATE_AWARDS');

// put
const [
    UPDATE_AWARDS,
    UPDATE_AWARDS_SUCCESS,
    UPDATE_AWARDS_FAILURE,
] = asyncUtils.getAction('awards', 'UPDATE_AWARDS');

// delete
const [
    DELETE_AWARDS,
    DELETE_AWARDS_SUCCESS,
    DELETE_AWARDS_FAILURE,
] = asyncUtils.getAction('awards', 'DELETE_AWARDS');

// 초기화
const RESET_AWARDS = 'awards/RESET_AWARDS';

// cache 변경
const SET_CACHE = 'awards/SET_CACHE';

// mode 변경
const CHANGE_MODE = 'awards/CHANGE_MODE';

const SET_ERROR = 'awards/SET_ERROR';

export const readAllAwards = asyncUtils.createPromiseThunk(
    READ_AWARDS,
    API.getAllAwd,
);
export const createAwards = asyncUtils.createPromiseThunk(
    CREATE_AWARDS,
    API.postAwd,
);
export const updateAwards = asyncUtils.createPromiseThunk(
    UPDATE_AWARDS,
    API.putAwd,
);
export const deleteAwards = asyncUtils.createPromiseThunk(
    DELETE_AWARDS,
    API.deleteAwd,
);

export const resetAWARDS = createAction(RESET_AWARDS);

export const setCache = createAction(SET_CACHE, ({ aid, key, value }) => ({
    aid,
    key,
    value,
}));
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

export const setError = createAction(SET_ERROR, (error) => error);
// 초기 State
// [mode] 0(일반 사용자 접근), 1(해당 사용자 접근), 2(해당 사용자 업데이트)
const initialState = {
    awards: [],
    cache: [],
    mode: 0,
    currentPage: 0,
    error: null,
};

// 각 action에 대해 state를 변경하는 reducer
const awards = handleActions(
    {
        [READ_AWARDS]: (state, action) => ({
            ...state,
            currentPage: action.param.uid,
        }),
        [READ_AWARDS_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            awards: data.data.awards,
            cache: data.data.awards,
        }),
        [READ_AWARDS_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [CREATE_AWARDS_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            awards: [...(state.awards || []), data.data.result],
            cache: [...(state.awards || []), data.data.result],
            error: null,
        }),
        [CREATE_AWARDS_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [UPDATE_AWARDS_SUCCESS]: (state) => ({
            ...state,
            awards: state.cache,
            error: null,
        }),
        [UPDATE_AWARDS_FAILURE]: (state, action) => ({
            ...state,
            cache: state.awards,
            error: action.payload.message,
        }),
        [DELETE_AWARDS]: (state, action) => ({
            ...state,
            cache: state.awards.filter((v) => v.id !== action.param.id),
        }),
        [DELETE_AWARDS_SUCCESS]: (state) => ({
            ...state,
            awards: state.cache,
            error: null,
        }),
        [DELETE_AWARDS_FAILURE]: (state, action) => ({
            ...state,
            cache: state.awards,
            error: action.payload.message,
        }),
        [RESET_AWARDS]: () => initialState,
        [SET_CACHE]: (state, { payload: { aid, key, value } }) =>
            produce(state, (draft) => {
                const awards = draft.cache.find((awd) => awd.id === aid);
                awards[key] = value;
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

export default awards;
