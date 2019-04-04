import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import { FormContainer } from './styled';
import { SelectField } from '../common/Formik';

const FormikEnhancer = withFormik({

  displayName: 'Search Client Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn
  mapPropsToValues: () => {
    return ({
      selectedClient: -1,
    });
  },

});

export const ViewTeamsForm = props => {
  const { clientOptions, teamSearch, setFieldValue } = props;

  const updateTeam = (event) => {
    const value = parseInt(event.target.value);
    teamSearch(value);
    setFieldValue('selectedClient', value);
  };

  if (clientOptions.length > 0) {
    return (
      <FormContainer>
        <Form>
          <Field
            component={SelectField}
            title="Select a Client"
            name="selectedClient"
            options={clientOptions}
            onChange={updateTeam}
          />
        </Form>
      </FormContainer>
    );
  } else {
    return (
      <p>
        No teams can exist without a client. You are required to create a client
        to view this page.
      </p>
    );
  }
};

ViewTeamsForm.propTypes = {
  clients: PT.array,
  setFieldValue: PT.func,
  teamSearch: PT.func,
};

ViewTeamsForm.defaultProps = {
  clients: [],
};

export default FormikEnhancer(ViewTeamsForm);
