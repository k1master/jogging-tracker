import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import moment from 'moment'
import { createRecord, getRecord, updateRecord, UPDATE_RECORD } from 'redux/modules/tracking'
import { getUsers } from 'redux/modules/user'
import { requestFail, requestSuccess } from 'redux/api/request'
import { isFieldRequired, ucFirst } from 'helpers'
import { isUser } from 'helpers/roleHelpers'
import InputField from 'components/InputField'
import InputGroupField from 'components/InputGroupField'
import DateTimeField from 'components/DateTimeField'

const getUserOptions = (userList) => {
  const userOptions = (userList ? userList.map((user, index) => ({
    label: user.first_name + ' ' + user.last_name,
    value: user.id
  })) : [])
  userOptions.unshift({
    label: '- Select User -',
    value: null
  })
  return userOptions
}

class RecordEdit extends Component {
  static propTypes = {
    createRecord: PropTypes.func,
    getRecord: PropTypes.func,
    getUsers: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    trackingState: PropTypes.object,
    updateRecord: PropTypes.func,
    usersList: PropTypes.array
  };

  componentWillMount () {
    const { getRecord, getUsers, match: { params }, profile } = this.props
    params.id && getRecord({ id: params.id })
    !isUser(profile) && getUsers()
  }

  handleSave = (values) => {
    const { createRecord, updateRecord, match: { params }, history, profile } = this.props
    const finalValues = {
      ...values,
      date_recorded: moment(values.date_recorded).format('YYYY-MM-DD'),
      user: isUser(profile) ? profile.id : values.user
    }

    params.id
    ? updateRecord({
      id: params.id,
      body: finalValues
    })
    : createRecord({
      body: finalValues,
      success: () => history.push('/records')
    })
  }

  get errorText () {
    const { trackingState: { error } } = this.props
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : ''
  }

  render() {
    const { trackingState, handleSubmit, match: { params }, profile,
      usersList } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {trackingState.status === requestFail(UPDATE_RECORD) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          {trackingState.status === requestSuccess(UPDATE_RECORD) &&
            <Alert color='success'>Updated successfully!</Alert>
          }
          <h2 className='text-center'>
            {params.id ? 'Edit Jogging Record' : 'Add New Jogging Record'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='Date'
              name='date_recorded'
              type='text'
              required
              placeholder='YYYY-MM-DD'
              dateFormat='YYYY-MM-DD'
              timeFormat={false}
              validate={[isFieldRequired]}
              component={DateTimeField}
            />
            <Field
              label='Duration'
              name='duration'
              type='number'
              required
              validate={[isFieldRequired]}
              suffix='seconds'
              component={InputGroupField}
            />
            <Field
              label='Distance'
              name='distance'
              type='number'
              required
              validate={[isFieldRequired]}
              suffix='meters'
              component={InputGroupField}
            />
            {!isUser(profile) && <Field
              label='User'
              name='user'
              type='select'
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={getUserOptions(usersList)}
            />}
            <Row>
              <Col xs={6}>
                <Link to='/records' className='btn btn-secondary'>
                  Cancel
                </Link>
              </Col>
              <Col className='text-right'>
                <Button color='primary' type='submit'>Save</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = ({ auth, tracking, user }, props) => ({
  profile: auth.me,
  initialValues: props.match.params.id && tracking.record ? {
    ...tracking.record,
    user: tracking.record.user
  } : {},
  trackingState: tracking,
  usersList: user.users.results
})

const actions = {
  createRecord,
  getRecord,
  updateRecord,
  getUsers
}

const validate = values => {
  const errors = {}
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirm Password should match with Password field.'
  }
  return errors
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'recordForm',
    enableReinitialize: true,
    validate
  }),
  withRouter
)(RecordEdit)
