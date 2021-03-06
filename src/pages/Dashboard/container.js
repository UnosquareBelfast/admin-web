import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchEvents, setEventView } from '../../store/actions/dashboard';
import eventCategory from '../../constants/eventCategory';
import { getUser, getEventView, getAllEvents } from '../../store/reducers';
import eventsView from '../../constants/eventsView';
import moment from 'moment';
import eventTypes from '../../constants/eventTypes';
import holidayStatus from '../../constants/holidayStatus';
import {
  checkIfPastDatesSelected,
  checkIfDatesFallOnWeekend,
} from '../../utilities/dashboardEvents';
import { checkSameMonth } from '../../utilities/dates';
import { Toast } from '../../config/Notifications';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      setEventView: PT.func.isRequired,
      eventView: PT.number.isRequired,
      fetchEvents: PT.func.isRequired,
      allEvents: PT.array,
      isEventBeingUpdated: PT.bool,
      history: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        calendarDate: new moment().format('YYYY-MM-DD'),
        filteredEvents: [],
        activeEventTypeIds: [],
        activeHolidayStatusIds: [],
        activeEmployee: -1,
        bookingModalVisible: false,
        bookingModalDismount: false,
        selectedBooking: {
          start: moment(),
          end: moment(),
          isBeingUpdated: false,
        },
      };
    }

    componentDidMount() {
      const { setEventView } = this.props;
      setEventView(eventsView.PERSONAL_EVENTS);
      this.fetchEvents(eventsView.PERSONAL_EVENTS, true);

      // This will be called when the user navigates away from the page.
      this.removeRouterListener = this.props.history.listen(() => {
        setEventView(eventsView.PERSONAL_EVENTS);
      });
    }

    componentDidUpdate = prevProps => {
      if (prevProps.allEvents !== this.props.allEvents) {
        this.setState({ filteredEvents: [...this.props.allEvents] });
      }
    };

    componentWillUnmount() {
      this.removeRouterListener();
    }

    toggleEventsView = () => {
      const { eventView, setEventView } = this.props;
      let updatedEventView;
      if (eventView === eventsView.PERSONAL_EVENTS) {
        updatedEventView = eventsView.TEAM_EVENTS;
      } else {
        updatedEventView = eventsView.PERSONAL_EVENTS;
      }
      setEventView(updatedEventView);
      this.fetchEvents(updatedEventView, true);
    };

    toggleBookingModal = isVisible => {
      this.setState({ bookingModalVisible: isVisible }, () => {
        if (!isVisible) {
          // This is a bit of a hack to dismount after the animation is finished.
          // It's ugly but it works well.
          setTimeout(() => {
            this.setState({
              bookingModalDismount: !this.state.bookingModalDismount,
            });
          }, 300);
        }
      });
    };

    filterCalenderEvents = () => {
      let filteredEvents = [...this.props.allEvents];
      const {
        activeEmployee,
        activeHolidayStatusIds,
        activeEventTypeIds,
      } = this.state;

      filteredEvents = this.filterEmployee(filteredEvents, activeEmployee);
      filteredEvents = this.filterEvents(
        filteredEvents,
        activeHolidayStatusIds,
        activeEventTypeIds
      );

      this.setState({ filteredEvents });
    };

    // Filter Employees

    filterEmployee = (filteredEvents, activeEmployee) => {
      if (activeEmployee === -1) {
        return filteredEvents;
      } else {
        return filteredEvents.filter(hol => {
          if (!hol.employee || hol.employee.employeeId == activeEmployee) {
            return true;
          }
        });
      }
    };

    // Filter Events

    filterEvents = (
      filteredEvents,
      activeHolidayStatusIds,
      activeEventTypeIds
    ) => {
      if (
        activeHolidayStatusIds.length === 0 &&
        activeEventTypeIds.length === 0
      ) {
        return filteredEvents;
      } else {
        let tempFilter = filteredEvents.filter(
          hol =>
            activeHolidayStatusIds.includes(hol.eventStatus.eventStatusId) ||
            activeEventTypeIds.includes(hol.eventType.eventTypeId)
        );
        if (
          activeHolidayStatusIds.includes(holidayStatus.PENDING) &&
          !activeEventTypeIds.includes(eventTypes.WFH)
        ) {
          return tempFilter.filter(
            event => event.eventType.eventTypeId === eventTypes.ANNUAL_LEAVE
          );
        }
        return tempFilter;
      }
    };

    setActiveEvents = (category, eventId) => {
      if (category == eventCategory.HOLIDAY_STATUS) {
        this.setState(
          { activeHolidayStatusIds: eventId },
          this.filterCalenderEvents
        );
      } else if (category == eventCategory.EVENT_TYPE) {
        this.setState(
          { activeEventTypeIds: eventId },
          this.filterCalenderEvents
        );
      }
    };

    setActiveEmployee = employeeId => {
      this.setState({ activeEmployee: employeeId }, this.filterCalenderEvents);
    };

    handleCalendarNavigate = date => {
      const newDate = new moment(date);
      this.setState(
        {
          calendarDate: newDate.format('YYYY-MM-DD'),
        },
        this.fetchEvents
      );
    };

    fetchEvents = (eventView = this.props.eventView, force = false) => {
      const { calendarDate } = this.state;
      this.props.fetchEvents(calendarDate, eventView, force);
    };

    validateSlotSelection = slot => {
      const { calendarDate } = this.state;

      if (!checkSameMonth(slot.start, calendarDate)) {
        return false;
      }

      if (checkIfPastDatesSelected(slot.start)) {
        Toast({
          type: 'warning',
          title: 'Cannot select past dates',
        });
        return false;
      }

      if (checkIfDatesFallOnWeekend(slot.start, slot.end)) {
        Toast({
          type: 'warning',
          title: 'Cannot select weekends',
        });
        return false;
      }

      return true;
    };
    
    checkIfMandatoryEvent = ({eventType}) => {

      const isMandatoryDate = eventType.eventTypeId === eventTypes.PUBLIC_HOLIDAY;

      // alert message if true
      if (isMandatoryDate) {
        Toast({
          type: 'warning',
          title: 'Cannot select mandatory events',
        });
        return true;
      } else {
        return false;
      }
    }

    selectCalendarSlot = bookingEvent => {
      const {
        userDetails: { employeeId },
      } = this.props;

      if (bookingEvent.hasOwnProperty('employee')) {
        if (bookingEvent.employee.employeeId === employeeId) {
          if (!this.checkIfMandatoryEvent(bookingEvent)) {
            this.setState(
              {
                selectedBooking: { ...bookingEvent },
              },
              () => this.toggleBookingModal(true)
            );
          }
        }
      } else {
        if (this.validateSlotSelection(bookingEvent)) {
          this.setState(
            {
              selectedBooking: { ...bookingEvent },
            },
            () => this.toggleBookingModal(true)
          );
        }
      }
    };

    render() {
      const {
        filteredEvents,
        bookingModalVisible,
        bookingModalDismount,
        selectedBooking,
      } = this.state;
      const {
        userDetails,
        userDetails: { employeeId },
        allEvents,
        eventView,
      } = this.props;

      return (
        userDetails && (
          <Wrapped
            employeeId={employeeId}
            allEvents={allEvents}
            onToggleEventsView={this.toggleEventsView}
            eventView={eventView}
            filteredEvents={filteredEvents}
            refreshCalendar={() => this.fetchEvents(eventView, true)}
            onUpdateEvents={(category, activeEventIds) =>
              this.setActiveEvents(category, activeEventIds)
            }
            onUpdateEmployee={employeeId =>
              this.setActiveEmployee(parseInt(employeeId))
            }
            onCalendarNavigate={this.handleCalendarNavigate}
            toggleBookingModal={this.toggleBookingModal}
            bookingModalVisible={bookingModalVisible}
            bookingModalDismount={bookingModalDismount}
            selectCalendarSlot={this.selectCalendarSlot}
            selectedBooking={selectedBooking}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    eventView: getEventView(state),
    allEvents: getAllEvents(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: (date, eventView, force) =>
      dispatch(fetchEvents(date, eventView, force)),
    setEventView: eventView => dispatch(setEventView(eventView)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DashboardContainer
);
