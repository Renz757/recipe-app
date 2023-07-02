import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import ShoppingList from "./Pages/shoppingList";
import CustomRecipes from "./Pages/CustomRecipes";
import RootLayout from "./Pages/Root";
import { db } from "./firebase_setup/firebase";
import { collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const App = () => {
  //make a context with use reducer hook or implement redux for state management
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const colRef = collection(db, "favorites");
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {

      setFavorites(snapshot.docs.map((doc) => ({ ...doc.data(), dbID: doc.id })));
    })
  }, []);

  //check if receipe is already in favorites
  const onUpdateFavorite = (favObject) => {
    //if id's match, get index of favorite
    const existingFavoriteIndex = favorites.findIndex(
      (index) => index.id === favObject.id
    );

    const existingFavorite = favorites[existingFavoriteIndex];

    if (existingFavorite) {
      //if recipe is in favorites, remove
      const docRef = doc(db, 'favorites', existingFavorite.dbID)
      deleteDoc(docRef)
    } else {
      //if recipe is not in favorites, add
      addDoc(colRef, {
        ...favObject,
      });
    }
  };

  const onUpdateIngredients = (ingredientObject) => {
    const existingIngredientIndex = shoppingList.findIndex(
      (index) => index.id === ingredientObject.id
    );

    const existingIngredients = shoppingList[existingIngredientIndex];

    if (existingIngredients) {
      //if recipe is in favorites, remove
      console.log("recipe is in the shopping cart ");
    } else {
      //if recipe is not in favorites, add
      setShoppingList([...shoppingList, ingredientObject]);
    }
  };

  const onRemoveIngredients = (id) => {
    setShoppingList(shoppingList.filter((index) => index.id !== id));
    console.log(shoppingList);
  };

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
              onUpdateFavorite={onUpdateFavorite}
              onUpdateIngredients={onUpdateIngredients}
              favorites={favorites}
            />
          ),
        },
        {
          path: "/favorites",
          element: (
            <Favorites favorites={favorites} setRecipeInfo={setRecipeInfo} />
          ),
        },
        {
          path: "/shoppingList",
          element: (
            <ShoppingList
              shoppingList={shoppingList}
              onRemoveIngredients={onRemoveIngredients}
            />
          ),
        },
        {
          path: "/customRecipes",
          element: <CustomRecipes />,
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
