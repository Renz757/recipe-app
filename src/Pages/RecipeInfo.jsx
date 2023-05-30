const RecipeInfo = ({ recipeInfo }) => {
  return (
    <>
      {recipeInfo.map((recipeInfo, index) => {
        return (
          <div key={index}>
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
