import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//todo: style favorites page
const Favorites = ({ setRecipeInfo }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favoriteRecipes);

  return (
    <div className="bg-eggshell h-screen">
      {favorites <= 0 && <p className="bg-eggshell h-screen text-center w-screen pt-10 text-3xl">No Favorites</p>}

      <div className="grid grid-cols1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-7 lg:gap-4">
        {favorites.map((favorites, index) => {
          return (
            <div key={index} className="text-left lg:text-center">
              <img
                className="w-full aspect-video object-cover blur-none lg:rounded"
                src={favorites.image}
                alt={favorites.title}
              />

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
        })}
      </div>
    </div>
  );
};

export default Favorites;
