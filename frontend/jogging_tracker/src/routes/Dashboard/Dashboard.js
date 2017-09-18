import React from 'react'
import { Col, Jumbotron, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { canManageUsers } from 'helpers'
import './Dashboard.scss'

const Dashboard = ({ profile }) => (
  <Row>
    <Col xs={12} md={{ size: 8, offset: 2 }}>
      <Jumbotron>
        <h1 className="display-3">Welcome, {profile.first_name}!</h1>
        <p className="lead">
          Thanks for using Jogging Tracker. <br />
          Please use the following navigations to use this app.
        </p>
        <ListGroup>
          {canManageUsers(profile) &&
            <ListGroupItem><Link to='/users'>Manage Users</Link></ListGroupItem>
          }
          <ListGroupItem><Link to='/records'>Manage Jogging track records</Link></ListGroupItem>
        </ListGroup>
      </Jumbotron>
    </Col>
  </Row>
)

const selector = (state) => ({
  profile: state.auth && state.auth.me ? state.auth.me : {}
})

export default connect(selector)(Dashboard)
