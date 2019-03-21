import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { DataTable, UserModal } from '../';
import UserCells from '../DataTable/Cells/users';
import container from './container';

const AllEmployees = (
  { 
    employees,  
    selectEmployee, 
    selectedEmployee, 
    closeUserModal, 
    userModalVisible, 
  }) => {

  return (
    <Fragment>
      {
        userModalVisible && 
          <UserModal
            user={selectedEmployee}
            closeModal={closeUserModal}
          />
      }
      <h2>Employees</h2>
      <DataTable
        data={employees}
        cells={UserCells}
        columns={['fullName', 'email', 'role', 'location']}
        onRowClick={({employeeId}) => selectEmployee(employeeId)}
        pageSize={20}
      />
    </Fragment>
  );
};

AllEmployees.propTypes = {
  employees: PT.array.isRequired,
  selectEmployee: PT.func.isRequired,
  selectedEmployee: PT.object,
  userModalVisible: PT.bool.isRequired,
  closeUserModal: PT.func.isRequired,
};

export default container(AllEmployees);
