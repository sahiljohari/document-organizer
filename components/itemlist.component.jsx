import { useDocumentState } from "../utils/documentContext";
import { formatDate } from "../utils/dateUtils";

const ItemList = () => {
  const { documentState } = useDocumentState();
  const userDocuments = documentState.documents.list;
  return (
    <div className="flex place-content-center my-2">
      {userDocuments.map((doc) => {
        const { id, documentName, documentStartDate, documentEndDate } = doc;
        return (
          <div key={id} className="flex flex-row place-content-evenly p-5 m-4">
            <p>{documentName}</p>
            {/* <p>{formatDate(new Date(documentStartDate))}</p>
            <p>{formatDate(new Date(documentEndDate))}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
