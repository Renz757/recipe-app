import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../store/nav-slice";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "../UI/SearchIcon";

const SearchRecipe = (props) => {
  const searchInput = useSelector((state) => state.nav.searchInput);
  const cuisineInput = useSelector((state) => state.nav.cuisine);

  const [placeHolder, setPlaceHolder] = useState("Search a Recipe");

  const dispatch = useDispatch();
  const { data, refetch } = useQuery(
    ["recpies"],
    async () => {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${searchInput}&cuisine=${cuisineInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
      );

      //set seatch Input back to empty string
      dispatch(navActions.updateSearchInput(""));
      setPlaceHolder("Search a Recipe");
      return data.results;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: false,
    }
  );

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(navActions.updateSearchInput(event.target.value));
  };

  return (
    <>
      <form className="flex w-10/12 justify-center bg-white rounded-lg border-vandyke border-2 mx-auto">
        <input
          type="text"
          id="searchRecipe"
          placeholder={placeHolder}
          className="p-2 w-10/12 outline-none bg-white"
          onChange={searchHandler}
          value={searchInput}
        />

        <Link to="recipes">
          <button
            onClick={
              searchInput != ""
                ? refetch
                : () => {
                    setPlaceHolder("Recipe Cannot Be Empty");
                  }
            }
            className="py-2 bg-white"
            type="submit"
          >
            <SearchIcon />
          </button>
        </Link>
      </form>
    </>
  );
};

export default SearchRecipe;
