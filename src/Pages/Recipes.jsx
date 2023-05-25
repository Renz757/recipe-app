const Recipes = (props) => {
  return (
    <>
      {props.recipeData.map((recipe) => {
        return (
          <>
            <div className="mt-3 grid grid-cols-1 justify-items-center gap-1">
              <h1>{recipe.title}</h1>
              <img src={recipe.image} alt={recipe.title} className="rounded-xl" />
              <p className="text-blue-200">Show Full Recipe</p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Recipes;
