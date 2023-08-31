import React from "react";
import { Link } from "react-router-dom";

const RecipeDetails = ({
  title,
  id,
  readyInMinutes,
  servings,
  setRecipeInfo,
}) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-Caveat text-vandyke">{title}</h1>
      <div className="flex gap-2 font-noto">
        <p>{`Prep Time: ${readyInMinutes} Minutes - `}</p>
        <p>{`Servings: ${servings}`}</p>
      </div>

      <Link to={`/recipeInfo/${id}`} onClick={() => {setRecipeInfo(id)}}>
        <p className="underline font-noto text-darkgold">Show Recipe</p>
      </Link>
    </div>
  );
};

export default RecipeDetails;
