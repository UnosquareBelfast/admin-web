import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../store/reducers';
import roles from '../../constants/roles';

const AdminContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object,
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
      };
    }

    componentDidMount() {
      if (this.props.userDetails.employeeRoleId !== roles.ADMIN) {
        this.props.history.replace('/');
      }
    }

    render() {
      return (
        this.props.userDetails && <Wrapped {...this.state} {...this.props} />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), AdminContainer);
