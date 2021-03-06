import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as authAPI from '../lib/apis/auth';
import * as asyncUtils from '../lib/asyncUtils';

const CHANGE_INPUTS = 'auth/CHANGE_INPUTS';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_FINISHED = 'auth/LOGOUT_FINISHED';

const GET_USER = 'auth/GET_USER';
const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'auth/GET_USER_FAILURE';

const FORM_ERROR = 'auth/FORM_ERROR';

export const changeInputs = createAction(
    CHANGE_INPUTS,
    ({ type, key, value }) => ({
        type,
        key,
        value,
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (type) => type);

export const register = asyncUtils.createPromiseThunk(
    REGISTER,
    authAPI.register,
);
export const login = ({ email, password }) => async (dispatch) => {
    // 요청 시작
    dispatch({ type: LOGIN, email, password });
    try {
        // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
        const payload = await authAPI.login({ email, password });
        console.log(payload);
        sessionStorage.setItem('id', payload.data.user.id);
        sessionStorage.setItem('fullname', payload.data.user.fullname);
        dispatch({ type: LOGIN_SUCCESS, payload }); // 성공
    } catch (e) {
        console.log(e);
        dispatch({
            type: LOGIN_FAILURE,
            payload: e.response.data,
            error: true,
        }); // 실패
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    try {
        const payload = await authAPI.logout(); // API 호출
        sessionStorage.clear();
        window.location.reload();
        dispatch({ type: LOGOUT_FINISHED, payload }); // 성공
    } catch (e) {
        console.log(e.response.data);
    }
};

export const getUser = createAction(GET_USER, () => authAPI.getUser());
export const setUser = createAction(GET_USER_SUCCESS);
export const getUserFail = createAction(GET_USER_FAILURE);

export const formError = createAction(FORM_ERROR, (err) => err);

const initialState = {
    register: {
        email: '',
        password: '',
        password_check: '',
        fullname: '',
    },
    login: {
        email: '',
        password: '',
    },
    auth: asyncUtils.reducerUtils.initial(),
    user: null,
    authError: '',
};

const auth = handleActions(
    {
        [CHANGE_INPUTS]: (state, { payload: { type, key, value } }) =>
            produce(state, (draft) => {
                draft[type][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: type }) => ({
            ...state,
            [type]: initialState[type],
        }),
        [REGISTER_SUCCESS]: (state, action) => {
            return {
                ...state,
                auth: asyncUtils.reducerUtils.success(action.payload),
            };
        },
        [REGISTER_FAILURE]: (state, action) => ({
            ...state,
            auth: asyncUtils.reducerUtils.error(action.payload),
            authError: action.payload.msg,
        }),
        [LOGIN]: (state) => ({
            ...state,
            auth: asyncUtils.reducerUtils.loading(),
        }),
        [LOGIN_SUCCESS]: (state, action) => ({
            ...state,
            auth: asyncUtils.reducerUtils.success(action.payload),
            user: action.payload.data.user,
        }),
        [LOGIN_FAILURE]: (state, action) => ({
            ...state,
            auth: asyncUtils.reducerUtils.error(action.payload),
            authError: action.payload.msg,
        }),
        [LOGOUT]: (state) => ({
            ...state,
            auth: asyncUtils.reducerUtils.loading(),
            user: null,
        }),
        [LOGOUT_FINISHED]: (state) => ({
            ...state,
            auth: asyncUtils.reducerUtils.initial(),
            user: null,
        }),
        [GET_USER]: (state) => ({
            ...state,
            auth: asyncUtils.reducerUtils.loading(),
        }),
        [GET_USER_SUCCESS]: (state, action) => ({
            ...state,
            auth: asyncUtils.reducerUtils.success(action.payload),
            user: action.payload.user,
        }),
        [GET_USER_FAILURE]: (state, action) => ({
            ...state,
            auth: asyncUtils.reducerUtils.error(action.payload),
            user: null,
            authError: action.payload.msg,
        }),
        [FORM_ERROR]: (state, { payload: err }) => ({
            ...state,
            authError: err,
        }),
    },
    initialState,
);

export default auth;
