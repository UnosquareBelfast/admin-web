import React from 'react';
import { PropTypes as PT } from 'prop-types';

import FormGroup from './formgroup';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import DatePicker from 'react-datepicker';

import { DatePickerContainer } from './styled';

const DateField = ({
  field,
  form: { touched, errors, handleBlur, setFieldValue },
  ...props
}) => {

  const error = errors[field.name] && touched[field.name];
  return (
    <FormGroup 
      error={error ? errors[field.name] : ''}
      name={field.name}
      {...props} 
    >
      <DatePickerContainer>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <DatePicker
          id={field.name}
          name={field.name}
          selected={field.value}
          onChange={
            (value) => {
              setFieldValue(field.name, value);
            }
          }
          handleBlur={handleBlur}
          disabledKeyboardNavigation
          readOnly
          minDate={new Date()}
          filterDate={date => {
            const day = date.day();
            return day !== 0 && day !== 6;
          }}
        />
      </DatePickerContainer>
    </FormGroup>
  );
};

DateField.propTypes = {
  field: PT.shape({
    name: PT.string.isRequired, 
    onBlur: PT.func.isRequired, 
    value: PT.oneOfType([
      PT.string,
      PT.object,
    ]).isRequired,
  }),
  form: PT.shape({
    errors: PT.object,
    touched: PT.object,
  }),
};

export default DateField;

/*
  Usage Example

  mapPropsToValues: () => {
    return ({
      testDate: moment(),
    });
  }

  <Field
    component={DateField}
    title="Test Date Field"
    name="testDate"
    placeholder="Enter a date"
  />
*/
