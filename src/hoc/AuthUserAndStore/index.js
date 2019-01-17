import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import store from '../../store';
import { updateUser } from '../../actions/user';
import { getSignedInUser } from '../../services/userService';

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

    getSignedInUser().then(({ data }) => {
      console.log(data);
      store.dispatch(updateUser(data));
      this.setState({ loading: false });
    });
  }

  render() {
    return { ...this.props.children };
  }
}

AuthUserAndStore.propTypes = {
  children: PT.node,
  history: PT.object,
};

export default AuthUserAndStore;
