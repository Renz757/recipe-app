import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { collection } from "firebase/firestore";
import { db } from "./firebase_setup/firebase";
import { useDispatch } from "react-redux";
import useInitialize from "./hooks/use-initialize";
import { favActions } from "./store/favorites-slice";
import { shoppingListActions } from "./store/shoppingList-slice";
import { customRecipeActions } from "./store/customRecipes-slice";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import ShoppingList from "./Pages/shoppingList";
import CustomRecipes from "./Pages/CustomRecipePages/CustomRecipes";
import CustomRecipeList from "./Pages/CustomRecipePages/CustomRecipeList";
import CustomRecipeForm from "./pages/CustomRecipePages/CustomRecipeForm/CustomRecipeForm";
import RootLayout from "./Pages/Root";

const App = () => {
  //make a context with use reducer hook or implement redux for state management
  const [recipeInfo, setRecipeInfo] = useState([]);
  
  const dispatch = useDispatch();

  const favRef = collection(db, "favorites");
  const shopRef = collection(db, "shoppingList");
  const customRef = collection(db, "customRecipes");

  useInitialize(favRef, favActions)
  useInitialize(shopRef, shoppingListActions)
  useInitialize(customRef, customRecipeActions)


  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/recipes",
          element: <Recipes setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/recipeInfo/:recipeId",
          element: (
            <RecipeInfo
              recipeInfoId={recipeInfo}
              setRecipeInfo={setRecipeInfo}
            />
          ),
        },
        {
          path: "/favorites",
          element: <Favorites setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/shoppingList",
          element: <ShoppingList />,
        },
        {
          path: "/customRecipes",
          element: <CustomRecipes setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/customRecipes/createCustomRecipe",
          element: <CustomRecipeForm />,
        },
        {
          path: "/customRecipes/customRecipeList",
          element: <CustomRecipeList setRecipeInfo={setRecipeInfo} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
