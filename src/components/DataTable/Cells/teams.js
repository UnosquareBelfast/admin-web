import { standardTextFilter } from './cellUtils';

const teamName = {
  id: 'teamName',
  Header: 'Team Name',
  accessor: team => team.teamName,
  filterMethod: ({ value }, { teamName }) => standardTextFilter(teamName, value),
};

export default {
  teamName,
};
