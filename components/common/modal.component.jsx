import Modal from "react-modal";

Modal.setAppElement("#__next");

const style = {
  content: {
    position: "absolute",
    top: "160px",
    left: "140px",
    right: "140px",
    bottom: "140px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    height: "fit-content",
    minWidth: "25%",
    maxWidth: "50%",
    margin: "0 auto",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const ModalComponent = ({ children, ...otherProps }) => (
  <Modal style={style} {...otherProps}>
    {children}
  </Modal>
);

export default ModalComponent;
