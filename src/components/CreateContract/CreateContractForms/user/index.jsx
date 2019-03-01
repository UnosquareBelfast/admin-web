import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { withFormik } from 'formik';

import { FormStyleContainer } from '../../../common_styled/FormStyleContainer';
import { FormContainer } from '../styled';

const FormikEnhancer = withFormik({

  displayName: 'Create Contract - User Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      firstName: '',
      lastName: '',
      selectedUserId: '-1',
    });
  },

  // Custom sync validation
  validate: ({ firstName, lastName, selectedUserId }) => {
    let errors = {};
    if (firstName === '') {
      errors.firstName = 'First name cannot be empty.';
    }
    if (lastName === '') {
      errors.lastName = 'Last name cannot be empty.';
    }
    if (selectedUserId === '-1') {
      errors.selectedUserId = 'Please select a user';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleUserSectionSubmit(payload, resetForm);
  },

});

export const UserForm = props => {

  const {
    searchUser,
    users,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    touched,
    errors,
    handleFormReset,
    resetForm,
  } = props;

  return (
    <FormContainer>
      <FormStyleContainer>
        <h3>Find user for contract</h3>
        <form onSubmit={handleSubmit}>

          <div
            className={
              errors.firstName &&
                touched.firstName ?
                'formgroup formgroup--invalid' :
                'formgroup'
            }
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter a first name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>{errors.firstName}</span>
          </div>

          <div
            className={
              errors.lastName &&
                touched.lastName ?
                'formgroup formgroup--invalid' :
                'formgroup'
            }
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter a lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>{errors.lastName}</span>
          </div>

          {
            users.length === 0 ?

              <button
                type="button"
                disabled={values.firstName === '' || values.lastName === ''}
                onClick={() => searchUser(values.firstName, values.lastName)}
              >
                Search user
              </button>

              :

              <React.Fragment>
                <div 
                  className={
                    errors.selectedUserId && 
                    touched.selectedUserId ? 
                      'formgroup formgroup--invalid' : 
                      'formgroup'
                  }
                >
                  <label htmlFor="selectedUserId">Select a User</label>
                  <select
                    id="selectedUserId"
                    name="selectedUserId"
                    value={values.selectedUserId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {
                      users.map(({ value, displayValue }) => {
                        return (
                          <option
                            key={value}
                            value={value}>{displayValue}</option>
                        );
                      })
                    }
                  </select>
                  <span>{errors.selectedUserId}</span>
                </div>
                
                <div className="btngroup btngroup--submit-reset">                
                  <button type="submit" disabled={!isValid}>
                    Submit
                  </button>
                  <button type="button" onClick={() => handleFormReset(resetForm)}>
                      Reset Form
                  </button>
                </div>
              </React.Fragment>
          }
        </form>
      </FormStyleContainer>
    </FormContainer>
  );
};

UserForm.propTypes = {
  users: PT.array,
  searchUser: PT.func,

  
  // Formik Props
  values: PT.shape({
    firstName: PT.string,
    surname: PT.string,
    selectedUserId: PT.string,
  }),
  handleSubmit: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  handleBlur: PT.func.isRequired,
  isValid: PT.bool.isRequired,
  errors: PT.shape({
    firstName: PT.string,
    surname: PT.string,
    selectedUserId: PT.string,
  }),
  touched: PT.shape({
    firstName: PT.bool,
    surname: PT.bool,
    selectedUserId: PT.bool,
  }),
  handleFormReset: PT.func,
  resetForm: PT.func,
};

UserForm.defaultProps = {
  users: [],
};

export default container(FormikEnhancer(UserForm));
