import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import TeamSidebar from './TeamSidebar';
import { DataTable, UserModal } from '../../components';
import UserCells from '../../components/DataTable/Cells/users';
import { Layout, ContentLayout, Stat, Columns } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChild, faMap, faHome } from '@fortawesome/fontawesome-free-solid';

const TeamDashboard = ({
  clients,
  selectTeam,
  selectedTeam,
  selectedUser,
  closeUserModal,
  onUserSelect,
  userModalVisible,
  hasExtraPermissions,
}) => {
  //TO-DO: Also check client name is the same.
  // const team = clients.filter(team => team.team === selectedTeam)[0];

  const renderTeamDetails = () => {
    const holidayCount = selectedTeam.employees.filter(
      employee => employee.location === 'On Holiday'
    ).length;

    const wfhCount = selectedTeam.employees.filter(
      employee => employee.location === 'Working From Home'
    ).length;

    return (
      <ContentLayout>
        <h2>{selectedTeam.teamName}</h2>
        <Columns>
          <Stat>
            <h1>{selectedTeam.employees.length} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faChild} /> Active
            </h4>
          </Stat>
          <Stat>
            <h1>{holidayCount} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faMap} /> On Holiday
            </h4>
          </Stat>
          <Stat>
            <h1>{wfhCount} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faHome} /> Working from home
            </h4>
          </Stat>
        </Columns>
        <DataTable
          data={selectedTeam.employees}
          cells={UserCells}
          columns={['name', 'email', 'state']}
          pageSize={20}
          onRowClick={user => {
            if (hasExtraPermissions) {
              onUserSelect(user);
            }
          }}
        />
      </ContentLayout>
    );
  };

  return (
    <Fragment>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={closeUserModal}
        />
      )}
      <Layout>
        <TeamSidebar clients={clients} selectTeam={selectTeam} selectedTeam={selectedTeam} />
        {selectedTeam && renderTeamDetails()}
      </Layout>
    </Fragment>
  );
};

TeamDashboard.propTypes = {
  clients: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
  selectedTeam: PT.object,
  onUserSelect: PT.func.isRequired,
  selectedUser: PT.object,
  closeUserModal: PT.func.isRequired,
  userModalVisible: PT.bool.isRequired,
  hasExtraPermissions: PT.bool.isRequired,
};

export default container(TeamDashboard);
