import React, { useState } from "react";

const DefaultImage = ({ src, alt, id }) => {
  const [imgSrc, setImgSrc] = useState(src);

  //todo: find a way to lazy load images 
  const handleImageError = () => {
    //replace images that didn't load with a default image  
    setImgSrc('/src/assets/recipe-icon-png-25.jpg')
  };

  return <img src={imgSrc} alt={alt} key={id} onError={handleImageError} className="w-full aspect-video object-cover blur-none lg:rounded-xl"/>;
};

export default DefaultImage;
