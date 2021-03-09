import { useState } from "react";
import uuid from "react-uuid";
import { useToasts } from "react-toast-notifications";
import { useDocumentState } from "../utils/documentContext";

import {
  ADD_DOCUMENT,
  EDIT_DOCUMENT,
  DELETE_DOCUMENT,
  INITIAL_FORM_STATE,
} from "../utils/constants";
import ModalComponent from "../components/common/modal.component";
import ItemList from "../components/itemlist.component";
import DocumentForm from "../components/documentform.component";

const DashboardPanel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const { performTransaction } = useDocumentState();
  const { addToast } = useToasts();

  const resetForm = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setFormState(INITIAL_FORM_STATE);
  };

  const handleSaveDocument = async (data) => {
    if (!isEditing) {
      const payload = {
        id: uuid(),
        createdOn: new Date(),
        ...data,
      };
      await performTransaction(payload, ADD_DOCUMENT);
    } else {
      await performTransaction({ ...formState, ...data }, EDIT_DOCUMENT);
      setIsEditing(false);
    }

    addToast("Saved Successfully", {
      appearance: "success",
      autoDismiss: true,
    });
    resetForm();
  };

  const handleDeleteDocument = async (data) => {
    await performTransaction(data, DELETE_DOCUMENT);
    addToast("Deleted Successfully", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <>
      <div className="flex flex-col mx-auto my-5 px-5 max-w-5xl">
        <button
          onClick={() => setModalIsOpen(true)}
          className="ml-auto rounded-md border px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
        >
          Add &#10024;
        </button>
        <ItemList
          openModal={setModalIsOpen}
          onEdit={setFormState}
          onDelete={handleDeleteDocument}
          setIsEditing={setIsEditing}
        />
      </div>
      <ModalComponent isOpen={modalIsOpen} onRequestClose={resetForm}>
        <DocumentForm
          formTitle={isEditing ? "Edit Entry" : "Add a new entry"}
          formValues={isEditing ? formState : INITIAL_FORM_STATE}
          handleSaveDocument={handleSaveDocument}
          resetForm={resetForm}
        />
      </ModalComponent>
    </>
  );
};

export default DashboardPanel;
