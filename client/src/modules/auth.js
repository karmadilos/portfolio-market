// auth(회원가입, 로그인, 로그아웃)에 대한 Redux action, action function, reducer
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

const SET_USER = 'auth/SET_USER';

const FORM_ERROR = 'auth/FORM_ERROR';

const SET_STYLE_MODE = 'auth/SET_STYLE_MODE';

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
        console.log(e.response.data);
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
        console.log(e.response);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER });
    try {
        const payload = await authAPI.getUser();
        console.log(payload);
        sessionStorage.setItem('id', payload.data.user.id);
        sessionStorage.setItem('fullname', payload.data.user.fullname);
        dispatch(
            setUser({
                id: payload.data.user.id,
                fullname: payload.data.user.fullname,
            }),
        );
    } catch (e) {
        console.log(e.response);
        sessionStorage.clear();
        dispatch(logout());
    }
};

export const setUser = createAction(SET_USER, (user) => user);

export const formError = createAction(FORM_ERROR, (err) => err);

export const setStyleMode = createAction(SET_STYLE_MODE, ({ type, mode }) => ({
    type,
    mode,
}));

// 초기 State
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
    styleMode: {
        email: 0,
        password: 0,
        password_check: 0,
        fullname: 0,
    },
    auth: asyncUtils.reducerUtils.initial(),
    user: null,
    authError: '',
};

// 각 액션에 대한, State 변화를 만드는 reducer
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
            authError: action.payload.response.data.msg,
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
        [SET_USER]: (state, { payload: user }) => ({
            ...state,
            user: user,
        }),
        [FORM_ERROR]: (state, { payload: err }) => ({
            ...state,
            authError: err,
        }),
        [SET_STYLE_MODE]: (state, { payload: { type, mode } }) => ({
            ...state,
            styleMode: { ...state.styleMode, [type]: mode },
        }),
    },
    initialState,
);

export default auth;
