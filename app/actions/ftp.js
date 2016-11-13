import * as types from '../constants/ActionTypes'
import $ from 'jquery'
import history from '../store/history'
import { regex } from '../helper/regex'
import 'whatwg-fetch'


function executePostActionToFtp(ftpInfo, url) {
  return dispatch => {
    let objToDispatch
    $.ajax(url, {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(ftpInfo),
            async : true,
            success: (data, status, xhr) => {
                if(data.status == 400) {
                  objToDispatch = {
                    type : types.CONNEXION_FAIL,
                    payload: {
                      message: data.message,
                      hostList: data.list,
                      connexion: false,
                      root: '',
                    }
                  }

                } else {
                  const type     = (data.root === '/') ? types.LIST_INIT_ROOT : types.LIST_NO_INIT_ROOT
                  const hostList = data.list.map( list =>
                    Object.assign(
                      {},
                      list,
                      { root: data.root === '/' ? data.root + list.name : data.root + '/' +list.name }
                    ))
                  objToDispatch = {
                    type : type,
                    payload: {
                      message: data.message,
                      hostList: hostList,
                      connexion: true,
                      root: data.root,
                    }
                  }
                }

                dispatch(objToDispatch)
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
    })
  }
}


export const ftpListDir = (ftpInfo) => {
  return executePostActionToFtp(ftpInfo, '/ftp/connect')
}

export const createFtp = (ftpInfo) => {
  return dispatch => {
      let objToDispatch
      $.ajax('/ftp/create', {
              type: "POST",
              contentType: "application/json; charset=utf-8",
              data : JSON.stringify(ftpInfo),
              async : true,
              success: (data, status, xhr) => {
                  if(data.status == 400) {
                    objToDispatch = {
                      type : types.CONNEXION_FAIL,
                      payload: {
                        message: data.message,
                        connexion: false,
                        root: '',
                      }
                    }
                  } else {
                    objToDispatch = {
                      type : types.CREATE_SUCCESS,
                      payload: {
                        message: data.message,
                        connexion: true,
                        root: data.root,
                      }
                    }
                  }
                  dispatch(objToDispatch)
              },
              xhrFields: {
                  withCredentials: true
              },
              crossDomain: true
      })
    }

}

export const removeFtp = (ftpInfo) => {
    return dispatch => {
        let objToDispatch
        $.ajax('/ftp/delete', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(ftpInfo),
            async : true,
            success: (data, status, xhr) => {
                if(data.status == 400) {
                    objToDispatch = {
                        type : types.CONNEXION_FAIL,
                        payload: {
                            message: data.message,
                            connexion: false,
                            root: '',
                        }
                    }
                } else {
                    objToDispatch = {
                        type : types.DELETE_SUCCESS,
                        payload: {
                            message: data.message,
                            connexion: true,
                            root: data.root,
                        }
                    }
                }
                dispatch(objToDispatch)
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        })
    }
}

export const moveFtp = (ftpInfo) => {
    return dispatch => {
        let objToDispatch
        $.ajax('/ftp/move', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(ftpInfo),
            async : true,
            success: (data, status, xhr) => {
                if(data.status == 400) {
                    objToDispatch = {
                        type : types.CONNEXION_FAIL,
                        payload: {
                            message: data.message,
                            connexion: false,
                            root: '',
                        }
                    }
                } else {
                    objToDispatch = {
                        type : types.MOVE_SUCCESS,
                        payload: {
                            message: data.message,
                            connexion: true,
                            root: data.root,
                        }
                    }
                }
                dispatch(objToDispatch)
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        })
    }
}
