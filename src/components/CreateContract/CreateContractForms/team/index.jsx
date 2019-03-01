import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { withFormik } from 'formik';

import { FormStyleContainer } from '../../../common_styled/FormStyleContainer';
import { FormContainer } from '../styled';

const FormikEnhancer = withFormik({

  displayName: 'Create Contract - Team Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      selectedClientId: '-1',
      selectedTeamId: '-1',
    });
  },

  // Custom sync validation
  validate: ({ selectedClientId, selectedTeamId }) => {
    let errors = {};
    if (selectedClientId === '-1') {
      errors.selectedClientId = 'Please select a client';
    }
    if (selectedTeamId === '-1') {
      errors.selectedTeamId = 'Please select a team';
    }
    return errors;
  },

  handleSubmit: (payload, { props, resetForm }) => {
    props.handleTeamSectionSubmit(payload, resetForm);
  },

});


export const TeamForm = props => {
  const {
    clients,
    searchTeam,
    teams,
    teamResults,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    touched,
    errors,
    handleFormReset,
    resetForm,
  } = props;

  return (
    <FormContainer>
      <FormStyleContainer>
        <h3>Find team for contract</h3>
        <form onSubmit={handleSubmit}>

          <div
            className={
              errors.selectedClientId &&
                touched.selectedClientId ?
                'formgroup formgroup--invalid' :
                'formgroup'
            }
          >
            <label htmlFor="selectedClientId">Select a Client</label>
            <select
              id="selectedClientId"
              name="selectedClientId"
              value={values.selectedClientId}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={teams.length > 0}
            >
              {
                clients.map(({ value, displayValue }) => {
                  return (
                    <option
                      key={value}
                      value={value}>{displayValue}</option>
                  );
                })
              }
            </select>
            <span>{errors.selectedClientId}</span>
          </div>

          {
            teamResults !== '' &&
            <p><strong>{teamResults}</strong></p>
          }

          {
            teams.length === 0 ?

              <button
                type="button"
                disabled={values.firstName === '' || values.lastName === ''}
                onClick={() => searchTeam(values.selectedClientId)}
              >
                Search teams
              </button>

              :

              <Fragment>
                <div
                  className={
                    errors.selectedTeamId &&
                      touched.selectedTeamId ?
                      'formgroup formgroup--invalid' :
                      'formgroup'
                  }
                >
                  <label htmlFor="selectedTeamId">Select a Team</label>
                  <select
                    id="selectedTeamId"
                    name="selectedTeamId"
                    value={values.selectedTeamId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {
                      teams.map(({ value, displayValue }) => {
                        return (
                          <option
                            key={value}
                            value={value}>{displayValue}</option>
                        );
                      })
                    }
                  </select>
                  <span>{errors.selectedTeamId}</span>
                </div>

                <div className="btngroup btngroup--submit-reset">
                  <button type="submit" disabled={!isValid}>
                    Submit
                  </button>
                  <button type="button" onClick={() => handleFormReset(resetForm)}>
                    Reset Form
                  </button>
                </div>

              </Fragment>
          }
        </form>
      </FormStyleContainer>
    </FormContainer>
  );
};

TeamForm.propTypes = {
  teams: PT.array,
  teamResults: PT.string,
  searchTeam: PT.func,
  clients: PT.array,

  // Formik Props
  values: PT.shape({
    selectedClientId: PT.string,
    selectedTeamId: PT.string,
  }),
  handleSubmit: PT.func.isRequired,
  handleChange: PT.func.isRequired,
  handleBlur: PT.func.isRequired,
  isValid: PT.bool.isRequired,
  errors: PT.shape({
    selectedClientId: PT.string,
    teamName: PT.string,
  }),
  touched: PT.shape({
    selectedClientId: PT.bool,
    teamName: PT.bool,
  }),
  handleFormReset: PT.func,
  resetForm: PT.func,
};

TeamForm.defaultProps = {
  clients: [],
  teams: [],
};

export default container(FormikEnhancer(TeamForm));
