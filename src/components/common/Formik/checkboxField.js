import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';

const CheckBoxField = ({
  field,
  form: { errors },
  ...props
}) => {

  const layoutCss = ['checkbox-layout'];
  const checkboxActive = field.value;
  if (checkboxActive) {
    layoutCss.push('is-checked');
  }

  return (
    <FormGroup
      name={field.name}
      layout={layoutCss.join(' ')}
      error={
        errors[field.name] ? errors[field.name] : ''
      }
      {...props}  
    >
      <input
        type="checkbox"
        id={field.name} 
        {...field} 
        {...props}
      />
    </FormGroup>
  );

};

CheckBoxField.propTypes = {
  field: PT.shape({
    name: PT.string.isRequired, 
    onChange: PT.func.isRequired, 
    onBlur: PT.func.isRequired, 
    value: PT.bool.isRequired,
  }),
  form: PT.shape({
    errors: PT.object,
  }),
};

export default CheckBoxField;

/*
  Usage Example

  <Field 
    component={CheckBoxField}
    title="Test Checkbox"
    name="textCheck" 
  />
  
*/