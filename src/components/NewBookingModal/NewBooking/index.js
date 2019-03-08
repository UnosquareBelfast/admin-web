import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';

const NewBooking = ({ eventTypes, handleFormSubmit, start, end }) => {
  return (
    <Fragment>
      <h2>New Booking</h2>
      <Form 
        eventTypes={eventTypes}
        handleSubmit={handleFormSubmit} 
        start={start} end={end} />
    </Fragment>
  );
};

NewBooking.propTypes = {
  eventTypes: PT.array.isRequired,
  handleFormSubmit: PT.func.isRequired,
  start: PT.object.isRequired,
  end: PT.object.isRequired,
};

export default container(NewBooking);
