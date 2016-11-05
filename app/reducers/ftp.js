import * as types from '../constants/ActionTypes';

function concatSubDirInRootDir(state, infoHost) {
  return
}

const ftp = (state = {}, action) => {
  switch (action.type) {
    case types.LIST_INIT_ROOT || types.CONNEXION_FAIL:
      return Object.assign({}, state, action.payload)
    case types.LIST_NO_INIT_ROOT:
      return concatSubDirInRootDir(state, action.payload)
    default:
      return state
  }
}

export default ftp
