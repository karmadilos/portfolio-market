import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import education from './education';

const rootReducer = combineReducers({ auth, loading, education });

export default rootReducer;
