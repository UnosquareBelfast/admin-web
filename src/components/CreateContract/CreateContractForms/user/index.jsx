import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { withFormik, Form, Field } from 'formik';

import { InputField, SelectField } from '../../../common/Formik';
import { Button, GhostButton, ButtonGroupSubmitReset } from '../../../common/Formik/styled';

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
    isValid,
    handleFormReset,
    resetForm,
  } = props;

  return (
    <FormContainer>
      <h3>Find user for contract</h3>
      <Form>

        <Field
          component={InputField}
          title="First Name"
          name="firstName"
          placeholder="Enter a first name"
        />

        <Field
          component={InputField}
          title="Last Name"
          name="lastName"
          placeholder="Enter a last name"
        />

        {
          users.length === 0 ?

            <Button
              type="button"
              disabled={values.firstName === '' || values.lastName === ''}
              onClick={() => searchUser(values.firstName, values.lastName)}
            >
              Search user
            </Button>

            :

            <React.Fragment>

              <Field
                component={SelectField}
                title="Select a user"
                name="selectedUserId"
                options={users}
              />

              <ButtonGroupSubmitReset>
                <Button type="submit" disabled={!isValid}>
                  Submit
                </Button>
                <GhostButton type="button" onClick={() => handleFormReset(resetForm)}>
                  Reset Form
                </GhostButton>
              </ButtonGroupSubmitReset>

            </React.Fragment>
        }
      </Form>
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
  }),
  isValid: PT.bool.isRequired,
  handleFormReset: PT.func,
  resetForm: PT.func,
};

UserForm.defaultProps = {
  users: [],
};

export default container(FormikEnhancer(UserForm));
