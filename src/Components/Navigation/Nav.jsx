import { Link } from "react-router-dom";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { useQuery } from "react-query";
import { getRecipe } from "../../http-functions/https-functions";

const Nav = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const { data, refetch } = useQuery("recpies", () => getRecipe(searchInput), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false,
  });

  const searchHandler = (event) => {
    setSearchInput(event.target.value);
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
            <button onClick={refetch} className="border px-6 py-2 rounded">
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
