import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../store/nav-slice";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "../UI/SearchIcon";

const SearchRecipe = (props) => {
  const searchInput = useSelector(state => state.nav.searchInput)
  const dispatch = useDispatch();
  const { refetch } = useQuery(
    ["recpies"],
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

  //   if (data) {
  //     props.setRecipeData(data);
  //   }

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(navActions.updateSearchInput(event.target.value))
  };

  return (
    <>
      <form className="flex w-10/12 justify-center bg-white rounded-xl mx-auto">
        <input
          type="text"
          id="searchRecipe"
          placeholder="Search a Recipe"
          className="p-2 w-10/12 outline-none bg-white"
          onChange={searchHandler}
        />

        <Link to="recipes">
          <button onClick={refetch} className="py-2 bg-white" type="submit">
            <SearchIcon />
          </button>
        </Link>
      </form>
    </>
  );
};

export default SearchRecipe;
