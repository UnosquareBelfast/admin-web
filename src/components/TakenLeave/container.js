import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getEvents } from '../../services/eventService';
import eventTypes from '../../utilities/eventTypes';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: [],
      };
    }

    componentDidMount() {
      getEvents(this.props.user.user.sub, eventTypes.ANNUAL_LEAVE)
        .then(response => {
          const pastHolidays = response.data.filter(hol => {
            return this.isDateInThePast(hol.date);
          });
          this.setState({ takenHolidays: pastHolidays });
        })
        .catch(error => {
          Swal({
            title: 'Could not get taken holidays',
            text: error.message,
            type: 'error',
          });
        });
    }

    isDateInThePast(date) {
      return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <Wrapped takenHolidays={this.state.takenHolidays} {...this.props} />
      );
    }
  };
