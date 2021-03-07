// [Reference] https://react.vlpt.us/redux-middleware/05-redux-thunk-with-promise.html

import { handleActions } from 'redux-actions';
export const getAction = (name, type) => [
    `${name}/${type}`,
    `${name}/${type}_SUCCESS`,
    `${name}/${type}_FAILURE`,
];
// Promise에 기반한 Thunk를 만들어주는 함수입니다.
// eslint-disable-next-line no-unused-vars
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];

    // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
    // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
    // 예: writeComment({ postId: 1, text: '댓글 내용' });
    return (param) => async (dispatch) => {
        // 요청 시작
        console.log(param);
        dispatch({ type, param });
        try {
            // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
            const payload = await promiseCreator(param);
            console.log(payload.data, SUCCESS);
            dispatch({ type: SUCCESS, payload }); // 성공
        } catch (e) {
            console.log(e.response);
            dispatch({ type: FAILURE, payload: e, error: true }); // 실패
        }
    };
};

// 리듀서에서 사용 할 수 있는 여러 유틸 함수들입니다.
export const reducerUtils = {
    // 초기 상태. 초기 data 값은 기본적으로 null 이지만
    // 바꿀 수도 있습니다.
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null,
    }),
    // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
    // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있습니다.
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    // 성공 상태
    success: (payload) => ({
        loading: false,
        data: payload,
        error: null,
    }),
    // 실패 상태
    error: (error) => ({
        loading: false,
        data: null,
        error: error,
    }),
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key, initialState) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    const reducer = handleActions(
        {
            [type]: (state) => ({
                ...state,
                [key]: reducerUtils.loading(),
            }),
            [SUCCESS]: (state, action) => ({
                ...state,
                [key]: reducerUtils.success(action.payload),
            }),
            [ERROR]: (state, action) => ({
                ...state,
                [key]: reducerUtils.error(action.payload),
            }),
        },
        initialState,
    );
    return reducer;
};
