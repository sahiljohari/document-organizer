export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const EDIT_DOCUMENT = "EDIT_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";

export const INITIAL_FORM_STATE = {
  documentEndDate: "",
  documentName: "",
  documentType: "",
  id: "",
  createdOn: null,
};

export const documentTypes = {
  business: { icon: "💻", displayText: " Business" },
  finance: { icon: "💰", displayText: " Finance" },
  food: { icon: "🥗", displayText: " Food/Beverages" },
  healthcare: { icon: "💉", displayText: " Healthcare" },
  travel: { icon: "✈️", displayText: " Travel" },
};

export const DANGER_THRESHOLD = 10;
export const WARNING_THRESHOLD = 30;
