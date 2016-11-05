import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import history from '../store/history';

import 'whatwg-fetch';

export function ftpConnexion(ftpInfo) {

  return dispatch => {
    $.ajax('/ftp/connect', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(ftpInfo),
            async : true,
            success: function(data, status, xhr) {
                if(data.status == 400) {
                    dispatch({
                        type : types.CONNEXION_FAIL,
                        payload: {
                          message: 'Error connecting to host',
                          hostList: data.list
                        }
                    })
                } else {
                    dispatch({
                        type : types.CONNEXION_SUCCESS,
                        payload: {
                          message: 'Connection established',
                          hostList: data.list
                        }

                    })
                }
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
    });
  }
}
