import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import App from './App'
import Dashboard from './Dashboard'
import Login from './Login'
import Header from 'containers/Header'

export default (props) => (
  <Router>
    <div>
      <Header />
      <Container className='main-content'>
        <Route exact path='/' component={App} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Container>
    </div>
  </Router>
)
