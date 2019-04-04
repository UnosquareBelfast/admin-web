import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Button } from '../common';
import { CornerButton } from '../common_styled';
import { DataTable, EditClientModal } from '../';
import ClientCells from '../DataTable/Cells/clients';

export const AllClients = ({
  clients,
  isUpdating,
  history,
  selectClient,
  selectedClient,
}) => {

  const renderRedirect = () => {
    if (clients.length === 0 && !isUpdating) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <Fragment>
      {renderRedirect()}
      {
        selectedClient && (
          <EditClientModal
            client={selectedClient}
            visible={selectedClient}
            history={history}
            closeModal={selectClient}
          />
        )}
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/clients/new')}
          label="New Client"
        />
      </CornerButton>
      <h2>All Clients</h2>
      <DataTable
        data={clients}
        cells={ClientCells}
        columns={['clientName']}
        onRowClick={({ clientId }) => selectClient(clientId)}
        pageSize={20}
      />
    </Fragment>
  );
};

AllClients.propTypes = {
  history: PT.object.isRequired,
  clients: PT.array.isRequired,
  isUpdating: PT.bool.isRequired,
  selectClient: PT.func.isRequired,
  selectedClient: PT.object,
};

export default container(AllClients);
