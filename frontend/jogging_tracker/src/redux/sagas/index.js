import auth from './auth'
import user from './user'

export default function* rootSaga () {
  yield [
    auth(),
    user()
  ]
}
