import { useState } from "react";
import { useDispatch } from "react-redux";
import { customRecipeActions } from "../../store/customRecipes-slice";
import CustomRecipeInfo from "./CustomRecipeInfo";
import CustomRecipeIngredients from "./CustomRecipeIngredients";
import CustomRecipeInstructions from "./CustomRecipeInstructions";

const CustomRecipeForm = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const pageTitles = ["Recipe Information", "Ingredients", "Instructions"];

  console.log(page);
  const showPage = () => {
    if (page == 0) {
      return <CustomRecipeInfo />;
    } else if (page == 1) {
      return <CustomRecipeIngredients />;
    } else {
      return <CustomRecipeInstructions />;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(customRecipeActions.submitForm());
    localStorage.clear("ingredientArray", "instructionsArray");
    dispatch(customRecipeActions.resetForm());
    setPage(0);
  };

  const nextPage = () => {
    if (page == 3) {
      submitHandler;
    } else {
      setPage((curPage) => curPage + 1);
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">{pageTitles[page]}</h1>
      <form
        onSubmit={submitHandler}
        className="h-screen flex flex-col items-center p-10 relative"
      >
        {/* Form Components */}
        <div>{showPage()}</div>
        {/* Controls */}
        <div className="flex gap-3 mt-12 absolute top-[625px]">
          <button
            disabled={page <= 0}
            onClick={() => {
              setPage((curPage) => curPage - 1);
            }}
            className="px-7 py-2
             bg-zinc-400 rounded"
            type="button"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            className="px-7 py-2
             bg-zinc-400 rounded"
            type={page > pageTitles.length - 1 ? "submit" : "button"}
          >
            {page === pageTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomRecipeForm;
