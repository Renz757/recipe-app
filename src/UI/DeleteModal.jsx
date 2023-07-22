import ReactDOM from "react-dom";

const DeleteModal = ({ customRecipeId }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="w-7/12 h-64 py-16 bg-eggshell absolute z-20 top-1/4 left-1/4 rounded-xl flex flex-col text-center">
          <h1 className="text-red-400 text-2xl bottom-32">
            Are you sure you would like to delete this custom recipe?
          </h1>
          <div className="w-4/12 mx-auto flex justify-center mt-5 gap-3">
            <button className="px-6 py-2 bg-slate-500 rounded-xl cursor-pointer">
              Cancel
            </button>
            <button className="px-6 py-2 bg-red-400 rounded-xl cursor-pointer">
              Delete
            </button>
          </div>
        </div>,
        document.getElementById("deleteModal-root")
      )}
    </>
  );
};

export default DeleteModal;
