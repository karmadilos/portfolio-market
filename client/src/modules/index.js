import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import education from './education';
import awards from './awards';
import project from './project';
import certificate from './certificate';
import profile from './profile';

// index Reducer => 작성한 모든 reducer를 하나로 묶어서
// 하나의 스토어에의 rootReducer로 관리한다.
const rootReducer = combineReducers({
    auth,
    loading,
    education,
    awards,
    project,
    certificate,
    profile,
});

export default rootReducer;
