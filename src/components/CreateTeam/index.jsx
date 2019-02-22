import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateTeamForm from './form';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateTeam = ({ clients, initialFormValues, submitRequest, navigateTo }) => {
  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => navigateTo('/admin/teams')}
          label="View Teams"
        />
      </CornerButton>
      <h2>Create Team</h2>
      <CreateTeamForm clients={clients} handleFormSubmit={submitRequest} initialFormValues={initialFormValues} />
    </div>
  );
};

CreateTeam.propTypes = {
  clients: PT.array,
  initialFormValues: PT.shape({
    selectedClient: PT.string,
    teamName: PT.string,
  }),
  submitRequest: PT.func.isRequired,
  navigateTo: PT.func.isRequired,
};

CreateTeam.defaultProps = {
  clients: [],
};

export default container(CreateTeam);
