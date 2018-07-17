import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateClientForm from '../CreateClientForm';
import { Card, Errorbox } from '../common';

export const CreateClient = props => {
  const { clientId, error, success, onSuccess, onFailed } = props;
  const successMessage =
    clientId > 0
      ? 'Client updated successfully!'
      : 'Client created successfully!';
  return (
    <Card>
      <h3>{clientId > 0 ? 'Update Client' : 'Create Client'}</h3>
      <CreateClientForm
        clientId={clientId}
        onSuccess={onSuccess}
        onFailed={onFailed}
      />
      <Errorbox
        id="errorCreateUser"
        error={error}
        label="Error creating user"
      />
      {success && <p id="userCreatedSuccess">{successMessage}!</p>}
    </Card>
  );
};

CreateClient.propTypes = {
  clientId: PT.number.isRequired,
  onSuccess: PT.func.isRequired,
  onFailed: PT.func.isRequired,
  error: PT.object,
  success: PT.bool,
};

CreateClient.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateClient);
