import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

/**
 * @property token, token send by server after user login or register
 * @property userId, email send by server after user login or register
 * @property error, error message  when unable login or register
 * @property loading, when connecting to server, the loading should be true
 * @property authRedirectPath, when an unauthenticated user ordered, the app will redirect to 
 *  login page with ordered ingredients
 */
const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;