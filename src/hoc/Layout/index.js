import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { withRouter } from 'react-router';
import container from './container';
import NavMenu from './nav-menu';
import { LayoutContainer, Input } from './styled';
import { FullPageLoader } from '../../components';

export const Layout = props => {
  const { toggleDrawer, drawerOpen, children, history, menuItems } = props;

  const drawer = (
    <Fragment>
      <Input
        type="checkbox"
        id="toggle-drawer"
        onChange={toggleDrawer}
        checked={drawerOpen}
      />
      <NavMenu
        history={history}
        menuItems={menuItems}
        closeDrawer={toggleDrawer}
        drawerIsOpen={drawerOpen}
      />
    </Fragment>
  );

  return (
    <Fragment>
      {drawer}
      <LayoutContainer history={history.location.pathname}>
        <FullPageLoader />
        {children}
      </LayoutContainer>
    </Fragment>
  );
};

Layout.propTypes = {
  menuItems: PT.array.isRequired,
  history: PT.object.isRequired,
  children: PT.node.isRequired,
  drawerOpen: PT.bool.isRequired,
  toggleDrawer: PT.func.isRequired,
};
export default withRouter(container(Layout));
