import { useState, useContext, createContext } from "react";
import { useAuth, firebase } from "./auth";
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
  const { user } = useAuth();

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

  const addDocument = async (newDocument) => {
    if (user) {
      const userRef = firebase.firestore().doc(`users/${user.id}`);
      try {
        const updatedState = addDocumentUtil(documentState, newDocument);
        await userRef.update(updatedState);
        setDocumentState(updatedState);
      } catch (error) {
        console.error("Error adding new document", error.message);
      }
    }
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
