import React, { Component } from 'react';
import { getEventsByStatus } from '../../services/eventService';
import holidayStatus from '../../utilities/holidayStatus';
import eventTypes from '../../utilities/eventTypes';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { pendingHolidays: [], selectedHoliday: {} };
    }

    componentDidMount() {
      this.getPendingHolidays();
    }

    getPendingHolidays = () => {
      getEventsByStatus(holidayStatus.PENDING, eventTypes.ANNUAL_LEAVE).then(
        response => {
          this.setState({ pendingHolidays: response.data });
        }
      );
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
      this.getPendingHolidays();
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          selectHoliday={this.selectHoliday}
          closeModal={this.closeModal}
        />
      );
    }
  };
