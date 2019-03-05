import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';
import { Input } from './styled';

const InputField = ({
  field,
  form: { touched, errors },
  ...props
}) => {

  return (
    <FormGroup 
      name={field.name}
      error={
        errors[field.name] && touched[field.name] ? errors[field.name] : ''
      }
      {...props} 
    >
      <Input
        id={field.name} 
        {...field} 
        {...props}
      />
    </FormGroup>
  );
};

InputField.propTypes = {
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
  title: PT.string,
  type: PT.string,
  placeholder: PT.string,
};

InputField.defaultProps = {
  type: 'text',
};

export default InputField;

/*
  Usage Example

  <Field 
    title="Team Name"
    type="text" 
    component={InputField}
    name="teamName" 
    placeholder="Enter a Team name" 
  />

*/
