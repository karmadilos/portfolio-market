import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import education from './education';
import awards from './awards';
import project from './project';
import certificate from './certificate';
import profile from './profile';

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
