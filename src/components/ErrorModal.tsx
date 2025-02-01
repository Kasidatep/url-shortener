import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the root element for accessibility

interface ErrorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Error Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ErrorModal;