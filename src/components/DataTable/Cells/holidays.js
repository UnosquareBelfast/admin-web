import React from 'react';
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
  filterMethod: ({ value }, { status }) =>
    statusText[status].toLowerCase().includes(value.toLowerCase()),
};

const employee = {
  id: 'employee',
  Header: 'Employee',
  accessor: ({ employee }) => `${employee.forename} ${employee.surname}`,
  filterMethod: ({ value }, { employee }) => employee.toLowerCase().includes(value.toLowerCase()),
};

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: holiday => holiday.eventDates[0].startDate,

  Cell: cell => moment(cell.row.startDate).format('Do MMM YYYY'),
  sortMethod: (a, b) => (moment(a).isBefore(moment(b)) ? 1 : -1),
  filterMethod: ({ value }, { startDate }) =>
    moment(startDate)
      .format('Do MMM YYYY')
      .toLowerCase()
      .includes(value.toLowerCase()),
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: holiday =>
    holiday.eventDates[holiday.eventDates.length - 1].endDate,
  Cell: cell => moment(cell.row.endDate).format('Do MMM YYYY'),
  sortMethod: (a, b) => (moment(a).isBefore(moment(b)) ? 1 : -1),
  filterMethod: ({ value }, { endDate }) =>
    moment(endDate)
      .format('Do MMM YYYY')
      .toLowerCase()
      .includes(value.toLowerCase()),
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

  filterMethod: ({ value }, { requestedDate }) => requestedDate.toLowerCase().includes(value.toLowerCase()),

};

export default {
  status,
  startDate,
  endDate,
  requestedDate,
  employee,
};
