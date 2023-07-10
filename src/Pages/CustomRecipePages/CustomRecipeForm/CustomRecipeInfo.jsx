import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../../../store/customRecipes-slice";

//revise form input styling 

const CustomRecipeInfo = () => {
  const dispatch = useDispatch();
  const recipeInfo = useSelector(state => state.customRecipe)

  const titleHandler = (event) => {
    dispatch(customRecipeActions.addRecipeTitle(event.target.value))
  }

  const ectHandler = (event) => {
    dispatch(customRecipeActions.addEstimatedCookTime(event.target.value))
  }

  const servingSizeHandler = (event) => {
    dispatch(customRecipeActions.addServingSize(event.target.value))
  }

  const imageHandler = (event) => {
    dispatch(customRecipeActions.addImage(event.target.files[0].name))
  }

  return (
    <div className="flex flex-col gap-10 justify-between font-noto mt-7">
      <div className="flex gap-2 items-center  justify-between">
        <label className="text-2xl">Title:</label>
        <input value={recipeInfo.title} onChange={titleHandler} id="title" type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Estimated Cook Time:</label>
        <input onChange={ectHandler} value={recipeInfo.estimatedCookTime} type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Serving Size:</label>
        <input onChange={servingSizeHandler} value={recipeInfo.servingSize} type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Image:</label>
        <input onChange={imageHandler} type="file" accept=".png, .jpg, .jpeg" className="border p-2 rounded" />
      </div>
    </div>
  );
};

export default CustomRecipeInfo;
