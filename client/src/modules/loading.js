import { createAction, handleActions } from 'redux-actions';

// 비동기 동작 시, 특정 UI를 표기하기 위한 Redux action, action function, reducer
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (reqType) => reqType);

export const finishLoading = createAction(FINISH_LOADING, (reqType) => reqType);

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);

export default loading; // 리듀서 export
