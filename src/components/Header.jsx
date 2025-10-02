const Header = ({ header }) => {
    return (<header className="bg-gray-100 text-gray-900">
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        {header}
      </h1>
    </div>
  </header>
  );
}

export default Header;