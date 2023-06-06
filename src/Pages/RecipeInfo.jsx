import HeartIcon from "../UI/heartIcon";

const RecipeInfo = ({ recipeInfo, onUpdateFavorite, favorites }) => {
  const favoriteRecipeHandler = (title, image, id) => {
    const favObject = {
      id: id,
      title: title,
      image: image,
      isFavorite: true
    };

    onUpdateFavorite(favObject);
  };

  return (
    <>
      {recipeInfo.map((recipeInfo, index) => {
        return (
          <div key={index}>
            {/* Recipe Info */}
            <div className="flex flex-col items-center mt-4 ">
              <h1 className="text-2xl">{recipeInfo.title}</h1>
              <div className="relative">
                <img className="rounded-xl mt-4" src={recipeInfo.image} />
                <div
                  className="absolute bottom-0 top-6 left-2 bg-zinc-500 h-7 w-7 flex justify-center items-center rounded-full"
                  onClick={favoriteRecipeHandler.bind(
                    null,
                    recipeInfo.title,
                    recipeInfo.image,
                    recipeInfo.id
                  )}
                >
                  <HeartIcon currentId={recipeInfo.id} favorites={favorites}/>
                </div>
              </div>

              <p className="mt-2">{`Serving Time: ${recipeInfo.readyInMinutes} minutes`}</p>
              <p className="mt-2">{`Servings: ${recipeInfo.servings}`}</p>
            </div>
            {/* Ingredients */}
            <div className="flex flex-col items-center mt-4">
              <h2 className="text-2xl">Ingredients</h2>
              {recipeInfo.extendedIngredients.map((ingredients, index) => {
                return <p key={index}>{ingredients.original}</p>;
              })}
            </div>
            <div className="mt-4 flex flex-col items-center">
              <h1 className="text-2xl">Instructions</h1>
              {recipeInfo.analyzedInstructions.map((instructions, index) => {
                return instructions.steps.map((steps, index) => {
                  return (
                    <div key={index} className="flex m-3 gap-2 justify-center">
                      <p className="ml-2">{`${steps.number}: `}</p>
                      <p>{steps.step}</p>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecipeInfo;
