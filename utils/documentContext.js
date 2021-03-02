import { useState, useContext, createContext } from "react";
import {
  addDocumentUtil,
  editDocumentUtil,
  deleteDocumentUtil,
} from "./documentUtils";

const DocumentContext = createContext();

export const DocumentContextProvider = ({ children }) => {
  return (
    <DocumentContext.Provider value={useProvideDocumentState()}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentState = () => {
  return useContext(DocumentContext);
};

const useProvideDocumentState = () => {
  const [documentState, setDocumentState] = useState({
    documents: {
      count: 0,
      list: [],
    },
  });

  const setUserDocuments = (documents) => {
    setDocumentState({ documents });
  };

  // const getDocument = (document) => {
  //   dispatch(getDocumentAction(document));
  // };

  const addDocument = (newDocument) => {
    setDocumentState(addDocumentUtil(documentState, newDocument));
  };

  const deleteDocument = (document) => {
    setDocumentState(deleteDocumentUtil(documentState, document));
  };

  const editDocument = (document) => {
    setDocumentState(editDocumentUtil(documentState, document));
  };

  return {
    documentState,
    setUserDocuments,
    // getDocument,
    addDocument,
    deleteDocument,
    editDocument,
  };
};
