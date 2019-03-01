import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import moment from 'moment';
import { withFormik } from 'formik';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import DatePicker from 'react-datepicker';

import { FormStyleContainer } from '../../../common_styled/FormStyleContainer';
import { DatePickerContainer } from '../../../common/Input/styled';
import { FormContainer } from '../styled';



const FormikEnhancer = withFormik({

  displayName: 'Create Contract - Date Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      startDate: moment(),
      endDate: moment(),
      isOpenEnded: false,
    });
  },

  // Custom sync validation
  validate: ({ startDate, endDate, isOpenEnded }) => {
    let errors = {};

    if (endDate.isBefore(startDate) && !isOpenEnded) {
      errors.startDate = 'Start date cannot be after end date';
    }

    if (startDate.isAfter(endDate) && !isOpenEnded) {
      errors.endDate = 'End date cannot be before end date';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleDateSectionSubmit(payload, resetForm);
  },

});

export const DateForm = props => {
  
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    touched,
    errors,
  } = props;

  return (
    <FormContainer>
      <FormStyleContainer>
        <h3>Select contract dates</h3>
        <form onSubmit={handleSubmit}>

          <div
            className={
              errors.startDate &&
                touched.startDate ?
                'formgroup formgroup--invalid' :
                'formgroup'
            }
          >
            <label htmlFor="startDate">Start Date</label>
            <DatePickerContainer>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                id="startDate"
                name="startDate"
                selected={
                  typeof values.startDate === 'string'
                    ? moment(values.startDate)
                    : values.startDate
                }
                onChange={ 
                  (value) => {
                    setFieldValue('startDate', value);
                  }
                }
                onBlur={handleBlur}
                placeholderText="Enter your start date"
                disabledKeyboardNavigation
                readOnly
                minDate={new Date()}
                filterDate={date => {
                  const day = date.day();
                  return day !== 0 && day !== 6;
                }}
              />
            </DatePickerContainer>
            <span>{errors.startDate}</span>
          </div>

          {
            !values.isOpenEnded &&
          
            <div
              className={
                errors.endDate &&
                  touched.endDate ?
                  'formgroup formgroup--invalid' :
                  'formgroup'
              }
            >
              <label htmlFor="endDate">End Date</label>
              <DatePickerContainer>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <DatePicker
                  id="endDate"
                  name="endDate"
                  selected={
                    typeof values.endDate === 'string'
                      ? moment(values.endDate)
                      : values.endDate
                  }
                  onChange={ 
                    (value) => {
                      setFieldValue('endDate', value);
                    }
                  }
                  onBlur={handleBlur}
                  placeholderText="Enter your start date"
                  disabledKeyboardNavigation
                  readOnly
                  minDate={new Date()}
                  filterDate={date => {
                    const day = date.day();
                    return day !== 0 && day !== 6;
                  }}
                />
              </DatePickerContainer>
              <span>{errors.endDate}</span>
            </div>

          }

          <div className="formgroup formgroup--checkbox">
            <label htmlFor="isOpenEnded">Open ended (No end date)</label>
            <input
              type="checkbox"
              id="isOpenEnded"
              name="isOpenEnded"
              value={values.isOpenEnded}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={!isValid}>
            Create Contract
          </button>

        </form>
      </FormStyleContainer>
    </FormContainer>
  );
};

DateForm.propTypes = {
  
  // Formik Props
  values: PT.shape({
    startDate: PT.oneOfType([
      PT.string,
      PT.object,
    ]),
    endDate: PT.oneOfType([
      PT.string,
      PT.object,
    ]),
  }),
  handleSubmit: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  handleBlur: PT.func.isRequired,
  setFieldValue: PT.func.isRequired,
  isValid: PT.bool.isRequired,
  errors: PT.shape({
    startDate: PT.string,
    endDate: PT.string,
  }),
  touched: PT.shape({
    startDate: PT.bool,
    endDate: PT.bool,
  }),
};

export default container(FormikEnhancer(DateForm));
