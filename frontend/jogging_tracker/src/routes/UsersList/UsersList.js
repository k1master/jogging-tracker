import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUsers, deleteUser } from 'redux/modules/user'
import { ucFirst } from 'helpers'
import MdPersonAdd from 'react-icons/lib/md/person-add'

class UsersList extends Component {
  static propTypes = {
    deleteUser: PropTypes.func,
    getUsers: PropTypes.func,
    users: PropTypes.object,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getUsers } = this.props
    getUsers()
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    deleteUser({ id })
  }
  render() {
    const { users } = this.props
    const usersList = users && users.results

    return (
      <div>
        <h2 className='text-center'>Users</h2>
        <div className='text-right'>
          <Link to='/users/new' className='btn btn-link'>
            <MdPersonAdd size='1.5em' /> Add a new user
          </Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{ucFirst(user.role)}</td>
                <td>
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

const selector = (state) => ({
  users: state.user.users
})

const actions = {
  getUsers,
  deleteUser
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)
