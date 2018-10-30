import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { InputText } from '../../common_styled';
import { sendMessage } from '../../../services/holidayService';
import messageType from '../../../utilities/messageTypes';
import Button from '../../common/Button';

export default class RejectionForm extends Component {
  static propTypes = {
    eventId: PT.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      rejectionMessage: '',
    };
  }

  handleRejectionMessageChange = event => {
    const { value } = event.target;
    this.setState({ rejectionMessage: value });
  };

  handleSubmit = () => {
    const { rejectionMessage } = this.state;
    const { eventId } = this.props;
    if (rejectionMessage) {
      sendMessage(eventId, messageType.GENERAL, rejectionMessage);
    }
  };

  render() {
    const { rejectionMessage } = this.state;
    return (
      <Fragment>
        <label htmlFor="rejectionInput">Rejection Message:</label>
        <InputText
          id="rejectionInput"
          onChange={this.handleRejectionMessageChange}
          value={this.state.rejectionMessage}
        />
        <Button
          onClick={this.handleSubmit}
          disabled={!rejectionMessage}
          label="Submit"
        />
      </Fragment>
    );
  }
}
