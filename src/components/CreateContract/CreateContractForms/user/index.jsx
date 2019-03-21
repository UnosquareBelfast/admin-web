import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import container from './container';
import { InputField, SelectField } from '../../../common/Formik';
import { Button, GhostButton, ButtonGroupWithInput, ButtonGroupSubmitReset } from '../../../common/Formik/styled';
import { FormContainer } from '../styled';

const FormikEnhancer = withFormik({

  displayName: 'Create Contract - User Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      fullName: '',
      employeeId: '-1',
    });
  },

  // Custom sync validation
  validate: ({ employeeId }) => {
    let errors = {};
    if (employeeId === '-1') {
      errors.employeeId = 'Please select an employee';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleUserSectionSubmit(payload, resetForm);
  },

});

export const UserForm = props => {

  const {
    searchEmployees,
    employees,
    values,
    isValid,
    handleFormReset,
    resetForm,
  } = props;

  return (
    <FormContainer>
      <h3>Find employee for contract</h3>
      <Form>

        <ButtonGroupWithInput>
          <Field
            component={InputField}
            title="Search Employee"
            name="fullName"
            placeholder="Enter a name"
          />        
          <Button 
            type="button" 
            disabled={values.fullName === ''}
            onClick={() => searchEmployees(values.fullName)}>
            Search Employee
          </Button>
        </ButtonGroupWithInput>

        {
          employees.length > 0 &&

            <React.Fragment>

              <Field
                component={SelectField}
                title={`Select Employee (${employees.length - 1} employee${employees.length > 2 ? 's' : ''} found)`}
                name="employeeId"
                options={employees}
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
  employees: PT.array,
  searchEmployees: PT.func,


  // Formik Props
  values: PT.shape({
    fullName: PT.string,
    employeeId: PT.oneOfType([
      PT.string,
      PT.number,
    ]),
  }),
  isValid: PT.bool.isRequired,
  handleFormReset: PT.func,
  resetForm: PT.func,
};

UserForm.defaultProps = {
  employees: [],
};

export default container(FormikEnhancer(UserForm));
