import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Dashboard from './Dashboard'
import Login from './Login'

export default (props) => (
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/login' component={Login} />
    </div>
  </Router>
)
