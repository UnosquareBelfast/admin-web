import React, { Component } from 'react';
import { getAllEvents } from '../../services/eventService';
import { sortHolidayOrderByStatus } from '../../utilities/holidayOrdering';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { holidays: [], selectedHoliday: {} };
    }

    componentDidMount() {
      this.getHolidays();
    }

    getHolidays = () => {
      getAllEvents().then( ({data}) => {

        // add holidays in order of pending, approved, rejected, approved
        const holidays = sortHolidayOrderByStatus(data);

        // update the holidays state
        this.setState({ holidays });

      });
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
      this.getHolidays();
    };

    render() {
      return (
        <Wrapped
          holidays={this.state.holidays}
          selectedHoliday={this.state.selectedHoliday}
          selectHoliday={this.selectHoliday}
          closeModal={this.closeModal}
        />
      );
    }
  };
