import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import container from './container';
import { SelectField } from '../../../common/Formik';
import { ButtonGroupSubmitReset, Button, GhostButton } from '../../../common/Formik/styled';
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
    isValid,
    handleFormReset,
    resetForm,
  } = props;

  return (
    <FormContainer>
      <h3>Find team for contract</h3>
      <Form>

        <Field
          component={SelectField}
          title="Select a Client"
          name="selectedClientId"
          options={clients}
        />

        {
          teamResults !== '' &&
          <p><strong>{teamResults}</strong></p>
        }

        {
          teams.length === 0 ?

            <Button
              type="button"
              disabled={values.selectedClientId === '-1'}
              onClick={() => searchTeam(values.selectedClientId)}
            >
              Search teams
            </Button>

            :

            <Fragment>

              <Field
                component={SelectField}
                title="Select a Team"
                name="selectedTeamId"
                options={teams}
              />

              <ButtonGroupSubmitReset>
                <Button type="submit" disabled={!isValid}>
                  Submit
                </Button>
                <GhostButton type="button" onClick={() => handleFormReset(resetForm)}>
                  Reset Form
                </GhostButton>
              </ButtonGroupSubmitReset>

            </Fragment>
        }
      </Form>
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
  isValid: PT.bool.isRequired,
  handleFormReset: PT.func,
  resetForm: PT.func,
};

TeamForm.defaultProps = {
  clients: [],
  teams: [],
};

export default container(FormikEnhancer(TeamForm));
