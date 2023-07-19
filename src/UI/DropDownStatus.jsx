import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

const DropDownStatus = () => {
    const notificationState = useSelector(state => state.shoppingList.notificationState)
  return (
    <>
      {ReactDOM.createPortal(
        <div className={`fixed font-noto text-eggshell ${notificationState.isShowing ? 'flex justify-center items-center transition duration-1000 ease-linear z-20 h-10 bg-green-400 top-0 w-screen' : 'hidden'} `}>
          Ingredients Added
        </div>,
        document.getElementById("dropdown-root")
      )}
    </>
  );
};

export default DropDownStatus;
