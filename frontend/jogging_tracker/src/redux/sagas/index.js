import auth from './auth'
import tracking from './tracking'
import user from './user'

export default function* rootSaga () {
  yield [
    auth(),
    tracking(),
    user()
  ]
}
