import { roleText } from '../../../utilities/roles';
import { countryText } from '../../../utilities/countries';

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
  accessor: user => countryText[user.countryId],
};

const role = {
  id: 'role',
  Header: 'Role',
  accessor: user => roleText[user.employeeRoleId],
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
