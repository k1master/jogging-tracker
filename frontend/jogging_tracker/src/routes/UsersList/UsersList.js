import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getUsers, deleteUser } from 'redux/modules/user'
import { ucFirst } from 'helpers'
import MdPersonAdd from 'react-icons/lib/md/person-add'
import { usersListSelector } from 'redux/selectors'
import confirm from 'containers/ConfirmModal'

class UsersList extends Component {
  static propTypes = {
    deleteUser: PropTypes.func,
    getUsers: PropTypes.func,
    usersList: PropTypes.object,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getUsers } = this.props
    getUsers()
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    confirm('Are you sure to delete the user?').then(
      () => {
        deleteUser({ id })
      }
    )
  }

  render() {
    const { usersList } = this.props

    return (
      <div>
        <h2 className='text-center mb-5'>Manage Users</h2>
        <div className='text-right mb-2'>
          <Link to='/users/new' className='btn btn-primary'>
            <MdPersonAdd size='1.2em' /> Add a New User
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{ucFirst(user.role)}</td>
                <td className='text-right'>
                  <Link className='btn btn-primary btn-sm' to={`/users/edit/${user.id}`}>
                    Edit
                  </Link>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  usersList: usersListSelector
})

const actions = {
  getUsers,
  deleteUser
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)
