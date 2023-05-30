const RecipeInfo = ({ recipeInfo }) => {
   
    return (
    <>
      {recipeInfo.map((recipeInfo) => {
        return (
          <>
            {/* Recipe Info */}
            <div className="flex flex-col items-center mt-4 ">
              <h1 className="text-2xl">{recipeInfo.title}</h1>
              <img className="rounded-xl mt-4" src={recipeInfo.image} />
              <p className="mt-2">{`Serving Time: ${recipeInfo.readyInMinutes} minutes`}</p>
              <p className="mt-2">{`Servings: ${recipeInfo.servings}`}</p>
            </div>
            {/* Ingredients */}
            <div className="flex flex-col items-center mt-4">
              <h2 className="text-2xl">Ingredients</h2>
              {recipeInfo.extendedIngredients.map((ingredients) => {
                return (
                  <>
                    <p>{ingredients.original}</p>
                  </>
                );
              })}
            </div>
            <div>
              <h1>Instructions</h1>
            </div>
          </>
        );
      })}
    </>
  );
};

export default RecipeInfo;