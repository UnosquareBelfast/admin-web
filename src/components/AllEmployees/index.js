import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { DataTable, UserModal } from '../';
import UserCells from '../DataTable/Cells/users';
import container from './container';

const AllEmployees = ({ users, selectUser, selectedUser, closeUserModal, userModalVisible }) => {
  return (
    <Fragment>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={closeUserModal}
        />
      )}
      <h2>Employees</h2>
      <DataTable
        data={users}
        cells={UserCells}
        columns={['fullName', 'email', 'role', 'location']}
        onRowClick={employee => selectUser(employee)}
        pageSize={20}
      />
    </Fragment>
  );
};

AllEmployees.propTypes = {
  users: PT.array.isRequired,
  selectUser: PT.func.isRequired,
  selectedUser: PT.object.isRequired,
  userModalVisible: PT.bool.isRequired,
  closeUserModal: PT.func.isRequired,
};

export default container(AllEmployees);
