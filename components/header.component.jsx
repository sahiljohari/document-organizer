import { useState, useEffect } from "react";
import { useDocumentState } from "../utils/documentContext";

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
    // TODO: add logic to compute bad documents from "list"
    setBadDocuments(0);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row place-content-between">
        <h1 className="text-xl font-medium leading-tight text-gray-900 my-auto">
          Greetings, {name}! 👋
        </h1>
        <div className="flex flex-row">
          <p className="mx-2">
            <span className="text-2xl">{documentsUploaded}</span> documents
            uploaded
          </p>
          <p className="mx-2">
            <span className="text-2xl">{badDocuments}</span> documents need
            attention
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
