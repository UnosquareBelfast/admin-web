import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateTeamForm from './CreateTeamForm';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateTeam = ({ submitRequest, navigateTo, teamSubmitted, resetTeamSubmitted }) => {
  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => navigateTo('/admin/teams')}
          label="View Teams"
        />
      </CornerButton>
      <h2>Create Team</h2>
      <CreateTeamForm onSuccess={submitRequest} teamSubmitted={teamSubmitted} resetTeamSubmitted={resetTeamSubmitted} />
    </div>
  );
};

CreateTeam.propTypes = {
  submitRequest: PT.func.isRequired,
  navigateTo: PT.func.isRequired,
  teamSubmitted: PT.bool.isRequired,
  resetTeamSubmitted: PT.func.isRequired,
};

export default container(CreateTeam);
