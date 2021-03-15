import { useState, useEffect } from "react";
import { useDocumentState } from "../utils/documentContext";
import { getRemainingDays, isDateInPast } from "../utils/dateUtils";
import {
  documentTypes,
  DANGER_THRESHOLD,
  WARNING_THRESHOLD,
} from "../utils/constants";
import Item from "./item.component";
import Confirmation from "../components/common/confirmation.component";
import EmptyView from "../components/common/emptyview.component";

const ItemList = ({ openModal, onEdit, onDelete }) => {
  const { documentState } = useDocumentState();
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [expiredList, setExpiredList] = useState([]);

  const userDocuments = documentState.documents.list;

  useEffect(() => {
    userDocuments.sort((a, b) =>
      getRemainingDays(a.documentEndDate) >= getRemainingDays(b.documentEndDate)
        ? 1
        : -1
    );
    setExpiredList(() =>
      userDocuments.filter((doc) => isDateInPast(doc.documentEndDate))
    );
  }, [documentState.documents.list]);

  const handleEdit = (data) => {
    openModal(true);
    onEdit(data);
  };

  const handleDelete = (data) => {
    if (data) {
      setIsDeleting(true);
      onDelete(data);
      setIsDeleting(false);

      setConfirmationIsOpen(false);
    }
  };

  const getStatusStyle = (endDate) => {
    let style = "";

    if (isDateInPast(endDate)) {
      style = "border-gray-400";
    } else {
      const remainingDays = getRemainingDays(endDate);
      style =
        remainingDays <= WARNING_THRESHOLD
          ? remainingDays <= DANGER_THRESHOLD
            ? "border-red-600"
            : "border-yellow-500"
          : "border-green-700";
    }

    return style;
  };

  const getStatus = (endDate) => {
    let statusContent = "";

    if (isDateInPast(endDate)) {
      statusContent = (
        <span className="mr-4 my-auto text-sm font-light">Expired 💀</span>
      );
    } else {
      const remainingDays = getRemainingDays(endDate);
      if (remainingDays <= WARNING_THRESHOLD) {
        statusContent = (
          <span className="mr-4 my-auto text-sm font-light">
            🕒 {remainingDays}d
          </span>
        );
      }
    }

    return statusContent;
  };

  if (documentState.documents.count === 0) {
    return <EmptyView />;
  }

  return (
    <>
      <div className="flex flex-col place-content-center my-8 w-1/2 mx-auto divide-y divide-gray-300">
        <ul className="w-full py-2">
          {userDocuments.length > 0 &&
            userDocuments.map((doc) => {
              const { id, documentName, documentType, documentEndDate } = doc;
              return (
                !isDateInPast(documentEndDate) && (
                  <Item
                    key={id}
                    icon={documentTypes[documentType]["icon"]}
                    title={documentName}
                    status={getStatus(documentEndDate)}
                    statusStyle={getStatusStyle(documentEndDate)}
                    onEditClick={() => handleEdit(doc)}
                    onDeleteClick={() => {
                      setConfirmationIsOpen(true);
                      setDataToDelete(doc);
                    }}
                  />
                )
              );
            })}
        </ul>
        <ul className="w-full py-2">
          {expiredList.length > 0 ? (
            expiredList.map((doc) => {
              const { id, documentName, documentType, documentEndDate } = doc;
              return (
                <Item
                  key={id}
                  icon={documentTypes[documentType]["icon"]}
                  title={documentName}
                  status={getStatus(documentEndDate)}
                  statusStyle={getStatusStyle(documentEndDate)}
                  onEditClick={() => handleEdit(doc)}
                  onDeleteClick={() => {
                    setConfirmationIsOpen(true);
                    setDataToDelete(doc);
                  }}
                />
              );
            })
          ) : (
            <EmptyView
              customMessage={"Nothing has expired yet!"}
              showGraphic={false}
            />
          )}
        </ul>
      </div>
      <Confirmation
        isOpen={confirmationIsOpen}
        processing={isDeleting}
        processingMessage="Deleting..."
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
