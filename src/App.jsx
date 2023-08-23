import { useState, useEffect } from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import { ReactQueryDevtools } from "react-query/devtools";
import { collection, setDoc, doc } from "firebase/firestore";
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
import ResetPassword from "./Pages/ResetPassword";
import Nav from "./Components/Navigation/Nav";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import ShoppingList from "./Pages/shoppingList";
import CustomRecipes from "./Pages/CustomRecipePages/CustomRecipes";
import CustomRecipeForm from "./Pages/CustomRecipePages/CustomRecipeForm";

const App = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(authActions.setUser(user));
    });

    if (user) {
      const userRef = doc(db, "users", `${user.uid}`);
      setDoc(userRef, {
        uid: user.uid,
      });
    }

    return unsubscribe;
  }, [user]);

  const favRef = collection(db, "users", `${user && user.uid}`, "favorites");
  const shopRef = collection(
    db,
    "users",
    `${user && user.uid}`,
    "shoppingList"
  );
  const customRef = collection(
    db,
    "users",
    `${user && user.uid}`,
    "customRecipes"
  );

  useInitialize(favRef, favActions);
  useInitialize(shopRef, shoppingListActions);
  useInitialize(customRef, customRecipeActions);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route
            path="/"
            index
            element={
              <PrivateRoute>
                <Home setRecipeInfo={setRecipeInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <Recipes setRecipeInfo={setRecipeInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipeInfo/:recipeId"
            element={
              <PrivateRoute>
                <RecipeInfo
                  recipeInfoId={recipeInfo}
                  setRecipeInfo={setRecipeInfo}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites setRecipeInfo={setRecipeInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/shoppingList"
            element={
              <PrivateRoute>
                <ShoppingList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/customRecipes"
            element={
              <PrivateRoute>
                <CustomRecipes setRecipeInfo={setRecipeInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/customRecipes/createCustomRecipe"
            element={
              <PrivateRoute>
                <CustomRecipeForm />
              </PrivateRoute>
            }
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
