import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import { InputField, SelectField } from '../common/Formik';
import { Button, ButtonGroupWithInput } from '../common/Formik/styled';


import { FormContainer, Column } from './styled';

const FormikEnhancer = withFormik({

  displayName: 'Search Contract Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      fullName: '',
      selectedEmployeeId: '-1',
      selectedTeamId: '-1',
    });
  },

  handleSubmit: (payload, { props }) => {
    props.searchEmployees(payload);
  },

});


export const SearchUserForm = props => {
  const { employees, teams, isValid, setFieldValue, contractSearch } = props;

  const updateContract = ({ target: { name, value } }) => {
    const testIfValueIsANumber = parseInt(value);
    if (!isNaN(testIfValueIsANumber)) {
      contractSearch(name, value);
      setFieldValue(name, value);
    }
  };

  const createEmployeeLabelText = () => {
    let title = 'Search for en employee in the text field above';
    if (employees.length > 0) {
      const employeesFound = employees.length - 1;
      const employeeString = `employee${employees.length > 2 ? 's' : ''}`;
      title = `Select Employee (${employeesFound} ${employeeString} found)`;
    }
    return title;
  };


  return (
    <FormContainer>
      <Form>

        <Column>
          <ButtonGroupWithInput>
            <Field
              component={InputField}
              title="Search Employee"
              name="fullName"
              placeholder="Enter a name"
            />
            <Button type="submit" disabled={!isValid}>
              Search Employee
            </Button>
          </ButtonGroupWithInput>


          <Field
            component={SelectField}
            title={createEmployeeLabelText()}
            name="selectedEmployeeId"
            options={employees}
            onChange={updateContract}
            disabled={employees.length === 0}
          />

        </Column>

        <Column>
          <Field
            component={SelectField}
            title="Select Team"
            name="selectedTeamId"
            options={teams}
            onChange={updateContract}
          />
        </Column>



      </Form>
    </FormContainer>
  );
};

SearchUserForm.propTypes = {
  contractSearch: PT.func.isRequired,
  teams: PT.arrayOf(
    PT.shape({
      displayValue: PT.string,
      value: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
    }),
  ),
  employees: PT.arrayOf(
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
  employees: [],
  teams: [],
};

export default FormikEnhancer(SearchUserForm);
