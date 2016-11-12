import * as types from '../constants/ActionTypes';

function concatSubDirInRootDir(state, infoHost) {
  const reg = new RegExp('[\.a-zA-Z1-9]+',  'g')
  const arrMatch = infoHost.root.match(reg)
  const hostListCopy = state.hostList
  const newHostList = insertSubDirectoriesIntoCorrespondDirectory(hostListCopy, arrMatch, infoHost.hostList)
  return Object.assign({}, state, {hostList: newHostList})
}


function insertSubDirectoriesIntoCorrespondDirectory(arrList, arrMatch, arrNewList) {
  return arrList.map( list => {
    if(list.name === arrMatch[0] && list.subDir)
      insertSubDirectoriesIntoCorrespondDirectory(list.subDir, arrMatch.slice(1, arrMatch.length), arrNewList)

    if(list.name === arrMatch[0] && arrMatch.length === 1) list.subDir = arrNewList

    return list
  })
}

const ftp = (state = {}, action) => {
  switch (action.type) {
    case types.LIST_INIT_ROOT || types.CONNEXION_FAIL:
      return Object.assign({}, state, action.payload)
    case types.LIST_NO_INIT_ROOT:
      return concatSubDirInRootDir(state, action.payload)
    case types.CREATE_SUCCESS:
      return state
    case types.DELETE_SUCCESS:
      return state
    default:
      return state
  }
}

export default ftp
