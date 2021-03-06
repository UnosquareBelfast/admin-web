import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getEmployeesTeamsSnapshot } from '../../services/dashboardService';
import { getUser } from '../../store/reducers/';
import { setLoadingAsync } from '../../store/actions/loading';
import roles from '../../constants/roles';

const TeamDashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
      userDetails: PT.object.isRequired,
      setLoading: PT.func.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        clients: [],
        selectedTeam: null,
        selectedUser: null,
        userModalVisible: false,
      };
    }

    componentDidMount() {
      let shouldBeLoading = true;
      setTimeout(() => {
        if (shouldBeLoading) {
          this.props.setLoading(true);
        }
      }, 500);
      getEmployeesTeamsSnapshot().then(({ data }) => {
        shouldBeLoading = false;
        this.props.setLoading(false);
        if (data.length > 0) {
          this.setState({ clients: data });
        }
      });
    }

    selectTeam = team => this.setState({ selectedTeam: team });

    selectUser = user => {
      this.setState({ selectedUser: user, userModalVisible: true });
    };

    closeUserModal = () => {
      this.setState({ userModalVisible: false });
    };

    render() {
      const { history, userDetails } = this.props;
      const {
        clients,
        selectedTeam,
        selectedUser,
        userModalVisible,
      } = this.state;

      const hasExtraPermissions = userDetails.employeeRoleId !== roles.STANDARD;

      return (
        <Wrapped
          history={history}
          clients={clients}
          selectTeam={this.selectTeam}
          onUserSelect={this.selectUser}
          selectedTeam={selectedTeam}
          selectedUser={selectedUser}
          closeUserModal={this.closeUserModal}
          userModalVisible={userModalVisible}
          hasExtraPermissions={hasExtraPermissions}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: shouldBeLoading => dispatch(setLoadingAsync(shouldBeLoading)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  TeamDashboardContainer
);
