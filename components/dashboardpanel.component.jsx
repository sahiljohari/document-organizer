import { useDocumentState } from "../utils/documentContext";
import { ADD_DOCUMENT } from "../utils/constants";
import ItemList from "../components/itemlist.component";

const DashboardPanel = () => {
  const { performTransaction } = useDocumentState();
  const handleAdd = () => {
    const newDocument = {
      id: 4,
      documentName: "Added via UI again",
      documentType: "UI",
      documentStartDate: Date.now(),
      documentEndDate: Date.now(),
      createdOn: Date.now(),
    };
    performTransaction(newDocument, ADD_DOCUMENT);
  };
  return (
    <div className="flex flex-col mx-auto my-5 max-w-5xl">
      <button
        onClick={handleAdd}
        className="ml-auto rounded-md border px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
      >
        Add Document
      </button>
      <ItemList />
    </div>
  );
};

export default DashboardPanel;
