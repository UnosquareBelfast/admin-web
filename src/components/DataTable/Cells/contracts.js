import moment from 'moment';

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: contract => {
    const startDate = new moment(contract.startDate, 'YYYY-MM-DD');
    return startDate.format('Do MMMM YYYY');
  },
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
};

const teamName = {
  id: 'teamName',
  Header: 'Team',
  accessor: contract => contract.team.teamName,
};

export default {
  startDate,
  endDate,
  teamName,
};
