import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { requestFail, requestStarted, requestSuccess } from './request'
import client from './client'

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  success,
  fail
}) => function* (action) {
  try {
    yield put({
      type: requestStarted(type)
    })

    const res = yield call(
      client[method.toLowerCase()],
      typeof path === 'function' ? path(action) : path,
      action.payload
    )

    success && success(res, action)
    yield put({
      type: requestSuccess(type),
      payload: res.data
    })
  } catch (err) {
    const errRes = get(err, 'response', err)

    fail && fail(errRes)
    yield put({
      type: requestFail(type),
      payload: errRes
    })
  }
}
