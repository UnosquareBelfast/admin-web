import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { FormContainer } from './styled';
import { withFormik, Form, Field } from 'formik';
import { InputField } from '../common/Formik';
import { Button } from '../common/Formik/styled';


const FormikEnhancer = withFormik({

  displayName: 'Create Client Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      clientName: '',
    });
  },

  // Custom sync validation
  validate: ({ clientName }) => {
    let errors = {};
    if (clientName === '') {
      errors.clientName = 'Client name cannot be empty.';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleFormSubmit(payload, resetForm);
  },

});

export const CreateClientForm = props => {

  const {
    isValid,
  } = props;

  return (
    <FormContainer>
      <Form>

        <Field
          component={InputField}
          title="Client Name"
          name="clientName"
          placeholder="Enter a client name"
        />

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>

      </Form>
    </FormContainer>
  );
};

CreateClientForm.propTypes = {
  isValid: PT.bool.isRequired,
};

export default FormikEnhancer(CreateClientForm);
