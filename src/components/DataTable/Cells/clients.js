import { standardTextFilter } from './cellUtils';

const clientName = {
  id: 'clientName',
  Header: 'Client',
  accessor: client => client.clientName,
  filterMethod: ({ value }, { clientName }) => standardTextFilter(clientName, value),
};

export default {
  clientName,
};
