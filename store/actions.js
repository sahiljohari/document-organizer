import {
  SET_USER_DOCUMENTS,
  GET_DOCUMENT,
  GET_ALL_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
} from "./constants";

const setUserDocuments = (documents) => ({
  type: SET_USER_DOCUMENTS,
  payload: documents,
});

const getDocument = (document) => ({
  type: GET_DOCUMENT,
  payload: document,
});

const getAllDocuments = () => ({
  type: GET_ALL_DOCUMENTS,
});

const addDocument = (newDocument) => ({
  type: ADD_DOCUMENT,
  payload: newDocument,
});

const deleteDocument = (document) => ({
  type: DELETE_DOCUMENT,
  payload: document,
});

const editDocument = (document) => ({
  type: EDIT_DOCUMENT,
  payload: document,
});

export {
  setUserDocuments,
  getDocument,
  getAllDocuments,
  addDocument,
  deleteDocument,
  editDocument,
};
