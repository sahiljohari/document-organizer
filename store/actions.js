import {
  SET_USER_DOCUMENTS,
  GET_DOCUMENT,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
} from "./constants";

const setUserDocumentsAction = (documents) => ({
  type: SET_USER_DOCUMENTS,
  payload: documents,
});

const getDocumentAction = (document) => ({
  type: GET_DOCUMENT,
  payload: document,
});

const addDocumentAction = (newDocument) => ({
  type: ADD_DOCUMENT,
  payload: newDocument,
});

const deleteDocumentAction = (document) => ({
  type: DELETE_DOCUMENT,
  payload: document,
});

const editDocumentAction = (document) => ({
  type: EDIT_DOCUMENT,
  payload: document,
});

export {
  setUserDocumentsAction,
  getDocumentAction,
  addDocumentAction,
  deleteDocumentAction,
  editDocumentAction,
};
