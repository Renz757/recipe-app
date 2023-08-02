import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import { ReactQueryDevtools } from "react-query/devtools";
import { collection } from "firebase/firestore";
import { db } from "./firebase_setup/firebase";
import { auth } from "./firebase_setup/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import useInitialize from "./hooks/use-initialize";
import { favActions } from "./store/favorites-slice";
import { shoppingListActions } from "./store/shoppingList-slice";
import { customRecipeActions } from "./store/customRecipes-slice";
import { authActions } from "./store/authSlice";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Nav from "./Components/Navigation/Nav";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import ShoppingList from "./Pages/shoppingList";
import CustomRecipes from "./Pages/CustomRecipePages/CustomRecipes";
import CustomRecipeList from "./Pages/CustomRecipePages/CustomRecipeList";
import CustomRecipeForm from "./pages/CustomRecipePages/CustomRecipeForm/CustomRecipeForm";

const App = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const dispatch = useDispatch();

  const favRef = collection(db, "favorites");
  const shopRef = collection(db, "shoppingList");
  const customRef = collection(db, "customRecipes");

  useInitialize(favRef, favActions);
  useInitialize(shopRef, shoppingListActions);
  useInitialize(customRef, customRecipeActions);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(authActions.setUser(user));
    });

    if (user) {
      redirect("/home");
    }

    return unsubscribe;
  }, []);

  console.log(user);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home setRecipeInfo={setRecipeInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="recipes"
            element={<Recipes setRecipeInfo={setRecipeInfo} />}
          />
          <Route
            path="/recipeInfo/:recipeId"
            element={
              <RecipeInfo
                recipeInfoId={recipeInfo}
                setRecipeInfo={setRecipeInfo}
              />
            }
          />
          <Route
            path="favorites"
            element={<Favorites setRecipeInfo={setRecipeInfo} />}
          />
          <Route path="shoppingList" element={<ShoppingList />}></Route>
          <Route
            path="customRecipes"
            element={<CustomRecipes setRecipeInfo={setRecipeInfo} />}
          />
          <Route
            path="/customRecipes/createCustomRecipe"
            element={<CustomRecipeForm />}
          />
          <Route
            path="/customRecipes/customRecipeList"
            elemen={<CustomRecipeList setRecipeInfo={setRecipeInfo} />}
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
