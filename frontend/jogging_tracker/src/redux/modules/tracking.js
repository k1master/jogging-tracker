import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import { reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_RECORD = 'GET_RECORD'
export const GET_RECORDS = 'GET_RECORDS'
export const CREATE_RECORD = 'CREATE_RECORD'
export const UPDATE_RECORD = 'UPDATE_RECORD'
export const DELETE_RECORD = 'DELETE_RECORD'

// ------------------------------------
// Actions
// ------------------------------------

export const getRecord = createAction(GET_RECORD)
export const getRecords = createAction(GET_RECORDS)
export const createRecord = createAction(CREATE_RECORD)
export const updateRecord = createAction(UPDATE_RECORD)
export const deleteRecord = createAction(DELETE_RECORD)

const initialState = {
  record: null,
  status: 'INIT',
  records: {
    results: []
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(GET_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(GET_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_RECORD),
    error: payload
  }),

  [requestSuccess(GET_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_RECORDS),
    records: payload,
    error: null
  }),

  [requestFail(GET_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_RECORDS),
    error: payload
  }),

  [requestSuccess(CREATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(CREATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_RECORD),
    error: payload
  }),

  [requestSuccess(UPDATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(UPDATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_RECORD),
    error: payload
  }),

  [requestSuccess(DELETE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_RECORD),
    records: {
      ...state.records,
      results: reject(state.records.results, { id: payload.id })
    },
    error: null
  }),

  [requestFail(DELETE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_RECORD),
    error: payload
  }),

}, initialState)
