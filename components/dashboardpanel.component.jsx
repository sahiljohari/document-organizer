import { useState } from "react";
import { useDocumentState } from "../utils/documentContext";
import { ADD_DOCUMENT } from "../utils/constants";
import ModalComponent from "../components/common/modal.component";
import ItemList from "../components/itemlist.component";

const DashboardPanel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { performTransaction } = useDocumentState();

  return (
    <>
      <div className="flex flex-col mx-auto my-5 max-w-5xl">
        <button
          onClick={() => setModalIsOpen(true)}
          className="ml-auto rounded-md border px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
        >
          Add Document
        </button>
        <ItemList />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <p>[placeholder for form to add/edit a document]</p>
      </ModalComponent>
    </>
  );
};

export default DashboardPanel;
