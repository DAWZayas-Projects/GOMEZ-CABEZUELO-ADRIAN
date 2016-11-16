import { combineReducers } from 'redux';
import user from './user';
import ftp from './ftp';

const rootReducer = combineReducers({
     user,
     ftp,
})

export default rootReducer
