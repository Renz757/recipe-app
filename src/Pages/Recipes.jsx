import { Link } from "react-router-dom";

const Recipes = (props) => {
  return (
    <>
      {props.recipeData.map((recipe) => {
        return (
          <>
            {/* todo: add styling for tablet and desktop  */}
            <div
              key={recipe.id}
              className="mt-3 grid grid-cols-1 justify-items-center gap-1"
            >
              <h1>{recipe.title}</h1>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-xl"
              />
              <p>
                <Link
                  to={`/recipeInfo/${recipe.id}`}
                  onClick={props.getIngredients.bind(null, recipe.id)}
                >
                  Show Full Recipe
                </Link>
              </p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Recipes;
