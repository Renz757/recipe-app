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

  //initialize favorites state in redux from firebase on component mount
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
            <div key={index} className="grid grid-cols-1">
              <div className="text-center">
                <img
                  className="w-full aspect-video object-cover blur-none"
                  src={favorites.image}
                  alt={favorites.title}
                />
              </div>
              <div className="p-4">
                <h1 className="text-3xl font-Caveat">{favorites.title}</h1>
                <Link
                  to={`/recipeInfo/${favorites.id}`}
                  onClick={() => setRecipeInfo(favorites.id)}
                >
                  <p className="underline font-Geologica text-zinc-600">
                    Show Full Recipe
                  </p>
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
