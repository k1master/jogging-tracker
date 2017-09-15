import React from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import Routes from 'routes'
import { Container } from 'reactstrap'

export default () => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Container>
        <Routes />
      </Container>
    </div>
  </Provider>
)
