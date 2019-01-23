import { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import store from '../../store';
import { updateUser } from '../../actions/user';
import { getSignedInUser } from '../../services/userService';
import AzureInstance from '../../utilities/AzureInstance';

class AuthUserAndStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    // Do a silent check on the token to check authentication.
    if (localStorage.getItem('msal.idtoken')) {
      AzureInstance.acquireTokenSilent(['user.read'])
        .then(() => {
          this.setState({ isAuthenticated: true }, this.storeUser);
        })
        .catch(error => {
          this.setState({ isAuthenticated: false, error, loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  storeUser() {
    getSignedInUser().then(({ data }) => {
      store.dispatch(updateUser(data));
      this.setState({ loading: false });
    });
  }

  render() {
    const { render } = this.props;
    const { isAuthenticated, loading } = this.state;

    return render(isAuthenticated, loading);
  }
}

AuthUserAndStore.propTypes = {
  render: PT.func.isRequired,
};

export default AuthUserAndStore;
