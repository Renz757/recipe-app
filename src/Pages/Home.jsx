import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getRandomRecipe } from "../http-functions/https-functions";

const Home = ({ setRecipeInfo }) => {
  const {
    data: recipeInfo,
    isError,
    error,
  } = useQuery(["randomRecipe"], getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) {
    return <h1>{`An Error Has Occured ${error}`}</h1>;
  }

  return (
    <>
      <div className="flex flex-col bg-eggshell h-screen">
        <h1 className="text-3xl text-center mt-4 font-Geologica">
          Random Recipe of The Day!
        </h1>
        {isError && <p>{error}</p>}
        {!recipeInfo ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
            <div className=" text-left">
              <img
                className="w-full mt-4 aspect-video object-cover blur-none lg:rounded"
                src={`${recipeInfo.image}`}
              />
              <h1 className="text-4xl text-left font-Caveat pt-3">
                {recipeInfo.title}
              </h1>
              <Link
                onClick={() => setRecipeInfo(recipeInfo.id)}
                to={`/recipeInfo/${recipeInfo.id}`}
                className="text-vandyke underline font-Geologica"
              >
                Give it a Try!
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
