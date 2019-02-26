import React, { Component } from 'react';
import { getAllEvents } from '../../services/eventService';

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
      getAllEvents().then( ({data: allHolidays}) => {

        // sort holidays by start date
        allHolidays.sort( (a, b) => {
          let dateOne = a.eventDates[0].startDate;
          let dateTwo = b.eventDates[0].startDate;
          return new Date(dateOne) - new Date(dateTwo);
        });

        // split up pending holdays from all holidays 
        let pendingHolidays = [];
        let nonPendingHolidays = [];
        allHolidays.map((holiday) => {
          if ( holiday.eventStatus.eventStatusId === 1 ) {
            pendingHolidays.push(holiday);
          } else {
            nonPendingHolidays.push(holiday);
          }
        });

        // add pending holidays to start of array, order by date
        const holidays = [...pendingHolidays, ...nonPendingHolidays];

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
          {...this.props}
          holidays={this.state.holidays}
          selectedHoliday={this.state.selectedHoliday}
          selectHoliday={this.selectHoliday}
          closeModal={this.closeModal}
        />
      );
    }
  };
