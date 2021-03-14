import { useState, useEffect } from "react";
import { useDocumentState } from "../utils/documentContext";
import { getRemainingDays, isDateInPast } from "../utils/dateUtils";
import { DANGER_THRESHOLD } from "../utils/constants";

const Header = ({ name }) => {
  const { documentState } = useDocumentState();
  const {
    documents: { count: documentsUploaded, list },
  } = documentState;

  const [badDocuments, setBadDocuments] = useState(0);

  useEffect(() => {
    updateBadDocuments();
  }, [list]);

  const updateBadDocuments = () => {
    const badDocumentsCount = list.reduce((n, doc) => {
      return (
        n +
        (isDateInPast(doc.documentEndDate) ||
          getRemainingDays(doc.documentEndDate) <= DANGER_THRESHOLD)
      );
    }, 0);

    setBadDocuments(badDocumentsCount);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row place-content-between">
        <h1 className="text-xl font-medium leading-tight text-gray-900 my-auto">
          Greetings, {name}! 👋
        </h1>
        <div className="flex flex-row">
          <p className="mx-2">
            <span className="text-2xl">{documentsUploaded}</span> entries added
          </p>
          <p className="mx-2">
            <span className="text-2xl">{badDocuments}</span> entries need
            attention
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
