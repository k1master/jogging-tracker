import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, FormFeedback, FormGroup, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { isFieldRequired } from 'helpers'
import { login, DO_LOGIN } from 'redux/modules/auth'
import { requestFail, requestSuccess } from 'redux/api/request'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <FormGroup color={touched && error ? 'danger' : ''}>
    <Label>
      {label}
    </Label>
    <input {...input} placeholder={label} type={type} className='form-control' />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
)

class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func
  };

  componentDidUpdate (prevProps) {
    const { auth, history } = this.props
    if (auth.status === requestSuccess(DO_LOGIN)) {
      history.push('/dashboard')
    }
  }

  handleLogin = (values) => {
    const { login } = this.props
    login(values)
  }

  render() {
    const { auth, handleSubmit } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {auth.status === requestFail(DO_LOGIN) &&
            <Alert color="danger">Invalid email or password!</Alert>
          }
          <h2 className='text-center'>Login</h2>
          <Form onSubmit={handleSubmit(this.handleLogin)}>
            <Field
              label='Email'
              name='email'
              type='email'
              validate={[isFieldRequired]}
              component={renderField}
            />
            <Field
              label='Password'
              name='password'
              type='password'
              validate={[isFieldRequired]}
              component={renderField}
            />
            <Button color='primary' type='submit'>Login</Button>
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
  login
}

export default compose(
  reduxForm({
    form: 'loginForm'
  }),
  withRouter,
  connect(selector, actions)
)(Login)
