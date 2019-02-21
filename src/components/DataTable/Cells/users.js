import { countryText } from '../../../constants/countries';
import { standardTextFilter } from './cellUtils';

const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => `${user.forename} ${user.surname}`,
  filterMethod: ({ value }, { fullName }) =>
    standardTextFilter(fullName, value),
};

const name = {
  id: 'name',
  Header: 'Name',
  accessor: user => user.name || `${user.forename} ${user.surname}`,
  filterMethod: ({ value }, { name }) => standardTextFilter(name, value),
};

const email = {
  id: 'email',
  Header: 'Email',
  accessor: user => user.email,
  filterMethod: ({ value }, { email }) => standardTextFilter(email, value),
};

const location = {
  id: 'location',
  Header: 'Location',
  accessor: user => countryText[user.countryId],
  filterMethod: ({ value }, { location }) =>
    standardTextFilter(location, value),
};

const role = {
  id: 'role',
  Header: 'Role',
  accessor: user => user.employeeRoleDescription,
  filterMethod: ({ value }, { role }) => standardTextFilter(role, value),
};

const state = {
  id: 'state',
  Header: 'Today\'s status',
  accessor: user => user.location,
  filterMethod: ({ value }, { state }) => standardTextFilter(state, value),
};

export default {
  fullName,
  name,
  state,
  email,
  location,
  role,
};
