import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { MainContentContainer } from './styled';
import { DataTable, HolidayModal } from '../../components/';
import { TabsUI } from '../../components/common';
import ContractCells from '../../components/DataTable/Cells/contracts';
import HolidayCells from '../../components/DataTable/Cells/holidays';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCheck,
  faSpinner,
} from '@fortawesome/fontawesome-free-solid';

const Profile = props => {
  const {
    userHolidays,
    userDetails,
    selectedHoliday,
    selectHoliday,
    closeModal,
    contracts,
    contractsLoading,
    holidaysLoading,
    holidayStats,
  } = props;
  const { forename, surname } = userDetails;
  const { availableHolidays, pendingHolidays, approvedHolidays } = holidayStats;
  return (
    <Fragment>
      <HolidayModal holiday={selectedHoliday} closeModal={closeModal} />
      <MainContentContainer>
        <div>
          <h2>
            Profile - {forename} {surname}
          </h2>
        </div>
        <div className="holidayinfo">
          <div className="columns">
            <div>
              <h1>{availableHolidays} Days</h1>
              <h4>
                <FontAwesomeIcon icon={faCalendar} /> Remaining
              </h4>
            </div>
            <div>
              <h1>{approvedHolidays} Days</h1>
              <h4>
                <FontAwesomeIcon icon={faCheck} /> Booked
              </h4>
            </div>
            <div>
              <h1>{pendingHolidays} Days</h1>
              <h4>
                <FontAwesomeIcon icon={faSpinner} /> Pending
              </h4>
            </div>
          </div>

          <TabsUI 
            selectedTab={props.selectedTab}
            updateSelectedTab={props.updateSelectedTab}
            tabs={['My Holidays', 'My Contracts']}
          />

          {
            props.selectedTab === 'My Holidays' ?
              <DataTable
                loading={holidaysLoading}
                data={userHolidays}
                cells={HolidayCells}
                columns={['status', 'startDate', 'endDate', 'requestedDate']}
                onRowClick={holiday => selectHoliday(holiday)}
              />
              :
              <DataTable
                loading={contractsLoading}
                data={contracts}
                cells={ContractCells}
                columns={['clientName', 'teamName', 'startDate', 'endDate']}
                pageSize={10}
              />
          }

        </div>
      </MainContentContainer>
    </Fragment>
  );
};

Profile.propTypes = {
  userDetails: PT.object.isRequired,
  userHolidays: PT.array.isRequired,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
  closeModal: PT.func.isRequired,
  contracts: PT.array.isRequired,
  contractsLoading: PT.bool.isRequired,
  holidaysLoading: PT.bool.isRequired,
  holidayStats: PT.object.isRequired,
  selectedTab: PT.string.isRequired,
  updateSelectedTab: PT.func.isRequired,
};

Profile.defaultProps = {
  daysBooked: 0,
  daysPending: 0,
};

export default container(Profile);
