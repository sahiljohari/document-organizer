import { useDocumentState } from "../utils/documentContext";
import { formatDate } from "../utils/dateUtils";

const ItemList = () => {
  const { documentState } = useDocumentState();
  const userDocuments = documentState.documents.list;
  return (
    <div className="flex place-content-center my-8">
      <ul className="divide-y divide-gray-100 w-full">
        {userDocuments.map((doc) => {
          const { id, documentName, documentStartDate, documentEndDate } = doc;
          return (
            <div key={id} className="flex flex-row place-content-between p-2">
              <div>{documentName}</div>
              <div className="flex flex-row">
                <p className="mx-2">
                  Valid from: {formatDate(new Date(documentStartDate))}
                </p>
                <p className="mx-2">
                  Expires on: {formatDate(new Date(documentEndDate))}
                </p>
                <div className="ml-2">
                  <button className="m-1">&#9997;</button>
                  <button className="m-1">&#10005;</button>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
