import * as types from '../constants/ActionTypes';

const ftp = (state = {}, action) => {
  debugger
  switch (action.type) {
    case types.CONNEXION_SUCCESS || types.CONNEXION_FAIL:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default ftp
