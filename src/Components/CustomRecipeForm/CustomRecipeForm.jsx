import { useState } from "react";
import CustomRecipeInfo from "./CustomRecipeInfo";
import CustomRecipeIngredients from "./CustomRecipeIngredients";
import CustomRecipeInstructions from "./CustomRecipeInstructions";

const CustomRecipeForm = () => {
  const [page, setPage] = useState(0);
  const pageTitles = ["Recipe Information", "Ingredients", "Instructions"];

  const showPage = () => {
    if (page == 0) {
      return <CustomRecipeInfo />;
    } else if (page == 1) {
      return <CustomRecipeIngredients />;
    } else {
      return <CustomRecipeInstructions />;
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center">Custom Recipe</h1>
      <form className="h-screen flex flex-col items-center p-10 relative">
        {/* Form Components */}
        <div>{showPage()}</div>
        {/* Controls */}
        <div className="flex gap-3 mt-12">
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
            disabled={page == pageTitles.length - 1}
            onClick={() => {
              setPage((curPage) => curPage + 1);
            }}
            className="px-7 py-2
             bg-zinc-400 rounded"
            type="button"
          >
            {page == pageTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomRecipeForm;
