import { Link } from "react-router-dom";
import HeartIcon from "../UI/heartIcon";

const Recipes = ({ recipeData, getIngredients }) => {

  return (
    <>
      {recipeData == [] ? (
        <p>Search a Recipe!</p>
      ) : (
        recipeData.map((recipe) => {
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
                  onClick={getIngredients.bind(null, recipe.id)}
                >
                  Show Full Recipe
                </Link>
              </p>
            </div>
          );
        })
      )}
    </>
  );
};

export default Recipes;
