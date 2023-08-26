import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../store/nav-slice";
import RecipeDetails from "../Components/RecipeDetails";
import DefaultImage from "../Components/DefaultImage";

const Recipes = ({ setRecipeInfo }) => {
  const searchInput = useSelector((state) => state.nav.searchInput);
  const cuisineInput = useSelector((state) => state.nav.cuisine);
  const { data: recipeData, isLoading } = useQuery(
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

  // if (data) {
  //   props.setRecipeData(data);
  // }

  const dispatch = useDispatch();

  //close nav on component mount
  useEffect(() => {
    dispatch(navActions.closeNav());
  }, []);

  return (
    <div className="bg-eggshell">
      {isLoading && <p>...Loading</p>}
      {!recipeData && (
        <p
          className={`bg-eggshell h-screen text-center w-screen pt-10 text-3xl ${
            isLoading ? "hidden" : "block"
          }`}
        >
          Please Search a recipe
        </p>
      )}
      <div className="grid grid-cols1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-7 lg:gap-4">
        {recipeData &&
          recipeData.map((recipe, index) => {
            return (
              <div key={index} className="">
                <div>
                  <DefaultImage
                    src={recipe.image}
                    alt={recipe.title}
                    key={recipe.id}
                    className="w-full aspect-video object-cover blur-none lg:rounded"
                  />
                </div>
                <RecipeDetails
                  title={recipe.title}
                  id={recipe.id}
                  readyInMinutes={recipe.readyInMinutes}
                  servings={recipe.servings}
                  setRecipeInfo={setRecipeInfo}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Recipes;
