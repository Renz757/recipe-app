import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "../store/favorites-slice";
import { shoppingListActions } from "../store/shoppingList-slice";
import HeartIcon from "../UI/heartIcon";
import { useState, useEffect } from "react";
import DropDownStatus from "../UI/DropDownStatus";

//create redux slice for recipeInfo

const RecipeInfo = ({ recipeInfoId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteRecipes);
  const notificationState = useSelector(
    (state) => state.shoppingList.notificationState
  );
  const customRecipes = useSelector((state) => state.customRecipe);

  const [isNotCustomRecipe, setisNotCustomRecipe] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [customRecipeInfo, setCustomRecipeInfo] = useState(null);

  useEffect(() => {
    //id (recipeInfoId) from spoonacular API will will always be a number
    if (typeof recipeInfoId === "number") {
      setisNotCustomRecipe(true);
      setHasData(true);
    } else {
      //filter customRecipeList array by dbID

      const customRecipeByID = customRecipes.customRecipeList.filter(
        (customRecipe) => recipeInfoId === customRecipe.dbID
      );
      setCustomRecipeInfo(customRecipeByID[0]);
      //store just the object in customRecipeInfo
      setHasData(true);
    }
  }, []);

  useEffect(() => {
    if (notificationState.isShowing) {
      setTimeout(() => {
        dispatch(shoppingListActions.resetNotification());
      }, 4000);
    }
  }, [notificationState.isShowing]);

  const { data: recipeInfo, isLoading } = useQuery(
    "recipeInfo",
    async () => {
      const { data } = await axios
        .get(
          `https://api.spoonacular.com/recipes/${recipeInfoId}/information?apiKey=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .catch((err) => {
          console.log(err);
          return <p>{err}</p>;
        });
      return data;
    },
    {
      refetchOnWindowFocus: false,
      //if recipeInfoId is a number, set isNotCustomrecipe to true to run reactQuery function to get recipeInfo
      enabled: isNotCustomRecipe,
    }
  );

  const favoriteRecipeHandler = (title, image, id) => {
    const favObject = {
      id: id,
      title: title,
      image: image,
      isFavorite: true,
    };

    dispatch(favActions.updateFavorite(favObject));
  };

  const shoppingListHandler = (id, title) => {
    const ingredientObject = {
      id: id,
      title: title,
      ingredients: recipeInfo.extendedIngredients.map(
        (items) => items.original
      ),
      isComplete: false,
    };

    dispatch(shoppingListActions.addIngredients(ingredientObject));

    console.log(notificationState);
  };

  return (
    <>
      <DropDownStatus />
      {hasData === false || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          key={isNotCustomRecipe ? recipeInfo.id : customRecipeInfo.dbID}
          className="bg-saffron"
        >
          {/* Recipe Info */}
          <div className="flex flex-col ">
            <div className="relative">
              <img
                className="w-full aspect-video object-cover blur-none"
                src={isNotCustomRecipe ? recipeInfo.image : ""}
              />
            </div>
            <div className="flex items-center">
              <h1 className="text-4xl font-Caveat p-3">
                {isNotCustomRecipe ? recipeInfo.title : customRecipeInfo.title}
              </h1>
              <div
                className={`${
                  isNotCustomRecipe
                    ? "bg-zinc-500 h-7 w-7 flex justify-center items-center rounded-full"
                    : "hidden"
                }`}
                onClick={favoriteRecipeHandler.bind(
                  null,
                  recipeInfo.title,
                  recipeInfo.image,
                  recipeInfo.id
                )}
              >
                <HeartIcon currentId={recipeInfo.id} favorites={favorites} />
              </div>
            </div>
            <div className="font-noto w-10/12 mx-auto">
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Ready In: ${
                isNotCustomRecipe
                  ? recipeInfo.readyInMinutes
                  : customRecipeInfo.estimatedCookTime
              } minutes`}</p>
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Servings: ${
                isNotCustomRecipe
                  ? recipeInfo.servings
                  : customRecipeInfo.servingSize
              }`}</p>
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Ingredients: ${
                isNotCustomRecipe
                  ? recipeInfo.extendedIngredients.length
                  : customRecipeInfo.ingredients.length
              }`}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-zinc-500">
            <h2 className="text-2xl text-zinc-600 font-Geologica">
              Ingredients
            </h2>
            {isNotCustomRecipe
              ? recipeInfo.extendedIngredients.map((ingredients, index) => {
                  return (
                    <p key={index} className="font-noto pt-2">
                      {ingredients.original}
                    </p>
                  );
                })
              : customRecipeInfo.ingredients.map((ingredients, index) => {
                  return (
                    <p key={index} className="font-noto pt-2">
                      {ingredients}
                    </p>
                  );
                })}

            {/* Todo: show modal onClick */}
            <button
              onClick={shoppingListHandler.bind(
                null,
                recipeInfo.id,
                recipeInfo.title
              )}
              className="text-left mt-5 bg-green-400 w-7/12 p-2 rounded-xl cursor-pointer"
            >
              Add Ingredients to Shopping List
            </button>
          </div>

          <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-zinc-500 pb-10">
            <h1 className="text-2xl text-zinc-600 font-Geologica">
              Instructions
            </h1>
            {isNotCustomRecipe
              ? recipeInfo.analyzedInstructions.map((instructions, index) => {
                  return instructions.steps.map((steps, index) => {
                    return (
                      <div key={index} className="flex m-3 gap-2">
                        <p className="ml-2 font-noto">{`${steps.number}: `}</p>
                        <p className="font-noto tracking-wide">{steps.step}</p>
                      </div>
                    );
                  });
                })
              : customRecipeInfo.instructions.map((instructions, index) => {
                  return (
                    <div key={index} className="flex m-3 gap-2">
                      <p className="ml-2 font-noto">{`${index + 1}: `}</p>
                      <p className="font-noto tracking-wide">{instructions}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeInfo;
