import { createAction, handleActions } from 'redux-actions';
import * as API from '../lib/apis/profile';
// import * as asyncUtils from '../lib/asyncUtils';

const READ_ALL_PROFILES = 'profile/READ_ALL_PROFILES';
const READ_PROFILE = 'profile/READ_PROFILE';
const READ_PROFILE_SUCCESS = 'profile/READ_PROFILE_SUCCESS';
const READ_PROFILE_FAILURE = 'profile/READ_PROFILE_FAILURE';

// 초기화
const RESET_PROFILE = 'profile/RESET_PROFILE';

// mode 변경
const CHANGE_MODE = 'profile/CHANGE_MODE';

export const readAllProfiles = (search) => async (dispatch) => {
    dispatch({ type: READ_ALL_PROFILES });
    try {
        const payload = await API.getAllProfile(search);
        console.log(payload);
        dispatch({ type: READ_PROFILE_SUCCESS, payload });
    } catch (e) {
        console.log(e);
        dispatch({ type: READ_PROFILE_FAILURE, payload: e.response.data });
    }
};

export const readProfile = (id) => async (dispatch) => {
    dispatch(READ_PROFILE);
    try {
        const payload = await API.getProfile(id);
        console.log(payload);
        dispatch({ type: READ_PROFILE_SUCCESS, payload });
    } catch (e) {
        console.log(e);
        dispatch({ type: READ_PROFILE_FAILURE, payload: e.response.data });
    }
};

export const resetProfile = createAction(RESET_PROFILE);
export const changeMode = createAction(CHANGE_MODE, (mode) => mode);

// [mode] 0(network), 1, 2, 3(update)
const initialState = {
    profiles: null,
    mode: 0,
    error: null,
};

const profile = handleActions(
    {
        [READ_PROFILE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            profiles: data,
        }),
        [READ_PROFILE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload.message,
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
