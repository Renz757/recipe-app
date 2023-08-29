import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DefaultImage from "../Components/DefaultImage";
import RecipeDetails from "../Components/RecipeDetails";

//todo: style favorites page
const Favorites = ({ setRecipeInfo }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favoriteRecipes);
  console.log(favorites);

  return (
    <div className="bg-eggshell h-screen">
      <h1 className="text-3xl text-center p-3 font-Geologica text-vandyke">
        Favorites
      </h1>
      {favorites <= 0 && (
        <p className="bg-eggshell h-screen text-center w-screen pt-10 text-3xl">
          No Favorites
        </p>
      )}

      <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-5 lg:gap-4 bg-eggshell">
        {favorites &&
          favorites.map((favorites, index) => {
            return (
              <div key={index} className="">
                <div>
                  <DefaultImage
                    src={favorites.image}
                    alt={favorites.title}
                    key={index}
                  />
                </div>
                <RecipeDetails
                  title={favorites.title}
                  id={favorites.id}
                  readyInMinutes={favorites.readyInMinutes}
                  servings={favorites.servings}
                  setRecipeInfo={setRecipeInfo}
                />

                {/* <div className="p-4">
                <h1 className="text-3xl font-Caveat text-vandyke">{favorites.title}</h1>
                <Link
                  to={`/favoritesInfo/${favorites.id}`}
                  onClick={() => setRecipeInfo(favorites.id)}
                >
                  <p className="underline font-noto text-darkgold">
                    Show Full favorites
                  </p>
                </Link>
              </div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
