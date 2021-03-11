import Image from "next/image";

const EmptyView = () => (
  <div className="flex flex-col items-center">
    <h1 className="text-center text-4xl text-gray-400 font-bold w-full h-full">
      It's been quiet here...
    </h1>
    <img
      src="assets/images/empty.svg"
      alt="Nothing to display"
      className="h-72 w-72 opacity-75"
    />
  </div>
);

export default EmptyView;
