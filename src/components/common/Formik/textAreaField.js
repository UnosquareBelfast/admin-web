import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';
import { TextArea } from './styled';

const TextAreaField = ({
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
      <TextArea
        id={field.name} 
        {...field} 
        {...props}
      />
    </FormGroup>
  );
};

TextAreaField.propTypes = {
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
  placeholder: PT.string,
};

TextAreaField.defaultProps = {
  rows: '5',
};

export default TextAreaField;

/*
  Usage Example

  <Field 
    title="Team Name"
    rows="5" 
    component={TextAreaField}
    name="teamName" 
    placeholder="Enter a Team name" 
  />

*/
