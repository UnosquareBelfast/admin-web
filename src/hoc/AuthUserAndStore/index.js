import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Redirect } from 'react-router';
import store from '../../store';
import { updateUser } from '../../actions/user';
import { getProfile, isLoggedIn } from '../../utilities/currentUser';
import { getSignedInUser } from '../../services/userService';
import { Toast } from '../../utilities/Notifications';
import { Spinner } from '../../components/common';
import { isEmpty } from 'lodash';
import { SpinnerContainer, ErrorContainer } from './styled';
import { getToken } from '../../adalConfig';

class AuthUserAndStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: {},
    };
  }

  componentDidMount() {
    // const decodedToken = getProfile();
    // const userId = decodedToken.unique_name;
    // // getUserProfile(userId)
    // //   .then(({ data }) => {
    // //     store.dispatch(updateUser(data));
    // //     this.setState({ loading: false });
    // //   })
    // //   .catch(error => {
    // //     this.setState({ error });
    // //   });

    console.log('TOKEN', getToken());
    getSignedInUser().then(({ data }) => {
      console.log(data);
      store.dispatch(updateUser(data));
      this.setState({ loading: false });
    });
  }

  render() {
    // If not logged in, bring them to login page.
    // if (!isLoggedIn()) {
    //   return <Redirect to="/login" />;
    // }

    // If there was an error getting the profile.
    // if (!isEmpty(this.state.error)) {
    //   return (
    //     <ErrorContainer>
    //       <h2>Sorry.</h2>
    //       <p>There was an error, and we couldn't retrieve your profile.</p>
    //       <p>
    //         Refresh the page to retry. If the problem persists, contact an admin
    //         with the below details:
    //       </p>
    //       <p>{this.state.error.message}</p>
    //     </ErrorContainer>
    //   );
    // }

    // // If logged in, and profile request is loading.
    // if (this.state.loading) {
    //   return (
    //     <SpinnerContainer>
    //       <Spinner />
    //     </SpinnerContainer>
    //   );
    // }

    // Otherwise, all is fine, allow access to app.
    return { ...this.props.children };
  }
}

AuthUserAndStore.propTypes = {
  children: PT.node,
  history: PT.object,
};

export default AuthUserAndStore;
