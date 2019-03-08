import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import SearchUserForm from './form';
import { DataTable } from '../';
import ContractCells from '../DataTable/Cells/contracts';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewContracts = ({ users, contracts, getUsers, contractSearch, navigateTo }) => {

  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => navigateTo('/admin/contracts/new')}
          label="Create Contract"
        />
      </CornerButton>
      <h2>View Contracts</h2>
      <SearchUserForm 
        users={users}
        searchUsers={getUsers} 
        contractSearch={contractSearch}
      />
      <DataTable
        data={contracts}
        cells={ContractCells}
        columns={['clientName', 'teamName', 'startDate', 'endDate']}
        pageSize={20}
      />
    </div>
  );
};

ViewContracts.propTypes = {
  users: PT.array.isRequired,
  getUsers: PT.func.isRequired,
  contracts: PT.array.isRequired,
  contractSearch: PT.func.isRequired,
  navigateTo: PT.func.isRequired,
};

export default container(ViewContracts);
