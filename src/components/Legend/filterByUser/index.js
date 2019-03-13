import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Select, SelectContainer } from '../../common/Formik/styled';

const FilterByUser = ({ selectedEmployee, onChange, employeeList }) => {
  let options = [
    <option key={-1} value={-1}>
      All
    </option>,
  ];

  if (employeeList.length > 0) {
    const employees = employeeList.map(employee => {
      const { employeeId, forename, surname } = employee;
      return (
        <option key={employeeId} value={employeeId}>
          {forename} {surname}
        </option>
      );
    });
    options.push(...employees);
  }

  return (
    <SelectContainer>
      <Select value={selectedEmployee.employeeId} onChange={onChange}>
        {options}
      </Select>
    </SelectContainer>
  );
};

FilterByUser.propTypes = {
  selectedEmployee: PT.object.isRequired,
  onChange: PT.func.isRequired,
  employeeList: PT.array.isRequired,
};

export default FilterByUser;
