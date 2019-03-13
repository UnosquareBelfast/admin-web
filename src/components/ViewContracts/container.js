import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Toast } from '../../config/Notifications';
import swal from 'sweetalert2';

import { getUserByName } from '../../services/userService';
import { getContractsByEmployeeId } from '../../services/contractService';

export default Wrapped =>
  class extends Component {

    static propTypes = {
      history: PT.shape({
        push: PT.func.isRequired,
      }),
    }

    constructor(props) {
      super(props);
      this.state = {
        users: [],
        contracts: [],
      };
    }

    getContracts = (selectedUserId) => {
      getContractsByEmployeeId(selectedUserId)
        .then(response => {
          const contracts = response.status === 200 ? response.data : [];
          this.setState({ contracts });
        })
        .catch(error =>
          swal('Error'`Error finding contracts: ${error.message}`, 'error')
        );
    };

    getUsers = ({ fullName }) => {
      const fullNameArray = fullName.split(' ');
      const forename = fullNameArray[0];
      const surname = fullNameArray[1];
      getUserByName(forename, surname).then(response => {
        const users = response.data;
        Toast({
          type: 'success',
          title: `${users.length} employee${users.length > 1 ? 's' : ''} found! 👍`,
        });
        const formattedUsers = users.reduce((acc, user) => {
          acc.push({
            value: user.employeeId,
            displayValue: `${user.forename} ${user.surname} (${user.email})`,
          });
          return acc;
        }, []);
        formattedUsers.unshift({
          value: '-1',
          displayValue: 'Please select an employee',
        });
        this.setState(
          {
            users: formattedUsers,
          }
        );
      })
        .catch(() =>
          swal(
            'Error',
            `Could not retreive contracts for ${fullName}. Please try again`,
            'error',
          ),
        );
    };

    render() {
      return (
        <Wrapped
          navigateTo={this.props.history.push}
          users={this.state.users}
          contracts={this.state.contracts}
          getUsers={this.getUsers}
          contractSearch={this.getContracts}
        />
      );
    }
  };
