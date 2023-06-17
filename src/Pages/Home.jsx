import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { getRandomRecipe } from "../http-functions/https-functions";


const Home = () => {
  const { data, isError, error } = useQuery(["randomRecipe"], getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) {
    return <h1>{`An Error Has Occured ${error}`}</h1>;
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-4">Random Recipe of The Day!</h1>
        {isError && <p>{error}</p>}
        {!data ? (
          <h1>Loading...</h1>
        ) : (
          data.map((recipeInfo, index) => {
            return (
              <div key={index}>
                <h1 className="mt-3">{recipeInfo.title}</h1>
                <img className="rounded-xl mt-4" src={`${recipeInfo.image}`} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
