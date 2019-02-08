const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => `${user.forename} ${user.surname}`,
  filterMethod: ({ value }, { fullName }) => fullName.toLowerCase().includes(value.toLowerCase()),
};

const name = {
  id: 'name',
  Header: 'Name',
  accessor: user => user.name || `${user.forename} ${user.surname}`,
  filterMethod: ({ value }, { name }) => name.toLowerCase().includes(value.toLowerCase()),
};

const email = {
  id: 'email',
  Header: 'Email',
  accessor: user => user.email,
  filterMethod: ({ value }, { email }) => email.toLowerCase().includes(value.toLowerCase()),
};

const location = {
  id: 'location',
  Header: 'Location',
  accessor: user => user.countryDescription,
  filterMethod: ({ value }, { location }) => location.toLowerCase().includes(value.toLowerCase()),
};

const role = {
  id: 'role',
  Header: 'Role',
  accessor: user => user.employeeRoleDescription,
  filterMethod: ({ value }, { role }) => role.toLowerCase().includes(value.toLowerCase()),
};

const state = {
  id: 'state',
  Header: 'Today\'s status',
  accessor: user => user.location,
  filterMethod: ({ value }, { state }) => state.toLowerCase().includes(value.toLowerCase()),
};

export default {
  fullName,
  name,
  state,
  email,
  location,
  role,
};
