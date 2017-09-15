import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const GET_PROFILE = 'GET_PROFILE'

// ------------------------------------
// Actions
// ------------------------------------

export const login = createAction(DO_LOGIN)
export const logout = createAction(DO_LOGOUT)
export const getProfile = createAction(GET_PROFILE)

const initialState = {
  token: null,
  me: null,
  status: 'INIT'
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
    me: null
  }),

  [requestSuccess(DO_LOGOUT)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestSuccess(DO_LOGOUT),
    me: null
  }),

  [requestFail(DO_LOGOUT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DO_LOGOUT),
  })
}, initialState)
