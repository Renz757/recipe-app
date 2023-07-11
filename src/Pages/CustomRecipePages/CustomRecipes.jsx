import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../firebase_setup/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { customRecipeActions } from "../../store/customRecipes-slice";
import { useEffect } from "react";

const CustomRecipes = () => {
  const colRef = collection(db, "customRecipes");
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let customRecipeList = [];
      for (const doc of snapshot.docs) {
        customRecipeList.push({ ...doc.data(), dbID: doc.id });
      }
      dispatch(customRecipeActions.initialize(customRecipeList));
    });
  }, []);

  const customRecipes = useSelector((state) => state.customRecipe);
  console.log(customRecipes.customRecipeList);

  //create component that renders a list of custom recipes
  return (
    <>
      <div>
        <Link to="/customRecipes/createCustomRecipe">Add New Recipe</Link>
      </div>
      {customRecipes.customRecipeList ? (
        <p>There are no custom recipes</p>
      ) : (
        <p>Render Array</p>
      )}

      {/* <CustomRecipeForm /> */}
    </>
  );
};

export default CustomRecipes;
