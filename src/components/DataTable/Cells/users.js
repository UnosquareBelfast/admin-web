const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => `${user.forename} ${user.surname}`,
};

const name = {
  id: 'name',
  Header: 'Name',
  accessor: user => user.name || `${user.forename} ${user.surname}`,
};

const email = {
  id: 'email',
  Header: 'Email',
  accessor: user => user.email,
};

const location = {
  id: 'location',
  Header: 'Location',
  accessor: user => user.countryDescription,
};

const role = {
  id: 'role',
  Header: 'Role',
  accessor: user => user.employeeRoleDescription,
};

const state = {
  id: 'state',
  Header: 'Today\'s status',
  accessor: user => user.location,
};

export default {
  fullName,
  name,
  state,
  email,
  location,
  role,
};
