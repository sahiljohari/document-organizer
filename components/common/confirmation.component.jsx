import ModalComponent from "./modal.component";

const style = {
  content: {
    position: "absolute",
    top: "calc(50% - 8rem)",
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
    minWidth: "10rem",
    maxWidth: "24rem",
    margin: "0 auto",
    textAlign: "center",
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

const Confirmation = ({
  title,
  message,
  highlight,
  handleConfirm,
  isOpen,
  onRequestClose,
  ...otherProps
}) => {
  return (
    <ModalComponent isOpen={isOpen} customStyle={style} {...otherProps}>
      <h2 className="uppercase text-2xl mb-4 font-medium">{title}</h2>
      <p>{message}</p>
      <p className="italic font-medium text-yellow-700 my-2">{highlight}</p>
      <div className="flex flex-row w-1/2 mx-auto justify-center">
        <button
          onClick={handleConfirm}
          className="w-24 flex items-center justify-center mt-4 mr-4 rounded-md border border-gray-300 px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
        >
          Yes
        </button>
        <button
          onClick={onRequestClose}
          className="w-24 flex items-center justify-center mt-4 rounded-md border border-gray-300 px-3 py-2 bg-white hover:bg-gray-800 hover:text-white duration-200"
        >
          No
        </button>
      </div>
    </ModalComponent>
  );
};

export default Confirmation;
