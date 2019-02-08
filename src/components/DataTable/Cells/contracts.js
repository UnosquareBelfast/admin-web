import moment from 'moment';
import { dateFilter, standardTextFilter, dateSort } from './cellUtils';

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: contract => contract.startDate,
  Cell: cell => moment(cell.row.startDate).format('Do MMM YYYY'),
  sortMethod: dateSort,
  filterMethod: ({ value }, { startDate }) => dateFilter(startDate, value),
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
  sortMethod: dateSort,
  filterMethod: ({ value }, { endDate }) => dateFilter(endDate, value),
};

const clientName = {
  id: 'clientName',
  Header: 'Client',
  accessor: contract => contract.clientName,
  filterMethod: ({ value }, { clientName }) => standardTextFilter(clientName, value),
};

const teamName = {
  id: 'teamName',
  Header: 'Team',
  accessor: contract => contract.team.teamName,
  filterMethod: ({ value }, { teamName }) => standardTextFilter(teamName, value),
};

export default {
  startDate,
  endDate,
  clientName,
  teamName,
};
