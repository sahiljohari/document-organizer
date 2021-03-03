import Modal from "react-modal";

Modal.setAppElement("#__next");

const ModalComponent = ({ children, ...otherProps }) => (
  <Modal {...otherProps}>{children}</Modal>
);

export default ModalComponent;
