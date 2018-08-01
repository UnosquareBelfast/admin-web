import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    booking,
    closeModal,
    updateBookingAndDuration,
    showModal,
    loading,
    takenHolidays,
    updateTakenHolidays,
    employeeId,
    onUpdateEvents,
    onUpdateEmployee,
  } = props;

  let events;
  if (!loading) {
    events = (
      <InnerLayout>
        <BookingCalendar
          employeeId={employeeId}
          takenHolidays={takenHolidays}
          updateBookingAndDuration={updateBookingAndDuration}
        />
        <Legend
          updateCalendarEvents={onUpdateEvents}
          updateEmployee={onUpdateEmployee}
          takenHolidays={takenHolidays}
        />
      </InnerLayout>
    );
  } else {
    events = null;
  }

  return (
    <Fragment>
      <BookingModal
        booking={booking}
        closeModal={closeModal}
        employeeId={employeeId}
        updateBookingAndDuration={updateBookingAndDuration}
        showModal={showModal}
        updateTakenHolidays={updateTakenHolidays}
      />
      {events}
    </Fragment>
  );
};

Dashboard.propTypes = {
  booking: PT.object.isRequired,
  closeModal: PT.func.isRequired,
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  loading: PT.bool,
  showModal: PT.bool.isRequired,
  takenHolidays: PT.array,
  updateBookingAndDuration: PT.func.isRequired,
  updateTakenHolidays: PT.func.isRequired,
  employeeId: PT.number,
};

Dashboard.defaultProps = {
  booking: {},
};

export default container(Dashboard);
