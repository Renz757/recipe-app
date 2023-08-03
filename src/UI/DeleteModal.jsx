import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../store/customRecipes-slice";
import { imageDB } from "../firebase_setup/firebase";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";

const DeleteModal = ({ customRecipeId, imageName }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const removeRecipeHandler = () => {
    //remove custom recipe
    dispatch(
      customRecipeActions.deleteCustomRecipe({
        id: customRecipeId,
        uid: user.uid,
      })
    );

    //remove
    const imageRef = ref(imageDB, `images/${imageName}`);
    deleteObject(imageRef)
      .then(() => {
        console.log("file was deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cancelHandler = () => {
    dispatch(customRecipeActions.modalhandler());
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className="w-7/12 h-64 py-16 bg-eggshell absolute z-20 top-1/4 left-1/4 rounded-xl flex flex-col text-center">
          <h1 className="text-red-400 text-2xl bottom-32">
            Are you sure you would like to delete this recipe?
          </h1>
          <div className="w-4/12 mx-auto flex justify-center mt-5 gap-3">
            <button
              onClick={cancelHandler}
              className="px-6 py-2 bg-slate-500 rounded-xl cursor-pointer"
            >
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
