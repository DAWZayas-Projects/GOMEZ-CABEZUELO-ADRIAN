import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import history from '../store/history';

import 'whatwg-fetch';

export function ftpListDir(ftpInfo) {
  return dispatch => {
    let objToDispatch;
    $.ajax('/ftp/connect', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(ftpInfo),
            async : true,
            success: function(data, status, xhr) {
                if(data.status == 400) {
                  objToDispatch = {
                    type : types.CONNEXION_FAIL,
                    payload: {
                      message: 'Error connecting to host',
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
                      message: 'Connection success',
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
    });
  }
}
