import React, { useState, useRef } from "react";

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

const CuisineList = ({ cuisineHandler, isDragging, setIsDragging }) => {
  
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto md:pt-4">
      <h1 className="text-2xl mt-10 text-center">Search Recipes By Cusines</h1>

      <div
        className="flex mt-10 gap-x-10 px-4 bg-eggshell overflow-x-auto p-10"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cuisines.map((cuisine, index) => {
          return (
            <div
              key={index}
              onClick={isDragging ? null : cuisineHandler}
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
