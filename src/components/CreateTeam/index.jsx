import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateTeamForm from './form';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateTeam = ({ clientOptions, submitRequest, navigateTo }) => {

  const renderRedirect = () => {
    if (clientOptions.length === 1) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div>
      {renderRedirect()}
      <CornerButton>
        <Button
          onClick={() => navigateTo('/admin/teams')}
          label="View Teams"
        />
      </CornerButton>
      <h2>Create Team</h2>
      <CreateTeamForm 
        clientOptions={clientOptions} 
        handleFormSubmit={submitRequest} 
      />
    </div>
  );
};

CreateTeam.propTypes = {
  clientOptions: PT.arrayOf(
    PT.shape({
      displayValue: PT.string,
      value: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
    }),
  ),
  submitRequest: PT.func.isRequired,
  navigateTo: PT.func.isRequired,
};

CreateTeam.defaultProps = {
  clientOptions: [],
};

export default container(CreateTeam);
