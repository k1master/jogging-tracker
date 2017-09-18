import axios from 'axios'

axios.defaults.baseURL = process.env.API_ROOT + '/'

export default (method) => {
  const auth = localStorage.getItem('jogging_tracker_auth')
  if (auth) {
    const token = JSON.parse(auth).token
    Object.assign(axios.defaults, {
      headers: {
        'Authorization': 'JWT ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
  return axios[method]
}
