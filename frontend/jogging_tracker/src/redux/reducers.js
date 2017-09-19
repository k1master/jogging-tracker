import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './modules/auth'
import tracking from './modules/tracking'
import user from './modules/user'

export default combineReducers({
  auth,
  form,
  tracking,
  user
})
