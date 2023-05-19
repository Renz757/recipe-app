const Nav = () => {
  return (
    <>
      <div className="bg-blue-400 p-7 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl">Recipe App</h1>
        </div>
        {/* Create Search bar it's own component */}
        <div className="mt-2">
          <input
            type="text"
            id="searchRecipe"
            placeholder="Search"
            className="p-2 rounded"
          />
        </div>

        <div className="mt-3">
          <button className="border px-6 rounded">Log In</button>
        </div>
      </div>
    </>
  );
};

export default Nav;
