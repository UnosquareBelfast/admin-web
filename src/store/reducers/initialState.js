import moment from 'moment';
import eventsView from '../../constants/eventsView';

export default {
  user: {
    forename: null,
    surname: null,
    email: null,
    countryId: null,
    employeeId: null,
    employeeRoleId: null,
    employeeStatusId: null,
    startDate: null,
    totalHolidays: null,
    holidays: {},
  },
  dashboard: {
    eventView: eventsView.PERSONAL_EVENTS,
    allEvents: [],
    filteredEvents: [],
    booking: {
      eventId: -1,
      title: null,
      start: new moment(),
      end: new moment(),
      isHalfday: false,
      eventType: {
        eventTypeId: 1,
        description: 'Annual leave',
      },
      eventStatus: {
        eventStatusId: 1,
        description: 'Awaiting Approval',
      },
      employee: null,
    },
    bookingDuration: 1,
    bookingModalOpen: false,
    isEventBeingUpdated: false,
    error: null,
  },
  employees: {
    selectedEmployeeId: -1,
    employees: [],
    isLoading: false,
    loadError: false,
    resultCount: 0,
  },
  teams: {
    selectedTeamId: -1,
    teams: [],
    isLoading: false,
    loadError: false,
    resultCount: 0,
  },
  clients: {
    selectedClientId: -1,
    clients: [],
    isLoading: false,
    loadError: false,
    resultCount: 0,
  },
  loading: {
    loading: false,
    startedAt: null,
  },
};