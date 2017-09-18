import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_LOGOUT, DO_SIGNUP, GET_PROFILE } from 'redux/modules/auth'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    localStorage.setItem('jogging_tracker_auth', JSON.stringify(res.data))
  }
})

const doLogout = apiCall({
  type: DO_LOGOUT,
  method: 'post',
  path: () => '/auth/logout/',
  success: () => {
    localStorage.removeItem('jogging_tracker_auth')
  },
  fail: () => {
    localStorage.removeItem('jogging_tracker_auth')
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/register/',
  success: () => {
    localStorage.removeItem('jogging_tracker_auth')
  },
  fail: () => {
    localStorage.removeItem('jogging_tracker_auth')
  }
})

const doGetProfile = apiCall({
  type: GET_PROFILE,
  method: 'get',
  path: () => '/users/profile/'
})

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_LOGOUT, doLogout)
  yield takeLatest(DO_SIGNUP, doSignup)
  yield takeLatest(GET_PROFILE, doGetProfile)
}
