import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import history from '../store/history';

import 'whatwg-fetch';

export function checkAuth() {
    return dispatch => {
        fetch('/auth/status',  {
                credentials: 'same-origin'
            })
            .then( tresponse => {
                return tresponse.json()
            })
            .then( tjson => {
                if(tjson.isLogin == false) {
                  dispatch({
                      type : types.AUTH_FAILED,
                      payload: {},
                  })
                  history.push('/signin')
                }else {
                  dispatch({
                      type : types.AUTH_SUCCESS,
                      payload: tjson.user,
                  })
                }
            })
    }
}

export function logOut() {
  return dispatch => {
    fetch('/auth/logout', {
      credentials: 'same-origin'
    })
    .then( _ => {
      dispatch({
        type : types.LOG_OUT,
        payload: {},
      })
      history.push('/signin')
    })
  }
}

export function authUser(authinfo) {
    return dispatch => {
        $.ajax('/auth/login', {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(authinfo),
                async : true,
                success: function(data, status, xhr) {
                    if(data.status == 400) {
                        alert('Login errro, username/password bad credentials')
                        dispatch({
                            type : types.AUTH_FAILED,
                            payload: {},
                        })
                    } else {
                        dispatch({
                            type : types.AUTH_SUCCESS,
                            payload: data.user,
                        })
                        history.push('/main')
                    }
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
        });
    }
}

export function registerUser(data) {
  return dispatch => {
    $.ajax('/auth/register', {
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      async: true,
      success: function(data, status, xhr) {
        if(data.status == 400) {
            alert('Login errro, no valid ...')
            dispatch({
                type : types.AUTH_FAILED,
                payload: {},
            })
        } else {
            dispatch({
                type : types.AUTH_SUCCESS,
                payload: data,
            })
            history.push('/main')
        }
      }
    })
  }
}
