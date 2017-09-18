import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { signup, DO_SIGNUP } from 'redux/modules/auth'
import { requestFail, requestSuccess } from 'redux/api/request'
import { isFieldRequired, ucFirst } from 'helpers'
import InputField from 'components/InputField'

const roleOptions = [
  {
    value: 'user',
    label: 'User'
  },
  {
    value: 'manager',
    label: 'Manager'
  },
  {
    value: 'admin',
    label: 'Admin'
  }
]

class Signup extends Component {
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    signup: PropTypes.func
  };

  componentWillReceiveProps (nextProps) {
    const { history } = this.props
    if (nextProps.auth.status === requestSuccess(DO_SIGNUP) && nextProps !== this.props) {
      history.push('/login')
    }
  }

  handleSignup = (values) => {
    const { signup } = this.props
    signup(values)
  }
  
  get errorText () {
    const { auth: { error } } = this.props
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : ''
  }

  render() {
    const { auth, handleSubmit } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {auth.status === requestFail(DO_SIGNUP) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          <h2 className='text-center'>New User Signup</h2>
          <Form onSubmit={handleSubmit(this.handleSignup)}>
            <Row>
              <Col sm={6} xs={12}>
                <Field
                  label='First Name'
                  name='first_name'
                  type='text'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
              <Col sm={6} xs={12}>
                <Field
                  label='Last Name'
                  name='last_name'
                  type='text'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>    
                <Field
                  label='Email'
                  name='email'
                  type='email'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={6} xs={12}>
                <Field
                  label='Password'
                  name='password'
                  type='password'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
              <Col sm={6} xs={12}>
                <Field
                  label='Confirm Password'
                  name='confirm_password'
                  type='password'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Button color='primary' type='submit'>Signup</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = (state) => ({
  auth: state.auth
})

const actions = {
  signup
}

const validate = values => {
  const errors = {}
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirm Password should match with Password field.'
  }
  return errors
}

export default compose(
  reduxForm({
    form: 'signupForm',
    validate
  }),
  withRouter,
  connect(selector, actions)
)(Signup)
