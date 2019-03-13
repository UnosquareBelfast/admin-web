import { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import store from '../../store';
import { updateUser } from '../../store/actions/user';
import { getSignedInUser, checkAuth } from '../../services/userService';
import AzureInstance from '../../config/AzureInstance';

class AuthUserAndStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      isAuthenticated: false,
      isRegistered: false,
    };
  }

  componentDidMount() {
    // Do a silent check on the token to check authentication.
    this.checkPrevExpire();
    this.checkToken();
  }

  checkPrevExpire() {
    if (localStorage.getItem('ac-prev-expired') === 'true') {
      Swal({
        title: 'Logged Out',
        text: 'Your session has expired',
        type: 'error',
      });
      localStorage.removeItem('ac-prev-expired');
    }
  }

  checkToken() {
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
    checkAuth().then(response => {
      if (response.status === 200) {
        getSignedInUser().then(({ data }) => {
          store.dispatch(updateUser(data));
          this.setState({ loading: false, isRegistered: true });
        });
      } else {
        this.setState({ isRegistered: false, loading: false });
      }
    });
  }

  render() {
    const { render } = this.props;
    const { isAuthenticated, isRegistered, loading } = this.state;

    return render(isAuthenticated, isRegistered, loading);
  }
}

AuthUserAndStore.propTypes = {
  render: PT.func.isRequired,
};

export default AuthUserAndStore;
