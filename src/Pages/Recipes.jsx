import { Link } from "react-router-dom";

const Recipes = (props) => {
  return (
    <>
      {props.recipeData.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className="mt-3 grid grid-cols-1 justify-items-center gap-1"
          >
            <h1>{recipe.title}</h1>
            <img
              src={recipe.image}
              alt={recipe.title}
              key={recipe.id}
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
        );
      })}
    </>
  );
};

export default Recipes;
