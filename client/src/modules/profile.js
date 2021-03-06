import { createAction, handleActions } from 'redux-actions';
import * as API from '../lib/apis/profile';
import * as asyncUtils from '../lib/asyncUtils';

const READ_ALL_PROFILES = 'profile/READ_ALL_PROFILES';
const READ_ALL_PROFILES_SUCCESS = 'profile/READ_ALL_PROFILES_SUCCESS';
const READ_ALL_PROFILES_FAILURE = 'profile/READ_ALL_PROFILES_FAILURE';

const SEARCH_PROFILE = 'profile/SEARCH_PROFILE';
const SEARCH_PROFILE_SUCCESS = 'profile/SEARCH_PROFILE_SUCCESS';
const SEARCH_PROFILE_FAILURE = 'profile/SEARCH_PROFILE_FAILURE';

const READ_PROFILE = 'profile/READ_PROFILE';
const READ_PROFILE_SUCCESS = 'profile/READ_PROFILE_SUCCESS';
const READ_PROFILE_FAILURE = 'profile/READ_PROFILE_FAILURE';

const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'profile/UPDATE_PROFILE_FAILURE';

// const UPLOAD_PROFILE_IMAGE = 'profile/UPLOAD_PROFILE_IMAGE';
// const UPLOAD_PROFILE_IMAGE_SUCCESS = 'profile/UPLOAD_PROFILE_IMAGE_SUCCESS';
// const UPLOAD_PROFILE_IMAGE_FAILURE = 'profile/UPLOAD_PROFILE_IMAGE_FAILURE';

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
