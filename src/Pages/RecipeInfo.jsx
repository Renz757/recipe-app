import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "../store/favorites-slice";
import { shoppingListActions } from "../store/shoppingList-slice";
import HeartIcon from "../UI/heartIcon";
import RemoveIcon from "../UI/removeIcon";
import DefaultImage from "../Components/DefaultImage";
import { useState, useEffect } from "react";
import DropDownStatus from "../UI/DropDownStatus";
import DeleteModal from "../UI/DeleteModal";
import { customRecipeActions } from "../store/customRecipes-slice";
import { motion } from "framer-motion";

//create redux slice for recipeInfo

const RecipeInfo = ({ recipeInfoId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteRecipes);
  const user = useSelector((state) => state.auth.user);
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

  const favoriteRecipeHandler = (
    id,
    title,
    image,
    readyInMinutes,
    servings
  ) => {
    const favObject = {
      id,
      title,
      image,
      readyInMinutes,
      servings,
      isFavorite: true,
      uid: user.uid,
    };

    console.log(favObject);

    dispatch(favActions.updateFavorite(favObject));
  };

  const shoppingListHandler = (id, title) => {
    const ingredientObject = {
      id: id,
      title: title,
      ingredients: isNotCustomRecipe
        ? recipeInfo.extendedIngredients.map((items) => items.original)
        : customRecipeInfo.ingredients.map((items) => items),
      isComplete: false,
      uid: user.uid,
    };

    dispatch(shoppingListActions.addIngredients(ingredientObject));
  };

  const deleteModalHandler = () => {
    dispatch(customRecipeActions.modalhandler());
  };

  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <DropDownStatus />
      {customRecipes.showModal && (
        <div className="absolute">
          <DeleteModal
            customRecipeId={customRecipeInfo.dbID}
            imageName={customRecipeInfo.imageName}
          />
        </div>
      )}
      {hasData === false || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-eggshell h-screen"
        >
          <div
            key={isNotCustomRecipe ? recipeInfo.id : customRecipeInfo.dbID}
            className="md:max-w-2xl md:mx-auto md:pt-5 bg-eggshell"
          >
            {/* Recipe Info */}
            <div className="flex flex-col ">
              <div className="relative">
                <DefaultImage
                  src={
                    isNotCustomRecipe
                      ? recipeInfo.image
                      : customRecipeInfo.image
                  }
                  alt={
                    isNotCustomRecipe
                      ? recipeInfo.title
                      : customRecipeInfo.title
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3">
                <h1 className="text-4xl font-Caveat text-vandyke">
                  {isNotCustomRecipe
                    ? recipeInfo.title
                    : customRecipeInfo.title}
                </h1>
                <div
                  className=""
                  onClick={
                    isNotCustomRecipe
                      ? () => {
                          favoriteRecipeHandler(
                            recipeInfo.id,
                            recipeInfo.title,
                            recipeInfo.image,
                            recipeInfo.readyInMinutes,
                            recipeInfo.servings
                          );
                        }
                      : null //Will not add custom recipes as favorites
                  }
                >
                  {isNotCustomRecipe ? (
                    <div>
                      <HeartIcon
                        currentId={recipeInfo.id}
                        favorites={favorites}
                      />
                    </div>
                  ) : (
                    <div onClick={deleteModalHandler}>
                      <RemoveIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="font-noto w-10/12 mx-auto">
                <p className="mt-2 p-2 border-b-2 border-vandyke">{`Ready In: ${
                  isNotCustomRecipe
                    ? recipeInfo.readyInMinutes
                    : customRecipeInfo.cookTime
                } minutes`}</p>
                <p className="mt-2 p-2 border-b-2 border-vandyke">{`Servings: ${
                  isNotCustomRecipe
                    ? recipeInfo.servings
                    : customRecipeInfo.servingSize
                }`}</p>
                <p className="mt-2 p-2 border-b-2 border-vandyke">{`Ingredients: ${
                  isNotCustomRecipe
                    ? recipeInfo.extendedIngredients.length
                    : customRecipeInfo.ingredients.length
                }`}</p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-vandyke">
              <h2 className="text-2xl text-vandyke font-Geologica">
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
                onClick={
                  isNotCustomRecipe
                    ? shoppingListHandler.bind(
                        null,
                        recipeInfo.id,
                        recipeInfo.title
                      )
                    : shoppingListHandler.bind(
                        null,
                        customRecipeInfo.dbID,
                        customRecipeInfo.title
                      )
                }
                className="text-center text-lg font-noto mt-5 border-vandyke border-2 w-full md:w-6/12 p-2 rounded cursor-pointer hover:bg-vandyke hover:text-eggshell transition-all ease-in-out"
              >
                Add Ingredients to Shopping List
              </button>
            </div>

            <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-vandyke pb-10">
              <h1 className="text-2xl text-vandyke font-Geologica">
                Instructions
              </h1>
              {isNotCustomRecipe
                ? recipeInfo.analyzedInstructions.map((instructions, index) => {
                    return instructions.steps.map((steps, index) => {
                      return (
                        <div key={index} className="flex m-3 gap-2">
                          <p className="ml-2 font-noto">{`${steps.number}: `}</p>
                          <p className="font-noto tracking-wide">
                            {steps.step}
                          </p>
                        </div>
                      );
                    });
                  })
                : customRecipeInfo.instructions.map((instructions, index) => {
                    return (
                      <div key={index} className="flex m-3 gap-2">
                        <p className="ml-2 font-noto">{`${index + 1}: `}</p>
                        <p className="font-noto tracking-wide">
                          {instructions}
                        </p>
                      </div>
                    );
                  })}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default RecipeInfo;
