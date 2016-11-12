'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAuth = checkAuth;
exports.logOut = logOut;
exports.authUser = authUser;
exports.registerUser = registerUser;

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _history = require('../store/history');

var _history2 = _interopRequireDefault(_history);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function checkAuth() {
    return function (dispatch) {
        fetch('/auth/status', {
            credentials: 'same-origin'
        }).then(function (tresponse) {
            return tresponse.json();
        }).then(function (tjson) {
            if (tjson.isLogin == false) {
                dispatch({
                    type: types.AUTH_FAILED,
                    payload: {}
                });
                _history2.default.push('/signin');
            } else {
                dispatch({
                    type: types.AUTH_SUCCESS,
                    payload: tjson.user
                });
            }
        });
    };
}

function logOut() {
    return function (dispatch) {
        fetch('/auth/logout', {
            credentials: 'same-origin'
        }).then(function (_) {
            dispatch({
                type: types.LOG_OUT,
                payload: {}
            });
            _history2.default.push('/signin');
        });
    };
}

function authUser(authinfo) {
    return function (dispatch) {
        _jquery2.default.ajax('/auth/login', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(authinfo),
            async: true,
            success: function success(data, status, xhr) {
                if (data.status == 400) {
                    alert('Login errro, username/password bad credentials');
                    dispatch({
                        type: types.AUTH_FAILED,
                        payload: {}
                    });
                } else {
                    dispatch({
                        type: types.AUTH_SUCCESS,
                        payload: data.user
                    });
                    _history2.default.push('/main');
                }
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        });
    };
}

function registerUser(data) {
    return function (dispatch) {
        _jquery2.default.ajax('/auth/register', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            async: true,
            success: function success(data, status, xhr) {
                if (data.status == 400) {
                    alert('Login errro, no valid ...');
                    dispatch({
                        type: types.AUTH_FAILED,
                        payload: {}
                    });
                } else {
                    dispatch({
                        type: types.AUTH_SUCCESS,
                        payload: data
                    });
                    _history2.default.push('/main');
                }
            }
        });
    };
}

//# sourceMappingURL=authed-compiled.js.map