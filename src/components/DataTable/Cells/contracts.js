import moment from 'moment';

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: contract => {
    const startDate = new moment(contract.startDate, 'YYYY-MM-DD');
    return startDate.format('Do MMMM YYYY');
  },
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
  accessor: contract => {
    const endDate = new moment(contract.endDate, 'YYYY-MM-DD');
    if (endDate.year() === 1) {
      return 'Ongoing';
    }
    return endDate.format('Do MMMM YYYY');
  },
  sortMethod: (a, b) => (moment(a).isBefore(moment(b)) ? 1 : -1),
  filterMethod: ({ value }, { endDate }) =>
    moment(endDate)
      .format('Do MMM YYYY')
      .toLowerCase()
      .includes(value.toLowerCase()),
};

const clientName = {
  id: 'clientName',
  Header: 'Client',
  accessor: contract => contract.clientName,
  filterMethod: ({ value }, { clientName }) => clientName.toLowerCase().includes(value.toLowerCase()),
};

const teamName = {
  id: 'teamName',
  Header: 'Team',
  accessor: contract => contract.team.teamName,
  filterMethod: ({ value }, { teamName }) => teamName.toLowerCase().includes(value.toLowerCase()),
};

export default {
  startDate,
  endDate,
  clientName,
  teamName,
};
