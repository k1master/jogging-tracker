import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const DO_SIGNUP = 'DO_SIGNUP'
export const GET_PROFILE = 'GET_PROFILE'

// ------------------------------------
// Actions
// ------------------------------------

export const login = createAction(DO_LOGIN)
export const logout = createAction(DO_LOGOUT)
export const signup = createAction(DO_SIGNUP)
export const getProfile = createAction(GET_PROFILE)

const initialState = {
  token: null,
  me: null,
  status: 'INIT',
  error: null
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_LOGIN),
    me: payload.info
  }),

  [requestFail(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGIN),
    me: null,
    error: payload
  }),

  [requestSuccess(DO_LOGOUT)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestSuccess(DO_LOGOUT),
    me: null,
    error: null
  }),

  [requestFail(DO_LOGOUT)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGOUT),
    error: payload
  }),

  [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_SIGNUP),
    me: payload.info,
    error: null
  }),

  [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNUP),
    me: null,
    error: payload
  })

}, initialState)
