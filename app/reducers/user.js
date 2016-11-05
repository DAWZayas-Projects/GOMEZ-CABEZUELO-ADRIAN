import * as types from '../constants/ActionTypes';

function concatUserInTheState(state, user) {
  return Object.assign({}, state, user)
}

const user = (state = {}, action) => {
    switch(action.type) {
        case types.AUTH_SUCCESS || types.AUTH_FAILED || types.LOG_OUT:
            return concatUserInTheState(state, action.payload)
        default:
            return state;
    }
}

export default user;
