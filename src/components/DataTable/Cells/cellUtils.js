import moment from 'moment';

// All of the following are for use in filter and sort methods within react-table.

export const standardTextFilter = (textToMatch, search) => {
  return textToMatch.toLowerCase().includes(search.toLowerCase());
};

export const dateFilter = (dateToMatch, search) => {
  return moment(dateToMatch)
    .format('Do MMM YYYY')
    .toLowerCase()
    .includes(search.toLowerCase());
};

export const dateSort = (dateA, dateB) => {
  return moment(dateA).isBefore(moment(dateB)) ? 1 : -1; 
}