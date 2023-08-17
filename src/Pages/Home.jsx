import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getRandomRecipe } from "../http-functions/https-functions";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../store/nav-slice";
import axios from "axios";

const Home = ({ setRecipeInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.nav.searchInput);
  const cuisineInput = useSelector((state) => state.nav.cuisine);

  const {
    data: recipeInfo,
    isError,
    error,
  } = useQuery(["randomRecipe"], getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) {
    return <h1>{`An Error Has Occured ${error}`}</h1>;
  }

  const { data, refetch } = useQuery(
    ["recpies"],
    async () => {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${searchInput}&cuisine=${cuisineInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
      );

      return data.results;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: false,
    }
  );

  useEffect(() => {
    dispatch(navActions.updateCuisineInput(""));
  }, [cuisineInput]);

  useEffect(() => {
    if (cuisineInput === "") {
      return;
    } else {
      refetch();
      navigate("/recipes");
    }
  }, [cuisineInput]);

  const cuisineHandler = (e) => {
    dispatch(navActions.updateCuisineInput(e.target.innerHTML));
  };

  return (
    <>
      <div className="flex flex-col bg-eggshell h-screen">
        <h1 className="text-3xl text-center mt-4 font-Geologica">
          Random Recipe of The Day!
        </h1>
        {isError && <p>{error}</p>}
        {!recipeInfo ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
            <div className=" text-left">
              <img
                className="w-full mt-4 aspect-video object-cover blur-none lg:rounded"
                src={`${recipeInfo.image}`}
              />
              <h1 className="text-4xl text-left font-Caveat pt-3">
                {recipeInfo.title}
              </h1>
              <Link
                onClick={() => setRecipeInfo(recipeInfo.id)}
                to={`/recipeInfo/${recipeInfo.id}`}
                className="text-vandyke underline font-Geologica"
              >
                Give it a Try!
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
          <h1 className="text-2xl mt-10 text-center">
            Search Recipes By Cusines
          </h1>

          <div className="flex gap-x-5 mt-10 flex-wrap justify-center">
            <div
              onClick={cuisineHandler}
              className="h-36 w-36 rounded-full bg-vandyke flex justify-center items-center text-eggshell font-noto text-2xl cursor-pointer"
            >
              African
            </div>
            <div
              onClick={cuisineHandler}
              className="h-36 w-36 rounded-full bg-vandyke flex justify-center items-center text-eggshell font-noto text-2xl cursor-pointer"
            >
              Greek
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
