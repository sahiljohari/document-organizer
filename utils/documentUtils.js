const addDocumentUtil = (state, newDocument) => {
  return {
    ...state,
    documents: {
      count: state.documents.count + 1,
      list: [newDocument, ...state.documents.list],
    },
  };
};

const editDocumentUtil = (state, updatedDocument) => {
  const updatedDocumentList = state.documents.list.map((document) => {
    if (document.id === updatedDocument.id) {
      return {
        ...document,
        ...updatedDocument,
      };
    } else {
      return document;
    }
  });

  return {
    ...state,
    documents: {
      count: state.documents.count,
      list: updatedDocumentList,
    },
  };
};

const deleteDocumentUtil = (state, documentToDelete) => {
  return {
    ...state,
    documents: {
      count: state.documents.count - 1,
      list: state.documents.list.filter(
        (document) => document.id !== documentToDelete.id
      ),
    },
  };
};

export { addDocumentUtil, editDocumentUtil, deleteDocumentUtil };
