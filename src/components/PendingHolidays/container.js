import React, { Component } from 'react';
import { getEventsByStatus } from '../../services/eventService';
import holidayStatus from '../../constants/holidayStatus';
import eventTypes from '../../constants/eventTypes';
import { sortHolidaysByStartDate } from '../../utilities/holidayOrdering';

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
      getEventsByStatus(holidayStatus.PENDING, eventTypes.ANNUAL_LEAVE)
        .then( ({data: pendingHolidays}) => {

          // sort pending holidays by start date
          pendingHolidays = sortHolidaysByStartDate(pendingHolidays);

          // update the pending holidays state
          this.setState({ pendingHolidays });
          
        });
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
