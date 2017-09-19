import { takeLatest } from 'redux-saga/effects'
import { GET_USER, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER }
  from 'redux/modules/user'
import apiCall from '../api/apiCall'

const doGetUser = apiCall({
  type: GET_USER,
  method: 'get',
  path: ({ payload }) => `/users/${payload.id}/`
})

const doGetUsers = apiCall({
  type: GET_USERS,
  method: 'get',
  path: () => `/users/`
})

const doCreateUser = apiCall({
  type: CREATE_USER,
  method: 'post',
  path: () => `/users/`
})

const doUpdateUser = apiCall({
  type: UPDATE_USER,
  method: 'put',
  path: ({ payload }) => `/users/${payload.id}/`
})

const doDeleteUser = apiCall({
  type: DELETE_USER,
  method: 'delete',
  path: ({ payload }) => `/users/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_USER, doGetUser)
  yield takeLatest(GET_USERS, doGetUsers)
  yield takeLatest(CREATE_USER, doCreateUser)
  yield takeLatest(UPDATE_USER, doUpdateUser)
  yield takeLatest(DELETE_USER, doDeleteUser)
}
