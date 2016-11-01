import $ from 'jquery';
import * as types from '../constants/ActionTypes';

function concatUserInTheState(state, user) {
  return Object.assign({}, state, user)
}

const user = (state = {}, action) => {
    switch(action.type) {
        case types.AUTH_SUCCESS:
            return concatUserInTheState(state, action.payload)
        case types.AUTH_FAILED:
            return concatUserInTheState(state, action.payload)
        case types.LOG_OUT:
            return concatUserInTheState(state, action.payload)
        default:
            return state;
    }
}

export default user;
