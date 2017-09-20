import { get } from 'lodash'

export const authStateSelector = (state) =>
  get(state, 'auth')

export const profileSelector = (state) =>
  get(state, 'auth.me', null)

export const userDetailSelector = (state) =>
  get(state, 'user.user', {})

export const usersListSelector = (state) =>
  get(state, 'user.users.results', [])

export const recordDetailSelector = (state) =>
  get(state, 'tracking.record', {})

export const recordsListSelector = (state) =>
  get(state, 'tracking.records.results', [])

export const trackingStateSelector = (state) =>
  get(state, 'tracking', {})

export const userStateSelector = (state) =>
  get(state, 'user', {})
