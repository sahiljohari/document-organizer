import ItemList from "../components/itemlist.component";

const DashboardPanel = () => {
  return (
    <div className="flex flex-col mx-auto my-5 max-w-5xl">
      <button className="ml-auto rounded-md border px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200">
        Add Document
      </button>
      <ItemList />
    </div>
  );
};

export default DashboardPanel;
