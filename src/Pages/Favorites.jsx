import { Link } from "react-router-dom";

//todo: style favorites page

const Favorites = ({ favorites, getIngredients }) => {
  console.log(favorites);
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
                  onClick={getIngredients.bind(null, favorites.id)}
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
