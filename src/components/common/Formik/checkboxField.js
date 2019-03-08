import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';

const CheckBoxField = ({
  field,
  form: { errors },
  disabled,
  ...props
}) => {

  const layoutCss = ['checkbox-layout'];
  const checkboxActive = field.value;
  if (checkboxActive) {
    layoutCss.push('is-checked');
  }
  if (disabled) {
    layoutCss.push('is-disabled');
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
        disabled={disabled}
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
  disabled: PT.bool,
};

CheckBoxField.defualtProps = {
  disabled: false,
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
