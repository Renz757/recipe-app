import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { getRandomRecipe } from "../http-functions/https-functions";

const Home = ({getIngredients}) => {
  const { data, isError, error } = useQuery(["randomRecipe"], getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) {
    return <h1>{`An Error Has Occured ${error}`}</h1>;
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-center mt-4 font-Geologica">
          Random Recipe of The Day!
        </h1>
        {isError && <p>{error}</p>}
        {!data ? (
          <h1>Loading...</h1>
        ) : (
          data.map((recipeInfo, index) => {
            return (
              <div key={index}>
                <img
                  className="mt-4 w-full aspect-video object-cover"
                  src={`${recipeInfo.image}`}
                />
                <h1 className="text-4xl font-Caveat p-3">{recipeInfo.title}</h1>
                <Link
                  to={`/recipeInfo/${recipeInfo.id}`}
                  onClick={getIngredients.bind(null, recipeInfo.id)}
                >
                  Give it a Try!
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
