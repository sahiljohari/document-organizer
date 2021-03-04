import { useState } from "react";
import uuid from "react-uuid";
import { useToasts } from "react-toast-notifications";
import { useDocumentState } from "../utils/documentContext";
import { useForm } from "react-hook-form";

import { ADD_DOCUMENT } from "../utils/constants";
import ModalComponent from "../components/common/modal.component";
import ItemList from "../components/itemlist.component";
import FormInput from "./common/forminput.component";

const DashboardPanel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { performTransaction } = useDocumentState();
  const { register, handleSubmit } = useForm();
  const { addToast } = useToasts();

  const handleSaveDocument = async (data) => {
    const payload = {
      id: uuid(),
      createdOn: new Date(),
      ...data,
    };
    await performTransaction(payload, ADD_DOCUMENT);
    setModalIsOpen(false);
    addToast("Saved Successfully", {
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
          Add Document
        </button>
        <ItemList />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2 className="uppercase text-2xl mb-4">Add a Document</h2>
        <form
          onSubmit={handleSubmit(handleSaveDocument)}
          className="flex flex-col mt-2 justify-center w-full"
        >
          <FormInput
            classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
            label="Document Name"
            name="documentName"
            placeholder="Ex. Passport, Drivers License, etc."
            ref={register({ required: true, maxLength: 50 })}
          />

          <FormInput
            classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
            label="Date of Issue"
            name="documentStartDate"
            type="date"
            ref={register({ required: true })}
          />

          <FormInput
            classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
            label="Date of Expiry"
            name="documentEndDate"
            type="date"
            ref={register({ required: true })}
          />

          <div className="flex flex-row w-1/2 mx-auto justify-center">
            <input
              type="submit"
              value="Save"
              className="w-24 flex items-center justify-center mt-4 mx-4 rounded-md border border-gray-300 px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
            />
            <input
              type="button"
              value="Cancel"
              className="w-24 flex items-center justify-center mt-4 mx-4 rounded-md border border-gray-300 px-3 py-2 bg-white hover:bg-gray-800 hover:text-white duration-200"
              onClick={() => setModalIsOpen(false)}
            />
          </div>
        </form>
      </ModalComponent>
    </>
  );
};

export default DashboardPanel;
