const teamName = {
  id: 'teamName',
  Header: 'Team Name',
  accessor: team => team.teamName,
  filterMethod: ({ value }, { teamName }) => teamName.toLowerCase().includes(value.toLowerCase()),
};

export default {
  teamName,
};
