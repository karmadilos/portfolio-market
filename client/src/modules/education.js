import { createAction, handleActions } from 'redux-actions';
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

export const resetProfile = createAction(RESET_EDUCATION);
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// [mode] 0(network), 1, 2, 3(update)
const initialState = {
    educations: [],
    cache: [],
    mode: 0,
    error: null,
    edu: {
        id: '',
        user_id: '',
        school_name: '',
        major: '',
        status: '',
    },
};

const education = handleActions(
    {
        [READ_EDUCATION_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            educations: data.data,
            cache: data.data,
        }),
        [READ_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [CREATE_EDUCATION_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            educations: [
                ...(state.educations || []),
                { ...state.edu, id: data.id, user_id: data.user_id },
            ],
            cache: [
                ...(state.educations || []),
                { ...state.edu, id: data.id, user_id: data.user_id },
            ],
        }),
        [CREATE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [UPDATE_EDUCATION]: (state, { payload: data }) => ({
            ...state,
            cache: data,
        }),
        [UPDATE_EDUCATION_SUCCESS]: (state) => ({
            ...state,
            educations: state.cache,
        }),
        [UPDATE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [DELETE_EDUCATION]: (state, { payload: id }) => ({
            ...state,
            cache: state.educations.filter((v) => v.id !== id),
        }),
        [DELETE_EDUCATION_SUCCESS]: (state) => ({
            ...state,
            educations: state.cache,
        }),
        [DELETE_EDUCATION_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
        }),
        [RESET_EDUCATION]: () => initialState,
        [CHANGE_MODE]: (state, { payload: mode }) => ({
            ...state,
            mode,
        }),
    },
    initialState,
);

export default education;
