import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import moment from 'moment';

import container from './container';
import { DateField, CheckBoxField } from '../../../common/Formik';
import { Button } from '../../../common/Formik/styled';
import { FormContainer } from '../styled';


const FormikEnhancer = withFormik({

  displayName: 'Create Contract - Date Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      startDate: moment(),
      endDate: moment(),
      isOpenEnded: false,
    });
  },

  // Custom sync validation
  validate: ({ startDate, endDate, isOpenEnded }) => {
    let errors = {};

    if (endDate.isBefore(startDate) && !isOpenEnded) {
      errors.startDate = 'Start date cannot be after end date';
    }

    if (startDate.isAfter(endDate) && !isOpenEnded) {
      errors.endDate = 'End date cannot be before end date';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleDateSectionSubmit(payload, resetForm);
  },

});

export const DateForm = props => {

  const {
    values,
    isValid,
  } = props;

  return (
    <FormContainer>
      <h3>Select contract dates</h3>
      <Form>

        <Field
          component={DateField}
          title="Start Date"
          name="startDate"
          placeholder="Enter a start date"
        />

        {
          !values.isOpenEnded &&

          <Field
            component={DateField}
            title="End Date"
            name="endDate"
            placeholder="Enter an end date"
          />

        }

        <Field
          component={CheckBoxField}
          title="Open ended (No end date)"
          name="isOpenEnded"
        />

        <Button type="submit" disabled={!isValid}>
          Create Contract
        </Button>

      </Form>
    </FormContainer>
  );
};

DateForm.propTypes = {

  // Formik Props
  values: PT.shape({
    isOpenEnded: PT.bool,
  }),
  isValid: PT.bool.isRequired,
};

export default container(FormikEnhancer(DateForm));
