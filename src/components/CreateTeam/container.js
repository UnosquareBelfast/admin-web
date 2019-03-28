import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { Toast } from '../../config/Notifications';
import { getClientOptions } from '../../store/reducers';
import { postNewTeam } from '../../store/actions/teams';

const CreateContainer = Wrapped =>
  class extends Component {

    static propTypes = {
      postNewTeam: PT.func.isRequired,
      clientOptions: PT.array,
      history: PT.shape({
        replace: PT.func.isRequired,
      }),
    }

    onSuccess = (teamName, resetForm) => {
      resetForm();
      Toast({
        type: 'success',
        title: `${teamName} created sucessfully! 👍`,
      });
    }

    submitRequest = ({ selectedClient, teamName }, resetForm) => {
      const request = {
        clientId: selectedClient,
        teamName: teamName,
      };
      this.props.postNewTeam(request, this.onSuccess(teamName, resetForm));
    };

    render() {

      const { clientOptions, history: { replace } } = this.props;

      return (
        <Wrapped
          clientOptions={clientOptions}
          navigateTo={replace}
          submitRequest={this.submitRequest}
        />
      );
    }
  };

const mapStateToProps = state => {
  const clientOptions = getClientOptions(state);
  return {
    clientOptions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postNewTeam: (data, onSuccess) =>
      dispatch(postNewTeam(data, onSuccess)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), CreateContainer);
