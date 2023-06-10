import { useState, useEffect } from "react";
import { useQuery } from "react-query";

async function getRandomRecipe() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${
      import.meta.env.VITE_API_KEY
    }&number=1`
  );
  const data = await response.json();
  return data.recipes;
}

const Home = () => {
  const [randomRecipe, setRandomRecipe] = useState([]);

  const { data } = useQuery("randomRecipe", getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const recipeDataObject = data[0];

  console.log(recipeDataObject);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-4">Random Recipe of The Day!</h1>
        <h1 className="mt-3">{`${recipeDataObject.title}`}</h1>
        <img className="rounded-xl mt-4" src={`${recipeDataObject.image}`} />
      </div>
    </>
  );
};

export default Home;
