import { useState, useContext, createContext } from "react";
import { useAuth, firebase } from "./auth";
import { useToasts } from "react-toast-notifications";
import {
  addDocumentUtil,
  editDocumentUtil,
  deleteDocumentUtil,
} from "./documentUtils";
import { ADD_DOCUMENT, EDIT_DOCUMENT, DELETE_DOCUMENT } from "./constants";

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
  const { addToast } = useToasts();

  const [documentState, setDocumentState] = useState({
    documents: {
      count: 0,
      list: [],
    },
  });

  const setUserDocuments = (documents) => {
    setDocumentState({ documents });
  };

  const performTransaction = async (payload, transactionType) => {
    if (!user) return;

    const userRef = firebase.firestore().doc(`users/${user.id}`);
    let updatedState = null;
    switch (transactionType) {
      case ADD_DOCUMENT:
        updatedState = addDocumentUtil(documentState, payload);
        break;

      case EDIT_DOCUMENT:
        updatedState = editDocumentUtil(documentState, payload);
        break;

      case DELETE_DOCUMENT:
        updatedState = deleteDocumentUtil(documentState, payload);
        break;
    }

    try {
      await userRef.update(updatedState);
      setDocumentState(updatedState);
    } catch (error) {
      console.error(
        "Error performing transaction with the database...",
        error.message
      );

      addToast("Something went wrong. Please try again...", {
        appearance: "error",
      });
    }
  };

  return {
    documentState,
    setUserDocuments,
    performTransaction,
  };
};
