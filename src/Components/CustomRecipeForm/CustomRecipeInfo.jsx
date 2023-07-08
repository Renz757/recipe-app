import React from "react";

//revise form input styling 

const CustomRecipeInfo = () => {
  return (
    <div className="flex flex-col gap-3 justify-between font-noto mt-14">
      <div className="flex gap-2 items-center  justify-between">
        <label className="text-2xl">Title:</label>
        <input type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Estimated Cook Time:</label>
        <input type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Serving Size:</label>
        <input type="text" className="border p-2 rounded" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-2xl">Image:</label>
        <input type="file" accept=".png, .jpg, .jpeg" className="border p-2 rounded" />
      </div>
    </div>
  );
};

export default CustomRecipeInfo;
