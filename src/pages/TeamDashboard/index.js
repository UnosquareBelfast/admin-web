import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Container, Columns, Stat } from './styled';
import { DataTable, UserModal, HolidayModal } from '../../components';
import HolidayCells from '../../components/DataTable/Cells/holidays';
import UserCells from '../../components/DataTable/Cells/users';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChild, faMap, faHome } from '@fortawesome/fontawesome-free-solid';

export const User = ({
  team,
  teamHolidays,
  selectedUser,
  onUserSelect,
  hideUserModal,
  hideHolidayModal,
  userModalVisible,
  history,
  selectedHoliday,
  selectHoliday,
}) => {
  return (
    <Container>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={hideUserModal}
          history={history}
        />
      )}
      <HolidayModal holiday={selectedHoliday} closeModal={hideHolidayModal} />
      <h2>My Team</h2>
      <Columns>
        <Stat>
          <h1>{team.length} MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faChild} /> Active
          </h4>
        </Stat>
        <Stat>
          <h1>2 MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faMap} /> On Holiday
          </h4>
        </Stat>
        <Stat>
          <h1>4 MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faHome} /> Working from home
          </h4>
        </Stat>
      </Columns>

      <Columns>
        <div>
          <h3>Active Members</h3>
          <DataTable
            data={team}
            cells={UserCells}
            columns={['fullName', 'email']}
            onRowClick={onUserSelect}
          />
        </div>
        <div>
          <h3>
            Member's Pending Holidays{' '}
            {teamHolidays != 0
              ? `(${teamHolidays.length} needing reviewed)`
              : null}
          </h3>
          <DataTable
            data={teamHolidays}
            cells={HolidayCells}
            columns={['employee', 'startDate', 'endDate']}
            onRowClick={holiday => selectHoliday(holiday)}
          />
        </div>
      </Columns>
    </Container>
  );
};

User.propTypes = {
  history: PT.object,
  team: PT.array,
  teamHolidays: PT.array,
  selectedUser: PT.object,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
  onUserSelect: PT.func.isRequired,
  hideUserModal: PT.func.isRequired,
  hideHolidayModal: PT.func.isRequired,
  userModalVisible: PT.bool.isRequired,
};

User.defaultProps = {
  team: [],
  teamHolidays: [],
  selectedUser: null,
};

export default container(User);
