import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Rodal from 'rodal';

const Modal = props => {
  const { children, visible, closeModal, minWidth } = props;
  const customStyles = {
    width: minWidth,
    minWidth: '400px',
    height: 'auto',
    bottom: 'auto',
    top: '60px',
  };
  return (
    <Rodal
      visible={visible}
      onClose={closeModal}
      customStyles={customStyles}
      {...props}
    >
      {children}
    </Rodal>
  );
};

Modal.propTypes = {
  minWidth: PT.string,
  children: PT.node.isRequired,
  closeModal: PT.func,
  visible: PT.bool,
};

Modal.defaultProps = {
  minWidth: '35%',
  closeModal: () => { },
  visible: true,
};

export default Modal;
