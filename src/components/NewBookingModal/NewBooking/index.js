import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';
import { FormContainer } from '../styled';

const NewBooking = ({ handleFormSubmit, start, end }) => {
  return (
    <FormContainer>
      <h2>New Booking</h2>
      <Form handleSubmit={handleFormSubmit} start={start} end={end} />
    </FormContainer>
  );
};

NewBooking.propTypes = {
  handleFormSubmit: PT.func.isRequired,
  start: PT.object.isRequired,
  end: PT.object.isRequired,
};

export default container(NewBooking);
