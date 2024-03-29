import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getRandomRecipe } from "../http-functions/https-functions";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../store/nav-slice";
import CuisineList from "../Components/CuisineList";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../UI/fr-animations/fadeIn";

const Home = ({ setRecipeInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.nav.searchInput);
  const cuisineInput = useSelector((state) => state.nav.cuisine);

  const [isDragging, setIsDragging] = useState(false);

  const {
    data: recipeInfo,
    isError,
    error,
    isLoading,
  } = useQuery(["randomRecipe"], getRandomRecipe, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data, refetch } = useQuery(
    ["recpies"],
    async () => {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${searchInput}&cuisine=${cuisineInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
      );

      return data.results;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: false,
    }
  );

  useEffect(() => {
    dispatch(navActions.updateCuisineInput(""));
  }, [cuisineInput]);

  useEffect(() => {
    if (cuisineInput === "") {
      return;
    } else {
      refetch();
      navigate("/recipes");
    }
  }, [cuisineInput]);

  const cuisineHandler = (e) => {
    if (isDragging) {
      return;
    } else {
      dispatch(navActions.updateCuisineInput(e.target.innerHTML));
    }
  };

  if (isError) {
    return <h1>{`An Error Has Occured ${error}`}</h1>;
  }


  return (
    <>
      {isLoading && (
        <h1 className="text-center mt-12 text-2xl font-noto">Loading...</h1>
      )}

      {recipeInfo && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col bg-eggshell h-auto"
        >
          <h1 className="text-3xl text-center mt-4 font-Geologica text-vandyke">
            Recipe of The Day!
          </h1>
          <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
            <div className=" text-center">
              <img
                className="w-full mt-4 aspect-video object-cover blur-none lg:rounded"
                src={`${recipeInfo.image}`}
              />
              <h1 className="text-4xl font-Caveat pt-3">{recipeInfo.title}</h1>
              <Link
                onClick={() => setRecipeInfo(recipeInfo.id)}
                to={`/recipeInfo/${recipeInfo.id}`}
                className="text-vandyke underline font-Geologica"
              >
                Give it a Try!
              </Link>
            </div>
          </div>

          <CuisineList
            cuisineHandler={cuisineHandler}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        </motion.div>
      )}
    </>
  );
};

export default Home;
