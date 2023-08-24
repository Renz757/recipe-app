import React, { useState } from "react";

const DefaultImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  
  const handleImageError = (index) => {
    //replace images that didn't load with a default image  
    setImgSrc('/src/assets/recipe-icon-png-25.jpg')
  };

  return <img src={imgSrc} alt={alt} onError={handleImageError} className="w-full aspect-video object-cover blur-none"/>;
};

export default DefaultImage;
