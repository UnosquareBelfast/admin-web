import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { ToggleButton } from '../../components/common';
import { InnerLayout, ButtonToggle, CalendarLayoutContainer } from './styled';
import eventsView, {
  eventsViewText,
  eventsViewIcons,
} from '../../constants/eventsView';

export const Dashboard = props => {
  const {
    allEvents,
    filteredEvents,
    refreshCalendar,
    onToggleEventsView,
    eventView,
    employeeId,
    onUpdateEvents,
    onUpdateEmployee,
    onCalendarNavigate,
    toggleBookingModal,
    bookingModalVisible,
    bookingModalDismount,
    selectCalendarSlot,
    selectedBooking,
  } = props;

  const toggleButton = {
    activeButtonText: eventsViewText[eventView],
    leftButton: {
      icon: eventsViewIcons[eventsView.PERSONAL_EVENTS],
      text: eventsViewText[eventsView.PERSONAL_EVENTS],
    },
    rightButton: {
      icon: eventsViewIcons[eventsView.TEAM_EVENTS],
      text: eventsViewText[eventsView.TEAM_EVENTS],
    },
  };

  return (
    <Fragment>
      <BookingModal
        key={bookingModalDismount}
        modalVisible={bookingModalVisible}
        toggleModal={toggleBookingModal}
        selectedBooking={selectedBooking}
        refreshCalendar={refreshCalendar}
      />
      <InnerLayout>
        <ButtonToggle>
          <ToggleButton
            leftButton={toggleButton.leftButton}
            rightButton={toggleButton.rightButton}
            activeButtonText={toggleButton.activeButtonText}
            onToggleButton={onToggleEventsView}
          />
        </ButtonToggle>
        <CalendarLayoutContainer>
          <div className="calendar">
            <BookingCalendar
              employeeId={employeeId}
              events={filteredEvents}
              onNavigate={onCalendarNavigate}
              toggleBookingModal={toggleBookingModal}
              selectCalendarSlot={selectCalendarSlot}
            />
          </div>
          <Legend
            updateCalendarEvents={onUpdateEvents}
            updateEmployee={onUpdateEmployee}
            allEvents={allEvents}
          />
        </CalendarLayoutContainer>
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  onToggleEventsView: PT.func.isRequired,
  eventView: PT.number.isRequired,
  allEvents: PT.array,
  filteredEvents: PT.array,
  refreshCalendar: PT.func.isRequired,
  employeeId: PT.number,
  onCalendarNavigate: PT.func.isRequired,
  toggleBookingModal: PT.func.isRequired,
  bookingModalVisible: PT.bool.isRequired,
  bookingModalDismount: PT.bool.isRequired,
  selectCalendarSlot: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
};

Dashboard.defaultProps = {
  bookingModalOpen: false,
};

export default container(Dashboard);
