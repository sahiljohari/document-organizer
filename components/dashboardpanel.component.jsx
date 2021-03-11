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
  const [isSaving, setIsSaving] = useState(false);
  const { performTransaction } = useDocumentState();
  const { addToast } = useToasts();

  const resetForm = () => {
    setModalIsOpen(false);
    setFormState(INITIAL_FORM_STATE);
  };

  const handleSaveDocument = async (data) => {
    setIsSaving(true);
    if (formState === INITIAL_FORM_STATE) {
      const payload = {
        id: uuid(),
        createdOn: new Date(),
        ...data,
      };
      await performTransaction(payload, ADD_DOCUMENT);
    } else {
      await performTransaction({ ...formState, ...data }, EDIT_DOCUMENT);
    }

    addToast("Saved Successfully", {
      appearance: "success",
      autoDismiss: true,
    });
    setIsSaving(false);
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
        />
      </div>
      <ModalComponent isOpen={modalIsOpen} onRequestClose={resetForm}>
        <DocumentForm
          formTitle={
            formState === INITIAL_FORM_STATE ? "Add a new entry" : "Edit Entry"
          }
          formValues={formState}
          handleSaveDocument={handleSaveDocument}
          resetForm={resetForm}
          processing={isSaving}
        />
      </ModalComponent>
    </>
  );
};

export default DashboardPanel;
