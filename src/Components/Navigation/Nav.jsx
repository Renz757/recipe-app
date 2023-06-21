import { Link } from "react-router-dom";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { useQuery } from "react-query";
import axios from "axios";
import MenuIcon from "../../UI/menuIcon";
import ShoppingBagIcon from "../../UI/shoppingBagIcon";
import SearchIcon from "../../UI/SearchIcon";

const Nav = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const { data, refetch, isFecthed } = useQuery(
    ["recpies", searchInput],
    async () => {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
      );

      return data.results;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: false,
    }
  );

  if (data) {
    props.setRecipeData(data);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div className="bg-darkgold flex flex-col justify-center items-center p-7">
        <div className="flex w-full justify-between p-6 items-center">
          <Link to="/">
            <h1 className="text-2xl font-Geologica">Recipe App</h1>
          </Link>
          <ul className="flex gap-3 mt-3">
            <NavLinks />
          </ul>
          <div className="flex items-center gap-3">
            <ShoppingBagIcon />
            <MenuIcon />
          </div>
        </div>

        {/* Create Search bar it's own component */}

        {/* todo: add validation */}

        <form className="flex w-10/12 justify-center bg-white rounded-xl mx-zuto">
          <input
            type="text"
            id="searchRecipe"
            placeholder="Search a Recipe"
            className="p-2 w-10/12 outline-none bg-white"
            onChange={searchHandler}
          />

          <Link to="recipes">
            <button onClick={refetch} className=" py-2 bg-white" type="submit">
              <SearchIcon />
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Nav;
