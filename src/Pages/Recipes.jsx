import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../store/nav-slice";

const Recipes = ({ setRecipeInfo }) => {
  const searchInput = useSelector(state => state.searchInput)
  const { data: recipeData, isLoading } = useQuery(
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

  // if (data) {
  //   props.setRecipeData(data);
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navActions.closeNav());
  }, []);

  return (
    <>
      {isLoading ? (
        <p>...Loading</p>
      ) : (
        recipeData.map((recipe, index) => {
          return (
            <div key={index} className=" grid grid-cols-1">
              <div className="">
                <div className="">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    key={recipe.id}
                    className="w-full aspect-video object-cover blur-none"
                  />
                </div>
                <div className="p-4">
                  <h1 className="text-3xl font-Caveat">{recipe.title}</h1>
                  <div className="flex gap-2 font-noto">
                    <p>{`Prep Time: ${recipe.readyInMinutes} Minutes - `}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                  </div>

                  <Link
                    to={`/recipeInfo/${recipe.id}`}
                    onClick={() => setRecipeInfo(recipe.id)}
                  >
                    <p className="underline font-Geologica text-zinc-600">
                      Show Recipe
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Recipes;
