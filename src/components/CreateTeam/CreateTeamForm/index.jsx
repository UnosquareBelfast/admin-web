import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';

import { FormContainer } from './styled';
import { FormStyleContainer } from '../../common_styled/FormStyleContainer';
import { withFormik } from 'formik';


const FormikEnhancer = withFormik({
  displayName: 'Create Team Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => ({
    selectedClient: -1,
    teamName: '',
  }),

  // Custom sync validation
  validate: ({ teamName, selectedClient }) => {
    let errors = {};
    if (teamName === '') {
      errors.teamName = 'Team name cannot be empty.';
    }
    if (parseInt(selectedClient) === -1) {
      errors.selectedClient = 'Please select a client';
    }
    return errors;
  },

  handleSubmit: (payload, bag) => {
    bag.props.handleFormSubmit(payload);
    bag.resetForm();
  },

});

export const CreateTeamForm = props => {
  const { 
    clients, 
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

          <div className={errors.selectedClient && touched.selectedClient ? 'formgroup formgroup--invalid' : 'formgroup' }>
            <label htmlFor="selectedClient">Select a Client</label>
            <select
              id="selectedClient"
              name="selectedClient"
              value={values.selectedClient}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {
                clients.map((client) => {
                  const {value, displayValue} = client;
                  return (
                    <option key={value} value={value}>{displayValue}</option>
                  );
                })
              }
            </select>
            <span>{errors.selectedClient}</span>
          </div>

          <div className={errors.teamName && touched.teamName ? 'formgroup formgroup--invalid' : 'formgroup' }>
            <label htmlFor="teamname">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="Enter a Team name"
              value={values.teamName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>{errors.teamName}</span>
          </div>

          <button type="submit" disabled={!isValid}>
            Submit
          </button>

        </form>
      </FormStyleContainer>
    </FormContainer>
  );
};

CreateTeamForm.propTypes = {
  clients: PT.array,
  handleSubmit: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  handleBlur: PT.func.isRequired,
  isValid: PT.bool.isRequired,
  errors: PT.object.isRequired,
  touched: PT.object.isRequired,
  values: PT.object.isRequired,
};

CreateTeamForm.defaultProps = {
  clients: [],
};

export default container(FormikEnhancer(CreateTeamForm));
