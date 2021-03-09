import { useState } from "react";
import { useDocumentState } from "../utils/documentContext";
import { getRemainingDays } from "../utils/dateUtils";
import {
  documentTypes,
  DANGER_THRESHOLD,
  WARNING_THRESHOLD,
} from "../utils/constants";
import Confirmation from "../components/common/confirmation.component";

const ItemList = ({ openModal, onEdit, onDelete, setIsEditing }) => {
  const { documentState } = useDocumentState();
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const userDocuments = documentState.documents.list;

  const handleEdit = (data) => {
    setIsEditing(true);
    openModal(true);
    onEdit(data);
  };

  const handleDelete = (data) => {
    if (data) {
      onDelete(data);
      setConfirmationIsOpen(false);
    }
  };

  return (
    <>
      <div className="flex place-content-center my-8 w-1/2 mx-auto">
        <ul className="w-full">
          {userDocuments.map((doc) => {
            const { id, documentName, documentType, documentEndDate } = doc;
            const remainingDays = getRemainingDays(documentEndDate);
            return (
              <div
                key={id}
                className={`flex flex-row place-content-between p-2 border-l-8 border rounded-md my-2 ${
                  remainingDays <= WARNING_THRESHOLD
                    ? remainingDays <= DANGER_THRESHOLD
                      ? "border-red-600"
                      : "border-yellow-500"
                    : "border-green-700"
                }`}
              >
                <div className="flex flex-row place-content-evenly">
                  <span className="mr-4 my-auto">
                    {documentTypes[documentType]["icon"]}
                  </span>
                  <span className="mr-4 my-auto text-lg text-indigo-900 font-medium">
                    {documentName}
                  </span>
                </div>
                <div>
                  {remainingDays <= WARNING_THRESHOLD && (
                    <span className="mr-4 my-auto text-sm font-light">
                      🕒 {remainingDays}d
                    </span>
                  )}
                  <button
                    id="edit"
                    className="mx-3 my-auto"
                    onClick={() => handleEdit(doc)}
                  >
                    &#9997;
                  </button>
                  <button
                    id="delete"
                    className="mx-3 my-auto"
                    onClick={() => {
                      setConfirmationIsOpen(true);
                      setDataToDelete(doc);
                    }}
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <Confirmation
        isOpen={confirmationIsOpen}
        title="Delete Entry"
        message="Are you sure you want to delete this entry?"
        highlight={dataToDelete?.documentName}
        handleConfirm={() => handleDelete(dataToDelete)}
        onRequestClose={() => {
          setConfirmationIsOpen(false);
          setDataToDelete(null);
        }}
      />
    </>
  );
};

export default ItemList;
