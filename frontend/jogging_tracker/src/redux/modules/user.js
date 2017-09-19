import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import { reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER = 'GET_USER'
export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// ------------------------------------
// Actions
// ------------------------------------

export const getUser = createAction(GET_USER)
export const getUsers = createAction(GET_USERS)
export const createUser = createAction(CREATE_USER)
export const updateUser = createAction(UPDATE_USER)
export const deleteUser = createAction(DELETE_USER)

const initialState = {
  user: null,
  status: 'INIT',
  users: {
    results: []
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USER),
    user: payload,
    error: null
  }),

  [requestFail(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USER),
    error: payload
  }),

  [requestSuccess(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USERS),
    users: payload,
    error: null
  }),

  [requestFail(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USERS),
    error: payload
  }),

  [requestSuccess(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_USER),
    user: payload,
    error: null
  }),

  [requestFail(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_USER),
    error: payload
  }),

  [requestSuccess(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_USER),
    user: payload,
    error: null
  }),

  [requestFail(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_USER),
    error: payload
  }),

  [requestSuccess(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_USER),
    users: {
      ...state.users,
      results: reject(state.users.results, { id: payload.id })
    },
    error: null
  }),

  [requestFail(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_USER),
    error: payload
  }),

}, initialState)
