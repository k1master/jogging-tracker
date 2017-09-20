import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, FormGroup, Input, Label, Modal, ModalHeader, ModalBody,
  ModalFooter } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import { distanceUnit } from 'helpers'
import { getReport } from 'redux/modules/user'
import { reportSelector } from 'redux/selectors'

class ReportModal extends React.Component {
  static propTypes = {
    hide: PropTypes.func,
    report: PropTypes.object,
    show: PropTypes.bool,
    user: PropTypes.object
  };

  componentWillMount () {
    this.loadReport(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.user.id !== nextProps.user.id) {
      this.loadReport(nextProps)
    }
  }

  loadReport (props) {
    const { getReport, user } = props
    user && getReport({ id: user.id })
  }

  render() {
    const { show, handleHide, report, user } = this.props

    return (
      <Modal isOpen={show} toggle={handleHide}>
        <ModalHeader toggle={this.toggle}>User Records Report</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={4}>Name</Label>
            <Col sm={8}>
              <Input static>
                {user && user.first_name} {user && user.last_name}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={4}>Avg. Speed</Label>
            <Col sm={8}>
              <Input static>
                {report && distanceUnit(report.avg_speed, '/s')}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={4}>Distance/week</Label>
            <Col sm={8}>
              <Input static>
                {report && distanceUnit(report.distance_per_week)}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const selector = createStructuredSelector({
  report: reportSelector
})

const actions = {
  getReport
}

export default compose(
  connectModal({ name: 'reportModal', destroyOnHide: false }),
  connect(selector, actions)
)(ReportModal)
