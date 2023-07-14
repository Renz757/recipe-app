import ReactDOM from "react-dom";

const DropDownStatus = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="relative">
          <div className="absolute  z-20 h-10 bg-green-400 top-0 w-screen flex justify-center items-center font-noto text-eggshell">
            Ingredients Added
          </div>
        </div>,
        document.getElementById("dropdown-root")
      )}
    </>
  );
};

export default DropDownStatus;
