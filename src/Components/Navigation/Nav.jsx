import { Link } from "react-router-dom";

const Nav = (props) => {

    const searchHandler = (event) => {
      
        props.setSearchInput(event.target.value)
    } 

  return (
    <>
      <div className="bg-blue-400 p-7 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl"><Link>Recipe App</Link></h1>
        </div>
        {/* Create Search bar it's own component */}
        <div className="mt-2">
          {/* todo: add validation */}
          <input
            type="text"
            id="searchRecipe"
            placeholder="Search"
            className="p-2 rounded"
            onChange={searchHandler}
          />
        </div>

        <div className="mt-3">
          <button onClick={props.fecthData} className="border px-6 rounded">Search</button>
        </div>
        <ul>
          <li><Link to="favorites">Favorites</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
