import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';

const UpdateBooking = ({ handleFormSubmit }) => {
  return (
    <div>
      <h2>Update Booking</h2>
    </div>
  );
};

UpdateBooking.propTypes = {
  handleFormSubmit: PT.func.isRequired,
};

export default container(UpdateBooking);
