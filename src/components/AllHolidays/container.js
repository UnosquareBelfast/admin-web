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
      getAllEvents().then(response => {
        const holidays = response.data;
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
