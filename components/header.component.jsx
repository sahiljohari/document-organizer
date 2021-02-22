import { useUserState } from "../utils/userContext";

const Header = ({ name }) => {
  const { documentState } = useUserState();
  const {
    documents: { count, list },
  } = documentState;

  const getExpiredDocuments = () => {
    return 0;
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row place-content-between">
        <h1 className="text-xl font-medium leading-tight text-gray-900 my-auto">
          Greetings, {name}! 👋
        </h1>
        <div className="flex flex-row">
          <p className="mx-2">
            <span className="text-2xl">{count}</span> documents uploaded
          </p>
          <p className="mx-2">
            <span className="text-2xl">{getExpiredDocuments()}</span> documents
            need attention
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
