import { combineReducers } from 'redux';
import user from './user';
import ftp from './ftp';
import main from './main';

const rootReducer = combineReducers({
     user,
     ftp,
     main,
})

export default rootReducer
