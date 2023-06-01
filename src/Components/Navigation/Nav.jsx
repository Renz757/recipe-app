import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const Nav = (props) => {
  const searchHandler = (event) => {
    props.setSearchInput(event.target.value);
  };

  return (
    <>
      <div className="bg-blue-400 py-7 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl">
            <Link>Recipe App</Link>
          </h1>
        </div>
        {/* Create Search bar it's own component */}
        <div className="mt-2 flex justify-center items-center gap-2">
          {/* todo: add validation */}
          <label className="" htmlFor="searchRecipe">
            <input
              type="text"
              id="searchRecipe"
              placeholder="Search"
              className="p-2 rounded"
              onChange={searchHandler}
            />
          </label>
          <Link to="recipes">
            <button
              onClick={props.fecthData}
              className="border px-6 py-2 rounded"
            >
              Search
            </button>
          </Link>
        </div>

        <ul className="flex gap-3 mt-3">
          <NavLinks />
        </ul>
      </div>
    </>
  );
};

export default Nav;
