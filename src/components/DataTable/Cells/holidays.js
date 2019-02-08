import React from 'react';
import { dateFilter, standardTextFilter, dateSort } from './cellUtils';
import holidayStatus, { statusText } from '../../../utilities/holidayStatus';
import { theme } from '../../../styled';
import moment from 'moment';


const status = {
  id: 'status',
  Header: 'Status',
  width: 110,
  accessor: holiday => holiday.eventStatus.eventStatusId,
  Cell: cell => statusText[cell.row.status],
  getProps: (state, rowInfo) => {
    if (!rowInfo) return {};
    return {
      style: {
        color: theme.holidayStatus[rowInfo.original.eventStatus.eventStatusId],
        fontWeight: 600,
      },
    };
  },
  filterMethod: ({ value }, { status }) => standardTextFilter(statusText[status], value),
};

const employee = {
  id: 'employee',
  Header: 'Employee',
  accessor: ({ employee }) => `${employee.forename} ${employee.surname}`,
  filterMethod: ({ value }, { employee }) => standardTextFilter(employee, value),
};

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: holiday => holiday.eventDates[0].startDate,

  Cell: cell => moment(cell.row.startDate).format('Do MMM YYYY'),
  sortMethod: dateSort,
  filterMethod: ({ value }, { startDate }) => dateFilter(startDate, value),
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: holiday =>
    holiday.eventDates[holiday.eventDates.length - 1].endDate,
  Cell: cell => moment(cell.row.endDate).format('Do MMM YYYY'),
  sortMethod: dateSort,
  filterMethod: ({ value }, { endDate }) => dateFilter(endDate, value),
};

const requestedDate = {
  id: 'requestedDate',
  Header: 'Requested',
  accessor: holiday => {
    const today = moment();
    const diff = today.diff(holiday.dateCreated, 'days');
    if (
      diff >= 5 &&
      holiday.eventStatus.eventStatusId === holidayStatus.PENDING
    ) {
      return (
        <span style={{ color: 'red', fontWeight: 600 }}>{diff} Days Ago</span>
      );
    }
    return diff > 0 ? `${diff} Days Ago` : 'Today';
  },

  filterMethod: ({ value }, { requestedDate }) => 
    standardTextFilter(requestedDate, value),
};

export default {
  status,
  startDate,
  endDate,
  requestedDate,
  employee,
};
