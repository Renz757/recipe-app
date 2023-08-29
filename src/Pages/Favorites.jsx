import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultImage from "../Components/DefaultImage";
import RecipeDetails from "../Components/RecipeDetails";
import { motion } from "framer-motion";
import { item, container } from "../UI/stagger";

//todo: style favorites page
const Favorites = ({ setRecipeInfo }) => {
  const dispatch = useDispatch();
  const [animationKey, setAnimationKey] = useState(Date.now());

  const favorites = useSelector((state) => state.favorites.favoriteRecipes);
  console.log(favorites);


  return (
    <div className="bg-eggshell h-screen">
      <h1 className="text-3xl text-center p-3 font-Geologica text-vandyke">
        Favorites
      </h1>
      {favorites <= 0 && (
        <p className="bg-eggshell h-screen text-center w-screen pt-10 text-3xl">
          No Favorites
        </p>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-5 lg:gap-4 bg-eggshell"
      >
        {favorites &&
          favorites.map((favorites, index) => {
            return (
              <motion.div key={index} variants={item}>
                <div>
                  <DefaultImage
                    src={favorites.image}
                    alt={favorites.title}
                    key={index}
                  />
                </div>
                <RecipeDetails
                  title={favorites.title}
                  id={favorites.id}
                  readyInMinutes={favorites.readyInMinutes}
                  servings={favorites.servings}
                  setRecipeInfo={setRecipeInfo}
                />
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};

export default Favorites;
