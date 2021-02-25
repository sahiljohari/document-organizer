import { useReducer, useContext, createContext } from "react";
import reducer from "../store/reducers";
import {
  setUserDocumentsAction,
  getDocumentAction,
  addDocumentAction,
  deleteDocumentAction,
  editDocumentAction,
} from "../store/actions";
import { INITIAL_STATE } from "../store/state";

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
  const [documentState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setUserDocuments = (documents) => {
    dispatch(setUserDocumentsAction(documents));
  };

  const getDocument = (document) => {
    dispatch(getDocumentAction(document));
  };

  const addDocument = (newDocument) => {
    dispatch(addDocumentAction(newDocument));
  };

  const deleteDocument = (document) => {
    dispatch(deleteDocumentAction(document));
  };

  const editDocument = (document) => {
    dispatch(editDocumentAction(document));
  };

  return {
    documentState,
    setUserDocuments,
    getDocument,
    addDocument,
    deleteDocument,
    editDocument,
  };
};
