import { useQuery } from "react-query";
import axios from "axios";
import HeartIcon from "../UI/heartIcon";

const RecipeInfo = ({ recipeInfoId, onUpdateFavorite, favorites }) => {
  const { data: recipeInfo } = useQuery("recipeInfo", async () => {
    const { data } = await axios
      .get(
        `https://api.spoonacular.com/recipes/${
          recipeInfoId[0].id
        }/information?apiKey=${import.meta.env.VITE_API_KEY}`
      )
      .catch((err) => {
        console.log(err);
      });
    return data;
  });

  const favoriteRecipeHandler = (title, image, id) => {
    const favObject = {
      id: id,
      title: title,
      image: image,
      isFavorite: true,
    };

    onUpdateFavorite(favObject);
  };

  return (
    <>
      {!recipeInfo ? (
        <h1>Loading...</h1>
      ) : (
        <div key={recipeInfo.id} className="bg-saffron">
          {/* Recipe Info */}
          <div className="flex flex-col ">
            <div className="relative">
              <img
                className="w-full aspect-video object-cover blur-none"
                src={recipeInfo.image}
              />
            </div>
            <div className="flex items-center">
              <h1 className="text-4xl font-Caveat p-3">{recipeInfo.title}</h1>
              <div
                className="bg-zinc-500 h-7 w-7 flex justify-center items-center rounded-full"
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
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Ready In: ${recipeInfo.readyInMinutes} minutes`}</p>
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Servings: ${recipeInfo.servings}`}</p>
              <p className="mt-2 p-2 border-b-2 border-zinc-500">{`Ingredients: ${recipeInfo.extendedIngredients.length}`}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-zinc-500">
            <h2 className="text-2xl text-zinc-600 font-Geologica">
              Ingredients
            </h2>
            {recipeInfo.extendedIngredients.map((ingredients, index) => {
              return (
                <p key={index} className="font-noto pt-2">
                  {ingredients.original}
                </p>
              );
            })}
          </div>

          <div className="flex flex-col mt-16 px-5 py-7 border-t-2 border-zinc-500 pb-10">
            <h1 className="text-2xl text-zinc-600 font-Geologica">
              Instructions
            </h1>
            {recipeInfo.analyzedInstructions.map((instructions, index) => {
              return instructions.steps.map((steps, index) => {
                return (
                  <div key={index} className="flex m-3 gap-2">
                    <p className="ml-2 font-noto">{`${steps.number}: `}</p>
                    <p className="font-noto tracking-wide">{steps.step}</p>
                  </div>
                );
              });
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeInfo;
