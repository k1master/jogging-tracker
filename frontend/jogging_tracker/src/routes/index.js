import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Dashboard from './Dashboard'

export default (props) => (
  <Router>
    <div>
      <Route path='/' component={App} />
      <Route path='/dashboard' component={Dashboard} />
    </div>
  </Router>
)
