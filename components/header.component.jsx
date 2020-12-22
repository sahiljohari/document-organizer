const Header = ({ name }) => (
  <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-medium leading-tight text-gray-900">
        Greetings, {name}! 👋
      </h1>
    </div>
  </header>
);

export default Header;
