import { standardTextFilter } from './cellUtils';

const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => user.name,
  filterMethod: ({ value }, { fullName }) => standardTextFilter(fullName, value),
};
  
const state = {
  id: 'state',
  Header: 'State',
  accessor: user => user.state,
  filterMethod: ({ value }, { state }) => standardTextFilter(state, value),
};
  
const team = {
  id: 'team',
  Header: 'Team',
  accessor: user => user.team,
  filterMethod: ({ value }, { team }) => standardTextFilter(team, value),
};
  
  
export default {
  fullName,
  state,
  team,
};
  
