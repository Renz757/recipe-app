import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { favActions } from "../store/favorites-slice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";
import { useEffect } from "react";

//todo: style favorites page
const Favorites = ({ setRecipeInfo }) => {
  const dispatch = useDispatch();
  const colRef = collection(db, "favorites");

  //initialize favorites state from firebase on component mount 
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let favorites = [];
      for (const doc of snapshot.docs) {
        favorites.push({ ...doc.data(), dbID: doc.id });
      }
      dispatch(favActions.initialize(favorites));
    });
  }, []);

  const favorites = useSelector((state) => state.favorites.favoriteRecipes);

  return (
    <div className="bg-eggshell h-screen">
      {favorites <= 0 ? (
        <p>No Favorites</p>
      ) : (
        favorites.map((favorites, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center "
            >
              <div className="text-center">
                <h1>{favorites.title}</h1>
                <img
                  className="rounded-xl"
                  src={favorites.image}
                  alt={favorites.title}
                />
                <Link
                  to={`/recipeInfo/${favorites.id}`}
                  onClick={() => setRecipeInfo(favorites.id)}
                >
                  Show Full Recipe
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favorites;
