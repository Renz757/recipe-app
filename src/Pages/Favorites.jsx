import { Link } from "react-router-dom";

//todo: style favorites page 

const Favorites = ({ favorites, getIngredients }) => {
  return (
    <div>
      {favorites <= 0 ? (<p>No Favorites</p>) : (favorites.map((favorites, index) => {
        return (
          <div key={index}>
            <h1>{favorites.title}</h1>
            <img src={favorites.image} />
            <Link
              to={`/recipeInfo/${favorites.id}`}
              onClick={getIngredients.bind(null, favorites.id)}
            >
              Show Full Recipe
            </Link>
          </div>
        );
      }))}
    </div>
  );
};

export default Favorites;
