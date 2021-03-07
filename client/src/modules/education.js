// 학력 정보 crud 처리를 위한 Redux action, action function, reducer
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as API from '../lib/apis/portfolio';
import * as asyncUtils from '../lib/asyncUtils';

// get
const [
    READ_EDUCATION,
    READ_EDUCATION_SUCCESS,
    READ_EDUCATION_FAILURE,
] = asyncUtils.getAction('education', 'READ_EDUCATION');

// post
const [
    CREATE_EDUCATION,
    CREATE_EDUCATION_SUCCESS,
    CREATE_EDUCATION_FAILURE,
] = asyncUtils.getAction('education', 'CREATE_EDUCATION');

// put
const [
    UPDATE_EDUCATION,
    UPDATE_EDUCATION_SUCCESS,
    UPDATE_EDUCATION_FAILURE,
] = asyncUtils.getAction('education', 'UPDATE_EDUCATION');

// delete
const [
    DELETE_EDUCATION,
    DELETE_EDUCATION_SUCCESS,
    DELETE_EDUCATION_FAILURE,
] = asyncUtils.getAction('education', 'DELETE_EDUCATION');

// 초기화
const RESET_EDUCATION = 'education/RESET_EDUCATION';

// cache 변경
const SET_CACHE = 'education/SET_CACHE';

// mode 변경
const CHANGE_MODE = 'education/CHANGE_MODE';

export const readAllEducations = asyncUtils.createPromiseThunk(
    READ_EDUCATION,
    API.getAllEdu,
);
export const createEducation = asyncUtils.createPromiseThunk(
    CREATE_EDUCATION,
    API.postEdu,
);
export const updateEducation = asyncUtils.createPromiseThunk(
    UPDATE_EDUCATION,
    API.putEdu,
);
export const deleteEducation = asyncUtils.createPromiseThunk(
    DELETE_EDUCATION,
    API.deleteEdu,
);

export const resetEducation = createAction(RESET_EDUCATION);

export const setCache = createAction(SET_CACHE, ({ eid, key, value }) => ({
    eid,
    key,
    value,
}));
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// 초기 State
// [mode] 0(일반 사용자 접근), 1(해당 사용자 접근), 2(해당 사용자 업데이트)
const initialState = {
    educations: [],
    cache: [],
    mode: 0,
    currentPage: 0,
    error: null,
};

// 각 action에 대한 State를 변경하는 reducer
const education = handleActions(
    {
        [READ_EDUCATION]: (state, action) => ({
            ...state,
            currentPage: action.param.uid,
        }),
        [READ_EDUCATION_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            educations: data.data.educations,
            cache: data.data.educations,
        }),
        [READ_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [CREATE_EDUCATION_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            educations: [...(state.educations || []), data.data.result],
            cache: [...(state.educations || []), data.data.result],
            error: null,
        }),
        [CREATE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [UPDATE_EDUCATION_SUCCESS]: (state) => ({
            ...state,
            educations: state.cache,
            error: null,
        }),
        [UPDATE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            cache: state.educations,
            error: action.payload.message,
        }),
        [DELETE_EDUCATION]: (state, action) => ({
            ...state,
            cache: state.educations.filter((v) => v.id !== action.param.id),
        }),
        [DELETE_EDUCATION_SUCCESS]: (state) => ({
            ...state,
            educations: state.cache,
            error: null,
        }),
        [DELETE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            cache: state.educations,
            error: action.payload.message,
        }),
        [RESET_EDUCATION]: () => initialState,
        [SET_CACHE]: (state, { payload: { eid, key, value } }) =>
            produce(state, (draft) => {
                const education = draft.cache.find((edu) => edu.id === eid);
                education[key] = value;
            }),
        [CHANGE_MODE]: (state, { payload: mode }) => ({
            ...state,
            mode,
        }),
    },
    initialState, // default return value
);

export default education;
