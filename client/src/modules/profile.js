// 프로필 정보 crud 처리를 위한 Redux action, action function, reducer
import { createAction, handleActions } from 'redux-actions';
import * as API from '../lib/apis/profile';
import * as asyncUtils from '../lib/asyncUtils';

// get - 모든 프로필 호출
const [
    READ_ALL_PROFILES,
    READ_ALL_PROFILES_SUCCESS,
    READ_ALL_PROFILES_FAILURE,
] = asyncUtils.getAction('profile', 'READ_ALL_PROFILES');

// get - 검색
const [
    SEARCH_PROFILE,
    SEARCH_PROFILE_SUCCESS,
    SEARCH_PROFILE_FAILURE,
] = asyncUtils.getAction('profile', 'SEARCH_PROFILE');

// get - 단일 프로필 호출
const [
    READ_PROFILE,
    READ_PROFILE_SUCCESS,
    READ_PROFILE_FAILURE,
] = asyncUtils.getAction('profile', 'READ_PROFILE');

// put - 프로필 수정
const [
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
] = asyncUtils.getAction('profile', 'UPDATE_PROFILE');

// 초기화
const RESET_PROFILE = 'profile/RESET_PROFILE';

// mode 변경
const CHANGE_MODE = 'profile/CHANGE_MODE';

export const readAllProfiles = asyncUtils.createPromiseThunk(
    READ_ALL_PROFILES,
    API.getAllProfile,
);

export const searchProfile = asyncUtils.createPromiseThunk(
    SEARCH_PROFILE,
    API.searchProfile,
);

export const readProfile = asyncUtils.createPromiseThunk(
    READ_PROFILE,
    API.getProfile,
);

export const updateProfile = asyncUtils.createPromiseThunk(
    UPDATE_PROFILE,
    API.updateProfile,
);

export const resetProfile = createAction(RESET_PROFILE);
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// 초기 State
// [mode] 0(network), 1, 2, 3(update)
const initialState = {
    profiles: [],
    profile: {
        id: '',
        user_id: '',
        user_name: '',
        comment: '',
        img_url: '',
        create_date: '',
        updated_date: '',
    },
    currentPage: 0,
    status: false,
    mode: 0,
    error: null,
};

// action에 의해 State를 변경하는 reducer
const profile = handleActions(
    {
        [READ_ALL_PROFILES_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profiles: data.data.profiles,
            error: null,
        }),
        [READ_ALL_PROFILES_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [SEARCH_PROFILE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profiles: data.data.profiles,
        }),
        [SEARCH_PROFILE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profiles: data.data.profiles,
            error: null,
        }),
        [SEARCH_PROFILE_FAILURE]: (state, action) => ({
            ...state,
            profiles: [],
            error: action.payload.message,
        }),
        [READ_PROFILE]: (state, action) => ({
            ...state,
            currentPage: action.param.uid,
        }),
        [READ_PROFILE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profile: data.data.profiles[0],
        }),
        [READ_PROFILE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [UPDATE_PROFILE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profile: { ...state.profile, ...data.data.result },
        }),
        [UPDATE_PROFILE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [RESET_PROFILE]: () => initialState,
        [CHANGE_MODE]: (state, { payload: mode }) => ({
            ...state,
            mode,
        }),
    },
    initialState,
);

export default profile;
