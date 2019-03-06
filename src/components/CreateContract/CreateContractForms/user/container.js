import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import swal from 'sweetalert2';
import { getUserByName } from '../../../../services/userService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
    };

    state = {
      users: [],
    };

    handleUserSectionSubmit = ({selectedUserId}) => {
      
      let selectedUser = this.state.users.filter(
        user => user.value == selectedUserId
      );
      selectedUser = selectedUser[0];

      const data = {
        selectedUser,
      };

      return this.props.onSuccess(data);
    };

    handleUserSearch = (forename, surname) => {

      getUserByName(forename, surname)
        .then(response => {
          const users = response.data;
          const usersFormatted = users.reduce((acc, user) => {
            acc.push({
              value: parseInt(user.employeeId),
              displayValue: `${user.forename} ${user.surname} (${user.email})`,
            });
            return acc;
          }, []);
          usersFormatted.unshift({
            value: '-1',
            displayValue: 'Please select a user',
          });
          this.setState({
            users: usersFormatted,
          });
        })
        .catch(error =>
          swal(
            'Error',
            `Could not retreive clients: ${error.message}`,
            'error',
          ),
        );
    };

    handleUserFormReset = resetForm => {
      this.setState({
        users: [],
      }, () => {
        resetForm();
      });
    };

    render() {
      return (
        <Wrapped
          users={this.state.users}
          handleUserSectionSubmit={this.handleUserSectionSubmit}
          searchUser={this.handleUserSearch}
          handleFormReset={this.handleUserFormReset}
        />
      );
    }
  };
