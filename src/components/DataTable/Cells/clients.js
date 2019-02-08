const clientName = {
  id: 'clientName',
  Header: 'Client',
  accessor: client => client.clientName,
  filterMethod: ({ value }, { clientName }) => clientName.toLowerCase().includes(value.toLowerCase()),
};

export default {
  clientName,
};
