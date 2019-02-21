import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { requestEvent } from '../../../services/eventService';
import { Toast } from '../../../config/Notifications';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      start: PT.object.isRequired,
      end: PT.object.isRequired,
      refreshCalendar: PT.func.isRequired,
      toggleModal: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleFormSubmit = data => {
      const dateFormat = 'YYYY-MM-DD';
      const { refreshCalendar, toggleModal } = this.props;

      const request = {
        startDate: data.startDate.format(dateFormat),
        endDate: data.endDate.format(dateFormat),
        isHalfDay: data.halfDay,
        eventTypeId: data.eventTypeId,
      };

      requestEvent(request)
        .then(() => {
          refreshCalendar();
          toggleModal(false);
        })
        .catch(() => {
          Toast({
            type: 'error',
            title: 'Error creating holiday',
          });
        });
    };

    render() {
      const { start, end } = this.props;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          start={start}
          end={end}
        />
      );
    }
  };

export default Container;
