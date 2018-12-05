import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';
import { FormContainer } from '../styled';

const UpdateBooking = ({ handleFormSubmit, selectedBooking, cancelHolidayRequest, modalVisible }) => {
  return (
    <FormContainer>
      <h2>Update Booking</h2>
      <Form handleFormSubmit={handleFormSubmit} selectedBooking={selectedBooking} cancelHolidayRequest={cancelHolidayRequest} modalVisible={modalVisible} />
    </FormContainer>
  );
};

UpdateBooking.propTypes = {
  handleFormSubmit: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
  cancelHolidayRequest: PT.func.isRequired,
  modalVisible: PT.bool.isRequired,
};

export default container(UpdateBooking);
