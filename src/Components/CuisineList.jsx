import React from "react";

const cuisines = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const CuisineList = ({ cuisineHandler }) => {
  return (
    <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
      <h1 className="text-2xl mt-10 text-center">Search Recipes By Cusines</h1>

      <div className="flex mt-10 gap-x-10 px-4 bg-eggshell overflow-x-auto">
        {cuisines.map((cuisine, index) => {
          return (
            <div
              key={index}
              onClick={cuisineHandler}
              className="h-40 w-40 p-16 rounded-full bg-vandyke gri flex justify-center items-center text-eggshell font-noto text-2xl cursor-pointer"
            >
              {cuisine}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CuisineList;
