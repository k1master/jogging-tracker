import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Dashboard from './Dashboard'
import Header from 'containers/Header'
import Login from './Login'
import Profile from './Profile'
import Signup from './Signup'
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
        <Route path='/profile' component={userIsAuthenticatedRedir(Profile)} />
      </Container>
    </div>
  </Router>
)

const selector = (state) => ({
  isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)
