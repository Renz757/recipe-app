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
      <h1 className="text-3xl">Custom Recipe</h1>
      <form className="">
        <div>{pageTitles[page]}</div>
        {/* Form Components */}
        <div>{showPage()}</div>
        {/* Controls */}
        <div className="flex gap-3">
          <button
            disabled={page <= 0}
            onClick={() => {
              setPage((curPage) => curPage - 1);
            }}
            className="p-2 bg-blue-700"
            type="button"
          >
            Prev
          </button>
          <button
            disabled={page == pageTitles.length - 1}
            onClick={() => {
              setPage((curPage) => curPage + 1);
            }}
            className="p-2 bg-blue-700"
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
