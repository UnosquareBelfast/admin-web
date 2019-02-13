import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';
import { FormStyleContainer } from '../../common_styled/FormStyleContainer';

const NewBooking = ({ handleFormSubmit, start, end }) => {
  return (
    <FormStyleContainer>
      <h2>New Booking</h2>
      <Form handleSubmit={handleFormSubmit} start={start} end={end} />
    </FormStyleContainer>
  );
};

NewBooking.propTypes = {
  handleFormSubmit: PT.func.isRequired,
  start: PT.object.isRequired,
  end: PT.object.isRequired,
};

export default container(NewBooking);
