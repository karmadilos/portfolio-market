import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as authAPI from '../lib/apis/auth';

const CHANGE_INPUTS = 'auth/CHANGE_INPUTS';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const AUTH_USER = 'auth/AUTH_USER';
const LOGOUT = 'auth/LOGOUT';
const FORM_ERROR = 'auth/FORM_ERROR';


export const changeInputs = createAction(
    CHANGE_INPUTS,
    ({ type, key, value }) => ({
        type,
        key,
        value
    })
);

export const initializeForm = createAction(INITIALIZE_FORM, type => type)

export const register = createAction(
    REGISTER,
    ({ email, password, fullname }) =>
        authAPI.register({ email, password, fullname })
            .then(res => {
                console.log(res);
                return { register_success: true }
            })
            .catch(err => {
                console.log(err);
                return { register_success: false }
            })
);

export const login = createAction(
    LOGIN,
    ({ email, password }) =>
        authAPI.login({ email, password })
            .then(res => {
                console.log(res);
                return res.data
            })
            .catch(err => {
                console.log(err);
                return err.response.data
            })
);

export const authUser = createAction(AUTH_USER,
    () => authAPI.check().then(res => res.data)
)

export const logout = createAction(LOGOUT,
    () => authAPI.logout()
        .then(res => res.data)
        .catch(err => err.response.data)
)
export const formError = createAction(FORM_ERROR,
    err => err
)

const initialState = {
    register: {
        email: '',
        password: '',
        password_check: '',
        fullname: '',
    },
    login: {
        email: '',
        password: ''
    },
    authError: null,
    user: null,
    login_success: "fail"
};

const auth = handleActions({
    [CHANGE_INPUTS]: (state, { payload: { type, key, value } }) =>
        produce(state, draft => {
            draft[type][key] = value;
        }),
    [INITIALIZE_FORM]: (state, { payload: type }) => ({
        ...state,
        [type]: initialState[type]
    }),
    [REGISTER]: (state, action) => {
        return {
            ...state,
            register_success: action.payload.status
        }
    },
    [LOGIN]: (state, action) => ({
        ...state,
        login_success: action.payload.status
    }),
    [FORM_ERROR]: (state, { payload: err }) => ({
        ...state,
        authError: err
    })
}, initialState);

export default auth;