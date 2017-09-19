import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getRecords, deleteRecord } from 'redux/modules/tracking'
import { distanceUnit, hhmmss } from 'helpers'
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline'
import confirm from 'containers/ConfirmModal'

class RecordsList extends Component {
  static propTypes = {
    deleteRecord: PropTypes.func,
    getRecords: PropTypes.func,
    records: PropTypes.object,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getRecords } = this.props
    getRecords()
  }

  handleDeleteRecord = (id) => () => {
    const { deleteRecord } = this.props
    confirm('Are you sure to delete the record?').then(
      () => {
        deleteRecord({ id })
      }
    )
  }

  render() {
    const { records } = this.props
    const recordsList = records && records.results

    return (
      <div>
        <h2 className='text-center'>Manage Jogging Records</h2>
        <div className='text-right'>
          <Link to='/records/new' className='btn btn-link'>
            <MdAddCircleOutline size='1.5em' /> Add a new record
          </Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th className='text-center'>Duration</th>
              <th className='text-center'>Distance</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsList && recordsList.map((record, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{record.date_recorded} {record.last_name}</td>
                <td className='text-center'>{hhmmss(record.duration)}</td>
                <td className='text-center'>{distanceUnit(record.distance)}</td>
                <td className='text-right'>
                  <Link className='btn btn-primary btn-sm' to={`/records/edit/${record.id}`}>
                    Edit
                  </Link>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteRecord(record.id)}>
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
  records: state.tracking.records
})

const actions = {
  getRecords,
  deleteRecord
}

export default compose(
  connect(selector, actions),
  withRouter
)(RecordsList)
