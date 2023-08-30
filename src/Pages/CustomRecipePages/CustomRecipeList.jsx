import React from "react";
import { useSelector } from "react-redux";
import DefaultImage from "../../Components/DefaultImage";
import RecipeDetails from "../../Components/RecipeDetails";
import { motion } from "framer-motion";
import { item, container } from "../../UI/fr-animations/stagger";
const CustomRecipeList = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-7 lg:gap-4 bg-eggshell"
      >
        {customRecipes.customRecipeList.map((recipe, index) => {
          return (
            <motion.div key={index} variants={item}>
              <div className="">
                <div className="">
                  <DefaultImage
                    src={recipe.image}
                    alt={recipe.title}
                    key={index}
                  />
                </div>
                <RecipeDetails
                  title={recipe.title}
                  id={recipe.dbID}
                  readyInMinutes={recipe.cookTime}
                  servings={recipe.servingSize}
                  setRecipeInfo={setRecipeInfo}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default CustomRecipeList;
