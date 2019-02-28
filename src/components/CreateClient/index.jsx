import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateClientForm from './form';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateClient = props => {
  const { submitRequest, navigateTo } = props;

  return (
    <div>
      <h2>Create Client</h2>
      <CornerButton>
        <Button
          label="View all clients"
          onClick={() => navigateTo('/admin/clients')}
        />
      </CornerButton>
      <CreateClientForm
        handleFormSubmit={submitRequest}
      />
    </div>
  );
};

CreateClient.propTypes = {
  navigateTo: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
};

export default container(CreateClient);
