import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import roles from '../../constants/roles';
import menuItems, { adminItems } from '../../config/navConfig';

const NavContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        drawerOpen: false,
        menuItems,
      };
    }

    componentWillMount() {
      if (this.props.userDetails.employeeRoleId === roles.ADMIN) {
        this.setState({ menuItems: [...menuItems, ...adminItems] });
      }
    }

    toggleDrawer = () => {
      const drawerOpen = !this.state.drawerOpen; 
      this.setState({ drawerOpen });
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          toggleDrawer={this.toggleDrawer}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), NavContainer);
