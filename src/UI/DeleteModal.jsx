import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../store/customRecipes-slice";
import { Link } from "react-router-dom";

const DeleteModal = ({ customRecipeId }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.customRecipe.showModal);
  const removeRecipeHandler = () => {
    dispatch(customRecipeActions.deleteCustomRecipe(customRecipeId));
  };
  const cancelHandler = () => {
    dispatch(customRecipeActions.modalhandler())
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className="w-7/12 h-64 py-16 bg-eggshell absolute z-20 top-1/4 left-1/4 rounded-xl flex flex-col text-center">
          <h1 className="text-red-400 text-2xl bottom-32">
            Are you sure you would like to delete this recipe?
          </h1>
          <div className="w-4/12 mx-auto flex justify-center mt-5 gap-3">
            <button onClick={cancelHandler} className="px-6 py-2 bg-slate-500 rounded-xl cursor-pointer">
              Cancel
            </button>
            <Link to="/customRecipes">
              <button
                onClick={removeRecipeHandler}
                className="px-6 py-2 bg-red-400 rounded-xl cursor-pointer"
              >
                Delete
              </button>
            </Link>
          </div>
        </div>,
        document.getElementById("deleteModal-root")
      )}
    </>
  );
};

export default DeleteModal;
