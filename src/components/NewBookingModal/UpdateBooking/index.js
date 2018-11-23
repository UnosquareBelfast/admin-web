import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';
import { FormContainer } from '../styled';

const UpdateBooking = ({ handleFormSubmit, selectedBooking }) => {
  return (
    <FormContainer>
      <h2>Update Booking</h2>
      <Form handleFormSubmit={handleFormSubmit} selectedBooking={selectedBooking} />
    </FormContainer>
  );
};

UpdateBooking.propTypes = {
  handleFormSubmit: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
};

export default container(UpdateBooking);
