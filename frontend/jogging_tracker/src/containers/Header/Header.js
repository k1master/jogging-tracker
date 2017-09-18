import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap'
import { canManageUsers } from 'helpers/roleHelpers'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Jogging Tracker</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            {auth.me
            ? <Nav className="ml-auto" navbar>
              {canManageUsers(auth.me) && <NavItem>
                <Link to='/users' className='nav-link'>Users</Link>
              </NavItem>}
              <NavItem>
                <Link to='/records' className='nav-link'>Records</Link>
              </NavItem>
              <NavItem>
                <Link to='/profile' className='nav-link'>Profile</Link>
              </NavItem>
              <NavItem>
                <Link to='/logout' className='nav-link'>Logout</Link>
              </NavItem>
            </Nav>
            : <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/login' className='nav-link'>Login</Link>
              </NavItem>
              <NavItem>
                <Link to='/signup' className='nav-link'>Sign up</Link>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const selector = (state) => ({
  auth: state.auth
})

export default connect(selector)(Header)
