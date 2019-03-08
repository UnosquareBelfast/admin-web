import React from 'react';
import { PropTypes as PT } from 'prop-types';
import eventTypes, { typeText } from '../../constants/eventTypes';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      modalVisible: PT.bool.isRequired,
      toggleModal: PT.func.isRequired,
      selectedBooking: PT.object.isRequired,
      refreshCalendar: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = { 
        messagingViewVisible: false,
        eventTypes: [
          {
            value: eventTypes.ANNUAL_LEAVE.toString(),
            displayValue: typeText[eventTypes.ANNUAL_LEAVE],
          },
          {
            value: eventTypes.WFH.toString(),
            displayValue: typeText[eventTypes.WFH],
          },
        ], 
      };
    }

    toggleMessagingView = isVisible => {
      this.setState({ messagingViewVisible: isVisible });
    };

    render() {
      const {
        modalVisible,
        toggleModal,
        selectedBooking,
        refreshCalendar,
      } = this.props;

      const { messagingViewVisible, eventTypes } = this.state;

      return (
        <Wrapped
          modalVisible={modalVisible}
          toggleModal={toggleModal}
          selectedBooking={selectedBooking}
          refreshCalendar={refreshCalendar}
          messagingViewVisible={messagingViewVisible}
          toggleMessagingView={this.toggleMessagingView}
          eventTypes={eventTypes}
        />
      );
    }
  };

export default Container;
