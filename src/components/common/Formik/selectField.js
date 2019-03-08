import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';

import { SelectContainer, Select } from './styled';

const SelectField = ({
  field,
  form: { touched, errors },
  options,
  ...props
}) => {

  const renderOptions = () => {
    return options.map(({ value, displayValue }) => {
      return (
        <option
          key={value}
          value={value}>{displayValue}</option>
      );
    });
  };

  return (
    <FormGroup
      name={field.name}
      error={
        errors[field.name] && touched[field.name] ? errors[field.name] : ''
      }
      {...props}
    >
      <SelectContainer>
        <Select
          id={field.name}
          {...field}
          {...props}
        >
          {renderOptions()}
        </Select>
      </SelectContainer>
    </FormGroup>
  );
};

SelectField.propTypes = {
  field: PT.shape({
    name: PT.string.isRequired,
    onChange: PT.func.isRequired,
    onBlur: PT.func.isRequired,
    value: PT.oneOfType([
      PT.string,
      PT.number,
    ]).isRequired,
  }),
  form: PT.shape({
    errors: PT.object,
    touched: PT.object,
  }),
  options: PT.arrayOf(
    PT.shape({
      displayValue: PT.string,
      value: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
    })
  ).isRequired,
};

export default SelectField;

/*
  Usage Example

  <Field
    title="Select a Client"
    options={clients}
    component={SelectField}
    name="selectedClient"
  />

*/
