import {
  SET_USER_DOCUMENTS,
  GET_DOCUMENT,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
} from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_DOCUMENTS:
      return { ...state, documents: action.payload };

    case GET_DOCUMENT:
      return state.documents.list.find(
        (document) => document.id === action.payload.id
      );

    case ADD_DOCUMENT:
      return {
        ...state,
        documents: {
          count: state.documents.count + 1,
          list: [action.payload, ...state.documents.list],
        },
      };

    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: {
          count: state.documents.count - 1,
          list: state.documents.list.filter(
            (document) => document.id !== action.payload.id
          ),
        },
      };

    case EDIT_DOCUMENT:
      return state.documents.list.map((document) => {
        if (document.id === action.payload.id) {
          // may change the fields to be updated
          return {
            ...document,
            documentName: action.payload.documentName,
            documentType: action.payload.documentType,
            documentStartDate: action.payload.documentStartDate,
            documentEndDate: action.payload.documentEndDate,
          };
        } else {
          return document;
        }
      });

    default:
      return state;
  }
};

export default reducer;
