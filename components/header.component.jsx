import { useState, useEffect } from "react";
import { useDocumentState } from "../utils/documentContext";
import { useAuth } from "../utils/auth";

const Header = ({ name }) => {
  const { user } = useAuth();
  const { setUserDocuments } = useDocumentState();

  const [documentsUploaded, setDocumentsUploaded] = useState(0);
  const [badDocuments, setBadDocuments] = useState(0);

  useEffect(() => {
    if (user) {
      setUserDocuments(user.documents);
      setDocumentStats();
    }
  }, [user]);

  const setDocumentStats = () => {
    let badDocs = 0;
    // TODO: add logic here to determine documents that need attention
    setDocumentsUploaded(user.documents.count);
    setBadDocuments(badDocs);
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
