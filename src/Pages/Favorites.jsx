import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//todo: style favorites page
const Favorites = ({ setRecipeInfo }) => {
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites.favoriteRecipes);

  return (
    <div className="bg-eggshell h-screen">
      {favorites <= 0 ? (
        <p>No Favorites</p>
      ) : (
        favorites.map((favorites, index) => {
          return (
            <div key={index} className="grid grid-cols-1 lg:w-8/12 mx-auto">
              <div className="text-center">
                <img
                  className="w-full aspect-video object-cover blur-none lg:rounded"
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
