import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup'
import Header from 'containers/Header'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from 'helpers/authHelpers'
import 'styles/core.scss'

const routes = ({ isAuthenticated }) => (
  <Router>
    <div>
      <Header />
      <Container className='main-content'>
        <Route exact path='/' render={() => (
          isAuthenticated ? (
            <Redirect to="/dashboard"/>
          ) : (
            <Redirect to="/login"/>
          )
        )} />

        <Route path='/login' component={userIsNotAuthenticatedRedir(Login)} />
        <Route path='/signup' component={userIsNotAuthenticatedRedir(Signup)} />
        <Route path='/dashboard' component={userIsAuthenticatedRedir(Dashboard)} />
      </Container>
    </div>
  </Router>
)

const selector = (state) => ({
  isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)
