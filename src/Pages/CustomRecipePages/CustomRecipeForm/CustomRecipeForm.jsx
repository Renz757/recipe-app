import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../../../store/customRecipes-slice";
import CustomRecipeInfo from "./CustomRecipeInfo";
import CustomRecipeInstructions from "./CustomRecipeInstructions";
import CustomRecipeIngredients from "./CustomRecipeIngredients";

const CustomRecipeForm = () => {
  const dispatch = useDispatch();
  const recipeInfo = useSelector((state) => state.customRecipe);

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

  const prevPage = () => {
    setPage((curPage) => curPage - 1);
  };
  //add form validation before going to the next step (no empty inputs)
  const nextPage = () => {
    if (page == 2) {
      if (recipeInfo.instructions.length <= 0) {
        alert("please add instructions");
        return;
      } else {
        submitHandler(event)
      }
    } else {
      if (recipeInfo.title === "") {
        alert("title cannot be empty");
        return;
      } else if (recipeInfo.estimatedCookTime === "") {
        alert("estimated cook time cannot be empty");
        return;
      } else if (recipeInfo.servingSize === "") {
        alert("serving size cannot be empty");
      } else if (recipeInfo.image === "") {
        alert("please upload an image");
        return;
      }

      if (page === 1) {
        if (recipeInfo.ingredients.length <= 0) {
          alert("please add ingredients");
          return;
        }
      }
      setPage((curPage) => curPage + 1);
    }
  };

  const progressBarStyles = () => {
    if (page === 1) {
      return "w-8/12";
    } else if (page === 2) {
      return "w-12/12 rounded-r-xl";
    }
    return "w-4/12";
  };

  return (
    <div className="pt-20 bg-eggshell h-full">
      <h1 className="text-3xl text-center">{pageTitles[page]}</h1>
      <div className="mx-auto w-9/12 pt-7">
        <div
          className={`h-3 bg-blue-500 rounded-l-xl ${progressBarStyles()}`}
        ></div>
      </div>
      <form
        onSubmit={submitHandler}
        className="h-screen flex flex-col items-center relative"
      >
        {/* Form Components */}
        <div>{showPage()}</div>
        {/* Controls */}
        <div className="flex gap-3 mt-12 absolute top-[625px]">
          <button
            disabled={page <= 0}
            onClick={prevPage}
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
