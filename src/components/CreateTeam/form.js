import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { FormContainer } from './styled';
import { withFormik, Form, Field } from 'formik';

import { InputField, SelectField } from '../common/Formik';
import { Button } from '../common/Formik/styled';

const FormikEnhancer = withFormik({

  displayName: 'Create Team Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      selectedClient: '-1',
      teamName: '',
    });
  },

  // Custom sync validation
  validate: ({ teamName, selectedClient }) => {
    let errors = {};
    if (teamName === '') {
      errors.teamName = 'Team name cannot be empty.';
    }
    if (selectedClient === '-1') {
      errors.selectedClient = 'Please select a client';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleFormSubmit(payload, resetForm);
  },

});

export const CreateTeamForm = props => {

  const {
    clients,
    isValid,
  } = props;

  return (
    <FormContainer>
      <Form>

        <Field
          component={SelectField}
          title="Select a Client"
          name="selectedClient"
          options={clients}
        />

        <Field
          component={InputField}
          title="Team Name"
          name="teamName"
          placeholder="Enter a team name"
        />

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>

      </Form>
    </FormContainer>
  );
};

CreateTeamForm.propTypes = {

  // Props
  clients: PT.arrayOf(
    PT.shape({
      displayValue: PT.string,
      value: PT.string,
    }),
  ),

  // Formik Props
  isValid: PT.bool.isRequired,

};

CreateTeamForm.defaultProps = {
  clients: [],
};

export default FormikEnhancer(CreateTeamForm);
