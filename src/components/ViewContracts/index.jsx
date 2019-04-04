import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import SearchUserForm from './form';
import { DataTable } from '../';
import ContractCells from '../DataTable/Cells/contracts';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewContracts = (
  { 
    employeesOptions,
    teamOptions, 
    employeeCount, 
    contracts, 
    getEmployees, 
    contractSearch, 
    navigateTo, 
  }) => {

  const renderRedirect = () => {
    if (employeeCount === 0) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div>
      {renderRedirect()}
      <CornerButton>
        <Button
          onClick={() => navigateTo('/admin/contracts/new')}
          label="Create Contract"
        />
      </CornerButton>
      <h2>View Contracts</h2>
      <SearchUserForm 
        employees={employeesOptions}
        teams={teamOptions}
        searchEmployees={getEmployees} 
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
  employeesOptions: PT.array.isRequired,
  teamOptions: PT.array,
  employeeCount: PT.number.isRequired,
  getEmployees: PT.func.isRequired,
  contracts: PT.array.isRequired,
  contractSearch: PT.func.isRequired,
  navigateTo: PT.func.isRequired,
};

export default container(ViewContracts);
