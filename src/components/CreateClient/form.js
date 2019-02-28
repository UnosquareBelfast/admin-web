import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { FormContainer } from './styled';
import { FormStyleContainer } from '../common_styled/FormStyleContainer';
import { withFormik } from 'formik';


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
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    touched,
    errors,
  } = props;

  return (
    <FormContainer>
      <FormStyleContainer>
        <form onSubmit={handleSubmit}>

          <div
            className={
              errors.clientName &&
                touched.clientName ?
                'formgroup formgroup--invalid' :
                'formgroup'
            }
          >
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Enter a Client name"
              value={values.clientName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>{errors.clientName}</span>
          </div>

          <button type="submit" disabled={!isValid}>
            Submit
          </button>

        </form>
      </FormStyleContainer>
    </FormContainer>
  );
};

CreateClientForm.propTypes = {

  values: PT.shape({
    clientName: PT.string,
  }),

  // Formik Props
  handleSubmit: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  handleBlur: PT.func.isRequired,
  isValid: PT.bool.isRequired,
  errors: PT.shape({
    clientName: PT.string,
  }),
  touched: PT.shape({
    clientName: PT.bool,
  }),
};

export default FormikEnhancer(CreateClientForm);