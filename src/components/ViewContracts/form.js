import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import { InputField, SelectField } from '../common/Formik';
import { Button, ButtonGroupWithInput } from '../common/Formik/styled';


import { FormContainer } from './styled';

const FormikEnhancer = withFormik({

  displayName: 'Search Contract Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      fullName: '',
      selectedUserId: '-1',
    });
  },

  // Custom sync validation
  validate: ({ fullName }) => {
    let errors = {};
    let nameArray = fullName.split(' ');
    if (fullName === '') {
      errors.fullName = 'First name cannot be empty.';
    }
    if (nameArray.length !== 2) {
      errors.fullName = 'Please add both a first and last name';
    }
    return errors;
  },

  handleSubmit: (payload, { props }) => {
    props.searchUsers(payload);
  },

});


export const SearchUserForm = props => {
  const { users, isValid, setFieldValue, contractSearch } = props;
  
  const updateContract = (event) => {
    const value = event.target.value;
    contractSearch(event.target.value);
    setFieldValue('selectedUserId', value);
  };
   
  return (
    <FormContainer>
      <Form>

        <ButtonGroupWithInput>
          <Field
            component={InputField}
            title="Search Employee's Full Name"
            name="fullName"
            placeholder="Enter a full name"
          />        
          <Button type="submit" disabled={!isValid}>
            Search Employee
          </Button>
        </ButtonGroupWithInput>

        {
          users.length > 0 &&
          <Field
            component={SelectField}
            title={`Select Employee (${users.length - 1} employee${users.length > 2 ? 's' : ''} found)`}
            name="selectedUserId"
            options={users}
            onChange={updateContract}
          />
        }

      </Form>
    </FormContainer>
  );
};

SearchUserForm.propTypes = {
  contractSearch: PT.func.isRequired,
  users: PT.arrayOf(
    PT.shape({
      displayValue: PT.string,
      value: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
    }),
  ),
  // Formik Props
  setFieldValue: PT.func.isRequired,
  isValid: PT.bool.isRequired,
};

SearchUserForm.defaultProps = {
  users: [],
};

export default FormikEnhancer(SearchUserForm);
