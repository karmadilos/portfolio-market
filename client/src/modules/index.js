import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import education from './education';
import awards from './awards';
import project from './project';

const rootReducer = combineReducers({
    auth,
    loading,
    education,
    awards,
    project,
});

export default rootReducer;
