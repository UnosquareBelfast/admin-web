const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => user.name,
  filterMethod: ({ value }, { fullName }) => fullName.toLowerCase().includes(value.toLowerCase()),
};
  
const state = {
  id: 'state',
  Header: 'State',
  accessor: user => user.state,
  filterMethod: ({ value }, { state }) => state.toLowerCase().includes(value.toLowerCase()),
};
  
const team = {
  id: 'team',
  Header: 'Team',
  accessor: user => user.team,
  filterMethod: ({ value }, { team }) => team.toLowerCase().includes(value.toLowerCase()),
};
  
  
export default {
  fullName,
  state,
  team,
};
  
